import { Button } from '@/components/ui/button'
import { OnSaveContext } from '@/context/OnSaveContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function PlaygroundHeader() {
  const {onSaveData, setOnSaveData}=useContext(OnSaveContext)
  return (
    <div className='flex justify-between items-center p-4 shadow'>
        <div className='flex items-center gap-2'>
          <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
          <h2 className='font-bold text-xl'>WebLy</h2>
        </div>
        <Button onClick={()=>setOnSaveData(Date.now())}>Save</Button>
    </div>
  )
}

export default PlaygroundHeader