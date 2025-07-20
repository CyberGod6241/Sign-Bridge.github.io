import { useState, useEffect } from 'react'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false) // Default to light mode

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light'
    setDarkMode(savedTheme === 'dark')
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    document.documentElement.classList.toggle('dark', newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
  }

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }
  
  return (
    <header className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 md:h-12" />
            <span className="ml-2 text-xs md:text-sm font-bold text-primary dark:text-accent">
              Connecting Hands<br />Building Understanding
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="nav-link relative font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors">Home</a>
            <a href="#features" className="nav-link relative font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors">Features</a>
            <a href="#courses" className="nav-link relative font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors">Courses</a>
            <a href="#teach" className="nav-link relative font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors">Teach With Us</a>
          </nav>

          {/* CTA & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center px-5 py-2 bg-primary hover:bg-secondary text-blue font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl shine-effect relative overflow-hidden">
              Start Learning
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
            
            <button 
              id="theme-toggle" 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button 
              id="mobile-menu-button" 
              onClick={handleMobileMenuClick}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {mobileMenuOpen ? (
                <i className="fas fa-times"></i>
              ) : (
                <i className="fas fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        id="mobile-menu" 
        className={`md:hidden ${mobileMenuOpen ? '' : 'hidden'} bg-white dark:bg-gray-800 shadow-lg`}
      >
        <div className="container mx-auto px-4 py-3 space-y-3">
          <a href="#home" onClick={handleNavClick} className="block px-3 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Home</a>
          <a href="#features" onClick={handleNavClick} className="block px-3 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Features</a>
          <a href="#courses" onClick={handleNavClick} className="block px-3 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Courses</a>
          <a href="#teach" onClick={handleNavClick} className="block px-3 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Teach With Us</a>
          <button className="w-full mt-2 px-4 py-2 bg-primary hover:bg-secondary text-white font-medium rounded-md transition-colors">
            Start Learning
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header