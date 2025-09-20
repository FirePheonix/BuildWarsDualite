import { faker } from '@faker-js/faker';
import { Profile } from '../types';

const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain'];
const castes = ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra', 'Others'];
const educations = ['B.Tech', 'M.Tech', 'MBA', 'MBBS', 'B.Com', 'M.Com', 'BA', 'MA', 'PhD'];
const professions = ['Software Engineer', 'Doctor', 'Teacher', 'Business Owner', 'Lawyer', 'Architect', 'Consultant'];
const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];
const motherTongues = ['Hindi', 'English', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Bengali', 'Punjabi'];
const interests = ['Reading', 'Traveling', 'Cooking', 'Music', 'Dancing', 'Sports', 'Movies', 'Photography'];

export const generateMockProfiles = (count: number = 50): Profile[] => {
  return Array.from({ length: count }, (_, index) => {
    const gender = index % 2 === 0 ? 'male' : 'female';
    const age = faker.number.int({ min: 22, max: 35 });
    
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName({ sex: gender }),
      age,
      photo: `https://images.unsplash.com/photo-${gender === 'male' ? '1507003211169-0a1dd7228f2d' : '1494790108755-2616c13c4d34'}?w=400&h=400&fit=crop&crop=face`,
      profession: faker.helpers.arrayElement(professions),
      education: faker.helpers.arrayElement(educations),
      location: faker.helpers.arrayElement(locations),
      religion: faker.helpers.arrayElement(religions),
      caste: faker.helpers.arrayElement(castes),
      motherTongue: faker.helpers.arrayElement(motherTongues),
      height: `${faker.number.int({ min: 5, max: 6 })}'${faker.number.int({ min: 0, max: 11 })}"`,
      weight: `${faker.number.int({ min: 50, max: 80 })} kg`,
      income: `₹${faker.number.int({ min: 3, max: 25 })} LPA`,
      familyType: faker.helpers.arrayElement(['Nuclear', 'Joint']),
      about: faker.lorem.paragraph(3),
      interests: faker.helpers.arrayElements(interests, { min: 3, max: 6 }),
      verified: faker.datatype.boolean(0.8),
      premium: faker.datatype.boolean(0.3),
      lastSeen: faker.date.recent({ days: 30 }).toISOString(),
      gender
    };
  });
};

export const mockProfiles = generateMockProfiles(50);
