import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        const {messages} = await req.json();
        
        console.log("API Key present:", !!process.env.OPENROUTER_API_KEY);
        console.log("Messages:", messages);
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'WebLy',
                'Content-Type': 'application/json',
                'X-Allow-Data-Sharing': 'true'
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat',
                messages: messages,
                stream: true,
                max_tokens: 4000
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Request failed');
        }

        const reader = response.body?.getReader();
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const readable = new ReadableStream({
            async start(controller) {
                try {
                    while (true) {
                        const { done, value } = await reader!.read();
                        if (done) break;

                        const chunk = decoder.decode(value);
                        const lines = chunk.split('\n');

                        for (const line of lines) {
                            if (line.startsWith('data: ')) {
                                const data = line.slice(6);
                                if (data === '[DONE]') {
                                    controller.close();
                                    return;
                                }
                                try {
                                    const parsed = JSON.parse(data);
                                    const text = parsed.choices[0]?.delta?.content;
                                    if (text) {
                                        controller.enqueue(encoder.encode(text));
                                    }
                                } catch (err) {
                                    console.error("Error parsing stream", err);
                                }
                            }
                        }
                    }
                    controller.close();
                } catch (err) {
                    console.error("Stream error:", err);
                    controller.error(err);
                }
            },
        });

        return new NextResponse(readable, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (error) {
        console.error("API error:", error);
        let errorMessage = "Something went wrong";
        
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}