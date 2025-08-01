import React from 'react';
import VideoCard from './VideoCard';
import { ChevronRight } from 'lucide-react';

const CategorySection = ({ title, signs, icon, color, viewAllLink }) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white text-xl shadow-md`}>
            {icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600">{signs.length} signs available</p>
          </div>
        </div>
        
        {viewAllLink && (
          <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 group">
            <span>View All</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {signs.slice(0, 3).map((sign) => (
          <VideoCard key={sign.id} sign={sign} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;