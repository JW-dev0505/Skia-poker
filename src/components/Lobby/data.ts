import { GameRoom, User } from './interface';

export const gameRooms: GameRoom[] = [
  { id: "1", name: "Poker", currentPlayers: 3, maxPlayers: 6, initialBudget: 1000 },
  { id: "2", name: "Blackjack", currentPlayers: 2, maxPlayers: 4, initialBudget: 500 },
  // Add more rooms as needed
];

export const currentUser: User = {
  id: "123",
  username: "James",
  balance: 2000,
};
