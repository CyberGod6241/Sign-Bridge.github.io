import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Search, User } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
      <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 md:h-12" />
            <span className="ml-2 text-xs md:text-sm font-bold text-primary dark:text-accent">
              Connecting Hands
              <br />
              Building Understanding
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === '/' 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/lessons" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === '/lessons' 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <Book size={18} />
              <span>Lessons</span>
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;