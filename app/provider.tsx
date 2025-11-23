"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { OnSaveContext } from '@/context/OnSaveContext';
function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = useUser();
    const [userDetail,setUserDetail]=useState<any>();
    const [onSaveData, setOnSaveData] = useState<any>();
    useEffect(() => {
        user && CreateNewUser()
    }, [user])
    const CreateNewUser = async () => {
        const result = await axios.post('/api/users', {
        })
        console.log(result.data);
        setUserDetail(result.data?.user)
    }

    return (
        <div>
            <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
            <OnSaveContext.Provider value={{onSaveData, setOnSaveData}}>
                {children}
                </OnSaveContext.Provider>
            </UserDetailContext.Provider>

        </div>
    )
}

export default Provider