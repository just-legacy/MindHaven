
import React from 'react';

type Page = 'dashboard' | 'mood' | 'journal' | 'breathe' | 'affirmations';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, setCurrentPage, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-calm-blue-100 text-calm-blue-800'
          : 'text-slate-600 hover:bg-calm-blue-100/50 hover:text-calm-blue-700'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setCurrentPage('dashboard')} className="flex items-center group" aria-label="Go to dashboard">
             <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-calm-blue-600 group-hover:text-calm-blue-700 transition-colors">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor"/>
                <path d="M12.5 7.5C12.5 9.17 13.83 10.5 15.5 10.5C16.04 10.5 16.55 10.35 17 10.11V12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7H12.5V7.5Z" fill="currentColor" fillOpacity="0.5"/>
            </svg>
            <span className="ml-2 text-2xl font-bold text-calm-blue-800 group-hover:text-calm-blue-900 transition-colors">MindHaven</span>
          </button>
          <nav className="flex space-x-1 sm:space-x-4">
            <NavLink page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage}>Dashboard</NavLink>
            <NavLink page="mood" currentPage={currentPage} setCurrentPage={setCurrentPage}>Mood</NavLink>
            <NavLink page="journal" currentPage={currentPage} setCurrentPage={setCurrentPage}>Journal</NavLink>
            <NavLink page="breathe" currentPage={currentPage} setCurrentPage={setCurrentPage}>Breathe</NavLink>
            <NavLink page="affirmations" currentPage={currentPage} setCurrentPage={setCurrentPage}>Affirm</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
