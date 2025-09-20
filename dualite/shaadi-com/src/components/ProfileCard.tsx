import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Briefcase, GraduationCap, Verified, Crown } from 'lucide-react';
import { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
  onViewProfile: (profile: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onViewProfile }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={() => onViewProfile(profile)}
    >
      <div className="relative">
        <img 
          src={profile.photo}
          alt={profile.name}
          className="w-full h-64 object-cover"
        />
        {profile.premium && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </div>
        )}
        {profile.verified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full">
            <Verified className="h-4 w-4" />
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
          Online
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
          <span className="text-gray-600 text-sm">{profile.age} years</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Briefcase className="h-4 w-4 mr-2" />
            {profile.profession}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <GraduationCap className="h-4 w-4 mr-2" />
            {profile.education}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {profile.location}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {profile.religion} • {profile.height}
          </div>
          <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
