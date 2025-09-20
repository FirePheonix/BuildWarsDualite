import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  onRunCode: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, onRunCode }) => {
  const [code, setCode] = useState(initialCode);

  const handleReset = () => {
    setCode(initialCode);
  };

  const handleRun = () => {
    onRunCode(code);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-300">TypeScript</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleRun}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <Play className="h-4 w-4" />
            <span>Run</span>
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-96 p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
        placeholder="Write your code here..."
        style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
      />
    </div>
  );
};

export default CodeEditor;
