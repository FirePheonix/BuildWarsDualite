export interface Profile {
  id: string;
  name: string;
  age: number;
  photo: string;
  profession: string;
  education: string;
  location: string;
  religion: string;
  caste: string;
  motherTongue: string;
  height: string;
  weight: string;
  income: string;
  familyType: string;
  about: string;
  interests: string[];
  verified: boolean;
  premium: boolean;
  lastSeen: string;
  gender: 'male' | 'female';
}

export interface SearchFilters {
  ageRange: [number, number];
  religion: string;
  caste: string;
  education: string;
  profession: string;
  income: string;
  location: string;
  height: string;
  maritalStatus: string;
}
