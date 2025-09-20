export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  description?: string;
  image?: string;
  collaborators: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryItem {
  id: string;
  tripId: string;
  day: number;
  time: string;
  title: string;
  description?: string;
  location?: string;
  cost: number;
  category: 'accommodation' | 'transport' | 'food' | 'activity' | 'shopping' | 'other';
  completed?: boolean;
}

export interface BudgetCategory {
  category: string;
  budgeted: number;
  spent: number;
}
