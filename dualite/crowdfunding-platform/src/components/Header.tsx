import React from 'react';
import { Search, User, Menu, Plus } from 'lucide-react';

interface HeaderProps {
  onCreateCampaign: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateCampaign, onSearch }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">FundFlow</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search campaigns..."
                onChange={(e) => onSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onCreateCampaign}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Start Campaign</span>
            </button>
            
            <button className="text-gray-500 hover:text-gray-700">
              <User className="h-6 w-6" />
            </button>
            
            <button className="md:hidden text-gray-500 hover:text-gray-700">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
