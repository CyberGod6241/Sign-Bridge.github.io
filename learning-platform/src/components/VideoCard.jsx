import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, BarChart3 } from 'lucide-react';

const VideoCard = ({ sign, showCategory = false }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-50';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-50';
      case 'advanced':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Link to={`/video/${sign.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden border border-gray-100">
        {/* Video Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Play className="w-6 h-6 text-purple-600 ml-1" fill="currentColor" />
            </div>
          </div>
          
          {/* Video preview overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category badge */}
          {showCategory && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full backdrop-blur-sm">
                {sign.category}
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
              {sign.name}
            </h3>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(sign.difficulty)}`}>
              <div className="flex items-center space-x-1">
                <BarChart3 size={12} />
                <span className="capitalize">{sign.difficulty}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {sign.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <Clock size={14} />
              <span>2-3 min</span>
            </div>
            
            <div className="text-purple-600 text-sm font-medium group-hover:text-purple-700">
              Learn Now →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;