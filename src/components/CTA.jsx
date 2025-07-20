const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary dark:from-gray-800 dark:to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Ready to Start Your Sign Language Journey?</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Join thousands of learners and discover the joy of visual communication.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
            Get Started - It's Free
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors">
            Talk to Our Team
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTA