import React, { useState, useEffect, useRef } from 'react';
import { Home, Menu, X, LogOut, User, Settings, BarChart3, UserCircle, Sun, Moon, ArrowRight } from 'lucide-react';
import { signOutUser, subscribeToAuthChanges, getCurrentUser} from '../Firebase/Firebase'; // Adjust path to your firebase config

import { getUserRole } from '../Firebase/Firestore';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLoadingRole, setIsLoadingRole] = useState(false);
  const dropdownRef = useRef(null);

  // Navigation items from the original Header component
  const mainNavItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Courses", href: "#courses" },
    { name: "Teach With Us", href: "#teach" }
  ];

  // Get dashboard route based on user role
  const getDashboardRoute = () => {
    if (userRole === 'Instructor') {
      return '/Instructors-dashboard';
    } else {
      return '/Learners-dashboard';
    }
    
  };

  // Profile dropdown menu items - dynamically set dashboard route
  const profileMenuItems = [
    {
      name: "Dashboard",
      icon: BarChart3,
      href: getDashboardRoute(),
      description: userRole === 'instructor' ? 'Instructor dashboard' : userRole === 'learner' ? 'Learner dashboard' : 'View your dashboard'
    },
    {
      name: "Profile",
      icon: UserCircle,
      href: "/profile",
      description: "Manage your profile"
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/settings",
      description: "Account settings"
    }
  ];

  // Fetch user role when user changes
  const fetchUserRole = async (currentUser) => {
    if (currentUser?.uid) {
      setIsLoadingRole(true);
      try {
        const role = await getUserRole(currentUser.uid);
        setUserRole(role);
        
        // Store role in localStorage for quick access
        if (role) {
          localStorage.setItem('userRole', role);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole(null);
      } finally {
        setIsLoadingRole(false);
      }
    } else {
      setUserRole(null);
      localStorage.removeItem('userRole');
    }
  };

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setDarkMode(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set up Firebase auth state listener
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      
      // Fetch user role when user changes
      fetchUserRole(user);
      
      // Update localStorage to maintain compatibility with existing code
      if (user) {
        localStorage.setItem("Status", "Authenticated");
        // Store additional user info if needed
        localStorage.setItem("userData", JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }));
      } else {
        localStorage.removeItem("Status");
        localStorage.removeItem("userData");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRole");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  // Handle dashboard click with role-based routing
  const handleDashboardClick = (e) => {
    e.preventDefault();
    
    if (isLoadingRole) {
      // If still loading role, wait a bit
      return;
    }

    const dashboardRoute = getDashboardRoute();
    window.location.href = dashboardRoute;
    // Alternative: use your router's navigation
    // navigate(dashboardRoute);
    
    setProfileDropdownOpen(false);
  };

  // Firebase logout function using your custom signOutUser
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOutUser();
      
      // Clear all localStorage items
      localStorage.removeItem("Status");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("userRole");
      
      console.log('User signed out successfully');
      
      // Close dropdown
      setProfileDropdownOpen(false);
      
      // Redirect to home page
      window.location.href = '/';
      // Alternative: use your router's navigation
      // navigate('/');
      
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Get display name for the user
  const getDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <header className=" w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <a href='/'>
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 md:h-12" />
            <span className="ml-2 text-xs md:text-sm font-bold text-primary dark:text-accent">
              Connecting Hands
              <br />
              Building Understanding
            </span>
          </div></a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {mainNavItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nav-link relative font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side content */}
          <div className="flex items-center space-x-4">
            
            {/* Start Learning Button - Show when not authenticated */}
            {!isAuthenticated && (
              <a href="/signup">
                <button className="hidden md:flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </a>
            )}

            {/* User Profile Dropdown - Show when authenticated */}
            <div className={`relative ${isAuthenticated ? 'flex' : 'hidden'}`} ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {/* User Avatar */}
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="User Avatar" 
                    className="h-8 w-8 rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400 transition-colors"
                  />
                ) : (
                  <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                    <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt="User Avatar" 
                          className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{getDisplayName()}</p>
                        {user?.email && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        )}
                        {/* Show role badge */}
                        {userRole && (
                          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                            userRole === 'instructor' 
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {profileMenuItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        onClick={item.name === 'Dashboard' ? handleDashboardClick : () => setProfileDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                          item.name === 'Dashboard' && isLoadingRole ? 'opacity-50 cursor-wait' : ''
                        }`}
                      >
                        <item.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <div>
                          <p className="font-medium">
                            {item.name}
                            {item.name === 'Dashboard' && isLoadingRole && (
                              <span className="ml-1 text-xs text-gray-400">(Loading...)</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Logout Button */}
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut className="h-4 w-4" />
                      <div>
                        <p className="font-medium">{isLoggingOut ? 'Logging out...' : 'Logout'}</p>
                        <p className="text-xs text-red-500 dark:text-red-400">Sign out of your account</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={handleMobileMenuClick}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          
          {/* Mobile User Info - Show when authenticated */}
          {isAuthenticated && (
            <div className="py-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="User Avatar" 
                    className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
                  />
                ) : (
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{getDisplayName()}</p>
                  {user?.email && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  )}
                  {/* Show role badge in mobile */}
                  {userRole && (
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                      userRole === 'instructor' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Mobile Profile Menu Items */}
              <div className="space-y-2">
                {profileMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={item.name === 'Dashboard' ? (e) => {
                      e.preventDefault();
                      handleNavClick();
                      if (!isLoadingRole) {
                        window.location.href = getDashboardRoute();
                      }
                    } : handleNavClick}
                    className={`flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 py-1 ${
                      item.name === 'Dashboard' && isLoadingRole ? 'opacity-50' : ''
                    }`}
                  >
                    <item.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    {item.name}
                    {item.name === 'Dashboard' && isLoadingRole && (
                      <span className="text-xs text-gray-400">(Loading...)</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          {mainNavItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-200 py-1"
              onClick={handleNavClick}
            >
              {item.name}
            </a>
          ))}
          
          <hr className="border-gray-100 dark:border-gray-700" />
          
          {/* Mobile - Show Start Learning when not authenticated */}
          {!isAuthenticated && (
            <a href="/signup">
              <button className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center justify-center">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </a>
          )}
          
          {/* Mobile - Show logout when authenticated */}
          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              disabled={isLoggingOut}
              className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors text-sm w-full text-left py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;