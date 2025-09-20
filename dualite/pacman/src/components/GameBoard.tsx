import React from 'react';
import { GameState } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState }) => {
  const { maze, pacmanPosition, ghosts } = gameState;

  const renderCell = (cellType: string, x: number, y: number) => {
    const isPacman = pacmanPosition.x === x && pacmanPosition.y === y;
    const ghost = ghosts.find(g => g.position.x === x && g.position.y === y);

    let baseClasses = 'w-6 h-6 flex items-center justify-center text-xs font-bold';
    let content = '';
    let bgColor = '';

    switch (cellType) {
      case 'wall':
        baseClasses += ' bg-blue-600 border border-blue-700';
        break;
      case 'dot':
        baseClasses += ' bg-black';
        content = '•';
        break;
      case 'powerPellet':
        baseClasses += ' bg-black';
        content = '●';
        break;
      case 'empty':
        baseClasses += ' bg-black';
        break;
    }

    if (isPacman) {
      content = '🟡';
      bgColor = 'bg-black';
    } else if (ghost) {
      content = '👻';
      bgColor = 'bg-black';
    }

    return (
      <div
        key={`${x}-${y}`}
        className={`${baseClasses} ${bgColor}`}
        style={{ color: ghost ? ghost.color : '#FFFF00' }}
      >
        {content}
      </div>
    );
  };

  return (
    <div className="inline-block p-4 bg-black border-4 border-blue-600 rounded-lg">
      <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${maze[0]?.length || 0}, 1fr)` }}>
        {maze.map((row, y) =>
          row.map((cell, x) => renderCell(cell, x, y))
        )}
      </div>
    </div>
  );
};
