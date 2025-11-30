import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import React from 'react'

function AppHeader() {
  return (
    <div className='flex justify-between items-center p-4 bg-black/30 backdrop-blur-md border-b border-white/10 relative z-20'>
        <SidebarTrigger className='text-white hover:bg-white/20 hover:text-white border border-white/20 transition-colors h-10 w-10 flex items-center justify-center rounded-md'>
          <Menu className='h-5 w-5' />
        </SidebarTrigger>
        <UserButton />
    </div>
  )
}

export default AppHeader