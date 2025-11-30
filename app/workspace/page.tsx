'use client'
import React, { useContext, useEffect } from 'react'
import Hero from '../_components/Hero'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { UserDetailContext } from '@/context/UserDetailContext'
import { toast } from 'sonner'
import FloatingLines from '@/components/FloatingLines'

function Workspace() {
  const { user } = useUser()
  const router = useRouter()
  const { userDetail, setUserDetail } = useContext(UserDetailContext)

  useEffect(() => {
    const pendingInput = sessionStorage.getItem('pendingProjectInput')
    if (user && pendingInput && userDetail?.credits !== undefined) {
      sessionStorage.removeItem('pendingProjectInput')
      createProjectAndRedirect(pendingInput)
    }
  }, [user, userDetail])

  const createProjectAndRedirect = async (input: string) => {
    const projectId = uuidv4()
    const frameId = Math.floor(Math.random() * 10000)
    const messages = [{ role: 'user', content: input }]

    try {
      await axios.post('/api/projects', {
        projectId,
        frameId,
        messages,
        credits: userDetail?.credits
      })
      toast.success('Project Created!')
      setUserDetail((prev: any) => ({
        ...prev,
        credits: prev?.credits! - 1
      }))
      router.push(`/playground/${projectId}?frameId=${frameId}`)
    } catch (e) {
      toast.error('Failed to create project')
      console.log(e)
    }
  }

  return (
    <div className="relative h-full">
      <div className="fixed inset-0 z-0 bg-black pointer-events-auto">
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
      <div className="relative z-10 h-full pointer-events-none">
        <div className="h-full pointer-events-auto">
          <Hero/>
        </div>
      </div>
    </div>
  )
}

export default Workspace