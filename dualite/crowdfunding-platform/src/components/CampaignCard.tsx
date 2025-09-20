import React from 'react';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
  onClick: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onClick }) => {
  const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100);
  const isFullyFunded = campaign.raised >= campaign.goal;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
    >
      {/* Campaign Image */}
      <div className="relative">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
        {campaign.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {campaign.category}
        </div>
      </div>

      {/* Campaign Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {campaign.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {campaign.description}
        </p>

        {/* Creator */}
        <div className="flex items-center mb-4">
          <img
            src={campaign.creator.avatar}
            alt={campaign.creator.name}
            className="w-8 h-8 rounded-full mr-3"
          />
          <span className="text-sm text-gray-700">by {campaign.creator.name}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              ${campaign.raised.toLocaleString()} raised
            </span>
            <span className="text-sm text-gray-500">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isFullyFunded ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>${campaign.goal.toLocaleString()} goal</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{campaign.backers} backers</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{campaign.daysLeft} days left</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
