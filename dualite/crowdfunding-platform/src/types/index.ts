export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  backers: number;
  daysLeft: number;
  category: string;
  image: string;
  creator: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  featured?: boolean;
}

export interface Pledge {
  id: string;
  campaignId: string;
  amount: number;
  reward?: string;
  backerName: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  campaigns: Campaign[];
  pledges: Pledge[];
}
