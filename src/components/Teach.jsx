const Teach = () => {
  return (
    <section id="teach" className="py-20 bg-primary dark:bg-gray-800 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Become an Instructor</h2>
              <p className="text-lg mb-6 opacity-90">
                Share your knowledge and earn income by teaching sign language on our platform. We handle the technology, you focus on teaching.
              </p>
              <button className="px-6 py-3 bg-white text-primary font-medium rounded-full border-2 hover:bg-gray-100 transition-colors dark:border-white dark:bg-gray-800 dark:hover:bg-gray-700">
                Apply Now
              </button>
            </div>
            
            <div className="md:w-5/12 bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h3 className="text-xl font-bold mb-4">Need help with your application?</h3>
              <p className="text-sm opacity-80 mb-4">
                Our AI assistant can help craft your instructor bio based on your experience.
              </p>
              <textarea className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white mb-3" rows="3" placeholder="Tell us about your teaching experience..."></textarea>
              <button className="w-full px-4 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors dark:text-black">
                Generate Bio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Teach