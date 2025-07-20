const Testimonials = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">What Our Students Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of happy learners who have transformed their communication skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah J." className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold">Sarah J.</h4>
                <div className="flex">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              "As a teacher, I wanted to communicate better with my deaf students. SignBridge made learning ASL so accessible and fun!"
            </p>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Michael T." className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold">Michael T.</h4>
                <div className="flex">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              "The video lessons are incredibly clear, and being able to slow them down helped me master difficult signs."
            </p>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Priya K." className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold">Priya K.</h4>
                <div className="flex">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              "I've tried other apps, but learning from native signers on SignBridge made all the difference in my fluency."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials