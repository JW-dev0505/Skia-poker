// interfaces.ts
export interface GameRoom {
  id: string;
  name: string;
  currentPlayers: number;
  maxPlayers: number;
  initialBudget: number;
}

export interface User {
  id: string;
  username: string;
  balance: number;
}
