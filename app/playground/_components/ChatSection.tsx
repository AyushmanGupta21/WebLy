'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Messages } from '../[projectId]/PlayGroundContent';
import {
  ChatMessage,
  ChatMessageBubble,
  ChatMessageList,
  ChatMessageMetadata,
} from '@astryxdesign/core/Chat';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Markdown } from '@astryxdesign/core/Markdown';
import { Loader2, ArrowUp, Paperclip, Sparkles } from 'lucide-react';

type Prop = {
  messages: Messages[];
  onSend: (input: string) => void;
  loading: boolean;
  isMobile?: boolean;
};

function ChatSection({ messages, onSend, loading, isMobile }: Prop) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Scroll to bottom whenever messages or loading changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div
      className={`${
        isMobile ? 'w-full h-full' : 'w-full h-full'
      } flex flex-col bg-[#212121] border-r border-white/5 font-mono select-none`}
    >
      {/* Scrollable Message List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
        <ChatMessageList>
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center py-12">
              <p className="text-gray-500 text-sm font-mono select-none">No messages yet. Ask WebLy to build something!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <ChatMessage
                    key={index}
                    sender={isUser ? 'user' : 'assistant'}
                    avatar={!isUser ? <Avatar name="WebLy" size="small" className="!bg-white/10" /> : undefined}
                    className="flex flex-col gap-1"
                  >
                    {isUser ? (
                      <div className="flex justify-end w-full">
                        <ChatMessageBubble
                          className="!bg-[#2f2f2f] !text-white border border-white/5 max-w-[85%] rounded-2xl px-4 py-3"
                        >
                          <span className="text-sm font-mono whitespace-pre-wrap leading-relaxed">{msg.content}</span>
                        </ChatMessageBubble>
                      </div>
                    ) : (
                      <ChatMessageBubble variant="ghost" className="w-full">
                        {msg.content === 'Your code is ready!' ? (
                          <div className="flex flex-col gap-2 p-3 bg-white/5 border border-white/10 rounded-2xl max-w-xl">
                            <span className="text-white text-sm font-semibold flex items-center gap-2">
                              <Sparkles size={14} className="text-yellow-400 animate-pulse" />
                              Design generated successfully!
                            </span>
                            <span className="text-gray-400 text-xs leading-relaxed font-mono">
                              You can inspect, select, and edit components in the preview window on the right.
                            </span>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-200 leading-relaxed font-mono max-w-2xl prose prose-invert prose-sm">
                            <Markdown density="compact">{msg.content}</Markdown>
                          </div>
                        )}
                      </ChatMessageBubble>
                    )}
                  </ChatMessage>
                );
              })}
            </div>
          )}

          {/* Loading Indicator (ChatGPT style) */}
          {loading && (
            <ChatMessage
              sender="assistant"
              avatar={<Avatar name="WebLy" size="small" className="!bg-white/10" />}
            >
              <ChatMessageBubble variant="ghost">
                <div className="flex items-center gap-3 py-1.5 text-gray-400">
                  <Loader2 size={16} className="animate-spin text-gray-300" />
                  <span className="text-xs font-mono select-none">WebLy is creating the code...</span>
                </div>
              </ChatMessageBubble>
            </ChatMessage>
          )}
          
          <div ref={messagesEndRef} />
        </ChatMessageList>
      </div>

      {/* Composer Input Area (ChatGPT style) */}
      <div className="p-4 border-t border-white/5 bg-[#212121]">
        <div className="bg-[#2f2f2f] border border-white/10 rounded-2xl p-2.5 flex flex-col gap-2 shadow-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask WebLy to modify or add elements..."
            className="w-full h-16 text-sm focus:outline-none focus:ring-0 resize-none bg-transparent text-white placeholder:text-gray-400 font-mono p-1 border-0"
          />
          <div className="flex justify-between items-center border-t border-white/5 pt-2">
            <button className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer" title="Attach file">
              <Paperclip size={15} />
            </button>
            <button
              disabled={!input.trim() || loading}
              onClick={handleSend}
              className="p-1.5 bg-white text-black hover:bg-gray-200 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-full transition-colors cursor-pointer w-7 h-7 flex items-center justify-center"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;