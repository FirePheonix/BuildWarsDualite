import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, DollarSign, Users, Share2, Plus, Clock, Check } from 'lucide-react';
import { Trip, ItineraryItem } from '../types';
import { formatDate, getTripDuration, formatTime } from '../utils/dateUtils';
import { generateMockItinerary } from '../utils/mockData';

interface TripDetailProps {
  trip: Trip;
  onBack: () => void;
}

const TripDetail: React.FC<TripDetailProps> = ({ trip, onBack }) => {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showAddItem, setShowAddItem] = useState(false);
  
  const duration = getTripDuration(trip.startDate, trip.endDate);
  const budgetUsed = (trip.spent / trip.budget) * 100;

  useEffect(() => {
    // Generate mock itinerary data
    const mockItinerary = generateMockItinerary(trip.id, duration);
    setItinerary(mockItinerary);
  }, [trip.id, duration]);

  const dayItems = itinerary.filter(item => item.day === selectedDay);
  const dayTotal = dayItems.reduce((sum, item) => sum + item.cost, 0);

  const categoryColors = {
    accommodation: 'bg-purple-100 text-purple-800',
    transport: 'bg-blue-100 text-blue-800',
    food: 'bg-green-100 text-green-800',
    activity: 'bg-orange-100 text-orange-800',
    shopping: 'bg-pink-100 text-pink-800',
    other: 'bg-gray-100 text-gray-800'
  };

  const toggleItemComplete = (itemId: string) => {
    setItinerary(prev => prev.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors mr-3"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{trip.title}</h1>
            </div>
            
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share Trip</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-200">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{trip.destination}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <div>
                    <div>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</div>
                    <div className="text-sm text-gray-500">{duration} {duration === 1 ? 'day' : 'days'}</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-5 w-5 mr-2" />
                      <span>Budget</span>
                    </div>
                    <span className="font-medium">
                      ${trip.spent.toFixed(0)} / ${trip.budget.toFixed(0)}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        budgetUsed > 90 ? 'bg-red-500' : budgetUsed > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {budgetUsed.toFixed(1)}% used
                  </div>
                </div>
                
                {trip.collaborators.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex items-center text-gray-600 mb-3">
                      <Users className="h-5 w-5 mr-2" />
                      <span>Collaborators</span>
                    </div>
                    <div className="space-y-2">
                      {trip.collaborators.map((collaborator, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {collaborator.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700">{collaborator}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Itinerary</h2>
                  <button
                    onClick={() => setShowAddItem(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Item</span>
                  </button>
                </div>
                
                {/* Day Tabs */}
                <div className="flex space-x-1 overflow-x-auto">
                  {Array.from({ length: duration }, (_, i) => i + 1).map(day => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                        selectedDay === day
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Day {day}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                {dayItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No activities planned for this day</p>
                    <button
                      onClick={() => setShowAddItem(true)}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Add your first activity
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dayItems.map(item => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          item.completed
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <button
                                onClick={() => toggleItemComplete(item.id)}
                                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors ${
                                  item.completed
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'border-gray-300 hover:border-green-500'
                                }`}
                              >
                                {item.completed && <Check className="h-4 w-4" />}
                              </button>
                              
                              <span className="text-sm font-medium text-gray-500">
                                {formatTime(item.time)}
                              </span>
                              
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}`}>
                                {item.category}
                              </span>
                            </div>
                            
                            <h3 className={`font-semibold text-gray-900 mb-1 ${item.completed ? 'line-through text-gray-500' : ''}`}>
                              {item.title}
                            </h3>
                            
                            {item.description && (
                              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                            )}
                            
                            {item.location && (
                              <div className="flex items-center text-gray-500 text-sm">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{item.location}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <span className="font-semibold text-gray-900">
                              ${item.cost.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Day {selectedDay} Total</span>
                        <span className="font-semibold text-lg text-gray-900">
                          ${dayTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
