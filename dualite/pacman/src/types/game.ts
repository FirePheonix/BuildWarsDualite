export interface Position {
  x: number;
  y: number;
}

export interface Ghost {
  id: string;
  position: Position;
  color: string;
  direction: Direction;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export type CellType = 'wall' | 'dot' | 'empty' | 'powerPellet';

export interface GameState {
  pacmanPosition: Position;
  ghosts: Ghost[];
  score: number;
  lives: number;
  gameStatus: 'playing' | 'paused' | 'gameOver' | 'won';
  maze: CellType[][];
  direction: Direction;
  nextDirection: Direction | null;
}
