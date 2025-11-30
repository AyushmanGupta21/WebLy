import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar';
import AppHeader from './_components/AppHeader';


function WorkspaceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full h-screen overflow-hidden flex flex-col'>
                <AppHeader />
                <div className='flex-1 overflow-auto relative'>
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}

export default WorkspaceLayout