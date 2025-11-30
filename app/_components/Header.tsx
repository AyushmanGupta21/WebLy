"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


function Header() {
  const {user} = useUser();
  return (
    <div className='flex items-center justify-between p-4 bg-black/30 backdrop-blur-md border-b border-white/10'>
      {/* logo */}
      <div className='flex gap-2 items-center'>
        <Image src="/logo.svg" alt="Logo" width={35} height={35} className='rounded-lg' />
        <h2 className='font-bold text-xl text-white'>WebLy</h2>
      </div>
      {/* get started button */}
      <div>
        {!user ? <SignInButton mode='modal' 
        forceRedirectUrl={'/workspace'}>
          <Button className='bg-blue-600 hover:bg-blue-700 text-white'>Get Started<ArrowRight /></Button>
        </SignInButton>
          :  
          <Link href={'/workspace'}>
          <Button className='bg-blue-600 hover:bg-blue-700 text-white'>Get Started<ArrowRight /></Button>
          </Link>
        }
      </div>

    </div>
  )
}

export default Header
