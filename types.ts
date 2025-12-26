
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
  aiInsight?: string;
  tags: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export enum Mood {
  HAPPY = 'Happy',
  CALM = 'Calm',
  SAD = 'Sad',
  ANXIOUS = 'Anxious',
  ENERGIZED = 'Energized',
  REFLECTIVE = 'Reflective'
}
