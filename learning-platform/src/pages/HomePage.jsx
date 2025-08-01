import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import VideoCard from '../components/VideoCard';
import { signsData, categories, getSignOfTheDay } from '../data/signsData';
import { Sparkles, TrendingUp, Award } from 'lucide-react';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const signOfTheDay = getSignOfTheDay();

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const allSigns = Object.values(signsData).flat();
    const results = allSigns.filter(sign =>
      sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
    setIsSearching(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-4xl">🤟</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master Sign Language
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                One Sign at a Time
              </span>
            </h1>

            <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Learn American Sign Language through interactive video lessons. Start with the basics and progress to advanced conversations with our comprehensive learning platform.
            </p>

            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} placeholder="Search for signs like 'hello', 'thank you', or browse categories..." />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-purple-200">Video Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-purple-200">Students Learning</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-purple-200">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Results */}
        {isSearching && (
          <section className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-md">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
                <p className="text-gray-600">{searchResults.length} signs found</p>
              </div>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((sign) => (
                  <VideoCard key={sign.id} sign={sign} showCategory={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No signs found</h3>
                <p className="text-gray-600">Try searching for different terms or browse our categories below.</p>
              </div>
            )}
          </section>
        )}

        {!isSearching && (
          <>
            {/* Sign of the Day */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-4">
                    <Award size={24} />
                    <h2 className="text-2xl font-bold">Sign of the Day</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-3xl font-bold mb-3">{signOfTheDay.name}</h3>
                      <p className="text-orange-100 text-lg mb-6">{signOfTheDay.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                          {signOfTheDay.category}
                        </span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium capitalize">
                          {signOfTheDay.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <VideoCard sign={signOfTheDay} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Categories */}
            {categories.map((category) => (
              <CategorySection
                key={category.id}
                title={category.name}
                signs={signsData[category.id]}
                icon={category.icon}
                color={category.color}
                viewAllLink={true}
              />
            ))}

            {/* Learning Path Section */}
            <section className="mt-16 bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="w-12 h-12 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Journey</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Follow our structured learning path designed by sign language experts to take you from beginner to advanced level.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: 'Alphabet', desc: 'Master the ASL alphabet', status: 'completed' },
                  { step: 2, title: 'Basic Signs', desc: 'Learn essential everyday signs', status: 'current' },
                  { step: 3, title: 'Phrases', desc: 'Combine signs into phrases', status: 'locked' },
                  { step: 4, title: 'Conversations', desc: 'Practice full conversations', status: 'locked' }
                ].map((item) => (
                  <div key={item.step} className={`p-6 rounded-xl border-2 text-center transition-all duration-200 ${
                    item.status === 'completed' 
                      ? 'bg-green-50 border-green-200' 
                      : item.status === 'current'
                      ? 'bg-purple-50 border-purple-200 shadow-md'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      item.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : item.status === 'current'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;