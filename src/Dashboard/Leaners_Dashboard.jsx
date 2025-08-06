import React, { useState, useEffect } from 'react'

// Your existing getUserRole function (assuming it's imported or defined elsewhere)
import { getUserRole } from '../Firebase/Firestore';

const Learners_Dashboard = ({ userId }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (userId) {
          const role = await getUserRole(userId);
          setUserRole(role);
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  // Check if user is a learner/student
  if (userRole === 'Learner' || userRole === 'student') {
    return (
      <>
        <h1 className='text-3xl text-blue-500'>Welcome Back Learner</h1>
        {/* Add your learner-specific content here */}
        <div className='mt-6'>
          <p className='text-lg text-gray-700'>Ready to continue your learning journey?</p>
        </div>
      </>
    );
  }

  // Different messages based on other roles
  const renderRoleBasedContent = () => {
    switch (userRole) {
      case 'instructor':
        return (
          <>
            <h1 className='text-3xl text-green-600'>Hello Instructor</h1>
            <p className='text-lg text-gray-700 mt-4'>
              This is the learners' area. You might want to visit the instructor dashboard instead.
            </p>
          </>
        );
      case 'admin':
        return (
          <>
            <h1 className='text-3xl text-purple-600'>Hello Admin</h1>
            <p className='text-lg text-gray-700 mt-4'>
              You're viewing the learners' dashboard with admin privileges.
            </p>
          </>
        );
      default:
        return (
          <>
            <h1 className='text-3xl text-red-600'>Access Restricted</h1>
            <p className='text-lg text-gray-700 mt-4'>
              This dashboard is designed for learners. Please check your account permissions.
            </p>
            <p className='text-sm text-gray-600 mt-2'>
              Your current role: {userRole || 'Unknown'}
            </p>
          </>
        );
    }
  };

  return renderRoleBasedContent();
}

export default Learners_Dashboard