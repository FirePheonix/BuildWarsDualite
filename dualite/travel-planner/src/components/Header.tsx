import React from 'react';
import { MapPin, User, Settings } from 'lucide-react';

interface HeaderProps {
  onCreateTrip: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateTrip }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">TripPlanner</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onCreateTrip}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Trip
            </button>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
