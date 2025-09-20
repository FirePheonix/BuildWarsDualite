import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { TrendingUp, Weight, Clock, Target } from 'lucide-react';
import { ProgressEntry, Workout, BodyWeight } from '../types/workout';
import { format, subDays, parseISO } from 'date-fns';

interface ProgressChartsProps {
  progress: ProgressEntry[];
  workouts: Workout[];
  bodyWeights: BodyWeight[];
}

const ProgressCharts: React.FC<ProgressChartsProps> = ({ progress, workouts, bodyWeights }) => {
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'workouts' | 'bodyweight'>('weight');

  const metrics = [
    { id: 'weight', label: 'Strength Progress', icon: Target },
    { id: 'workouts', label: 'Workout Frequency', icon: Clock },
    { id: 'bodyweight', label: 'Body Weight', icon: Weight },
  ];

  // Strength Progress Chart
  const getStrengthProgressData = () => {
    const exerciseProgress = progress
      .filter(p => p.weight)
      .reduce((acc, entry) => {
        if (!acc[entry.exerciseName]) {
          acc[entry.exerciseName] = [];
        }
        acc[entry.exerciseName].push({
          date: entry.date,
          weight: entry.weight || 0,
        });
        return acc;
      }, {} as Record<string, Array<{ date: string; weight: number }>>);

    const series = Object.entries(exerciseProgress)
      .slice(0, 5) // Show top 5 exercises
      .map(([exerciseName, data]) => ({
        name: exerciseName,
        type: 'line',
        data: data
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map(d => [d.date, d.weight]),
        smooth: true,
      }));

    return {
      title: { text: 'Strength Progress Over Time', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { bottom: '0%' },
      xAxis: {
        type: 'time',
        name: 'Date',
      },
      yAxis: {
        type: 'value',
        name: 'Weight (lbs)',
      },
      series,
    };
  };

  // Workout Frequency Chart
  const getWorkoutFrequencyData = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i);
      return format(date, 'yyyy-MM-dd');
    });

    const workoutCounts = last30Days.map(date => {
      const count = workouts.filter(w => 
        w.completed && format(new Date(w.date), 'yyyy-MM-dd') === date
      ).length;
      return [date, count];
    });

    return {
      title: { text: 'Workout Frequency (Last 30 Days)', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'time',
        name: 'Date',
      },
      yAxis: {
        type: 'value',
        name: 'Workouts',
      },
      series: [{
        name: 'Workouts',
        type: 'bar',
        data: workoutCounts,
        itemStyle: { color: '#3b82f6' },
      }],
    };
  };

  // Body Weight Chart
  const getBodyWeightData = () => {
    const sortedWeights = bodyWeights
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(w => [w.date, w.weight]);

    return {
      title: { text: 'Body Weight Progress', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'time',
        name: 'Date',
      },
      yAxis: {
        type: 'value',
        name: 'Weight (lbs)',
      },
      series: [{
        name: 'Body Weight',
        type: 'line',
        data: sortedWeights,
        smooth: true,
        itemStyle: { color: '#10b981' },
      }],
    };
  };

  const getChartData = () => {
    switch (selectedMetric) {
      case 'weight':
        return getStrengthProgressData();
      case 'workouts':
        return getWorkoutFrequencyData();
      case 'bodyweight':
        return getBodyWeightData();
      default:
        return getStrengthProgressData();
    }
  };

  const stats = [
    {
      label: 'Total Progress Entries',
      value: progress.length,
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      label: 'Exercises Tracked',
      value: new Set(progress.map(p => p.exerciseName)).size,
      icon: Target,
      color: 'bg-purple-500',
    },
    {
      label: 'Current Weight',
      value: bodyWeights.length > 0 ? `${bodyWeights[bodyWeights.length - 1].weight} lbs` : 'N/A',
      icon: Weight,
      color: 'bg-green-500',
    },
    {
      label: 'Avg Workouts/Week',
      value: (workouts.filter(w => w.completed).length / 4).toFixed(1),
      icon: Clock,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Progress Analytics</h2>

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
                  <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedMetric === metric.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{metric.label}</span>
              </button>
            );
          })}
        </div>

        <div className="h-96">
          <ReactECharts
            option={getChartData()}
            style={{ height: '100%', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;
