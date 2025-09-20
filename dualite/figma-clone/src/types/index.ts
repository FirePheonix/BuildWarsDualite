export interface Point {
  x: number;
  y: number;
}

export interface Shape {
  id: string;
  type: 'rectangle' | 'circle' | 'line' | 'text';
  startPoint: Point;
  endPoint: Point;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  text?: string;
}

export type Tool = 'select' | 'rectangle' | 'circle' | 'line' | 'text' | 'pan';

export interface DrawingState {
  shapes: Shape[];
  currentTool: Tool;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  selectedShapeId: string | null;
  isDrawing: boolean;
  currentShape: Shape | null;
}
