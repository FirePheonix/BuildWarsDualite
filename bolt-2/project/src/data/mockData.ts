import { Transaction, Budget, SavingsGoal } from '../types';

export const mockTransactions: Transaction[] = [
  // Income
  { id: '1', type: 'income', amount: 5000, category: 'Salary', description: 'Monthly salary', date: '2024-01-01' },
  { id: '2', type: 'income', amount: 1200, category: 'Freelance', description: 'Web design project', date: '2024-01-05' },
  { id: '3', type: 'income', amount: 500, category: 'Investment', description: 'Dividend payment', date: '2024-01-10' },
  { id: '4', type: 'income', amount: 300, category: 'Side Business', description: 'Online course sales', date: '2024-01-15' },
  
  // Expenses
  { id: '5', type: 'expense', amount: 1200, category: 'Housing', description: 'Monthly rent', date: '2024-01-01' },
  { id: '6', type: 'expense', amount: 350, category: 'Food', description: 'Groceries', date: '2024-01-02' },
  { id: '7', type: 'expense', amount: 120, category: 'Transportation', description: 'Gas and parking', date: '2024-01-03' },
  { id: '8', type: 'expense', amount: 80, category: 'Utilities', description: 'Electricity bill', date: '2024-01-05' },
  { id: '9', type: 'expense', amount: 200, category: 'Food', description: 'Restaurants', date: '2024-01-07' },
  { id: '10', type: 'expense', amount: 150, category: 'Shopping', description: 'Clothing', date: '2024-01-08' },
  { id: '11', type: 'expense', amount: 60, category: 'Entertainment', description: 'Movie tickets', date: '2024-01-10' },
  { id: '12', type: 'expense', amount: 45, category: 'Utilities', description: 'Internet bill', date: '2024-01-12' },
  { id: '13', type: 'expense', amount: 100, category: 'Healthcare', description: 'Doctor visit', date: '2024-01-14' },
  { id: '14', type: 'expense', amount: 75, category: 'Transportation', description: 'Car maintenance', date: '2024-01-16' },
];

export const mockBudgets: Budget[] = [
  { id: '1', category: 'Food', limit: 800, spent: 550, color: '#10B981' },
  { id: '2', category: 'Transportation', limit: 300, spent: 195, color: '#3B82F6' },
  { id: '3', category: 'Entertainment', limit: 200, spent: 60, color: '#8B5CF6' },
  { id: '4', category: 'Shopping', limit: 400, spent: 150, color: '#F59E0B' },
  { id: '5', category: 'Healthcare', limit: 250, spent: 100, color: '#EF4444' },
  { id: '6', category: 'Utilities', limit: 200, spent: 125, color: '#06B6D4' },
];

export const mockSavingsGoals: SavingsGoal[] = [
  { id: '1', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 6500, deadline: '2024-12-31', color: '#10B981' },
  { id: '2', name: 'Vacation Fund', targetAmount: 3000, currentAmount: 1800, deadline: '2024-08-15', color: '#3B82F6' },
  { id: '3', name: 'New Laptop', targetAmount: 2000, currentAmount: 1200, deadline: '2024-06-30', color: '#8B5CF6' },
  { id: '4', name: 'Car Down Payment', targetAmount: 5000, currentAmount: 2800, deadline: '2024-10-01', color: '#F59E0B' },
];