
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Mood, MoodLog } from '../types';
import MoodChart from './MoodChart';

const moodOptions = [
  { mood: Mood.Joyful, emoji: '😄', rating: 5, color: 'text-yellow-500' },
  { mood: Mood.Calm, emoji: '😌', rating: 4, color: 'text-green-500' },
  { mood: Mood.Neutral, emoji: '😐', rating: 3, color: 'text-blue-500' },
  { mood: Mood.Sad, emoji: '😢', rating: 2, color: 'text-gray-500' },
  { mood: Mood.Anxious, emoji: '😟', rating: 1, color: 'text-purple-500' },
];

const MoodTracker: React.FC = () => {
  const [moodLogs, setMoodLogs] = useLocalStorage<MoodLog[]>('moodLogs', []);
  const [message, setMessage] = useState<string | null>(null);

  const handleMoodSelect = (mood: Mood, rating: number) => {
    const today = new Date().toISOString().split('T')[0];
    const existingLogIndex = moodLogs.findIndex(log => log.date === today);

    const newLog: MoodLog = { date: today, mood, rating };

    if (existingLogIndex > -1) {
      const updatedLogs = [...moodLogs];
      updatedLogs[existingLogIndex] = newLog;
      setMoodLogs(updatedLogs);
      setMessage("Today's mood has been updated.");
    } else {
      setMoodLogs([...moodLogs, newLog].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setMessage('Your mood has been logged. Thank you for sharing.');
    }
    
    setTimeout(() => setMessage(null), 3000);
  };
  
  const todayLog = moodLogs.find(log => log.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
        <h2 className="text-2xl font-bold text-calm-blue-800 mb-4 text-center">How are you feeling right now?</h2>
        <div className="flex justify-center space-x-2 sm:space-x-4">
          {moodOptions.map(({ mood, emoji, rating, color }) => (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood, rating)}
              className={`p-3 sm:p-4 rounded-full transition-transform duration-200 text-3xl sm:text-5xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-calm-blue-400 ${todayLog?.mood === mood ? 'bg-calm-blue-100 ring-2 ring-calm-blue-400' : 'bg-slate-100 hover:bg-slate-200'}`}
              title={mood}
              aria-label={`Select mood: ${mood}`}
            >
             <span className={color}>{emoji}</span>
            </button>
          ))}
        </div>
        {message && <p className="text-center mt-4 text-calm-green-700 animate-pulse">{message}</p>}
      </div>
      
      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-md border border-slate-100">
        <h3 className="text-2xl font-bold text-calm-blue-800 mb-4 text-center">Your Mood History</h3>
        {moodLogs.length > 0 ? (
          <MoodChart data={moodLogs} />
        ) : (
          <div className="text-center py-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h4 className="mt-4 text-lg font-semibold text-slate-700">Your Mood Chart Awaits</h4>
            <p className="text-slate-500 mt-1">Start tracking your mood to see your journey unfold.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
