"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi'

// import { PokerTable, Game } from '@/components';

export default function GameTable() {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(()=>{
    !isConnected && router.push('/')
  },[]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      Game Table
    </div>
  )
}