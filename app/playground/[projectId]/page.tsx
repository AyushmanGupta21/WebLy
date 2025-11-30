"use client"
import React, { useEffect, useState } from 'react'
import PlaygroundHeader from '../_components/PlaygroundHeader'
import ChatSection from '../_components/ChatSection'
import WebsiteDesign from '../_components/WebsiteDesign'
import ElementSettingSection from '../_components/ElementSettingSection'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import FloatingLines from '@/components/FloatingLines'

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

function PlayGround() {
  const { projectId } = useParams();
  const params = useSearchParams();
  const frameId = params.get('frameId');
  const [frameDetail, setFrameDetail] = useState<Frame>();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [generatedCode, setGeneratedCode] = useState<any>();
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  useEffect(() => {
    frameId && GetFrameDetails()
  }, [frameId])

  const GetFrameDetails = async () => {
    const result = await axios.get('/api/frames?frameId=' + frameId + "&projectId=" + projectId)
    console.log(result.data);
    setFrameDetail(result.data);
    const designCode=result.data?.designCode;
    if(designCode){
      const index = designCode.indexOf('```html') + 7;
      const formattedCode = designCode.slice(index);
      setGeneratedCode(formattedCode);
    }
    // Load existing chat messages from database
    if(result.data?.chatMessages && Array.isArray(result.data.chatMessages)){
      setMessages(result.data.chatMessages);
      // Auto-send first message if no design code exists yet
      if(!designCode && result.data.chatMessages.length > 0 && !hasAutoTriggered){
        const firstUserMessage = result.data.chatMessages.find((msg: Messages) => msg.role === 'user');
        if(firstUserMessage){
          setHasAutoTriggered(true);
          SendMessage(firstUserMessage.content);
        }
      }
    }
  }

  const SendMessage = async (userInput: string) => {
    setLoading(true);
    
    // Check if it's a modification request (change, add, modify, update, etc.) or new design
    const isModification = /change|modify|update|add|remove|edit|fix|adjust|improve/i.test(userInput) && generatedCode;
    
    // Reset generated code only for new designs
    if (!isModification) {
      setGeneratedCode('');
    }

    setMessages((prev: any) => [
      ...prev,
      { role: "user", content: userInput }
    ])

    // Prepare the prompt with existing code context if it's a modification
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
      //Check if ai start sending code
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
    //after streaming end
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
    
    setLoading(false);
  }

  useEffect(()=>{
    if(messages.length>0){
      SaveMessages();
    }
  }, [messages])
  
  const SaveMessages=async()=>{
    const result=await axios.put('/api/chats',{
      messages:messages,
      frameId:frameId
    })
    console.log(result);
  }

  

  const SaveGeneratedCode=async(code:string)=>{
    const result=await axios.post('/api/frames',{
      designCode:code,
      frameId:frameId,
      projectId:projectId
    })
    console.log(result.data);
    toast.success('Website is Ready!');
  }

  return (
    <div className="relative min-h-screen bg-black">
      <div className="fixed inset-0 z-0" style={{ pointerEvents: 'auto' }}>
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={5}
          lineDistance={5}
          bendRadius={5.0}
          bendStrength={-1.5}
          interactive={true}
          parallax={true}
        />
      </div>
      <div className="relative z-10" style={{ pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <PlaygroundHeader />
          <div className='flex' >
            {/* Chatsection */}
            <ChatSection messages={messages ?? []}
              onSend={(input: string) => SendMessage(input)}
              loading={loading}
            />
            {/* websiteDesign */}
            <WebsiteDesign generatedCode={generatedCode?.replace('```', '')}/>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayGround