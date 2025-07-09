import React from 'react';
import { GameState, Player } from '../types/game';
import { RotateCcw, Crown, Users } from 'lucide-react';

interface GameStatusProps {
  gameState: GameState;
  onNewGame: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameState, onNewGame }) => {
  const getStatusMessage = () => {
    switch (gameState.status) {
      case 'won':
        return `Player ${gameState.winner} wins!`;
      case 'draw':
        return "It's a draw!";
      case 'playing':
        return `Player ${gameState.currentPlayer}'s turn`;
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    switch (gameState.status) {
      case 'won':
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 'draw':
        return <Users className="w-6 h-6 text-gray-500" />;
      case 'playing':
        return null;
      default:
        return null;
    }
  };

  const getPlayerColor = (player: Player) => {
    return player === 'X' ? 'text-blue-600' : 'text-orange-600';
  };

  const getStatusColor = () => {
    switch (gameState.status) {
      case 'won':
        return gameState.winner === 'X' ? 'text-blue-600' : 'text-orange-600';
      case 'draw':
        return 'text-gray-600';
      case 'playing':
        return getPlayerColor(gameState.currentPlayer);
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <h2 className={`text-xl font-bold ${getStatusColor()}`}>
            {getStatusMessage()}
          </h2>
        </div>
        
        {gameState.status !== 'playing' && (
          <button
            onClick={onNewGame}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            New Game
          </button>
        )}
      </div>
      
      {gameState.status === 'playing' && (
        <div className="mt-4 text-sm text-gray-600">
          Click on an empty cell to make your move
        </div>
      )}
    </div>
  );
};

export default GameStatus;