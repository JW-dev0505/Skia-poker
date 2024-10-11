import { useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi'
import { useRouter } from 'next/navigation';
import { gameRooms, currentUser } from './data';

export default function Lobby() {
  const { address, isConnected, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter()

  useEffect(()=>{
    console.log("isConnected : ", isConnected);
    !isConnected && router.push('/')
  },[]);

  return (
    <div className="container mx-auto p-4">
      {/* Header with current user info */}
      <header className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={`https://www.gravatar.com/avatar/${currentUser.id}?d=identicon`}
            alt={currentUser.username}
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={()=>{router.push('/')}}
          />
          <div>
            <h1 className="text-xl font-semibold">Welcome, {currentUser.username}</h1>
            <p className="text-sm text-gray-300">Balance: ${currentUser.balance}</p>
          </div>
        </div>
        <input
    type="search"
    className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
    placeholder="Search Room or User name"
  />

  {/* Action Buttons */}
  <div className="flex items-center space-x-6">
    <button
      className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
    >
      Create Room
    </button>

    <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center space-x-2"
      onClick={() => {
        disconnect(); // Ensure disconnect is an async function if needed.
        router.push('/');
      }}
    >
      <span>Logout</span>
      {/* Optional Logout Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h10a1 1 0 011 1v3a1 1 0 11-2 0V5H5v10h8v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm10.707 5.293a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L12 11.414V16a1 1 0 102 0v-4.586l1.293 1.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
      </header>

      {/* Game Rooms */}
      <section className="mt-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Game Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold mb-2 text-indigo-600">{room.name}</h3>
              <p className="text-gray-600 mb-2">Players: {room.currentPlayers}/{room.maxPlayers}</p>
              <p className="text-gray-600 mb-4">Initial Budget: ${room.initialBudget}</p>
              <button 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={()=>{
                  room.currentPlayers += 1;
                  router.push(`/GameTable/${room.id}`)
                }}
              >
                Join Room
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Players in the Lobby */}
      <section className="mt-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Players in Lobby</h2>
        <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-600 italic">
          Coming soon...
        </div>
      </section>
    </div>
  );
}
