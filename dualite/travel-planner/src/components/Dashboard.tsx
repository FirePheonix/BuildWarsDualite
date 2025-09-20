import React from 'react';
import { Trip } from '../types';
import TripCard from './TripCard';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

interface DashboardProps {
  trips: Trip[];
  onTripClick: (trip: Trip) => void;
  onCreateTrip: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ trips, onTripClick, onCreateTrip }) => {
  const upcomingTrips = trips.filter(trip => new Date(trip.startDate) > new Date());
  const totalBudget = trips.reduce((sum, trip) => sum + trip.budget, 0);
  const totalSpent = trips.reduce((sum, trip) => sum + trip.spent, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create, share, and collaborate on travel plans with budget tracking and detailed itineraries.
          </p>
          
          {trips.length === 0 && (
            <button
              onClick={onCreateTrip}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Create Your First Trip
            </button>
          )}
        </div>

        {trips.length > 0 && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Trips</p>
                    <p className="text-2xl font-bold text-gray-900">{trips.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900">${totalBudget.toFixed(0)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Amount Spent</p>
                    <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(0)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Trips */}
            {upcomingTrips.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Trips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {upcomingTrips.map(trip => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      onClick={() => onTripClick(trip)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Trips */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Trips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {trips.map(trip => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    onClick={() => onTripClick(trip)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
