import { faker } from '@faker-js/faker';
import { Trip, ItineraryItem } from '../types';

export const generateMockTrips = (): Trip[] => {
  const trips: Trip[] = [];
  
  for (let i = 0; i < 6; i++) {
    const startDate = faker.date.future();
    const endDate = faker.date.future({ refDate: startDate });
    const budget = faker.number.int({ min: 1000, max: 10000 });
    const spent = faker.number.int({ min: 0, max: budget });
    
    trips.push({
      id: faker.string.uuid(),
      title: `${faker.location.city()} Adventure`,
      destination: `${faker.location.city()}, ${faker.location.country()}`,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      budget: budget,
      spent: spent,
      description: faker.lorem.sentences(2),
      image: `https://picsum.photos/800/400?random=${i}`,
      collaborators: [faker.person.fullName(), faker.person.fullName()],
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString()
    });
  }
  
  return trips;
};

export const generateMockItinerary = (tripId: string, days: number): ItineraryItem[] => {
  const items: ItineraryItem[] = [];
  const categories: ItineraryItem['category'][] = ['accommodation', 'transport', 'food', 'activity', 'shopping'];
  
  for (let day = 1; day <= days; day++) {
    const itemsPerDay = faker.number.int({ min: 2, max: 5 });
    
    for (let i = 0; i < itemsPerDay; i++) {
      const hour = faker.number.int({ min: 8, max: 20 });
      const minute = faker.number.int({ min: 0, max: 59 });
      
      items.push({
        id: faker.string.uuid(),
        tripId,
        day,
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        location: faker.location.streetAddress(),
        cost: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
        category: faker.helpers.arrayElement(categories),
        completed: faker.datatype.boolean()
      });
    }
  }
  
  return items.sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.time.localeCompare(b.time);
  });
};
