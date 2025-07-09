import { GameBoard, Player, WinPattern } from '../types/game';

export const WINNING_PATTERNS: WinPattern[] = [
  // Rows
  { indices: [0, 1, 2], type: 'row' },
  { indices: [3, 4, 5], type: 'row' },
  { indices: [6, 7, 8], type: 'row' },
  // Columns
  { indices: [0, 3, 6], type: 'column' },
  { indices: [1, 4, 7], type: 'column' },
  { indices: [2, 5, 8], type: 'column' },
  // Diagonals
  { indices: [0, 4, 8], type: 'diagonal' },
  { indices: [2, 4, 6], type: 'diagonal' },
];

export const checkWinner = (board: GameBoard): { winner: Player | null; pattern: WinPattern | null } => {
  for (const pattern of WINNING_PATTERNS) {
    const [a, b, c] = pattern.indices;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, pattern };
    }
  }
  return { winner: null, pattern: null };
};

export const isDraw = (board: GameBoard): boolean => {
  return board.every(cell => cell !== null) && !checkWinner(board).winner;
};

export const createEmptyBoard = (): GameBoard => {
  return Array(9).fill(null);
};

export const isValidMove = (board: GameBoard, index: number): boolean => {
  return board[index] === null;
};