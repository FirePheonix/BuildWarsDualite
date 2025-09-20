import React from 'react';
import { 
  MousePointer, 
  Square, 
  Circle, 
  Minus, 
  Type, 
  Move,
  Download,
  Trash2
} from 'lucide-react';
import { Tool } from '../types';

interface ToolbarProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  onDownload: () => void;
  onClear: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  currentTool, 
  onToolChange, 
  onDownload, 
  onClear 
}) => {
  const tools = [
    { id: 'select' as Tool, icon: MousePointer, label: 'Select' },
    { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle' },
    { id: 'circle' as Tool, icon: Circle, label: 'Circle' },
    { id: 'line' as Tool, icon: Minus, label: 'Line' },
    { id: 'text' as Tool, icon: Type, label: 'Text' },
    { id: 'pan' as Tool, icon: Move, label: 'Pan' },
  ];

  return (
    <div className="bg-white border-r border-gray-200 w-16 flex flex-col items-center py-4 space-y-2">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={`
              p-3 rounded-lg transition-all duration-200 group relative
              ${currentTool === tool.id 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
            title={tool.label}
          >
            <Icon size={20} />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {tool.label}
            </div>
          </button>
        );
      })}
      
      <div className="border-t border-gray-200 w-8 my-4"></div>
      
      <button
        onClick={onDownload}
        className="p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group relative"
        title="Download as PNG"
      >
        <Download size={20} />
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Download
        </div>
      </button>
      
      <button
        onClick={onClear}
        className="p-3 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all duration-200 group relative"
        title="Clear Canvas"
      >
        <Trash2 size={20} />
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Clear
        </div>
      </button>
    </div>
  );
};

export default Toolbar;
