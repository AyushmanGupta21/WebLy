"use client"
import React from 'react';
import { JetBrains_Mono } from 'next/font/google';
import VertexNavbar from '../_components/VertexNavbar';
import { SignInButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Zap, Check, ArrowRight } from 'lucide-react';

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

export default function PublicPricingPage() {
  const { user } = useUser();

  return (
    <main className={`${jetbrainsMono.className} min-h-screen w-full bg-black text-white font-mono antialiased overflow-x-hidden flex flex-col justify-between`}>
      <VertexNavbar />

      {/* Main Pricing Content */}
      <section className="w-full pt-32 pb-24 px-6 sm:px-10 md:px-16 lg:px-20 bg-gradient-to-b from-black to-zinc-950 flex-grow flex items-center">
        <div className="max-w-5xl mx-auto space-y-16 w-full">
          
          <div className="text-center space-y-4">
            <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-light">Pricing Plans</span>
            <h1 className="text-white font-bold text-4xl sm:text-5xl uppercase tracking-tight">Simple, Transparent Tiering</h1>
            <p className="text-white/60 text-xs font-light max-w-md mx-auto">
              Upgrade your workflow with unlimited generations, priority execution queues, and clean source exports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* Free Tier Card */}
            <div className="liquid-glass p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-white/40 text-[10px] uppercase tracking-widest font-light">Free Tier</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-3xl font-bold font-mono">$0</span>
                    <span className="text-white/40 text-xs">/ forever</span>
                  </div>
                </div>
                <p className="text-white/60 text-xs leading-relaxed font-light font-mono">
                  Perfect for testing WebLy's builder capabilities and starting your first design session.
                </p>
                <div className="w-full h-[1px] bg-white/5" />
                <ul className="space-y-3.5 text-xs text-white/70 font-light font-mono">
                  <li className="flex items-center gap-2.5">
                    <Check size={14} className="text-white/50" />
                    <span>2 free credits</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={14} className="text-white/50" />
                    <span>Flowbite UI components</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={14} className="text-white/50" />
                    <span>Live preview editor</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                {user ? (
                  <Link href="/workspace" className="w-full block font-mono">
                    <button className="w-full py-3.5 border border-white/10 hover:border-white/30 text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-xl transition-all duration-200 cursor-pointer">
                      Go to Workspace
                    </button>
                  </Link>
                ) : (
                  <SignInButton mode="modal" forceRedirectUrl="/workspace">
                    <button className="w-full py-3.5 border border-white/10 hover:border-white/30 text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-xl transition-all duration-200 cursor-pointer font-mono">
                      Get Started
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>

            {/* Pro Tier Card */}
            <div className="liquid-glass p-8 flex flex-col justify-between relative overflow-hidden group shadow-[0_0_50px_rgba(255,255,255,0.02)]">
              {/* Premium Glow overlay */}
              <div className="absolute top-0 right-0 px-3 py-1 bg-white text-black text-[9px] font-bold uppercase tracking-wider rounded-bl-xl font-mono">
                Popular
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-white text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 font-mono">
                    <Zap size={10} className="text-yellow-400 fill-yellow-400" />
                    <span>Pro Tier</span>
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-3xl font-bold font-mono">$1.01</span>
                    <span className="text-white/40 text-xs">/ monthly</span>
                  </div>
                </div>
                <p className="text-white/60 text-xs leading-relaxed font-light font-mono">
                  Tailored for creators, developers, and teams needing continuous, high-volume development capability.
                </p>
                <div className="w-full h-[1px] bg-white/5" />
                <ul className="space-y-3.5 text-xs text-white/90 font-light font-mono">
                  <li className="flex items-center gap-2.5">
                    <Check size={14} className="text-white" />
                    <span>Unlimited design credits</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={14} className="text-white" />
                    <span>Complete HTML / CSS export</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={14} className="text-white" />
                    <span>Priority queue LLM execution</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={14} className="text-white" />
                    <span>Advanced charts, Swiper sliders</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 font-mono">
                {user ? (
                  <Link href="/workspace/pricing" className="w-full block">
                    <button className="w-full py-3.5 bg-white text-black hover:bg-gray-200 text-xs uppercase tracking-[0.15em] font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2">
                      <span>Upgrade Plan</span>
                      <ArrowRight size={13} />
                    </button>
                  </Link>
                ) : (
                  <SignInButton mode="modal" forceRedirectUrl="/workspace/pricing">
                    <button className="w-full py-3.5 bg-white text-black hover:bg-gray-200 text-xs uppercase tracking-[0.15em] font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2">
                      <span>Upgrade Plan</span>
                      <ArrowRight size={13} />
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 sm:px-10 md:px-16 lg:px-20 border-t border-white/5 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-white/50 text-xs select-none">
          <img src="/logo.svg" alt="WebLy Logo" className="w-5 h-5 rounded-md opacity-70" />
          <span>&copy; {new Date().getFullYear()} WebLy AI. All rights reserved.</span>
        </div>
        <div className="flex gap-6 text-white/40 text-[10px] uppercase tracking-wider">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  );
}
