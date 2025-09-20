import { Shape, Point } from '../types';

export const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape): void => {
  ctx.save();
  ctx.fillStyle = shape.fillColor;
  ctx.strokeStyle = shape.strokeColor;
  ctx.lineWidth = shape.strokeWidth;

  const { startPoint, endPoint } = shape;
  const width = endPoint.x - startPoint.x;
  const height = endPoint.y - startPoint.y;

  switch (shape.type) {
    case 'rectangle':
      ctx.fillRect(startPoint.x, startPoint.y, width, height);
      ctx.strokeRect(startPoint.x, startPoint.y, width, height);
      break;

    case 'circle':
      const centerX = startPoint.x + width / 2;
      const centerY = startPoint.y + height / 2;
      const radius = Math.min(Math.abs(width), Math.abs(height)) / 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      break;

    case 'line':
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
      break;

    case 'text':
      ctx.font = '16px Arial';
      ctx.fillText(shape.text || 'Text', startPoint.x, startPoint.y);
      break;
  }

  ctx.restore();
};

export const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  ctx.clearRect(0, 0, width, height);
};

export const redrawCanvas = (ctx: CanvasRenderingContext2D, shapes: Shape[], width: number, height: number): void => {
  clearCanvas(ctx, width, height);
  shapes.forEach(shape => drawShape(ctx, shape));
};

export const getMousePosition = (canvas: HTMLCanvasElement, event: MouseEvent): Point => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

export const isPointInShape = (point: Point, shape: Shape): boolean => {
  const { startPoint, endPoint } = shape;
  const minX = Math.min(startPoint.x, endPoint.x);
  const maxX = Math.max(startPoint.x, endPoint.x);
  const minY = Math.min(startPoint.y, endPoint.y);
  const maxY = Math.max(startPoint.y, endPoint.y);

  return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
};
