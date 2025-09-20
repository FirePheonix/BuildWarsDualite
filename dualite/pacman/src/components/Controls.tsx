import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export const Controls: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg border-2 border-gray-600 mt-4">
      <h3 className="text-lg font-bold mb-3 text-center">CONTROLS</h3>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="font-semibold mb-2">Keyboard:</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ArrowUp size={16} />
              <span>Move Up</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowDown size={16} />
              <span>Move Down</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowLeft size={16} />
              <span>Move Left</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight size={16} />
              <span>Move Right</span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="font-semibold mb-2">Alternative:</div>
          <div className="space-y-1">
            <div>W - Move Up</div>
            <div>S - Move Down</div>
            <div>A - Move Left</div>
            <div>D - Move Right</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-600 text-xs text-gray-300">
        <div><strong>Objective:</strong> Collect all dots while avoiding ghosts!</div>
        <div><strong>Scoring:</strong> Small dots = 10 points, Power pellets = 50 points</div>
      </div>
    </div>
  );
};
