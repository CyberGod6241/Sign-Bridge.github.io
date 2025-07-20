const Courses = () => {
  return (
    <section id="courses" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Popular Courses</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start with beginner courses or advance your skills with specialized vocabulary.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Course 1 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-blue-100 dark:bg-gray-700 relative">
              <img src="https://placehold.co/600x400?text=ASL+101" alt="ASL Basics" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Beginner
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">ASL for Beginners</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Master the fundamentals of American Sign Language in just 4 weeks.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  <span className="font-medium">4.9</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">(128)</span>
                </div>
                <button className="text-primary dark:text-accent font-medium hover:underline">View Course</button>
              </div>
            </div>
          </div>
          
          {/* Course 2 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-green-100 dark:bg-gray-700 relative">
              <img src="https://placehold.co/600x400?text=ASL+201" alt="ASL Intermediate" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Intermediate
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">ASL Conversation Skills</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Develop fluency for everyday conversations in American Sign Language.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  <span className="font-medium">4.8</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">(92)</span>
                </div>
                <button className="text-primary dark:text-accent font-medium hover:underline">View Course</button>
              </div>
            </div>
          </div>
          
          {/* Course 3 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-purple-100 dark:bg-gray-700 relative">
              <img src="https://placehold.co/600x400?text=Medical+ASL" alt="Medical ASL" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Advanced
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Medical ASL Vocabulary</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Specialized signs for healthcare professionals and medical settings.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  <span className="font-medium">4.9</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">(76)</span>
                </div>
                <button className="text-primary dark:text-accent font-medium hover:underline">View Course</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="px-6 py-3 border border-primary dark:border-accent text-primary dark:text-accent font-medium rounded-full hover:bg-primary/10 dark:hover:bg-accent/10 transition-colors">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  )
}

export default Courses