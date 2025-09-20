import React from 'react';
import { Calendar, Clock, TrendingUp, Target } from 'lucide-react';
import { Workout, ProgressEntry } from '../types/workout';
import { format, startOfWeek, endOfWeek } from 'date-fns';

interface DashboardProps {
  workouts: Workout[];
  progress: ProgressEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ workouts, progress }) => {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);

  const thisWeekWorkouts = workouts.filter(
    (workout) => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= weekStart && workoutDate <= weekEnd && workout.completed;
    }
  );

  const totalWorkoutsThisWeek = thisWeekWorkouts.length;
  const totalDurationThisWeek = thisWeekWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
  const nextWorkout = workouts.find(workout => !workout.completed && new Date(workout.date) >= today);

  const stats = [
    {
      label: 'Workouts This Week',
      value: totalWorkoutsThisWeek,
      icon: Target,
      color: 'bg-blue-500',
    },
    {
      label: 'Minutes Exercised',
      value: totalDurationThisWeek,
      icon: Clock,
      color: 'bg-green-500',
    },
    {
      label: 'Total Workouts',
      value: workouts.filter(w => w.completed).length,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      label: 'Progress Entries',
      value: progress.length,
      icon: Calendar,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">{format(today, 'EEEE, MMMM d, yyyy')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-md p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Workout</h3>
          {nextWorkout ? (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">{nextWorkout.name}</h4>
              <p className="text-sm text-gray-600">
                {format(new Date(nextWorkout.date), 'EEEE, MMMM d')}
              </p>
              <p className="text-sm text-gray-600">
                {nextWorkout.exercises.length} exercises • {nextWorkout.duration} min
              </p>
            </div>
          ) : (
            <p className="text-gray-600">No upcoming workouts scheduled</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {thisWeekWorkouts.slice(0, 3).map((workout) => (
              <div key={workout.id} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{workout.name}</p>
                  <p className="text-xs text-gray-600">
                    {format(new Date(workout.date), 'MMM d')} • {workout.duration} min
                  </p>
                </div>
              </div>
            ))}
            {thisWeekWorkouts.length === 0 && (
              <p className="text-gray-600">No workouts completed this week</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
