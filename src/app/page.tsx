"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { useAccount } from 'wagmi'

export default function App() {
  const { address, isConnected } = useAccount()
  const router = useRouter();
  useEffect(()=>{
    console.log("wallet connected : ", isConnected);
  },[address])

  const startGame = () => {
    isConnected ? router.push('/GameLobby')
    : console.log('asdf');
  }

  const chatWithOthers = () => {
    isConnected ? router.push('/PrivateMessage')
    : console.log('goodbye');
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl sm:text-4xl font-bold">
          {'Welcome to Skia Poker and Texas Hold\'em'}
        </h1>
        <p className="text-base sm:text-xl mb-8">
          {'Experience Texas Hold\'em on the blockchain!'}
        </p>
        {!isConnected 
          ? <w3m-connect-button />
          : <w3m-button/>
        }

        <button 
          className="text-xl hover:text-green-400"
          onClick={startGame}
        >
          Start Game
        </button>
        
        <button 
          className="text-xl hover:text-green-400"
          onClick={chatWithOthers}
        >
          Chat with others
        </button>
      </div>
    </div>
  );
}
