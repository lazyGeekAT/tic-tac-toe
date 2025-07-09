export type Player = 'X' | 'O';
export type Cell = Player | null;
export type GameBoard = Cell[];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: GameBoard;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
}

export interface Score {
  X: number;
  O: number;
  draws: number;
}

export interface WinPattern {
  indices: number[];
  type: 'row' | 'column' | 'diagonal';
}