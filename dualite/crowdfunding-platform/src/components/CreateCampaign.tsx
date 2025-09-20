import React, { useState } from 'react';
import { ArrowLeft, Upload, DollarSign, Calendar } from 'lucide-react';

interface CreateCampaignProps {
  onBack: () => void;
  onSubmit: (campaignData: any) => void;
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    duration: '',
    category: '',
    image: ''
  });

  const categories = ['Technology', 'Arts', 'Games', 'Design', 'Film', 'Music', 'Publishing', 'Food'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.goal && formData.duration && formData.category) {
      onSubmit({
        ...formData,
        goal: Number(formData.goal),
        duration: Number(formData.duration),
        image: formData.image || `https://picsum.photos/400/300?random=${Date.now()}`
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to campaigns
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Create a New Campaign</h1>
            <p className="text-gray-600 mt-2">Tell the world about your project and start raising funds</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Campaign Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a compelling title for your campaign"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your project, what it does, and why people should support it"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Funding Goal and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Goal *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    placeholder="10000"
                    min="100"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Duration *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="30"
                    min="1"
                    max="90"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                    days
                  </span>
                </div>
              </div>
            </div>

            {/* Campaign Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Image URL
              </label>
              <div className="relative">
                <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg (optional)"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                If no image is provided, a placeholder will be used
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Launch Campaign
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Tips for a Successful Campaign</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Write a clear and compelling title that explains what your project is about</li>
            <li>• Set a realistic funding goal based on your actual needs</li>
            <li>• Provide a detailed description that tells your story and builds trust</li>
            <li>• Use high-quality images that showcase your project effectively</li>
            <li>• Consider offering attractive rewards for different pledge levels</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
