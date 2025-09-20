import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import WorkoutList from './components/WorkoutList';
import WorkoutCalendar from './components/WorkoutCalendar';
import ProgressCharts from './components/ProgressCharts';
import CreateWorkout from './components/CreateWorkout';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Workout, ProgressEntry, WorkoutTemplate, BodyWeight } from './types/workout';
import { faker } from '@faker-js/faker';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>('workouts', []);
  const [progress, setProgress] = useLocalStorage<ProgressEntry[]>('progress', []);
  const [templates, setTemplates] = useLocalStorage<WorkoutTemplate[]>('templates', []);
  const [bodyWeights, setBodyWeights] = useLocalStorage<BodyWeight[]>('bodyWeights', []);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  // Initialize with sample data if empty
  React.useEffect(() => {
    if (workouts.length === 0) {
      initializeSampleData();
    }
  }, []);

  const initializeSampleData = () => {
    const sampleWorkouts: Workout[] = [
      {
        id: faker.string.uuid(),
        name: 'Upper Body Strength',
        date: '2025-01-20',
        exercises: [
          {
            id: faker.string.uuid(),
            name: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 185,
            category: 'strength',
            restTime: 120,
          },
          {
            id: faker.string.uuid(),
            name: 'Pull-ups',
            sets: 3,
            reps: 8,
            weight: 0,
            category: 'strength',
            restTime: 90,
          },
          {
            id: faker.string.uuid(),
            name: 'Shoulder Press',
            sets: 3,
            reps: 12,
            weight: 65,
            category: 'strength',
            restTime: 90,
          },
        ],
        duration: 45,
        completed: true,
        notes: 'Felt strong today, increased weight on bench press',
      },
      {
        id: faker.string.uuid(),
        name: 'Cardio Session',
        date: '2025-01-21',
        exercises: [
          {
            id: faker.string.uuid(),
            name: 'Treadmill Run',
            sets: 1,
            reps: 1,
            duration: 30,
            category: 'cardio',
          },
        ],
        duration: 30,
        completed: true,
      },
      {
        id: faker.string.uuid(),
        name: 'Lower Body Power',
        date: '2025-01-22',
        exercises: [
          {
            id: faker.string.uuid(),
            name: 'Squats',
            sets: 4,
            reps: 8,
            weight: 225,
            category: 'strength',
            restTime: 180,
          },
          {
            id: faker.string.uuid(),
            name: 'Deadlifts',
            sets: 3,
            reps: 5,
            weight: 275,
            category: 'strength',
            restTime: 180,
          },
        ],
        duration: 60,
        completed: false,
      },
    ];

    const sampleProgress: ProgressEntry[] = [
      {
        id: faker.string.uuid(),
        exerciseId: sampleWorkouts[0].exercises[0].id,
        exerciseName: 'Bench Press',
        date: '2025-01-15',
        weight: 175,
        reps: 10,
      },
      {
        id: faker.string.uuid(),
        exerciseId: sampleWorkouts[0].exercises[0].id,
        exerciseName: 'Bench Press',
        date: '2025-01-18',
        weight: 180,
        reps: 10,
      },
      {
        id: faker.string.uuid(),
        exerciseId: sampleWorkouts[0].exercises[0].id,
        exerciseName: 'Bench Press',
        date: '2025-01-20',
        weight: 185,
        reps: 10,
      },
    ];

    const sampleBodyWeights: BodyWeight[] = [
      {
        id: faker.string.uuid(),
        date: '2025-01-15',
        weight: 175.5,
      },
      {
        id: faker.string.uuid(),
        date: '2025-01-20',
        weight: 174.8,
      },
    ];

    setWorkouts(sampleWorkouts);
    setProgress(sampleProgress);
    setBodyWeights(sampleBodyWeights);
  };

  const handleSaveWorkout = (workoutData: Omit<Workout, 'id'>) => {
    if (editingWorkout) {
      setWorkouts(workouts.map(w => 
        w.id === editingWorkout.id 
          ? { ...workoutData, id: editingWorkout.id }
          : w
      ));
      setEditingWorkout(null);
    } else {
      const newWorkout: Workout = {
        ...workoutData,
        id: faker.string.uuid(),
      };
      setWorkouts([...workouts, newWorkout]);
    }
    setActiveTab('workouts');
  };

  const handleSaveTemplate = (templateData: Omit<WorkoutTemplate, 'id'>) => {
    const newTemplate: WorkoutTemplate = {
      ...templateData,
      id: faker.string.uuid(),
    };
    setTemplates([...templates, newTemplate]);
    setActiveTab('workouts');
  };

  const handleStartWorkout = (workout: Workout) => {
    // In a real app, this would open a workout session
    console.log('Starting workout:', workout);
  };

  const handleCompleteWorkout = (workoutId: string) => {
    setWorkouts(workouts.map(w => 
      w.id === workoutId ? { ...w, completed: true } : w
    ));
  };

  const handleEditWorkout = (workout: Workout) => {
    setEditingWorkout(workout);
    setActiveTab('create');
  };

  const handleDeleteWorkout = (workoutId: string) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      setWorkouts(workouts.filter(w => w.id !== workoutId));
    }
  };

  const handleDateSelect = (date: Date) => {
    // You could implement functionality to create a new workout for this date
    console.log('Selected date:', date);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard workouts={workouts} progress={progress} />;
      case 'workouts':
        return (
          <WorkoutList
            workouts={workouts}
            onStartWorkout={handleStartWorkout}
            onCompleteWorkout={handleCompleteWorkout}
            onEditWorkout={handleEditWorkout}
            onDeleteWorkout={handleDeleteWorkout}
          />
        );
      case 'calendar':
        return <WorkoutCalendar workouts={workouts} onDateSelect={handleDateSelect} />;
      case 'progress':
        return <ProgressCharts progress={progress} workouts={workouts} bodyWeights={bodyWeights} />;
      case 'create':
        return (
          <CreateWorkout
            onSaveWorkout={handleSaveWorkout}
            onSaveTemplate={handleSaveTemplate}
            existingWorkout={editingWorkout || undefined}
          />
        );
      default:
        return <Dashboard workouts={workouts} progress={progress} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
