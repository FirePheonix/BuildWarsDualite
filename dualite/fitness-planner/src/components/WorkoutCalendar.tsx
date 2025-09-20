import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Workout } from '../types/workout';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  addMonths, 
  subMonths, 
  isSameMonth, 
  isSameDay,
  isToday 
} from 'date-fns';

interface WorkoutCalendarProps {
  workouts: Workout[];
  onDateSelect: (date: Date) => void;
}

const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ workouts, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = 'd';
  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const dayWorkouts = workouts.filter(workout => 
        isSameDay(new Date(workout.date), cloneDay)
      );
      
      days.push(
        <div
          key={day.toString()}
          className={`min-h-24 p-2 border border-gray-200 cursor-pointer transition-colors ${
            !isSameMonth(day, monthStart)
              ? 'bg-gray-50 text-gray-400'
              : isToday(day)
              ? 'bg-blue-50 text-blue-900'
              : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => onDateSelect(cloneDay)}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-medium ${
              isToday(day) ? 'text-blue-600' : ''
            }`}>
              {format(day, dateFormat)}
            </span>
            {dayWorkouts.length > 0 && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>
          
          <div className="space-y-1">
            {dayWorkouts.slice(0, 2).map((workout) => (
              <div
                key={workout.id}
                className={`text-xs p-1 rounded truncate ${
                  workout.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {workout.name}
              </div>
            ))}
            {dayWorkouts.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayWorkouts.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7">
        {days}
      </div>
    );
    days = [];
  }

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Workout Calendar</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={prevMonth}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <h3 className="text-lg font-semibold text-gray-900 min-w-48 text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            
            <button
              onClick={nextMonth}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-semibold text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-0">
          {rows}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCalendar;
