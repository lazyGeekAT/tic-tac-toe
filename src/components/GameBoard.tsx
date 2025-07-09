import React from 'react';
import GameCell from './GameCell';
import { GameBoard as GameBoardType, WinPattern } from '../types/game';

interface GameBoardProps {
  board: GameBoardType;
  onCellClick: (index: number) => void;
  disabled: boolean;
  winPattern: WinPattern | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, disabled, winPattern }) => {
  const isWinningCell = (index: number): boolean => {
    return winPattern ? winPattern.indices.includes(index) : false;
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {board.map((cell, index) => (
          <GameCell
            key={index}
            value={cell}
            index={index}
            isWinning={isWinningCell(index)}
            onClick={onCellClick}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;