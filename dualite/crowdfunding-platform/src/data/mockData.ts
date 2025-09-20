import { faker } from '@faker-js/faker';
import { Campaign } from '../types';

export const generateMockCampaigns = (): Campaign[] => {
  const categories = ['Technology', 'Arts', 'Games', 'Design', 'Film', 'Music', 'Publishing', 'Food'];
  
  return Array.from({ length: 12 }, (_, i) => {
    const goal = faker.number.int({ min: 5000, max: 100000 });
    const raised = faker.number.int({ min: 0, max: goal * 1.2 });
    
    return {
      id: faker.string.uuid(),
      title: faker.lorem.words({ min: 3, max: 6 }),
      description: faker.lorem.paragraph(),
      goal,
      raised,
      backers: faker.number.int({ min: 0, max: 500 }),
      daysLeft: faker.number.int({ min: 1, max: 60 }),
      category: faker.helpers.arrayElement(categories),
      image: `https://picsum.photos/400/300?random=${i}`,
      creator: {
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
      createdAt: faker.date.recent().toISOString(),
      featured: i < 3,
    };
  });
};

export const mockCampaigns = generateMockCampaigns();
