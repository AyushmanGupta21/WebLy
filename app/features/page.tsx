import React from 'react';
import { JetBrains_Mono } from 'next/font/google';
import VertexNavbar from '../_components/VertexNavbar';
import { Cpu, Edit3, Code2, Sparkles } from 'lucide-react';

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const features = [
  {
    title: 'Generative AI Engine',
    desc: 'Transforms your natural language descriptions into clean, production-ready HTML code styled with Tailwind CSS.',
    icon: Cpu
  },
  {
    title: 'Interactive Editor',
    desc: 'Click on any element in the live preview panel to customize typography, spacing, colors, and content in real-time.',
    icon: Edit3
  },
  {
    title: 'Source Code Export',
    desc: 'Unlock and download your generated codebase instantly. Export standard code files ready for local integration.',
    icon: Code2
  },
  {
    title: 'Fluid Responsiveness',
    desc: 'Every block, layout, and component built is natively optimized for mobile, tablet, and desktop screens.',
    icon: Sparkles
  }
];

export default function FeaturesPage() {
  return (
    <main className={`${jetbrainsMono.className} min-h-screen w-full bg-black text-white font-mono antialiased overflow-x-hidden flex flex-col justify-between`}>
      <VertexNavbar />

      {/* Main Features Content */}
      <section className="w-full pt-32 pb-24 px-6 sm:px-10 md:px-16 lg:px-20 bg-gradient-to-b from-black to-zinc-950 flex-grow flex items-center">
        <div className="max-w-6xl mx-auto space-y-16 w-full">
          
          <div className="space-y-4">
            <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-light">Engine Capabilities</span>
            <h1 className="text-white font-bold text-4xl sm:text-5xl uppercase tracking-tight">How WebLy Works</h1>
            <p className="text-white/60 text-xs font-light max-w-lg">
              Explore the key technological components driving Draftly's real-time browser design engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={index}
                  className="liquid-glass p-8 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-all duration-300" />
                  
                  <div className="flex gap-5 items-start">
                    <div className="p-3 bg-white/5 rounded-xl text-white/80 group-hover:text-white transition-colors border border-white/5">
                      <FeatureIcon size={22} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-white text-sm font-semibold uppercase tracking-wider">{feature.title}</h3>
                      <p className="text-white/60 text-xs leading-relaxed font-light">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
