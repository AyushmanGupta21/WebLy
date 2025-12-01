import React, { useState } from 'react'
import { Messages } from '../[projectId]/page'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

type Prop = {
  messages: Messages[],
  onSend: any,
  loading:boolean,
  isMobile?: boolean
}
function ChatSection({ messages, onSend, loading, isMobile }: Prop) {
  const [input, setInput] = useState<string>();

  const handleSend=()=>{
    if(!input?.trim()) return;
    onSend(input);
    setInput('');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  console.log(messages)
  return (
    <div className={`${
      isMobile ? 'w-full h-full' : 'w-96 h-full'
    } p-4 flex flex-col bg-black/30 backdrop-blur-sm border-r border-white/10`}>
      {/* Message section */}
      <div className='flex-1 overflow-y-auto p-4 space-y-3 flex flex-col'>
        {messages?.length === 0 ?
          (
            <p className='text-gray-400 text-center'>No Messages Yet</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role == 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading&& <div className='flex justify-center items-center p-4 gap-2'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
            <span className='ml-2 text-gray-300'>Thinking... Working on your request</span>
          </div> }
      </div>

      {/* footer input */}
      <div className='p-3 border-t border-white/10 flex items-center gap-2'>
        <textarea
        value={input}
          placeholder='Describe your website design idea'
          className='flex-1 resize-none border border-white/20 rounded-lg px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden bg-black/30 text-white placeholder:text-gray-400'
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSend}><ArrowUp /></Button>
      </div>

    </div>
  )
}

export default ChatSection