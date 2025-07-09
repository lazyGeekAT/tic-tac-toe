import React, { useState, useCallback } from 'react';
import GameBoard from './GameBoard';
import GameStatus from './GameStatus';
import ScoreBoard from './ScoreBoard';
import { GameState, Score, Player, WinPattern } from '../types/game';
import { 
  createEmptyBoard, 
  checkWinner, 
  isDraw, 
  isValidMove 
} from '../utils/gameLogic';

const TicTacToe: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 'X',
    status: 'playing',
    winner: null,
  });

  const [score, setScore] = useState<Score>({
    X: 0,
    O: 0,
    draws: 0,
  });

  const [winPattern, setWinPattern] = useState<WinPattern | null>(null);

  const handleCellClick = useCallback((index: number) => {
    if (gameState.status !== 'playing' || !isValidMove(gameState.board, index)) {
      return;
    }

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const { winner, pattern } = checkWinner(newBoard);
    
    if (winner) {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        status: 'won',
        winner,
      });
      setWinPattern(pattern);
      setScore(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
    } else if (isDraw(newBoard)) {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        status: 'draw',
        winner: null,
      });
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
        status: 'playing',
        winner: null,
      });
    }
  }, [gameState]);

  const startNewGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: 'X',
      status: 'playing',
      winner: null,
    });
    setWinPattern(null);
  }, []);

  const resetScore = useCallback(() => {
    setScore({ X: 0, O: 0, draws: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Tic-Tac-Toe
          </h1>
          <p className="text-gray-600">
            Challenge your friend to a classic game of strategy
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GameBoard
              board={gameState.board}
              onCellClick={handleCellClick}
              disabled={gameState.status !== 'playing'}
              winPattern={winPattern}
            />
          </div>

          <div className="space-y-6">
            <GameStatus
              gameState={gameState}
              onNewGame={startNewGame}
            />
            
            <ScoreBoard
              score={score}
              onReset={resetScore}
            />
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Enjoy your game! Best of luck to both players.</p>
        </footer>
      </div>
    </div>
  );
};

export default TicTacToe;