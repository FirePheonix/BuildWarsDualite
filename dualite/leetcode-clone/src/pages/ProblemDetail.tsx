import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { problems } from '../data/problems';
import DifficultyBadge from '../components/DifficultyBadge';
import CodeEditor from '../components/CodeEditor';
import TestCases from '../components/TestCases';

const ProblemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const problem = problems.find(p => p.id === parseInt(id || ''));
  const [showSolution, setShowSolution] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string; expected: string }[]>([]);

  if (!problem) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Problem not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ← Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  const handleRunCode = (code: string) => {
    // Simulate test case execution
    const results = problem.testCases.map((testCase, index) => {
      // Simple simulation - in a real app, you'd execute the code
      const passed = Math.random() > 0.3; // Random pass/fail for demo
      return {
        passed,
        output: passed ? testCase.expectedOutput : 'Wrong answer',
        expected: testCase.expectedOutput
      };
    });
    setTestResults(results);
  };

  const defaultCode = `function ${problem.title.toLowerCase().replace(/\s+/g, '')}() {
    // Write your solution here
    
}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Problems
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {problem.id}. {problem.title}
            </h1>
            <div className="flex items-center space-x-4 mt-2">
              <DifficultyBadge difficulty={problem.difficulty} />
              <span className="text-sm text-gray-600">{problem.acceptance.toFixed(1)}% acceptance</span>
            </div>
          </div>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {showSolution ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showSolution ? 'Hide' : 'Show'} Solution</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Problem Description */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
              {problem.description}
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Examples</h3>
            <div className="space-y-4">
              {problem.examples.map((example, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-600">Input:</span>
                    <div className="mt-1 p-2 bg-gray-50 rounded text-sm font-mono text-gray-800">
                      {example.input}
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-600">Output:</span>
                    <div className="mt-1 p-2 bg-gray-50 rounded text-sm font-mono text-gray-800">
                      {example.output}
                    </div>
                  </div>
                  {example.explanation && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Explanation:</span>
                      <p className="mt-1 text-sm text-gray-700">{example.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Constraints */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Constraints</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span className="font-mono">{constraint}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Code Editor and Test Cases */}
        <div className="space-y-6">
          <CodeEditor
            initialCode={showSolution ? problem.solution : defaultCode}
            onRunCode={handleRunCode}
          />
          
          <TestCases
            testCases={problem.testCases}
            results={testResults.length > 0 ? testResults : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
