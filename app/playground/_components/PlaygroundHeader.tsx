'use client'

import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OnSaveContext } from '@/context/OnSaveContext';
import { Sparkles, Save, ChevronLeft } from 'lucide-react';

function PlaygroundHeader() {
  const { onSaveData, setOnSaveData } = useContext(OnSaveContext);

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-[#212121] border-b border-white/5 relative z-20 font-mono">
      {/* Left - Back Link & Logo */}
      <div className="flex items-center gap-3">
        <Link
          href="/workspace"
          className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
          title="Back to Dashboard"
        >
          <ChevronLeft size={18} />
        </Link>
        <div className="flex items-center gap-2 select-none">
          <Image src="/logo.svg" alt="logo" width={22} height={22} className="rounded" />
          <span className="text-white text-xs font-semibold tracking-tight">WebLy Workspace</span>
        </div>
      </div>

      {/* Center - Session Status */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-[10px] text-gray-300 select-none">
        <Sparkles size={11} className="text-yellow-400 animate-pulse" />
        <span>Active Editing Session</span>
      </div>

      {/* Right - Save Action */}
      <div>
        <button
          onClick={() => setOnSaveData(Date.now())}
          className="flex items-center gap-2 py-1.5 px-4 bg-white text-black hover:bg-gray-200 text-xs font-bold rounded-lg transition-colors font-mono cursor-pointer select-none"
        >
          <Save size={13} />
          <span>Save Design</span>
        </button>
      </div>
    </header>
  );
}

export default PlaygroundHeader;