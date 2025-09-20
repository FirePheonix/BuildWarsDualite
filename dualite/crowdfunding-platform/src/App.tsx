import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import CampaignCard from './components/CampaignCard';
import CampaignDetail from './components/CampaignDetail';
import CreateCampaign from './components/CreateCampaign';
import CategoryFilter from './components/CategoryFilter';
import FeaturedCampaigns from './components/FeaturedCampaigns';
import { mockCampaigns } from './data/mockData';
import { Campaign } from './types';
import { faker } from '@faker-js/faker';

type ViewType = 'home' | 'detail' | 'create';

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories from campaigns
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(campaigns.map(campaign => campaign.category))];
    return uniqueCategories.sort();
  }, [campaigns]);

  // Filter campaigns based on search and category
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           campaign.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || campaign.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [campaigns, searchQuery, selectedCategory]);

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setCurrentView('detail');
  };

  const handleCreateCampaign = () => {
    setCurrentView('create');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCampaign(null);
  };

  const handleSubmitCampaign = (campaignData: any) => {
    const newCampaign: Campaign = {
      id: faker.string.uuid(),
      ...campaignData,
      raised: 0,
      backers: 0,
      daysLeft: campaignData.duration,
      creator: {
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
      createdAt: new Date().toISOString(),
      featured: false,
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setCurrentView('home');
    
    // Show success message
    setTimeout(() => {
      alert('Campaign created successfully! 🎉');
    }, 100);
  };

  const stats = useMemo(() => {
    const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
    const totalBackers = campaigns.reduce((sum, campaign) => sum + campaign.backers, 0);
    const successfulCampaigns = campaigns.filter(campaign => campaign.raised >= campaign.goal).length;
    
    return {
      totalRaised,
      totalBackers,
      successfulCampaigns,
      totalCampaigns: campaigns.length
    };
  }, [campaigns]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Header onCreateCampaign={handleCreateCampaign} onSearch={setSearchQuery} />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Hero Section */}
              <section className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Turn Your Ideas Into Reality
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Join thousands of creators who have successfully funded their projects. 
                  Launch your campaign today and bring your vision to life.
                </p>
                
                {/* Platform Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ${stats.totalRaised.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Raised</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {stats.totalBackers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Backers</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {stats.successfulCampaigns}
                    </div>
                    <div className="text-sm text-gray-600">Successful</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {stats.totalCampaigns}
                    </div>
                    <div className="text-sm text-gray-600">Total Campaigns</div>
                  </div>
                </div>

                <button
                  onClick={handleCreateCampaign}
                  className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Your Campaign
                </button>
              </section>

              {/* Featured Campaigns */}
              <FeaturedCampaigns 
                campaigns={campaigns} 
                onCampaignClick={handleCampaignClick} 
              />

              {/* All Campaigns */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">All Campaigns</h2>
                  <div className="text-sm text-gray-600">
                    {filteredCampaigns.length} campaigns found
                  </div>
                </div>

                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />

                {filteredCampaigns.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCampaigns.map((campaign) => (
                      <motion.div
                        key={campaign.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CampaignCard
                          campaign={campaign}
                          onClick={() => handleCampaignClick(campaign)}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.901-6.067 2.377" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filter criteria, or create a new campaign.
                    </p>
                  </div>
                )}
              </section>
            </main>
          </motion.div>
        )}

        {currentView === 'detail' && selectedCampaign && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <CampaignDetail
              campaign={selectedCampaign}
              onBack={handleBackToHome}
            />
          </motion.div>
        )}

        {currentView === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <CreateCampaign
              onBack={handleBackToHome}
              onSubmit={handleSubmitCampaign}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
