import React from 'react';
import { GameState } from '../types/game';

interface GameInfoProps {
  gameState: GameState;
  onReset: () => void;
  onPause: () => void;
}

export const GameInfo: React.FC<GameInfoProps> = ({ gameState, onReset, onPause }) => {
  const { score, lives, gameStatus } = gameState;

  return (
    <div className="bg-black text-yellow-400 p-4 rounded-lg border-2 border-yellow-400 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">SCORE: {score.toLocaleString()}</div>
        <div className="text-xl">LIVES: {'❤️'.repeat(lives)}</div>
      </div>
      
      <div className="flex gap-4 justify-center">
        <button
          onClick={onPause}
          className="px-4 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition-colors"
          disabled={gameStatus === 'gameOver' || gameStatus === 'won'}
        >
          {gameStatus === 'paused' ? 'RESUME' : 'PAUSE'}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-400 transition-colors"
        >
          RESET
        </button>
      </div>

      {gameStatus === 'gameOver' && (
        <div className="text-center mt-4">
          <div className="text-3xl font-bold text-red-500 mb-2">GAME OVER!</div>
          <div className="text-lg">Press RESET to play again</div>
        </div>
      )}

      {gameStatus === 'won' && (
        <div className="text-center mt-4">
          <div className="text-3xl font-bold text-green-500 mb-2">YOU WIN!</div>
          <div className="text-lg">Congratulations! You cleared the maze!</div>
        </div>
      )}

      {gameStatus === 'paused' && (
        <div className="text-center mt-4">
          <div className="text-2xl font-bold text-blue-400">PAUSED</div>
        </div>
      )}
    </div>
  );
};
