import { Button } from '@/components/ui/button'
import { OnSaveContext } from '@/context/OnSaveContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

function PlaygroundHeader() {
  const {onSaveData, setOnSaveData}=useContext(OnSaveContext)
  return (
    <div className='flex justify-between items-center p-4 bg-black/30 backdrop-blur-md border-b border-white/10'>
        <Link href='/workspace' className='flex items-center gap-2 cursor-pointer'>
          <Image src='/logo.svg' alt='logo' width={40} height={40} className='rounded-lg' />
          <h2 className='font-bold text-xl text-white'>WebLy</h2>
        </Link>
        <Button onClick={()=>setOnSaveData(Date.now())} className='bg-blue-600 hover:bg-blue-700 text-white'>Save</Button>
    </div>
  )
}

export default PlaygroundHeader