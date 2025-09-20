import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import ProfileCard from './components/ProfileCard';
import SearchFilters from './components/SearchFilters';
import ProfileModal from './components/ProfileModal';
import AuthModal from './components/AuthModal';
import { mockProfiles } from './data/mockData';
import { Profile, SearchFilters as Filters } from './types';

function App() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    ageRange: [18, 60],
    religion: 'Any',
    caste: 'Any',
    education: 'Any',
    profession: 'Any',
    income: 'Any',
    location: 'Any',
    height: 'Any',
    maritalStatus: 'Any'
  });

  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter(profile => {
      // Search query filter
      if (searchQuery && !profile.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !profile.profession.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !profile.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Age filter
      if (profile.age < filters.ageRange[0] || profile.age > filters.ageRange[1]) {
        return false;
      }

      // Other filters
      if (filters.religion !== 'Any' && profile.religion !== filters.religion) return false;
      if (filters.education !== 'Any' && profile.education !== filters.education) return false;
      if (filters.profession !== 'Any' && profile.profession !== filters.profession) return false;
      if (filters.location !== 'Any' && profile.location !== filters.location) return false;

      return true;
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      
      <Hero onAuthClick={() => setShowAuthModal(true)} />

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Match</h2>
            <p className="text-gray-600 text-lg">Browse through thousands of verified profiles</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search by name, profession, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="relative">
                <SearchFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  isOpen={showFilters}
                  onToggle={() => setShowFilters(!showFilters)}
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProfiles.length} profiles
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {/* Profiles Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProfileCard
                  profile={profile}
                  onViewProfile={setSelectedProfile}
                />
              </motion.div>
            ))}
          </motion.div>

          {filteredProfiles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No profiles found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    ageRange: [18, 60],
                    religion: 'Any',
                    caste: 'Any',
                    education: 'Any',
                    profession: 'Any',
                    income: 'Any',
                    location: 'Any',
                    height: 'Any',
                    maritalStatus: 'Any'
                  });
                }}
                className="mt-4 text-rose-500 hover:text-rose-600 font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SoulMate</h3>
              <p className="text-gray-400">
                India's most trusted matrimonial platform connecting hearts and souls.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Profiles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Premium Plans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: +91 1234567890</li>
                <li>Email: support@soulmate.com</li>
                <li>Address: Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SoulMate. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProfileModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}

export default App;
