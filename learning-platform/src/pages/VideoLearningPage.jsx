import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSignById, getSignsByCategory } from '../data/signsData';
import VideoPlayer from '../components/VideoPlayer';
import VideoCard from '../components/VideoCard';
import { ArrowLeft, ArrowRight, BookOpen, Users, Clock, BarChart3 } from 'lucide-react';

const VideoLearningPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sign = getSignById(id);

  if (!sign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign Not Found</h1>
          <p className="text-gray-600 mb-6">The sign you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const categorySigns = getSignsByCategory(sign.category);
  const currentIndex = categorySigns.findIndex(s => s.id === id);
  const previousSign = currentIndex > 0 ? categorySigns[currentIndex - 1] : null;
  const nextSign = currentIndex < categorySigns.length - 1 ? categorySigns[currentIndex + 1] : null;
  const relatedSigns = categorySigns.filter(s => s.id !== id).slice(0, 3);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'advanced':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to lessons</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="mb-8">
              <VideoPlayer
                videoUrl={sign.videoUrl}
                title={sign.name}
                autoplay={true}
                loop={true}
              />
            </div>

            {/* Sign Information */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{sign.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium capitalize">
                      {sign.category}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(sign.difficulty)}`}>
                      <div className="flex items-center space-x-1">
                        <BarChart3 size={14} />
                        <span className="capitalize">{sign.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {sign.description}
              </p>

              {/* Learning Tips */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen size={20} className="mr-2 text-blue-600" />
                  Learning Tips
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Practice the sign slowly at first, then gradually increase speed
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Pay attention to hand shape, movement, and facial expressions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Use the slow motion feature to study the details
                  </li>
                </ul>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {previousSign ? (
                  <Link
                    to={`/video/${previousSign.id}`}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 group"
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                    <div>
                      <div className="text-sm text-gray-600">Previous</div>
                      <div className="font-medium text-gray-900">{previousSign.name}</div>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}

                {nextSign && (
                  <Link
                    to={`/video/${nextSign.id}`}
                    className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 group"
                  >
                    <div className="text-right">
                      <div className="text-sm text-purple-200">Next</div>
                      <div className="font-medium">{nextSign.name}</div>
                    </div>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-500" />
                    <span className="text-gray-600">Duration</span>
                  </div>
                  <span className="font-medium">2-3 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-gray-600">Learners</span>
                  </div>
                  <span className="font-medium">1.2k+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 size={16} className="text-gray-500" />
                    <span className="text-gray-600">Success Rate</span>
                  </div>
                  <span className="font-medium text-green-600">94%</span>
                </div>
              </div>
            </div>

            {/* Related Signs */}
            {relatedSigns.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  More in {sign.category.charAt(0).toUpperCase() + sign.category.slice(1)}
                </h3>
                <div className="space-y-4">
                  {relatedSigns.map((relatedSign) => (
                    <Link
                      key={relatedSign.id}
                      to={`/video/${relatedSign.id}`}
                      className="block p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          <span className="text-sm font-medium text-purple-700">
                            {relatedSign.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                            {relatedSign.name}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {relatedSign.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Tracker */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Category Progress</span>
                    <span>{Math.floor((currentIndex / categorySigns.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-500"
                      style={{ width: `${(currentIndex / categorySigns.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-purple-100">
                  {currentIndex + 1} of {categorySigns.length} signs completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLearningPage;