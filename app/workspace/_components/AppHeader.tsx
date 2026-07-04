'use client'

import React, { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { ChevronDown, Sparkles, Menu } from 'lucide-react';

interface AppHeaderProps {
  onToggleSidebar?: () => void;
}

function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const [model, setModel] = useState('WebLy GPT-4o');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-[#212121] border-b border-white/5 relative z-20">
      
      {/* Left - Hamburger (mobile only) & Model Selector */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors md:hidden cursor-pointer"
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Model Selector Dropdown (ChatGPT style) */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-gray-200 hover:text-white font-mono text-sm font-semibold select-none cursor-pointer transition-colors"
          >
            <Sparkles size={14} className="text-gray-400" />
            <span>{model}</span>
            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute left-0 mt-1 w-48 bg-[#2f2f2f] border border-white/10 rounded-xl shadow-xl z-20 py-1 overflow-hidden font-mono text-xs text-gray-200">
                <button
                  onClick={() => {
                    setModel('WebLy GPT-4o');
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-white/5 flex flex-col gap-0.5 cursor-pointer"
                >
                  <span className="font-semibold text-white">WebLy GPT-4o</span>
                  <span className="text-[10px] text-gray-400">Great for general building and editing</span>
                </button>
                <button
                  onClick={() => {
                    setModel('WebLy DeepSeek');
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-white/5 flex flex-col gap-0.5 border-t border-white/5 cursor-pointer"
                >
                  <span className="font-semibold text-white">WebLy DeepSeek</span>
                  <span className="text-[10px] text-gray-400">Advanced logic and complex structures</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right - Profile and actions */}
      <div className="flex items-center gap-3">
        <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} />
      </div>
    </header>
  );
}

export default AppHeader;