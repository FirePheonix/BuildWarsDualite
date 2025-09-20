export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  restTime?: number;
  category: 'strength' | 'cardio' | 'flexibility' | 'other';
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
  duration: number;
  notes?: string;
  completed: boolean;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  exercises: Exercise[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
}

export interface ProgressEntry {
  id: string;
  exerciseId: string;
  exerciseName: string;
  date: string;
  weight?: number;
  reps?: number;
  duration?: number;
  notes?: string;
}

export interface BodyWeight {
  id: string;
  date: string;
  weight: number;
}
