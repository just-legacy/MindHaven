
import React, { useState, useEffect, useCallback } from 'react';
import { getPositiveAffirmation } from '../services/geminiService';
import Spinner from './Spinner';

const Affirmations: React.FC = () => {
  const [affirmation, setAffirmation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchAffirmation = useCallback(async () => {
    setIsLoading(true);
    const newAffirmation = await getPositiveAffirmation();
    setAffirmation(newAffirmation);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAffirmation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md border border-slate-100 min-h-[60vh]">
      <h2 className="text-3xl font-bold text-calm-blue-800 mb-8 text-center">Your Daily Affirmation</h2>
      <div className="w-full max-w-2xl min-h-[120px] flex items-center justify-center p-6 bg-calm-green-100 border-l-4 border-calm-green-500 rounded-r-lg text-center">
        {isLoading ? (
          <Spinner className="text-calm-blue-600" />
        ) : (
          <p className="text-2xl italic text-calm-green-800">
            "{affirmation}"
          </p>
        )}
      </div>
      <button
        onClick={fetchAffirmation}
        disabled={isLoading}
        className="mt-8 px-8 py-3 bg-calm-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-calm-blue-700 disabled:bg-slate-400 transition-colors flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20l16-16" />
        </svg>
        <span>Get a New Affirmation</span>
      </button>
    </div>
  );
};

export default Affirmations;
