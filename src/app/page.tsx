"use client"
import Link from 'next/link';
import { useEffect } from "react";
import { useAccount } from 'wagmi'
export default function App() {
  const { address, isConnected } = useAccount()
  useEffect(()=>{
    console.log("wallet connected : ", address);
  },[address])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl sm:text-4xl font-bold">
          {'Welcome to Skia Poker and Texas Hold\'em'}
        </h1>
        <p className="text-base sm:text-xl mb-8">
          {'Experience Texas Hold\'em on the blockchain!'}
        </p>
        <w3m-button/>
        <Link href="/GameInterface"> <button className="text-xl hover:text-green-400">Start Game</button> </Link>
        <Link href="/PrivateMessage"> <button className="text-xl hover:text-green-400">Chat with others</button> </Link>
      </div>
    </div>
  );
}
