
import React, { useState, useEffect } from 'react';

const breathingCycle = [
  { text: 'Get Ready...', duration: 2000 },
  { text: 'Breathe In', duration: 4000 },
  { text: 'Hold', duration: 4000 },
  { text: 'Breathe Out', duration: 6000 },
];

const BreathingExercise: React.FC = () => {
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCycleIndex((prevIndex) => (prevIndex + 1) % breathingCycle.length);
    }, breathingCycle[cycleIndex].duration);

    return () => clearTimeout(timer);
  }, [cycleIndex]);

  const currentPhase = breathingCycle[cycleIndex];
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md border border-slate-100 min-h-[60vh]">
      <h2 className="text-3xl font-bold text-calm-blue-800 mb-8">Guided Breathing</h2>
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute w-full h-full bg-calm-blue-200 rounded-full animate-breathe"></div>
        <div className="absolute w-5/6 h-5/6 bg-calm-blue-300 rounded-full animate-breathe" style={{ animationDelay: '0.2s' }}></div>
        <div className="relative z-10 w-4/5 h-4/5 bg-calm-blue-400 rounded-full flex items-center justify-center">
            <span className="text-3xl font-semibold text-white transition-opacity duration-500">
            {currentPhase.text}
            </span>
        </div>
      </div>
      <p className="mt-8 text-slate-600 text-lg">Follow the prompts to calm your mind and body.</p>
    </div>
  );
};

export default BreathingExercise;
