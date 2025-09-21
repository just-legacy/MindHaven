
import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import BreathingExercise from './components/BreathingExercise';
import Affirmations from './components/Affirmations';

type Page = 'dashboard' | 'mood' | 'journal' | 'breathe' | 'affirmations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setActivePage={setCurrentPage} />;
      case 'mood':
        return <MoodTracker />;
      case 'journal':
        return <Journal />;
      case 'breathe':
        return <BreathingExercise />;
      case 'affirmations':
        return <Affirmations />;
      default:
        return <Dashboard setActivePage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {renderPage()}
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>MindHaven - Your safe space for mental clarity.</p>
      </footer>
    </div>
  );
};

export default App;
