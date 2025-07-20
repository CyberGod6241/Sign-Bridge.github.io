import { useState } from 'react'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "How does the free trial work?",
      answer: "Our free trial gives you full access to all beginner courses for 7 days. No credit card required. After the trial, you can choose a subscription plan that fits your needs."
    },
    {
      question: "What sign languages do you offer?",
      answer: "We currently offer American Sign Language (ASL) and are expanding to include British Sign Language (BSL) and Auslan (Australian Sign Language) later this year."
    },
    {
      question: "Can I download lessons for offline use?",
      answer: "Yes! Our premium members can download lessons to their mobile devices for offline viewing. This feature is available on our iOS and Android apps."
    },
    {
      question: "How do I become an instructor?",
      answer: "We welcome native signers and certified instructors to join our team. Visit our \"Teach With Us\" section to apply. You'll need to submit a sample lesson and complete our instructor training program."
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Can't find what you're looking for? <a href="#contact" className="text-primary dark:text-accent hover:underline">Contact our team</a>.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleFAQ(index)}
                className="faq-toggle w-full flex justify-between items-center p-6 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-medium text-lg">{faq.question}</h3>
                <i className={`fas fa-chevron-down transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''}`}></i>
              </button>
              <div className={`faq-content px-6 pb-6 ${activeIndex === index ? '' : 'hidden'}`}>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ