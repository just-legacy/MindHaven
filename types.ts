
export enum Mood {
  Joyful = 'Joyful',
  Calm = 'Calm',
  Neutral = 'Neutral',
  Sad = 'Sad',
  Anxious = 'Anxious',
}

export interface MoodLog {
  date: string;
  mood: Mood;
  rating: number; 
}

export interface JournalEntry {
  date: string;
  content: string;
  summary?: string;
}
