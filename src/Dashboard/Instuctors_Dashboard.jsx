import React, { useState, useEffect } from 'react'

// Your existing getUserRole function
import { getUserRole } from '../Firebase/Firestore';

const Instructors_Dashboard = ({ userId }) => {
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

  if (userRole === 'Instructor') {
    return (
      <>
        <h1 className='text-5xl text-green-800'>Hello Instructor</h1>
        {/* Add your instructor-specific content here */}
      </>
    );
  }

  // Different message for non-instructors
  return (
    <>
      <h1 className='text-5xl text-red-600'>Access Denied</h1>
      <p className='text-xl text-gray-700 mt-4'>
        You don't have instructor privileges to access this dashboard.
      </p>
      <p className='text-lg text-gray-600 mt-2'>
        Your current role: {userRole || 'Unknown'}
      </p>
    </>
  );
}

export default Instructors_Dashboard