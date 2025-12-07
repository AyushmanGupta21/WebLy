'use client'

import Image from 'next/image'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext'
import { Progress } from '@/components/ui/progress'
import { useAuth, UserButton } from '@clerk/nextjs'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'

export function AppSidebar() {
    const [projectList, setProjectList]=useState([])
    const{userDetail,setUserDetail}=useContext(UserDetailContext)
    const [loading, setLoading]=useState(false);
    const [skeletonCount, setSkeletonCount]=useState(3);
    const {has} = useAuth()
    useEffect(() => {
        GetProjectList();
    }, [])

    const hasUnlimitedAccess = has&&has({ plan: 'unlimited' })

    const GetProjectList=async()=> {
        setLoading(true);
        const result=await axios.get('/api/get-all-projects');
        console.log(result.data);
        setProjectList(result.data);
        // Set skeleton count based on actual project count for future loads
        if(result.data.length > 0) {
            setSkeletonCount(result.data.length);
        }
        setLoading(false);
    }

    return (
        <Sidebar className='!bg-black/30 backdrop-blur-md border-r border-white/10 [&_[data-slot="sidebar"]]:!bg-black/30 [&_[data-slot="sidebar"]]:backdrop-blur-md'>
            <SidebarHeader className='p-5'>
                <Link href={'/workspace'} className='flex items-center gap-2 cursor-pointer'>
                    <Image src='/logo.svg' alt="logo" width={35} height={35} className='rounded-lg' />
                    <h2 className='font-bold text-xl text-white'>WebLy</h2>
                </Link>
                <Link href={'/workspace'} className='mt-5 w-full'>
                    <Button className='w-full bg-white text-black hover:bg-gray-200'>
                        + Add New Project
                    </Button>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className='p-2'>
                    <SidebarGroupLabel className='text-gray-400'>Projects</SidebarGroupLabel>
                    {!loading && projectList.length==0&&
                    <h2 className='text-sm px-2 text-gray-500'>No Project Found</h2> }
                    <div>
                    {loading ? 
                    Array.from({ length: skeletonCount }).map((_, index)=>(
                        <Skeleton key={index} className='w-full h-10 rounded-lg mt-2'/>
                    ))
                    : projectList.length>0 && projectList.map((project:any, index)=>(
                        <Link href={`/playground/${project.projectId}?frameId=${project.frameId}`} key={index} className='my-2 hover:bg-white/10 p-2 rounded-lg cursor-pointer block'>
                            <h2 className='line-clamp-1 text-gray-300 hover:text-white transition-colors'>{project.chats?.[0]?.chatMessage?.[0]?.content || 'New Project'}</h2>
                        </Link>
                    ))
                    }
                    </div>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter className='p-2'>
                {!hasUnlimitedAccess && <div className='p-3 border border-white/20 rounded-xl space-y-3 bg-white/10'>
                    <h2 className='flex justify-between items-center text-white'>Remaining Credits <span className='font-bold text-white'>{userDetail?.credits}</span></h2>
                    <Progress value={(userDetail?.credits/(userDetail?.maxCredits || 2))*100} className='bg-gray-700 [&>div]:bg-blue-500'/>
                    <Link href={'/workspace/pricing'} className='w-full'>
                    <Button className='w-full bg-white text-black hover:bg-gray-200'>Upgrade to Unlimited</Button>
                    </Link>
                </div> }
                <div className='flex items-center gap-2 mt-3'>
                    <UserButton />
                    <span className='text-gray-300 hover:text-white transition-colors cursor-pointer'>Settings</span>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}