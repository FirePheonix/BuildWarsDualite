import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TripDetail from './components/TripDetail';
import CreateTripModal from './components/CreateTripModal';
import { Trip } from './types';
import { generateMockTrips } from './utils/mockData';

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Load mock data on initial render
    const mockTrips = generateMockTrips();
    setTrips(mockTrips);
  }, []);

  const handleCreateTrip = (newTripData: Omit<Trip, 'id' | 'spent' | 'collaborators' | 'createdAt' | 'updatedAt'>) => {
    const newTrip: Trip = {
      ...newTripData,
      id: crypto.randomUUID(),
      spent: 0,
      collaborators: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTrips(prev => [newTrip, ...prev]);
  };

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleBackToDashboard = () => {
    setSelectedTrip(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateTrip={() => setShowCreateModal(true)} />
      
      <AnimatePresence mode="wait">
        {selectedTrip ? (
          <motion.div
            key="trip-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TripDetail
              trip={selectedTrip}
              onBack={handleBackToDashboard}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard
              trips={trips}
              onTripClick={handleTripClick}
              onCreateTrip={() => setShowCreateModal(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CreateTripModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateTrip={handleCreateTrip}
      />
    </div>
  );
}

export default App;
