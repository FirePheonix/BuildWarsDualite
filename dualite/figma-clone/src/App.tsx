import React, { useState } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertyPanel from './components/PropertyPanel';
import { Shape, Tool } from './types';

function App() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentTool, setCurrentTool] = useState<Tool>('select');
  const [fillColor, setFillColor] = useState('#3b82f6');
  const [strokeColor, setStrokeColor] = useState('#1e40af');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);

  const handleShapeAdd = (shape: Shape) => {
    setShapes(prev => [...prev, shape]);
  };

  const handleShapeSelect = (shapeId: string | null) => {
    setSelectedShapeId(shapeId);
  };

  const handleDownload = () => {
    // This will be handled by the Canvas component
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'figma-clone-drawing.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      setShapes([]);
      setSelectedShapeId(null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      
      <div className="flex-1 flex">
        <Toolbar
          currentTool={currentTool}
          onToolChange={setCurrentTool}
          onDownload={handleDownload}
          onClear={handleClear}
        />
        
        <Canvas
          shapes={shapes}
          currentTool={currentTool}
          fillColor={fillColor}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          onShapeAdd={handleShapeAdd}
          onShapeSelect={handleShapeSelect}
          onDownload={handleDownload}
        />
        
        <PropertyPanel
          fillColor={fillColor}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          onFillColorChange={setFillColor}
          onStrokeColorChange={setStrokeColor}
          onStrokeWidthChange={setStrokeWidth}
        />
      </div>
    </div>
  );
}

export default App;
