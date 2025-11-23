"use client"
import { Button } from '@/components/ui/button'
import { UserDetailContext } from '@/context/UserDetailContext'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import axios from 'axios'
import { ArrowRight, ArrowUp, HomeIcon, ImagePlusIcon, Key, LayoutDashboard, Loader2Icon, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid';

const suggestion = [
    {
        label: 'Dashboard',
        prompt: 'Create an analytics dashboard to track customers and revenue data for a SaaS.',
        icon: LayoutDashboard
    },
    {
        label: 'SignUp Form',
        prompt: 'Create a modern sign up form with email, password fields, Google and Github login options, and terms checkbox.',
        icon: Key
    },
    {
        label: 'Hero',
        prompt: 'Create a modern header and centered hero section for a productivity SaaS. Include a badge for feature announcement, a tittle with a subtle gradient effect, subtitle, CTA, small social proof and an image.',
        icon: HomeIcon
    },
    {
        label: 'User Profile Card',
        prompt: 'Create a modern user profile card component for a social media website.',
        icon: UserIcon
    }

]


function Hero() {
    const { user } = useUser();
    const [userInput, setUserInput] = useState<string>();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {has} = useAuth()
    const {userDetail, setUserDetail}=useContext(UserDetailContext);
    const hasUnlimitedAccess = has && has({ plan: 'unlimited' })

    const CreateNewProject = async () => {
        if(!hasUnlimitedAccess && userDetail?.credits!<=0){
            toast.error('You have no credits left. Please upgrade your plan');
            return;
        }
        setLoading(true);
        const projectId = uuidv4();
        const frameId = generateRandomFrameNumer();
        const messages = [
            {
                role: 'user',
                content: userInput
            }
        ]
        try {
            const result = await axios.post('/api/projects', {
                projectId: projectId,
                frameId: frameId,
                messages: messages,
                credits: userDetail?.credits
            });
            console.log(result.data);
            toast.success('Project Created!')
            //Navigate to Playground
            router.push(`/playground/${projectId}?frameId=${frameId}`)
            setUserDetail((prev:any)=>({
                ...prev,
                credits: prev?.credits!-1
            }));
            setLoading(false);
        } catch (e) {
            toast.error('Internal server error!')
            console.log(e)
        }
    }
    return (
        <div className='flex flex-col items-center h-[80vh] justify-center'>
            {/*Header & description*/}
            <h2 className='font-bold text-6xl'>What should we Design?</h2>
            <p className='mt-2 text-xl text-gray-500'>Generate, Edit and Explore design with AI, Export code as well</p>
            {/*input */}
            <div className='w-full max-w-2xl p-5 border  mt-5 rounded-2xl '>
                <textarea placeholder='Describe your page design'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className='w-full h-24 focus:outline-none focus:ring-0 resize-none' />

                <div className='flex justify-between item-center'>
                    <Button variant={'ghost'}><ImagePlusIcon /></Button>
                    {!user ? < SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
                        <Button disabled={!userInput}><ArrowUp /></Button>
                    </SignInButton> :


                        <Button disabled={!userInput || loading} onClick={CreateNewProject}>
                            {loading ? <Loader2Icon className='animate-spin' /> : <ArrowUp />} </Button>

                    }
                </div>

            </div>
            {/* suggestion list */}
            <div className='mt-4 flex gap-3'>
                {suggestion.map((suggestion, index) => (
                    <Button key={index} variant={'outline'}
                        onClick={() => setUserInput(suggestion.prompt)}>
                        <suggestion.icon />
                        {suggestion.label}</Button>
                ))}
            </div>
        </div >
    )
}


export default Hero

const generateRandomFrameNumer = () => {
    const num = Math.floor(Math.random() * 10000);
    return num
}