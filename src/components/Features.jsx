const Features = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Why Choose SignBridge Pro?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform combines expert instruction with cutting-edge technology to deliver the best learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-primary/10 dark:bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <i className="fas fa-video text-primary dark:text-accent text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Interactive Lessons</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn through high-quality video lessons with slow-motion playback and angle adjustments.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-primary/10 dark:bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <i className="fas fa-chalkboard-teacher text-primary dark:text-accent text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Native Instructors</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn from deaf instructors and native signers who bring authentic language and culture.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-primary/10 dark:bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <i className="fas fa-tasks text-primary dark:text-accent text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track your learning journey with personalized dashboards and achievement badges.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features