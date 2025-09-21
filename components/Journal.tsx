
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { JournalEntry } from '../types';
import { analyzeJournalEntry } from '../services/geminiService';
import Spinner from './Spinner';

const JournalModal: React.FC<{
  entry: JournalEntry;
  onClose: () => void;
}> = ({ entry, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-modal-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-11/12 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
            <div>
                <h3 id="journal-modal-title" className="text-xl font-bold text-calm-blue-800">
                Journal Entry
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                </p>
            </div>
            <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close journal entry"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <p className="mt-6 text-slate-700 whitespace-pre-wrap">{entry.content}</p>

        {entry.summary && (
          <div className="mt-6 p-4 bg-calm-blue-50 border-l-4 border-calm-blue-500 rounded-r-lg">
            <h4 className="font-semibold text-calm-blue-800">A Gentle Reflection from Haven:</h4>
            <p className="mt-2 text-slate-700 italic">"{entry.summary}"</p>
          </div>
        )}
      </div>
    </div>
  );
};


const Journal: React.FC = () => {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journalEntries', []);
  const [currentText, setCurrentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reflection, setReflection] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);


  const handleSaveAndReflect = async () => {
    if (currentText.trim() === '') return;

    setIsLoading(true);
    setReflection(null);

    const summary = await analyzeJournalEntry(currentText);

    const newEntry: JournalEntry = {
      date: new Date().toISOString(),
      content: currentText,
      summary: summary,
    };

    setEntries([newEntry, ...entries]);
    setReflection(summary);
    setCurrentText('');
    setIsLoading(false);
  };

  return (
    <>
      {selectedEntry && <JournalModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-md border border-slate-100 space-y-4">
          <h2 className="text-2xl font-bold text-calm-blue-800">Your Private Journal</h2>
          <p className="text-slate-600">Write down your thoughts and feelings. When you're ready, Haven will offer a gentle reflection.</p>
          <textarea
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-calm-blue-400 focus:outline-none transition"
            disabled={isLoading}
            aria-label="Journal input"
          />
          <button
            onClick={handleSaveAndReflect}
            disabled={isLoading || currentText.trim() === ''}
            className="w-full flex justify-center items-center px-6 py-3 bg-calm-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-calm-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Spinner /> : 'Save & Reflect'}
          </button>
          {reflection && (
            <div className="mt-6 p-4 bg-calm-blue-50 border-l-4 border-calm-blue-500 rounded-r-lg">
              <h4 className="font-semibold text-calm-blue-800">A Gentle Reflection from Haven:</h4>
              <p className="mt-2 text-slate-700 italic">"{reflection}"</p>
            </div>
          )}
        </div>
        
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-md border border-slate-100">
          <h3 className="text-xl font-bold text-calm-blue-800 mb-4">Past Entries</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <button 
                  key={entry.date} 
                  className="w-full text-left p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-calm-blue-50 hover:border-calm-blue-200 transition-colors"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <p className="font-semibold text-slate-700">
                    {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-slate-500 truncate mt-1">
                    {entry.content}
                  </p>
                </button>
              ))
            ) : (
               <div className="text-center py-10">
                 <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h4 className="mt-4 text-md font-semibold text-slate-700">No Entries Yet</h4>
                <p className="text-slate-500 text-sm mt-1">Your past entries will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Journal;
