import { useState, useCallback, useEffect } from 'react';
import { GameState, Direction, Position, Ghost } from '../types/game';
import { convertMazeData, PACMAN_START_POSITION, GHOST_START_POSITIONS } from '../data/maze';

const GHOST_COLORS = ['#FF0000', '#FFB8FF', '#00FFFF', '#FFB852'];

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    pacmanPosition: PACMAN_START_POSITION,
    ghosts: GHOST_START_POSITIONS.map((pos, index) => ({
      id: `ghost-${index}`,
      position: pos,
      color: GHOST_COLORS[index],
      direction: 'up' as Direction
    })),
    score: 0,
    lives: 3,
    gameStatus: 'playing',
    maze: convertMazeData(),
    direction: 'right',
    nextDirection: null
  }));

  const isValidMove = useCallback((position: Position, maze: any[][]) => {
    const { x, y } = position;
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) {
      return false;
    }
    return maze[y][x] !== 'wall';
  }, []);

  const movePosition = useCallback((position: Position, direction: Direction): Position => {
    switch (direction) {
      case 'up': return { ...position, y: position.y - 1 };
      case 'down': return { ...position, y: position.y + 1 };
      case 'left': return { ...position, x: position.x - 1 };
      case 'right': return { ...position, x: position.x + 1 };
      default: return position;
    }
  }, []);

  const movePacman = useCallback((direction: Direction) => {
    setGameState(prev => {
      if (prev.gameStatus !== 'playing') return prev;

      const newPosition = movePosition(prev.pacmanPosition, direction);
      
      if (!isValidMove(newPosition, prev.maze)) {
        return { ...prev, nextDirection: direction };
      }

      const newMaze = [...prev.maze];
      let newScore = prev.score;

      // Check if eating dot or power pellet
      if (newMaze[newPosition.y][newPosition.x] === 'dot') {
        newScore += 10;
        newMaze[newPosition.y][newPosition.x] = 'empty';
      } else if (newMaze[newPosition.y][newPosition.x] === 'powerPellet') {
        newScore += 50;
        newMaze[newPosition.y][newPosition.x] = 'empty';
      }

      // Check win condition
      const hasDotsLeft = newMaze.some(row => row.some(cell => cell === 'dot' || cell === 'powerPellet'));
      
      return {
        ...prev,
        pacmanPosition: newPosition,
        maze: newMaze,
        score: newScore,
        direction,
        nextDirection: null,
        gameStatus: hasDotsLeft ? 'playing' : 'won'
      };
    });
  }, [movePosition, isValidMove]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameStatus !== 'playing') return;

    const keyToDirection: { [key: string]: Direction } = {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right',
      'w': 'up',
      's': 'down',
      'a': 'left',
      'd': 'right'
    };

    const direction = keyToDirection[event.key];
    if (direction) {
      event.preventDefault();
      movePacman(direction);
    }
  }, [gameState.gameStatus, movePacman]);

  const moveGhosts = useCallback(() => {
    setGameState(prev => {
      if (prev.gameStatus !== 'playing') return prev;

      const newGhosts = prev.ghosts.map(ghost => {
        const directions: Direction[] = ['up', 'down', 'left', 'right'];
        let newDirection = ghost.direction;
        let newPosition = movePosition(ghost.position, newDirection);

        // If current direction is blocked, pick a random valid direction
        if (!isValidMove(newPosition, prev.maze)) {
          const validDirections = directions.filter(dir => {
            const testPos = movePosition(ghost.position, dir);
            return isValidMove(testPos, prev.maze);
          });
          
          if (validDirections.length > 0) {
            newDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
            newPosition = movePosition(ghost.position, newDirection);
          } else {
            newPosition = ghost.position;
          }
        }

        return {
          ...ghost,
          position: newPosition,
          direction: newDirection
        };
      });

      // Check collision with ghosts
      const collision = newGhosts.some(ghost => 
        ghost.position.x === prev.pacmanPosition.x && 
        ghost.position.y === prev.pacmanPosition.y
      );

      if (collision) {
        const newLives = prev.lives - 1;
        return {
          ...prev,
          ghosts: newGhosts,
          lives: newLives,
          gameStatus: newLives <= 0 ? 'gameOver' : 'playing',
          pacmanPosition: newLives > 0 ? PACMAN_START_POSITION : prev.pacmanPosition
        };
      }

      return {
        ...prev,
        ghosts: newGhosts
      };
    });
  }, [movePosition, isValidMove]);

  const resetGame = useCallback(() => {
    setGameState({
      pacmanPosition: PACMAN_START_POSITION,
      ghosts: GHOST_START_POSITIONS.map((pos, index) => ({
        id: `ghost-${index}`,
        position: pos,
        color: GHOST_COLORS[index],
        direction: 'up' as Direction
      })),
      score: 0,
      lives: 3,
      gameStatus: 'playing',
      maze: convertMazeData(),
      direction: 'right',
      nextDirection: null
    });
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: prev.gameStatus === 'paused' ? 'playing' : 'paused'
    }));
  }, []);

  // Auto-move pacman and ghosts
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;

    const gameLoop = setInterval(() => {
      // Try to use next direction if available
      if (gameState.nextDirection) {
        const nextPos = movePosition(gameState.pacmanPosition, gameState.nextDirection);
        if (isValidMove(nextPos, gameState.maze)) {
          movePacman(gameState.nextDirection);
          return;
        }
      }

      // Continue in current direction
      const nextPos = movePosition(gameState.pacmanPosition, gameState.direction);
      if (isValidMove(nextPos, gameState.maze)) {
        movePacman(gameState.direction);
      }
    }, 200);

    const ghostLoop = setInterval(moveGhosts, 300);

    return () => {
      clearInterval(gameLoop);
      clearInterval(ghostLoop);
    };
  }, [gameState, movePacman, moveGhosts, movePosition, isValidMove]);

  // Keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return {
    gameState,
    resetGame,
    pauseGame
  };
};
