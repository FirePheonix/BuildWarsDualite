import React from 'react';
import { Figma } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Figma className="text-purple-600" size={24} />
        <h1 className="text-lg font-semibold text-gray-800">Figma Clone</h1>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <span>Draw basic shapes • Save as image</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;
