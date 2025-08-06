import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './Pages/Homepages'
import { subscribeToAuthChanges } from './Firebase/Firebase'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

import Signup from './components/SignUp'
import Login from './components/Login'
import Instuctors_Dashboard from './Dashboard/Instuctors_Dashboard'
import Leaners_Dashboard from './Dashboard/Leaners_Dashboard'


// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);


//

// Protected Route component
const ProtectedRoute = ({ children, isAuthenticated, isLoading }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route component (redirect to dashboard if already logged in)
const PublicRoute = ({ children, isAuthenticated, isLoading }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setIsLoading(false); // Stop loading once we get the auth state
      
      // Update localStorage for compatibility
      if (user) {
        localStorage.setItem("Status", "Authenticated");
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
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show loading spinner while checking authentication state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Homepage />} />
     
          
          {/* Public routes that redirect to dashboard if user is logged in */}
          <Route 
            path='/signup' 
            element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <Signup />
              </PublicRoute>
            } 
          />
          <Route 
            path='/login' 
            element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <Login />
              </PublicRoute>
            } 
          />
          
          {/* Protected routes */}
          {/* <Route 
            path='/dashboard/*' 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <Dashboard />
              </ProtectedRoute>
            } 
          /> */}
          <Route 
            path='/Instuctors_dashboard/*' 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <Instuctors_Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/Leaners_dashboard/*' 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <Leaners_Dashboard />
              </ProtectedRoute>
            } 
          />
       
          {/* <Route path='*' element={<Navigate to="/" replace />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App