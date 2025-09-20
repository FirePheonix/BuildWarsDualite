import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { SearchFilters as Filters } from '../types';

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle 
}) => {
  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const filterOptions = {
    religion: ['Any', 'Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain'],
    education: ['Any', 'B.Tech', 'M.Tech', 'MBA', 'MBBS', 'B.Com', 'M.Com', 'BA', 'MA', 'PhD'],
    profession: ['Any', 'Software Engineer', 'Doctor', 'Teacher', 'Business Owner', 'Lawyer'],
    location: ['Any', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'],
    income: ['Any', '₹3-5 LPA', '₹5-10 LPA', '₹10-15 LPA', '₹15-25 LPA', '₹25+ LPA'],
    maritalStatus: ['Any', 'Never Married', 'Divorced', 'Widowed']
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 p-6 z-50"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Search Filters</h3>
            <button onClick={onToggle} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.ageRange[0]}
                  onChange={(e) => handleFilterChange('ageRange', [parseInt(e.target.value) || 18, filters.ageRange[1]])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.ageRange[1]}
                  onChange={(e) => handleFilterChange('ageRange', [filters.ageRange[0], parseInt(e.target.value) || 60])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>

            {/* Religion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Religion
              </label>
              <select
                value={filters.religion}
                onChange={(e) => handleFilterChange('religion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {filterOptions.religion.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <select
                value={filters.education}
                onChange={(e) => handleFilterChange('education', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {filterOptions.education.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Profession */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profession
              </label>
              <select
                value={filters.profession}
                onChange={(e) => handleFilterChange('profession', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {filterOptions.profession.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {filterOptions.location.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Income */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Income
              </label>
              <select
                value={filters.income}
                onChange={(e) => handleFilterChange('income', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {filterOptions.income.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => onFiltersChange({
                ageRange: [18, 60],
                religion: 'Any',
                caste: 'Any',
                education: 'Any',
                profession: 'Any',
                income: 'Any',
                location: 'Any',
                height: 'Any',
                maritalStatus: 'Any'
              })}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onToggle}
              className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SearchFilters;
