export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Example[];
  constraints: string[];
  tags: string[];
  acceptance: number;
  solution: string;
  testCases: TestCase[];
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}
