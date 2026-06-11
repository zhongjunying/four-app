'use client'
import { NotAccountType } from '@/types/global'
import { useState } from 'react'
import Login from './Login'
import Register from './Register'
export default function NotAccount() {
    const [notAccountType, setNotAccountType] = useState<NotAccountType>(NotAccountType.Login)
    return (
        <>
            {notAccountType === NotAccountType.Login 
            ? <Login setNotAccountType={setNotAccountType} /> 
            : <Register setNotAccountType={setNotAccountType} />}
        </>
    )
}