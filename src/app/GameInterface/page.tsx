"use client"
import Link from 'next/link';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi'

export default function GameInterface() {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(()=>{
    !isConnected && router.push('/')
  },[]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-8">Choose Game Mode</h2>
      <div className="space-y-4">
      
        <Link href="/GameTable">
          <button className="w-48 bg-green-500 hover:bg-green-600">
            Play vs Player
          </button>
        </Link>
        <Link href="/GameTable">
          <button className="w-48 bg-blue-500 hover:bg-blue-600">
            Play vs AI
          </button>
        </Link>
      </div>
    </div>
  )
}