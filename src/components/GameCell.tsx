import React from 'react';
import { Cell, Player } from '../types/game';

interface GameCellProps {
  value: Cell;
  index: number;
  isWinning: boolean;
  onClick: (index: number) => void;
  disabled: boolean;
}

const GameCell: React.FC<GameCellProps> = ({ value, index, isWinning, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !value) {
      onClick(index);
    }
  };

  const getCellContent = () => {
    if (!value) return '';
    return value;
  };

  const getPlayerColor = (player: Player) => {
    return player === 'X' ? 'text-blue-500' : 'text-orange-500';
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || !!value}
      className={`
        relative aspect-square bg-white rounded-xl shadow-md border-2 
        transition-all duration-200 ease-in-out
        ${!value && !disabled ? 'hover:shadow-lg hover:scale-105 hover:bg-gray-50' : ''}
        ${isWinning ? 'ring-4 ring-green-400 shadow-green-200' : 'border-gray-200'}
        ${disabled ? 'cursor-not-allowed' : !value ? 'cursor-pointer' : 'cursor-default'}
        flex items-center justify-center
        text-4xl font-bold
        ${value ? getPlayerColor(value) : ''}
      `}
    >
      <span className={`transition-all duration-300 ${value ? 'scale-100' : 'scale-0'}`}>
        {getCellContent()}
      </span>
      {!value && !disabled && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-30 transition-opacity duration-200">
          <span className="text-gray-400 text-3xl font-bold">+</span>
        </div>
      )}
    </button>
  );
};

export default GameCell;