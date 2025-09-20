import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Briefcase, GraduationCap, Heart, Mail, Phone, Verified, Crown } from 'lucide-react';
import { Profile } from '../types';

interface ProfileModalProps {
  profile: Profile | null;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <img 
            src={profile.photo}
            alt={profile.name}
            className="w-full h-64 md:h-80 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
          
          {profile.premium && (
            <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <Crown className="h-4 w-4 mr-1" />
              Premium Member
            </div>
          )}
          
          {profile.verified && (
            <div className="absolute top-16 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
              <Verified className="h-4 w-4 mr-1" />
              Verified
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h2>
                <p className="text-xl text-gray-600">{profile.age} years old</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </button>
                <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                  <Phone className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Professional Details</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{profile.profession}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{profile.education}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{profile.location}</span>
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">Income:</span> {profile.income}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
              <div className="space-y-3">
                <div className="text-gray-700">
                  <span className="font-medium">Religion:</span> {profile.religion}
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">Caste:</span> {profile.caste}
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">Mother Tongue:</span> {profile.motherTongue}
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">Height:</span> {profile.height}
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">Family Type:</span> {profile.familyType}
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">{profile.about}</p>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-rose-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-rose-600 transition-colors">
              Express Interest
            </button>
            <button className="flex-1 border-2 border-rose-500 text-rose-500 py-3 px-6 rounded-lg font-semibold hover:bg-rose-500 hover:text-white transition-colors">
              Send Message
            </button>
            <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Add to Shortlist
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileModal;
