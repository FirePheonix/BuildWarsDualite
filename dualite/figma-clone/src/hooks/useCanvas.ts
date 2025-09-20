import { useRef, useEffect } from 'react';
import { Shape } from '../types';
import { redrawCanvas } from '../utils/canvas';

export const useCanvas = (shapes: Shape[]) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    contextRef.current = context;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Redraw all shapes
    redrawCanvas(context, shapes, canvas.width, canvas.height);
  }, [shapes]);

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'figma-clone-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return {
    canvasRef,
    contextRef,
    downloadCanvas,
  };
};
