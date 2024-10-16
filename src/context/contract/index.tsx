"use client"
// context/ContractContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import RoomManagementAbi from 'contracts/RoomManagement.json';
import UserManagementAbi from 'contracts/UserManagement.json';
import ActionManagementAbi from 'contracts/BettingAndPotManagement.json';
import Toast from 'typescript-toastify'

// Define the structure of your contract context
interface ContractContextType {
  setSigner: (signer: ethers.Signer) => void;
  checkUserRegistered: (signer: ethers.Signer) => Promise<void>;
  createGameRoom: (name: string, maxPlayers: number, initialBudget: number) => Promise<void>;
  fetchGameRooms: () => Promise<any[]>;
  joinGameRoom: (roomId: number) => Promise<void>;
  registerUser: (username: string) => Promise<void>;
  updateBalance: (amount: number) => Promise<void>;
  getUserBalance: () => Promise<number>;
  startGame: (roomId: number) => Promise<void>;
  placeBet: (roomId: number, amount: number) => Promise<void>;
  endGame: (roomId: number) => Promise<void>;
  fetchGameStatus: (roomId: number) => Promise<any>;
  leaveGameRoom: (roomId: number) => Promise<void>;
  // Add more contract methods as needed
}

const ContractContext = createContext<ContractContextType | null>(null);

export const useContractContext = () => useContext(ContractContext);

export function ContractProvider({ children }: { children: React.ReactNode }) {

  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [gameContract, setGameContract] = useState<ethers.Contract | null>(null);
  const [userContract, setUserContract] = useState<ethers.Contract | null>(null);
  const [actionContract, setActionContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    if (!signer) return;
    console.log("signer has value.");
    const roomAddress = process.env.NEXT_PUBLIC_RoomManagementAddress ?? '';
    const userAddress = process.env.NEXT_PUBLIC_UserManagementAddress ?? '';
    const actionAddress = process.env.NEXT_PUBLIC_GameManagementAddress ?? '';
         
    const _gameContract = new ethers.Contract(roomAddress, RoomManagementAbi, signer);
    const _userContract = new ethers.Contract(userAddress, UserManagementAbi, signer);
    const _actionContract = new ethers.Contract(actionAddress, ActionManagementAbi, signer);
    setGameContract(_gameContract);
    setUserContract(_userContract);
    setActionContract(_actionContract);
    new Toast({
      position: "top-right",
      toastMsg: "Wallet connected!",
      autoCloseTime: 2000,
      canClose: true,
      showProgress: true,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      type: "default",
      theme: "dark"
    });
    checkUserRegistered(signer);
  }, [signer]);

  useEffect(()=>{
    console.log("User contract Updated : ", userContract);
    if(userContract && signer) {
      // checkUserRegistered(signer);
      registerUser("admin");
    }
  },[userContract])

  const createGameRoom = async (name: string, maxPlayers: number, initialBudget: number) => {
    if (!signer || !gameContract) return;
    try {
      const tx = await gameContract.createGameRoom(name, maxPlayers, ethers.parseEther(initialBudget.toString()));
      await tx.wait(); // Wait for the transaction to be confirmed
      console.log('Game room created:', tx);
    } catch (error) {
      console.error('Error creating game room:', error);
    }
  };

  const checkUserRegistered = async (signer: ethers.Signer) => {
    if (!signer) return;
    try {
      // const address = await signer.getAddress(); // Get address from signer
      // console.log("Checking user registration for address:", address);
      
      const isRegistered = await userContract?.isUserRegistered(signer);
      console.log("User Registered:", isRegistered);
      
    } catch (error) {
      console.error("Error checking user registration:", error);
    }
  };
  


  const fetchGameRooms = async () => {
    if (!gameContract) return [];
    try {
      const rooms = await gameContract.getGameRooms(); // Assuming your contract has this method
      return rooms;
    } catch (error) {
      console.error('Error fetching game rooms:', error);
      return [];
    }
  };

  const joinGameRoom = async (roomId: number) => {
    if (!signer || !gameContract) return;
    try {
      const tx = await gameContract.joinGameRoom(roomId); // Assuming your contract has this method
      await tx.wait();
      console.log('Joined game room:', tx);
    } catch (error) {
      console.error('Error joining game room:', error);
    }
  };

  const registerUser = async (username: string) => {
    if (!signer || !userContract) return;
    try {
      const tx = await userContract.registerUser(username, { value: ethers.parseEther("0.01") }); // Assuming a small registration fee
      await tx.wait();
      console.log('User registered:', tx);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const updateBalance = async (amount: number) => {
    if (!signer || !userContract) return;
    try {
      const tx = await userContract.updateBalance(signer.getAddress(), ethers.parseEther(amount.toString()));
      await tx.wait();
      console.log('User balance updated:', tx);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const getUserBalance = async () => {
    if (!signer || !userContract) return 0;
    try {
      const balance = await userContract.getUserBalance(signer.getAddress());
      return parseInt(ethers.formatEther(balance)); // Convert from wei to ether
    } catch (error) {
      console.error('Error fetching user balance:', error);
      return 0;
    }
  };

  const startGame = async (roomId: number) => {
    if (!signer || !actionContract) return;
    try {
      const tx = await actionContract.startGame(roomId); // Assuming your contract has this method
      await tx.wait();
      console.log('Game started:', tx);
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const placeBet = async (roomId: number, amount: number) => {
    if (!signer || !actionContract) return;
    try {
      const tx = await actionContract.placeBet(roomId, { value: ethers.parseEther(amount.toString()) });
      await tx.wait();
      console.log('Bet placed:', tx);
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  const endGame = async (roomId: number) => {
    if (!signer || !actionContract) return;
    try {
      const tx = await actionContract.endGame(roomId); // Assuming your contract has this method
      await tx.wait();
      console.log('Game ended:', tx);
    } catch (error) {
      console.error('Error ending game:', error);
    }
  };

  const fetchGameStatus = async (roomId: number) => {
    if (!actionContract) return null;
    try {
      const status = await actionContract.getGameStatus(roomId); // Assuming your contract has this method
      return status;
    } catch (error) {
      console.error('Error fetching game status:', error);
      return null;
    }
  };

  const leaveGameRoom = async (roomId: number) => {
    if (!signer || !gameContract) return;
    try {
      const tx = await gameContract.leaveGameRoom(roomId); // Assuming your contract has this method
      await tx.wait();
      console.log('Left game room:', tx);
    } catch (error) {
      console.error('Error leaving game room:', error);
    }
  };

  // Provide all the contract-related functions and data in context
  return (
    <ContractContext.Provider
      value={{
        setSigner,
        checkUserRegistered,
        createGameRoom,
        fetchGameRooms,
        joinGameRoom,
        registerUser,
        updateBalance,
        getUserBalance,
        startGame,
        placeBet,
        endGame,
        fetchGameStatus,
        leaveGameRoom,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export default ContractProvider;
