import React, { useCallback, useState } from 'react';
import { Shape, Point, Tool } from '../types';
import { useCanvas } from '../hooks/useCanvas';
import { getMousePosition, isPointInShape } from '../utils/canvas';

interface CanvasProps {
  shapes: Shape[];
  currentTool: Tool;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  onShapeAdd: (shape: Shape) => void;
  onShapeSelect: (shapeId: string | null) => void;
  onDownload: () => void;
}

const Canvas: React.FC<CanvasProps> = ({
  shapes,
  currentTool,
  fillColor,
  strokeColor,
  strokeWidth,
  onShapeAdd,
  onShapeSelect,
}) => {
  const { canvasRef, downloadCanvas } = useCanvas(shapes);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const point = getMousePosition(canvas, event.nativeEvent);

    if (currentTool === 'select') {
      // Find the topmost shape at this point
      const selectedShape = shapes
        .slice()
        .reverse()
        .find(shape => isPointInShape(point, shape));
      
      onShapeSelect(selectedShape ? selectedShape.id : null);
      return;
    }

    if (currentTool === 'text') {
      const textContent = prompt('Enter text:');
      if (textContent) {
        const newShape: Shape = {
          id: generateId(),
          type: 'text',
          startPoint: point,
          endPoint: { x: point.x + 100, y: point.y + 20 },
          fillColor,
          strokeColor,
          strokeWidth,
          text: textContent,
        };
        onShapeAdd(newShape);
      }
      return;
    }

    if (['rectangle', 'circle', 'line'].includes(currentTool)) {
      setIsDrawing(true);
      setStartPoint(point);
      
      const newShape: Shape = {
        id: generateId(),
        type: currentTool as 'rectangle' | 'circle' | 'line',
        startPoint: point,
        endPoint: point,
        fillColor,
        strokeColor,
        strokeWidth,
      };
      
      setCurrentShape(newShape);
    }
  }, [currentTool, shapes, fillColor, strokeColor, strokeWidth, onShapeAdd, onShapeSelect]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !currentShape) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const point = getMousePosition(canvas, event.nativeEvent);
    
    setCurrentShape({
      ...currentShape,
      endPoint: point,
    });
  }, [isDrawing, startPoint, currentShape]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing && currentShape) {
      onShapeAdd(currentShape);
      setIsDrawing(false);
      setStartPoint(null);
      setCurrentShape(null);
    }
  }, [isDrawing, currentShape, onShapeAdd]);

  // Add current shape to shapes for rendering
  const allShapes = currentShape ? [...shapes, currentShape] : shapes;

  return (
    <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border border-gray-200 cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default Canvas;
