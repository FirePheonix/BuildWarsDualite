import React from 'react';
import { TestCase } from '../types';

interface TestCasesProps {
  testCases: TestCase[];
  results?: { passed: boolean; output: string; expected: string }[];
}

const TestCases: React.FC<TestCasesProps> = ({ testCases, results }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">Test Cases</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {testCases.map((testCase, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Test Case {index + 1}</span>
              {results && results[index] && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    results[index].passed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {results[index].passed ? 'Passed' : 'Failed'}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-600">Input:</span>
                <div className="mt-1 p-2 bg-gray-50 rounded text-sm font-mono text-gray-800">
                  {testCase.input}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Expected Output:</span>
                <div className="mt-1 p-2 bg-gray-50 rounded text-sm font-mono text-gray-800">
                  {testCase.expectedOutput}
                </div>
              </div>
              {results && results[index] && !results[index].passed && (
                <div>
                  <span className="text-sm font-medium text-red-600">Your Output:</span>
                  <div className="mt-1 p-2 bg-red-50 rounded text-sm font-mono text-red-800">
                    {results[index].output}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCases;
