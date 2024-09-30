"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi'

export default function PrivateMessaging() {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(()=>{
    console.log(isConnected)
    !isConnected && router.push('/')
  },[]);

  return (
    <>
      Private Message Page
    </>
  )
}