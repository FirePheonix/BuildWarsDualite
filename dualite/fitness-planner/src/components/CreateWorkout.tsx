import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { Exercise, Workout, WorkoutTemplate } from '../types/workout';
import { faker } from '@faker-js/faker';

interface CreateWorkoutProps {
  onSaveWorkout: (workout: Omit<Workout, 'id'>) => void;
  onSaveTemplate: (template: Omit<WorkoutTemplate, 'id'>) => void;
  existingWorkout?: Workout;
}

const CreateWorkout: React.FC<CreateWorkoutProps> = ({ 
  onSaveWorkout, 
  onSaveTemplate, 
  existingWorkout 
}) => {
  const [isTemplate, setIsTemplate] = useState(false);
  const [workoutName, setWorkoutName] = useState(existingWorkout?.name || '');
  const [workoutDate, setWorkoutDate] = useState(
    existingWorkout?.date || new Date().toISOString().split('T')[0]
  );
  const [workoutNotes, setWorkoutNotes] = useState(existingWorkout?.notes || '');
  const [exercises, setExercises] = useState<Exercise[]>(
    existingWorkout?.exercises || []
  );
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [targetMuscles, setTargetMuscles] = useState<string[]>([]);

  const exerciseCategories = ['strength', 'cardio', 'flexibility', 'other'] as const;
  const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Cardio'];

  const addExercise = () => {
    const newExercise: Exercise = {
      id: faker.string.uuid(),
      name: '',
      sets: 3,
      reps: 10,
      weight: 0,
      duration: 0,
      restTime: 60,
      category: 'strength',
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (index: number, field: keyof Exercise, value: any) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updatedExercises);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const calculateTotalDuration = () => {
    return exercises.reduce((total, exercise) => {
      if (exercise.category === 'cardio') {
        return total + (exercise.duration || 0);
      } else {
        const exerciseTime = (exercise.sets * exercise.reps * 3) + (exercise.sets * (exercise.restTime || 60));
        return total + exerciseTime / 60; // Convert to minutes
      }
    }, 0);
  };

  const handleSave = () => {
    if (!workoutName.trim() || exercises.length === 0) {
      alert('Please provide a workout name and at least one exercise.');
      return;
    }

    const duration = Math.round(calculateTotalDuration());

    if (isTemplate) {
      const template: Omit<WorkoutTemplate, 'id'> = {
        name: workoutName,
        exercises,
        estimatedDuration: duration,
        difficulty,
        targetMuscles,
      };
      onSaveTemplate(template);
    } else {
      const workout: Omit<Workout, 'id'> = {
        name: workoutName,
        date: workoutDate,
        exercises,
        duration,
        notes: workoutNotes,
        completed: false,
      };
      onSaveWorkout(workout);
    }

    // Reset form
    setWorkoutName('');
    setWorkoutDate(new Date().toISOString().split('T')[0]);
    setWorkoutNotes('');
    setExercises([]);
    setTargetMuscles([]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {existingWorkout ? 'Edit Workout' : 'Create New Workout'}
          </h2>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Save as template:</label>
            <input
              type="checkbox"
              checked={isTemplate}
              onChange={(e) => setIsTemplate(e.target.checked)}
              className="rounded border-gray-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workout Name
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter workout name"
            />
          </div>

          {!isTemplate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workout Date
              </label>
              <input
                type="date"
                value={workoutDate}
                onChange={(e) => setWorkoutDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {isTemplate && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Muscle Groups
                </label>
                <div className="flex flex-wrap gap-2">
                  {muscleGroups.map((muscle) => (
                    <button
                      key={muscle}
                      type="button"
                      onClick={() => {
                        if (targetMuscles.includes(muscle)) {
                          setTargetMuscles(targetMuscles.filter(m => m !== muscle));
                        } else {
                          setTargetMuscles([...targetMuscles, muscle]);
                        }
                      }}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        targetMuscles.includes(muscle)
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {muscle}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {!isTemplate && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={workoutNotes}
              onChange={(e) => setWorkoutNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any notes about this workout..."
            />
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Exercises</h3>
            <button
              onClick={addExercise}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Exercise</span>
            </button>
          </div>

          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Exercise Name
                    </label>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) => updateExercise(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Exercise name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={exercise.category}
                      onChange={(e) => updateExercise(index, 'category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {exerciseCategories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {exercise.category !== 'cardio' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sets
                        </label>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reps
                        </label>
                        <input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Weight (lbs)
                        </label>
                        <input
                          type="number"
                          value={exercise.weight || ''}
                          onChange={(e) => updateExercise(index, 'weight', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                          step="0.5"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={exercise.duration || ''}
                        onChange={(e) => updateExercise(index, 'duration', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => removeExercise(index)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {exercises.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Workout Summary</h4>
            <p className="text-sm text-gray-600">
              {exercises.length} exercises • Estimated duration: {Math.round(calculateTotalDuration())} minutes
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>{isTemplate ? 'Save Template' : 'Save Workout'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
