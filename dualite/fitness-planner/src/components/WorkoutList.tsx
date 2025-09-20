import React from 'react';
import { Play, CheckCircle, Clock, Edit3, Trash2 } from 'lucide-react';
import { Workout } from '../types/workout';
import { format } from 'date-fns';

interface WorkoutListProps {
  workouts: Workout[];
  onStartWorkout: (workout: Workout) => void;
  onCompleteWorkout: (workoutId: string) => void;
  onEditWorkout: (workout: Workout) => void;
  onDeleteWorkout: (workoutId: string) => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({
  workouts,
  onStartWorkout,
  onCompleteWorkout,
  onEditWorkout,
  onDeleteWorkout,
}) => {
  const upcomingWorkouts = workouts.filter(w => !w.completed);
  const completedWorkouts = workouts.filter(w => w.completed);

  const WorkoutCard: React.FC<{ workout: Workout }> = ({ workout }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
            {workout.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            {format(new Date(workout.date), 'EEEE, MMMM d, yyyy')}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{workout.duration} min</span>
            </div>
            <span>{workout.exercises.length} exercises</span>
          </div>
          
          {workout.notes && (
            <p className="text-sm text-gray-600 mb-3">{workout.notes}</p>
          )}
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEditWorkout(workout)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDeleteWorkout(workout.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4">
        {!workout.completed ? (
          <>
            <button
              onClick={() => onStartWorkout(workout)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>Start Workout</span>
            </button>
            <button
              onClick={() => onCompleteWorkout(workout.id)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Mark Complete</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => onStartWorkout(workout)}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <Play className="h-4 w-4" />
            <span>View Workout</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Workouts</h2>
      
      {upcomingWorkouts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Workouts</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      )}
      
      {completedWorkouts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed Workouts</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedWorkouts.slice(0, 6).map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      )}
      
      {workouts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No workouts created yet</p>
          <p className="text-sm text-gray-500">Create your first workout to get started!</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
