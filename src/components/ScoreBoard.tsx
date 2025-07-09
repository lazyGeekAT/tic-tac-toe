import React from 'react';
import { Score } from '../types/game';
import { Trophy, Users, Minus } from 'lucide-react';

interface ScoreBoardProps {
  score: Score;
  onReset: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, onReset }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Score Board
        </h3>
        <button
          onClick={onReset}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          Reset
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-blue-600 font-bold text-lg">X</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{score.X}</div>
          <div className="text-sm text-gray-600">Player X</div>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Minus className="w-6 h-6 text-gray-600" />
          </div>
          <div className="text-2xl font-bold text-gray-600">{score.draws}</div>
          <div className="text-sm text-gray-600">Draws</div>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-orange-600 font-bold text-lg">O</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">{score.O}</div>
          <div className="text-sm text-gray-600">Player O</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;