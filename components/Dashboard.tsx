
import React, { useState, useEffect } from 'react';
import { getPositiveAffirmation } from '../services/geminiService';
import useLocalStorage from '../hooks/useLocalStorage';
import { MoodLog } from '../types';

interface DashboardProps {
  setActivePage: (page: 'mood' | 'journal' | 'breathe' | 'affirmations') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
  const [affirmation, setAffirmation] = useState<string>('Loading your daily inspiration...');
  const [moodLogs] = useLocalStorage<MoodLog[]>('moodLogs', []);
  
  useEffect(() => {
    const fetchAffirmation = async () => {
      const newAffirmation = await getPositiveAffirmation();
      setAffirmation(newAffirmation);
    };
    fetchAffirmation();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const latestMood = moodLogs.length > 0 ? moodLogs[moodLogs.length - 1] : null;

  return (
    <div className="space-y-8">
      <div className="text-center p-8 md:p-12 bg-gradient-to-br from-calm-blue-100 to-calm-green-100 rounded-2xl shadow-md border border-slate-100">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-calm-blue-800">{getGreeting()}!</h1>
        <p className="mt-3 text-slate-600 text-lg max-w-2xl mx-auto">Welcome to your safe space. Take a moment for yourself today.</p>
      </div>

      <div className="p-6 bg-calm-blue-600 text-white rounded-2xl shadow-lg text-center">
        <p className="text-xl italic">"{affirmation}"</p>
      </div>

      {latestMood && (
        <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-100">
          <h2 className="text-xl font-semibold text-calm-blue-800 mb-2">Your Last Mood Entry</h2>
          <p className="text-slate-600">On {new Date(latestMood.date).toLocaleDateString()}, you felt <span className="font-semibold">{latestMood.mood}</span>.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Track Your Mood"
          description="Log your emotions to understand your patterns."
          onClick={() => setActivePage('mood')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <DashboardCard
          title="Write in Your Journal"
          description="Clear your mind and get a supportive reflection."
          onClick={() => setActivePage('journal')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
        />
        <DashboardCard
          title="Breathing Exercise"
          description="Find your center with a calming breathing guide."
          onClick={() => setActivePage('breathe')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        />
         <DashboardCard
          title="Daily Affirmations"
          description="Start your day with a positive mindset."
          onClick={() => setActivePage('affirmations')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M17 3l4 4M3 17l4 4M17 21l4-4M3 7l4-4" /></svg>}
        />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, onClick, icon }) => (
  <button
    onClick={onClick}
    className="p-6 bg-white rounded-2xl shadow-md border border-slate-100 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
  >
    <div className="text-calm-blue-500 group-hover:text-calm-blue-600 transition-colors">{icon}</div>
    <h3 className="mt-4 text-xl font-bold text-slate-800">{title}</h3>
    <p className="mt-1 text-slate-500">{description}</p>
  </button>
);


export default Dashboard;
