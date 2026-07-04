"use client"
import React, { useEffect, useState } from 'react'
import PlaygroundHeader from '../_components/PlaygroundHeader'
import ChatSection from '../_components/ChatSection'
import WebsiteDesign from '../_components/WebsiteDesign'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { useResizable, ResizeHandle } from '@astryxdesign/core/Resizable';

export type Frame = {
  projectId: string;
  frameId: string,
  designCode: string,
  chatMessages: Messages[]
}
export type Messages = {
  role: string,
  content: string
}

const Prompt = `userInput:{userInput}
Based on the user input, generate a compete HTML Tailwind CSS code using FLowbite UI components. Use a modern design with blue as the primary color theme. Do not add HTML head of title tag, just body, make if fully responsive.
Requirements:
-All primary components must match the theme color.
-Add proper padding and margin for each element.
-Components should not be connected to one another;
each element should be independent.
-Design must be fully responsive for all screen sizes.
-Use placeholders for all images for light mode:
https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg and for dark mode use:
https://www.cibaky.com/wp-content/uploads/2015/12/placeholder-3.jpg
For image, add alt tag with iamge prompt for that image
- Do not include broken links.
- Library already install so do not installed or add in script
- Header menu options should be spread out and not connected.
use the following component where appropriate:
- fa fa icons
- **Flowbite** for UI components like buttons, modals, forms, tables, tabs, and alerts, cards, dialog, dropdown, etc
- Chart.js for charts & graphs
- Swiper.js for sliders/carousels
- tooltip & Popover library (Tippy.js)
Additional requirements:
- Ensure proper spacing, alignment, and hierarchy for all elements.
- Include interactive components like modals, dropdowns, and accordions where suitable.
- Ensure charts are visually appealing and match the theme color.
- Do not add any extra text before or after the HTML code.
- Output a complete, ready-to-use HTML page.
- Do not give any raw text before start and end pont the ai reponse`

export default function PlayGroundContent() {
  const { projectId } = useParams();
  const params = useSearchParams();
  const frameId = params.get('frameId');
  const [frameDetail, setFrameDetail] = useState<Frame>();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [generatedCode, setGeneratedCode] = useState<any>();
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [showChat, setShowChat] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const chatResize = useResizable({
    defaultSize: 384,
    minSizePx: 320,
    maxSizePx: 560,
    autoSaveId: 'playground-chat-panel',
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && selectedElement) {
      setShowChat(false);
    } else if (isMobile && !selectedElement) {
      setShowChat(true);
    }
  }, [selectedElement, isMobile]);

  useEffect(() => {
    frameId && GetFrameDetails()
  }, [frameId])

  const GetFrameDetails = async () => {
    try {
      const result = await axios.get('/api/frames?frameId=' + frameId + "&projectId=" + projectId)
      setFrameDetail(result.data);
      const designCode = result.data?.designCode;
      if (designCode) {
        const index = designCode.indexOf('```html') + 7;
        const formattedCode = designCode.slice(index);
        setGeneratedCode(formattedCode);
      }
      if (result.data?.chatMessages && Array.isArray(result.data.chatMessages)) {
        setMessages(result.data.chatMessages);
        if (!designCode && result.data.chatMessages.length > 0 && !hasAutoTriggered) {
          const firstUserMessage = result.data.chatMessages.find((msg: Messages) => msg.role === 'user');
          if (firstUserMessage) {
            setHasAutoTriggered(true);
            SendMessage(firstUserMessage.content);
          }
        }
      }
    } catch (err) {
      console.error('Failed to get frame details:', err);
    }
  }

  const SendMessage = async (userInput: string) => {
    setLoading(true);
    
    const isModification = /change|modify|update|add|remove|edit|fix|adjust|improve/i.test(userInput) && generatedCode;
    
    if (!isModification) {
      setGeneratedCode('');
    }

    setMessages((prev: any) => [
      ...prev,
      { role: "user", content: userInput }
    ])

    let promptContent = '';
    if (/create|build|design|generate|make|write|code|page|website|component|layout|form|dashboard|hero|section/.test(userInput.toLowerCase())) {
      if (isModification && generatedCode) {
        promptContent = `Current Design Code:\n${generatedCode}\n\nUser Request: ${userInput}\n\nModify the above code based on the user's request. ${Prompt.split('userInput:')[1]}`;
      } else {
        promptContent = Prompt.replace('{userInput}', userInput);
      }
    } else {
      promptContent = userInput;
    }

    try {
      const result = await fetch('/api/ai-model', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: "user", content: promptContent }]
        })
      });
      
      const reader = result.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';
      let isCode = false;

      while (true) {
        //@ts-ignore
        const { done, value } = await reader?.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        aiResponse += chunk;
        if (!isCode && aiResponse.includes('```html')) {
          isCode = true;
          const index = aiResponse.indexOf('```html') + 7;
          const initialCodeChunk = aiResponse.slice(index);
          setGeneratedCode(initialCodeChunk);
        } else if (isCode) {
          setGeneratedCode((prev: any) => prev + chunk);
        }
      }
      
      await SaveGeneratedCode(aiResponse);
      
      if (!isCode) {
        setMessages((prev: any) => [
          ...prev,
          { role: "assistant", content: aiResponse }
        ])
      } else {
        setMessages((prev: any) => [
          ...prev,
          { role: "assistant", content: 'Your code is ready!' }
        ])
      }
    } catch (err) {
      toast.error('AI Request failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      SaveMessages();
    }
  }, [messages])
  
  const SaveMessages = async () => {
    try {
      await axios.put('/api/chats', {
        messages: messages,
        frameId: frameId
      })
    } catch (err) {
      console.error('Failed to save chats:', err);
    }
  }

  const SaveGeneratedCode = async (code: string) => {
    try {
      await axios.post('/api/frames', {
        designCode: code,
        frameId: frameId,
        projectId: projectId
      })
      toast.success('Website is Ready!');
    } catch (err) {
      console.error('Failed to save code:', err);
    }
  }

  return (
    <div className="relative h-screen bg-[#212121] overflow-hidden font-mono select-none">
      <div className="relative z-10 h-full flex flex-col">
        <PlaygroundHeader />
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative bg-[#212121]">
          {/* Chat Panel */}
          <div
            style={{ width: isMobile ? '100%' : `${chatResize.size}px`, flexShrink: 0 }}
            className={`transition-all duration-300 ease-in-out ${
              isMobile
                ? (showChat ? 'translate-x-0 w-full' : '-translate-x-full w-0 hidden')
                : 'translate-x-0'
            }`}
          >
            <ChatSection
              messages={messages ?? []}
              onSend={(input: string) => SendMessage(input)}
              loading={loading}
              isMobile={isMobile}
            />
          </div>

          {/* Resize Handle (Desktop Only) */}
          {!isMobile && (
            <ResizeHandle
              direction="horizontal"
              resizable={chatResize.props}
              pillPlacement="center"
              hasDivider
              label="Resize chat panel"
              className="bg-white/5 hover:bg-white/10 active:bg-zinc-600 transition-colors w-1 cursor-col-resize z-20"
            />
          )}

          {/* Website Design Iframe View */}
          <div className="flex-grow min-w-0 h-full relative z-10">
            <WebsiteDesign
              generatedCode={generatedCode?.replace('```', '')}
              onElementSelect={(el: HTMLElement | null) => setSelectedElement(el)}
              selectedElement={selectedElement}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
