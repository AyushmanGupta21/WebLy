"use client"
import React, { useState, useEffect } from 'react';
import { SignInButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function VertexNavbar() {
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Builder', number: '01', href: '/workspace' },
    { label: 'Features', number: '02', href: '/features' },
    { label: 'Pricing', number: '03', href: '/pricing' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        } ${isOpen ? 'h-16 md:h-20 bg-black' : 'h-16 md:h-20'} px-6 sm:px-10 md:px-16 lg:px-20`}
      >
        {/* Left - WebLy Logo & Name */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <Image src="/logo.svg" alt="WebLy Logo" width={32} height={32} className="rounded-lg" />
          <span className="text-white text-lg font-bold font-mono tracking-tight">WebLy</span>
        </Link>

        {/* Center - Links (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-white/70 text-xs uppercase tracking-[0.2em] font-light hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right - Buttons (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <Link href="/workspace">
              <button className="px-5 py-2.5 border border-white/30 text-white text-xs uppercase tracking-[0.15em] font-light hover:border-white/60 transition-all duration-200 cursor-pointer">
                Workspace
              </button>
            </Link>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl="/workspace">
              <button className="px-5 py-2.5 border border-white/30 text-white text-xs uppercase tracking-[0.15em] font-light hover:border-white/60 transition-all duration-200 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          )}

          {user ? (
            <Link href="/workspace">
              <button className="px-5 py-2.5 bg-white text-black text-xs uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-all duration-200 cursor-pointer">
                Dashboard
              </button>
            </Link>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl="/workspace">
              <button className="px-5 py-2.5 bg-white text-black text-xs uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-all duration-200 cursor-pointer">
                Start Building
              </button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Hamburger (Below lg) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-6 h-6 gap-[4.5px] focus:outline-none z-50 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-[1.5px] bg-white transition-all duration-300 ease-out origin-center ${
              isOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[1.5px] bg-white transition-all duration-300 ease-out origin-center ${
              isOpen ? 'opacity-0 scale-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[1.5px] bg-white transition-all duration-300 ease-out origin-center ${
              isOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col justify-between transition-all duration-500 ease-in-out px-6 sm:px-10 pb-12 pt-24 ${
          isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Vertically stacked links */}
        <div className="flex flex-col gap-6 mt-4">
          {navLinks.map((link, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-out transform ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 60 + 150}ms` }}
            >
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-4 border-b border-white/10 text-white text-2xl sm:text-3xl font-light tracking-tight hover:text-white/80 transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-white/30 text-xs tracking-widest font-mono">{link.number}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col gap-3 mt-8 transition-all duration-500 ease-out transform ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {user ? (
            <Link href="/workspace" onClick={() => setIsOpen(false)} className="w-full">
              <button className="w-full py-4 border border-white/30 text-white text-xs uppercase tracking-[0.15em] font-light hover:border-white/60 transition-all duration-200 cursor-pointer">
                Workspace
              </button>
            </Link>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl="/workspace">
              <button className="w-full py-4 border border-white/30 text-white text-xs uppercase tracking-[0.15em] font-light hover:border-white/60 transition-all duration-200 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          )}

          {user ? (
            <Link href="/workspace" onClick={() => setIsOpen(false)} className="w-full">
              <button className="w-full py-4 bg-white text-black text-xs uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-all duration-200 cursor-pointer">
                Dashboard
              </button>
            </Link>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl="/workspace">
              <button className="w-full py-4 bg-white text-black text-xs uppercase tracking-[0.15em] font-medium hover:bg-white/90 transition-all duration-200 cursor-pointer">
                Start Building
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </>
  );
}
