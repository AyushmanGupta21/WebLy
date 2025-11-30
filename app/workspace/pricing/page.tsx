'use client'
import { PricingTable } from '@clerk/nextjs'
import React from 'react'
import FloatingLines from '@/components/FloatingLines'

function Pricing() {
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
      <div className="relative z-10 flex items-center justify-center min-h-screen py-16" style={{ pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }} className='w-full flex flex-col items-center justify-center px-4'>
          <h2 className='font-bold text-5xl mb-12 text-white'>Pricing</h2>
          <div className='flex justify-center items-center w-full max-w-5xl [&_.cl-card]:bg-white/10 [&_.cl-card]:backdrop-blur-md [&_.cl-card]:border [&_.cl-card]:border-white/20 [&_.cl-card]:shadow-xl [&_.cl-card]:text-white [&_.cl-cardHeading]:text-white [&_.cl-text]:text-gray-300 [&_.cl-badge]:bg-blue-500 [&_.cl-badge]:text-white [&_.cl-button]:bg-blue-600 [&_.cl-button]:hover:bg-blue-700 [&_.cl-button]:text-white [&_.cl-button]:shadow-lg'>
            <PricingTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing