import React from 'react';

interface PropertyPanelProps {
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  onFillColorChange: (color: string) => void;
  onStrokeColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  fillColor,
  strokeColor,
  strokeWidth,
  onFillColorChange,
  onStrokeColorChange,
  onStrokeWidthChange,
}) => {
  return (
    <div className="bg-white border-l border-gray-200 w-64 p-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Properties</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Fill Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={fillColor}
                onChange={(e) => onFillColorChange(e.target.value)}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={fillColor}
                onChange={(e) => onFillColorChange(e.target.value)}
                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Stroke Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => onStrokeColorChange(e.target.value)}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={strokeColor}
                onChange={(e) => onStrokeColorChange(e.target.value)}
                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Stroke Width
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="20"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs text-gray-600 w-8">{strokeWidth}px</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            '#000000', '#ffffff', '#ff0000', '#00ff00',
            '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
            '#800000', '#008000', '#000080', '#808080'
          ].map((color) => (
            <button
              key={color}
              onClick={() => onFillColorChange(color)}
              className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;
