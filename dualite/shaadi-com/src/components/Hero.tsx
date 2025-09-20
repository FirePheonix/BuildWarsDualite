import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Star } from 'lucide-react';

interface HeroProps {
  onAuthClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAuthClick }) => {
  const stats = [
    { icon: Users, label: 'Active Members', value: '50L+' },
    { icon: Heart, label: 'Successful Matches', value: '15L+' },
    { icon: Shield, label: 'Verified Profiles', value: '95%' },
    { icon: Star, label: 'Success Rate', value: '4.8/5' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-rose-50 to-pink-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your
              <span className="text-rose-500 block">Perfect Match</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join India's most trusted matrimonial platform. Millions of verified profiles 
              are waiting to connect with you. Your soulmate is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button 
                onClick={onAuthClick}
                className="bg-rose-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-rose-600 transition-all transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register Free
              </motion.button>
              <motion.button 
                className="border-2 border-rose-500 text-rose-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-rose-500 hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Profiles
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <stat.icon className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&h=600&fit=crop&crop=face"
                alt="Happy Couple"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-rose-500 fill-current" />
                  <span className="font-semibold text-gray-900">Perfect Match!</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
