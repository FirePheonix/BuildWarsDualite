import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { GameBoard } from './components/GameBoard';
import { GameInfo } from './components/GameInfo';
import { Controls } from './components/Controls';

function App() {
  const { gameState, resetGame, pauseGame } = useGameLogic();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 text-center mb-8 font-mono">
          PAC-MAN
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          <div className="flex flex-col items-center">
            <GameInfo 
              gameState={gameState} 
              onReset={resetGame} 
              onPause={pauseGame} 
            />
            <GameBoard gameState={gameState} />
          </div>
          
          <div className="lg:w-80">
            <Controls />
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>Classic PacMan Game - Built with React & TypeScript</p>
          <p className="mt-2">Use arrow keys or WASD to move • Collect all dots to win!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
