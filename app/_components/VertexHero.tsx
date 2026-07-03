"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Sparkles, ArrowRight, Loader2, LayoutDashboard, User, ShoppingBag, LogIn } from 'lucide-react';

const presets = [
  {
    label: 'SaaS Dashboard',
    prompt: 'Create an analytics dashboard to track SaaS revenue and customers.',
    icon: LayoutDashboard
  },
  {
    label: 'Design Portfolio',
    prompt: 'Create a dark, minimal portfolio website for a creative UI designer.',
    icon: User
  },
  {
    label: 'E-commerce Shop',
    prompt: 'Create a clean e-commerce landing page with product cards and filters.',
    icon: ShoppingBag
  },
  {
    label: 'SignUp Form',
    prompt: 'Create a modern sign up form with email, password, and social logins.',
    icon: LogIn
  }
];

export default function VertexHero() {
  const { user } = useUser();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    // Store in sessionStorage so workspace mounts can pick it up
    sessionStorage.setItem('pendingProjectInput', input);

    if (user) {
      router.push('/workspace');
    }
  };

  return (
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-black select-none flex flex-col justify-end pt-24 pb-12 md:pb-16 lg:pb-20">
      {/* Layer 1: Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover animate-hero-video pointer-events-none z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_202655_a7f5aca0-2f80-4bc9-bcb5-96ac95662003.mp4"
          type="video/mp4"
        />
      </video>

      {/* Layer 2: Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-[5]" />

      {/* Layer 3: Content */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">

        {/* LEFT COLUMN: Headings & Stats */}
        <div className="flex flex-col gap-6 lg:pb-4">
          <div className="text-black text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold animate-hero-label">
            AI-Powered Builder. By WebLy.
          </div>
          <h1
            className="font-bold text-[clamp(2.2rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.06em] uppercase animate-hero-title"
            style={{
              background: 'linear-gradient(to bottom, #9ca3af 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Instant
            <br />
            AI Website
            <br />
            Generation
          </h1>
          <div className="flex items-center gap-6 text-white/40 text-[10px] sm:text-xs tracking-wider uppercase font-light animate-hero-meta">
            <span>Version: v1.0.4</span>
            <span className="w-8 h-[1px] bg-white/20 inline-block animate-hero-divider" />
            <span>Status: Active</span>
          </div>

          <div className="flex items-end gap-8 sm:gap-12 mt-4 lg:mt-8">
            <div className="flex flex-col gap-1 animate-hero-stat-1">
              <span className="text-white text-2xl sm:text-3xl font-bold tracking-tight">0.4s</span>
              <span className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider font-light">Gen. Speed</span>
            </div>
            <div className="flex flex-col gap-1 animate-hero-stat-2">
              <span className="text-white text-2xl sm:text-3xl font-bold tracking-tight">100%</span>
              <span className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider font-light">Responsive</span>
            </div>
            <div className="flex flex-col gap-1 animate-hero-stat-3">
              <span className="text-white text-2xl sm:text-3xl font-bold tracking-tight">x10</span>
              <span className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider font-light">Efficiency</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Liquid Glass AI Chatbox & Preset Carousel */}
        <div className="flex flex-col gap-6 w-full lg:max-w-xl animate-hero-description">

          {/* Glassmorphic Chatbox Panel */}
          <form
            onSubmit={handleSubmit}
            className="w-full liquid-glass p-5 space-y-4 relative overflow-hidden"
          >
            {/* Liquid-glass overlay glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 select-none border-b border-white/5 pb-3">
              <Sparkles size={16} className="text-white animate-pulse" />
              <span className="text-xs text-white uppercase tracking-wider font-semibold font-mono">WebLy Copilot</span>
            </div>

            <p className="text-gray-900 text-xs leading-relaxed font-semibold font-mono">
              Describe the website of your dreams and watch WebLy build, customize, and deploy it instantly.
            </p>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g., build a minimalist portfolio website with black and white theme..."
              className="w-full h-24 focus:outline-none focus:ring-1 focus:ring-black/20 resize-none bg-black/5 border border-black/10 rounded-xl p-3 text-xs text-black placeholder:text-gray-700 font-mono transition-all duration-200"
            />

            {/* Submit Button with Clerk Redirect Triggers */}
            <div className="w-full">
              {user ? (
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white text-black hover:bg-gray-200 disabled:bg-zinc-800 disabled:text-zinc-500 text-xs uppercase tracking-[0.15em] font-bold rounded-xl transition-all duration-200 cursor-pointer select-none font-mono"
                >
                  {loading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>
                      <span>Generate Website</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              ) : (
                <SignInButton mode="modal" forceRedirectUrl="/workspace">
                  <button
                    type="button"
                    disabled={!input.trim()}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white text-black hover:bg-gray-200 disabled:bg-zinc-800 disabled:text-zinc-500 text-xs uppercase tracking-[0.15em] font-bold rounded-xl transition-all duration-200 cursor-pointer select-none font-mono"
                  >
                    <span>Sign In to Build</span>
                    <ArrowRight size={14} />
                  </button>
                </SignInButton>
              )}
            </div>
          </form>

          {/* Preset Prompts Carousel */}
          <div className="w-full space-y-2">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono pl-1 select-none">Quick Presets</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono">
              {presets.map((preset, index) => {
                const PresetIcon = preset.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setInput(preset.prompt)}
                    className="flex items-center gap-2 flex-shrink-0 px-3 py-2 bg-white/5 border border-white/5 hover:border-white/25 rounded-lg text-[10px] text-white/70 hover:text-white cursor-pointer transition-all duration-200"
                  >
                    <PresetIcon size={12} className="text-white/50" />
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
