import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, Calendar, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Campaign } from '../types';

interface CampaignDetailProps {
  campaign: Campaign;
  onBack: () => void;
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaign, onBack }) => {
  const [pledgeAmount, setPledgeAmount] = useState<string>('');
  const [showPledgeForm, setShowPledgeForm] = useState(false);
  
  const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100);
  const isFullyFunded = campaign.raised >= campaign.goal;

  const handlePledge = () => {
    if (pledgeAmount && Number(pledgeAmount) > 0) {
      // Simulate pledge submission
      alert(`Thank you for pledging $${pledgeAmount}!`);
      setPledgeAmount('');
      setShowPledgeForm(false);
    }
  };

  const rewardTiers = [
    { amount: 25, reward: 'Digital thank you card', backers: 45 },
    { amount: 50, reward: 'Exclusive updates + digital rewards', backers: 32 },
    { amount: 100, reward: 'Early access + previous rewards', backers: 18 },
    { amount: 250, reward: 'Limited edition merchandise + all previous', backers: 12 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to campaigns
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Campaign Image */}
            <div className="relative mb-6">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
              {campaign.featured && (
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              )}
            </div>

            {/* Campaign Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {campaign.category}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
              
              <div className="flex items-center mb-6">
                <img
                  src={campaign.creator.avatar}
                  alt={campaign.creator.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium text-gray-900">{campaign.creator.name}</p>
                  <p className="text-sm text-gray-600">Campaign Creator</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{campaign.description}</p>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Campaign Story</h3>
                <div className="prose prose-gray max-w-none">
                  <p>This innovative project represents a breakthrough in its field, combining cutting-edge technology with user-centric design. Our team has spent months researching and developing this solution to address real-world problems.</p>
                  
                  <p>With your support, we can bring this vision to life and make a meaningful impact. Every contribution, no matter the size, helps us move closer to our goal and creates value for our community.</p>
                  
                  <h4>What your support enables:</h4>
                  <ul>
                    <li>Product development and refinement</li>
                    <li>Quality testing and validation</li>
                    <li>Manufacturing and distribution</li>
                    <li>Community building and support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-4">
              {/* Funding Stats */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${campaign.raised.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      isFullyFunded ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="h-4 w-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      ${campaign.goal.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">Goal</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{campaign.backers}</p>
                    <p className="text-xs text-gray-600">Backers</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{campaign.daysLeft}</p>
                    <p className="text-xs text-gray-600">Days Left</p>
                  </div>
                </div>
              </div>

              {/* Pledge Button */}
              <button
                onClick={() => setShowPledgeForm(!showPledgeForm)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors mb-6"
              >
                Back This Project
              </button>

              {/* Pledge Form */}
              {showPledgeForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-3">Enter pledge amount</h4>
                  <div className="relative mb-3">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      value={pledgeAmount}
                      onChange={(e) => setPledgeAmount(e.target.value)}
                      placeholder="25"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePledge}
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Pledge
                    </button>
                    <button
                      onClick={() => setShowPledgeForm(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Reward Tiers */}
              <div>
                <h4 className="font-medium mb-4">Reward Tiers</h4>
                <div className="space-y-3">
                  {rewardTiers.map((tier, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">${tier.amount}+</span>
                        <span className="text-xs text-gray-500">{tier.backers} backers</span>
                      </div>
                      <p className="text-sm text-gray-600">{tier.reward}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
