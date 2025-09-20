import React from 'react';
import { Calendar, DollarSign, Users, MapPin } from 'lucide-react';
import { Trip } from '../types';
import { formatDate, getTripDuration } from '../utils/dateUtils';

interface TripCardProps {
  trip: Trip;
  onClick: () => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onClick }) => {
  const duration = getTripDuration(trip.startDate, trip.endDate);
  const budgetUsed = (trip.spent / trip.budget) * 100;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
          {duration} {duration === 1 ? 'day' : 'days'}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{trip.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{trip.destination}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-sm">Budget</span>
            </div>
            <span className="text-sm font-medium">
              ${trip.spent.toFixed(0)} / ${trip.budget.toFixed(0)}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                budgetUsed > 90 ? 'bg-red-500' : budgetUsed > 70 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            />
          </div>
          
          {trip.collaborators.length > 0 && (
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {trip.collaborators.length} collaborator{trip.collaborators.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
