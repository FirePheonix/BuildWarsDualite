import React, { useState } from 'react';
import { Heart, Search, Bell, Mail, User, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="h-8 w-8 text-rose-500" />
            <span className="text-2xl font-bold text-gray-900">SoulMate</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">Search</a>
            <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">Matches</a>
            <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">Success Stories</a>
            <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">Help</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-rose-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-rose-500 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-rose-500 transition-colors">
              <Mail className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-rose-500 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button 
              onClick={onAuthClick}
              className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Join Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden py-4 border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">Search</a>
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">Matches</a>
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">Success Stories</a>
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">Help</a>
              <button 
                onClick={onAuthClick}
                className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors w-full"
              >
                Join Free
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
