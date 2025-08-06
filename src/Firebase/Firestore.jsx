// Create this as a new file: Firebase/Firestore.js
import { db } from './Firebase'; // Import your existing Firebase config
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

// Save user profile data to Firestore
export const saveUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    const profileData = {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(userRef, profileData);
    console.log('User profile saved successfully');
    return profileData;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

// Save onboarding responses to Firestore
export const saveOnboardingData = async (userId, onboardingData, userRole) => {
  try {
    const onboardingRef = doc(db, 'onboarding', userId);
    const onboardingRecord = {
      userId,
      role: userRole,
      responses: onboardingData,
      createdAt: serverTimestamp(),
      completedAt: serverTimestamp()
    };
    
    await setDoc(onboardingRef, onboardingRecord);
    console.log('Onboarding data saved successfully');
    return onboardingRecord;
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    throw error;
  }
};

// Get user profile from Firestore
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log('No user profile found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Get onboarding data from Firestore
export const getOnboardingData = async (userId) => {
  try {
    const onboardingRef = doc(db, 'onboarding', userId);
    const onboardingSnap = await getDoc(onboardingRef);
    
    if (onboardingSnap.exists()) {
      return onboardingSnap.data();
    } else {
      console.log('No onboarding data found');
      return null;
    }
  } catch (error) {
    console.error('Error getting onboarding data:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, updateData) => {
  try {
    const userRef = doc(db, 'users', userId);
    const updatedData = {
      ...updateData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(userRef, updatedData);
    console.log('User profile updated successfully');
    return updatedData;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Get all users by role (for admin purposes)
export const getUsersByRole = async (role) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', role), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    return users;
  } catch (error) {
    console.error('Error getting users by role:', error);
    throw error;
  }
};

export const getUserRole = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data().role;
    } else {
      console.log('No user found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user role:', error);
    throw error;
  }
};

export const hasCompletedOnboarding = async (userId) => {
  try {
    const onboardingRef = doc(db, 'onboarding', userId);
    const onboardingSnap = await getDoc(onboardingRef);
    
    return onboardingSnap.exists();
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};
export const getUserDashboardUrl = async (userId) => {
  try {
    const userRole = await getUserRole(userId);
    
    switch (userRole) {
      case 'Instructor':
        return '/Instructors_dashboard';
      case 'Learner':
        return '/Learners_dashboard';
      default:
        return '/signup';
    }
  } catch (error) {
    console.error('Error getting dashboard URL:', error);
    return '/signup';
  }
};   