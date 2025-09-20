import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Campaign } from '../types';
import CampaignCard from './CampaignCard';

interface FeaturedCampaignsProps {
  campaigns: Campaign[];
  onCampaignClick: (campaign: Campaign) => void;
}

const FeaturedCampaigns: React.FC<FeaturedCampaignsProps> = ({ campaigns, onCampaignClick }) => {
  const featuredCampaigns = campaigns.filter(campaign => campaign.featured);

  if (featuredCampaigns.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Featured Campaigns</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onClick={() => onCampaignClick(campaign)}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
