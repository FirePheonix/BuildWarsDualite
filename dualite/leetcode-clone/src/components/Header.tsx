import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, User, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CodeChallenge</span>
            </Link>
            <nav className="ml-10 flex space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Problems
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
