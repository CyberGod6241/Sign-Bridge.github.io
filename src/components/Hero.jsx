const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display leading-tight mb-6">
            Learn <span className="text-primary">Sign Language</span> the Right Way
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Master sign language through interactive lessons taught by native signers. Perfect for beginners and advanced learners alike.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-primary hover:bg-secondary text-white font-medium rounded-full transition-all shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-accent text-gray-700 dark:text-gray-300 font-medium rounded-full transition-colors">
              <i className="fas fa-play-circle mr-2"></i> Watch Demo
            </button>
          </div>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
          <video src='/video.mp4' alt="App Preview" className="w-full h-auto" autoPlay loop muted playsInline></video>
        </div>
      </div>
    </section>
  )
}

export default Hero