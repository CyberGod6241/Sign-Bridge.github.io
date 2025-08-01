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
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-lg">🤟</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SignLearn</h1>
              <p className="text-xs text-gray-500">Master Sign Language</p>
            </div>
          </Link>

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