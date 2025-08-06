import  { useState, useEffect } from 'react';
import { saveUserProfile, saveOnboardingData } from '../Firebase/Firestore';
import{
  signInWithGoogle,
  signInWithGoogleRedirect,
  handleRedirectResult,
  signUpWithEmail
} from '../Firebase/Firebase'

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    role: ''
  });

  const [showRoleSelection, setShowRoleSelection] = useState(true);
const [selectedRole, setSelectedRole] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
const [currentQuestion, setCurrentQuestion] = useState(0);

const [onboardingData, setOnboardingData] = useState({
  experience: '',
  certifications: [],
  specializations: [],
  teachingMode: '',
  availability: '',
  motivation: ''
});


const onboardingQuestions = [
  {
    id: 'experience',
    title: 'Teaching Experience',
    question: 'How long have you been teaching sign language?',
    type: 'single',
    options: [
      { value: 'new', label: 'New to teaching (0-1 years)', icon: '🌱' },
      { value: 'beginner', label: 'Beginner (1-3 years)', icon: '📚' },
      { value: 'intermediate', label: 'Intermediate (3-5 years)', icon: '👨‍🏫' },
      { value: 'experienced', label: 'Experienced (5+ years)', icon: '🏆' }
    ]
  },
  {
    id: 'certifications',
    title: 'Certifications',
    question: 'What certifications do you have?',
    type: 'multiple',
    options: [
      { value: 'asl', label: 'ASL Certified', icon: '✋' },
      { value: 'interpreter', label: 'Certified Interpreter', icon: '🗣️' },
      { value: 'deaf_studies', label: 'Deaf Studies Degree', icon: '🎓' },
      { value: 'teaching', label: 'Teaching Certificate', icon: '📜' },
      { value: 'other', label: 'Other Certification', icon: '⭐' },
      { value: 'none', label: 'No formal certification', icon: '💪' }
    ]
  },
  {
    id: 'specializations',
    title: 'Areas of Expertise',
    question: 'Which areas would you like to teach?',
    type: 'multiple',
    options: [
      { value: 'basic_asl', label: 'Basic ASL', icon: '👋' },
      { value: 'intermediate_asl', label: 'Intermediate ASL', icon: '🤟' },
      { value: 'advanced_asl', label: 'Advanced ASL', icon: '🙌' },
      { value: 'fingerspelling', label: 'Fingerspelling', icon: '🔤' },
      { value: 'deaf_culture', label: 'Deaf Culture', icon: '🏛️' },
      { value: 'business_signs', label: 'Business/Professional Signs', icon: '💼' },
      { value: 'medical_signs', label: 'Medical Signs', icon: '🏥' },
      { value: 'kids_signs', label: 'Sign Language for Kids', icon: '👶' }
    ]
  },
  {
    id: 'teachingMode',
    title: 'Teaching Preference',
    question: 'How do you prefer to teach?',
    type: 'single',
    options: [
      { value: 'video_lessons', label: 'Pre-recorded Video Lessons', icon: '🎥' },
      { value: 'live_sessions', label: 'Live Interactive Sessions', icon: '📹' },
      { value: 'both', label: 'Both Video & Live Sessions', icon: '🎬' },
      { value: 'materials', label: 'Educational Materials & Guides', icon: '📖' }
    ]
  },
  {
    id: 'availability',
    title: 'Time Commitment',
    question: 'How much time can you dedicate to teaching?',
    type: 'single',
    options: [
      { value: 'part_time', label: 'Part-time (5-10 hours/week)', icon: '⏰' },
      { value: 'regular', label: 'Regular (10-20 hours/week)', icon: '📅' },
      { value: 'full_time', label: 'Full-time (20+ hours/week)', icon: '💼' },
      { value: 'flexible', label: 'Flexible schedule', icon: '🔄' }
    ]
  },
  {
    id: 'motivation',
    title: 'Your Motivation',
    question: 'What motivates you to teach sign language?',
    type: 'single',
    options: [
      { value: 'passion', label: 'Passion for sign language & deaf culture', icon: '❤️' },
      { value: 'accessibility', label: 'Making communication accessible', icon: '🌍' },
      { value: 'community', label: 'Building inclusive communities', icon: '🤝' },
      { value: 'career', label: 'Career development', icon: '📈' },
      { value: 'impact', label: 'Making a positive impact', icon: '✨' }
    ]
  }
];

const learnerOnboardingQuestions = [
  {
    id: 'experience',
    title: 'Your Sign Language Experience',
    question: 'What\'s your current level with sign language?',
    type: 'single',
    options: [
      { value: 'complete_beginner', label: 'Complete beginner - never learned before', icon: '🌱' },
      { value: 'basic', label: 'Basic - know the alphabet and some words', icon: '✋' },
      { value: 'intermediate', label: 'Intermediate - can have simple conversations', icon: '🤟' },
      { value: 'advanced', label: 'Advanced - fluent but want to improve', icon: '🙌' }
    ]
  },
  {
    id: 'motivation',
    title: 'Why Learn Sign Language?',
    question: 'What motivates you to learn sign language?',
    type: 'multiple',
    options: [
      { value: 'family_friend', label: 'Communicate with deaf family/friends', icon: '👨‍👩‍👧‍👦' },
      { value: 'career', label: 'Career advancement or requirements', icon: '💼' },
      { value: 'personal_interest', label: 'Personal interest and curiosity', icon: '🧠' },
      { value: 'accessibility', label: 'Support accessibility and inclusion', icon: '🌍' },
      { value: 'deaf_culture', label: 'Learn about deaf culture', icon: '🏛️' },
      { value: 'volunteer', label: 'Volunteer or community work', icon: '🤝' },
      { value: 'academic', label: 'Academic or educational purposes', icon: '🎓' }
    ]
  },
  {
    id: 'learning_goals',
    title: 'Learning Goals',
    question: 'What would you like to focus on learning?',
    type: 'multiple',
    options: [
      { value: 'basic_conversation', label: 'Basic everyday conversation', icon: '💬' },
      { value: 'fingerspelling', label: 'Fingerspelling and alphabet', icon: '🔤' },
      { value: 'family_signs', label: 'Family and relationship signs', icon: '👨‍👩‍👧' },
      { value: 'work_signs', label: 'Professional/workplace signs', icon: '🏢' },
      { value: 'emergency_signs', label: 'Emergency and safety signs', icon: '🚨' },
      { value: 'cultural_aspects', label: 'Deaf culture and etiquette', icon: '🎭' },
      { value: 'advanced_grammar', label: 'Advanced grammar and structure', icon: '📚' },
      { value: 'storytelling', label: 'Storytelling and expressions', icon: '📖' }
    ]
  },
  {
    id: 'learning_style',
    title: 'Learning Preference',
    question: 'How do you prefer to learn?',
    type: 'single',
    options: [
      { value: 'video_lessons', label: 'Self-paced video lessons', icon: '🎥' },
      { value: 'live_classes', label: 'Live interactive classes', icon: '📹' },
      { value: 'practice_sessions', label: 'Practice with other learners', icon: '👥' },
      { value: 'one_on_one', label: 'One-on-one tutoring', icon: '👨‍🏫' },
      { value: 'mixed_approach', label: 'Mix of different methods', icon: '🎯' }
    ]
  },
  {
    id: 'time_commitment',
    title: 'Time Availability',
    question: 'How much time can you dedicate to learning?',
    type: 'single',
    options: [
      { value: 'casual', label: '15-30 minutes a few times a week', icon: '⏰' },
      { value: 'regular', label: '30-60 minutes, 3-4 times a week', icon: '📅' },
      { value: 'intensive', label: '1+ hours daily', icon: '💪' },
      { value: 'flexible', label: 'Flexible - depends on my schedule', icon: '🔄' }
    ]
  },
  {
    id: 'preferred_pace',
    title: 'Learning Pace',
    question: 'What learning pace works best for you?',
    type: 'single',
    options: [
      { value: 'slow_steady', label: 'Slow and steady - I like to master each step', icon: '🐢' },
      { value: 'moderate', label: 'Moderate pace - balanced approach', icon: '🚶‍♀️' },
      { value: 'fast_track', label: 'Fast track - I learn quickly', icon: '🏃‍♂️' },
      { value: 'adaptive', label: 'Adaptive - adjust based on difficulty', icon: '🎚️' }
    ]
  }
];

const handleOnboardingAnswer = (questionId, value, isMultiple = false) => {
  setOnboardingData(prev => {
    if (isMultiple) {
      const currentValues = prev[questionId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [questionId]: newValues };
    }
    return { ...prev, [questionId]: value };
  });
};


const nextQuestion = () => {
  const maxQuestions = selectedRole === 'Instructor' 
    ? onboardingQuestions.length 
    : learnerOnboardingQuestions.length;
    
  if (currentQuestion < maxQuestions - 1) {
    setCurrentQuestion(prev => prev + 1);
  } else {
    // Finished onboarding, show signup form
    setShowOnboarding(false);
  }
};

const prevQuestion = () => {
  if (currentQuestion > 0) {
    setCurrentQuestion(prev => prev - 1);
  }
};


const isCurrentQuestionAnswered = () => {
  const questions = selectedRole === 'Instructor' 
    ? onboardingQuestions 
    : learnerOnboardingQuestions;
  const question = questions[currentQuestion];
  const answer = onboardingData[question.id];
  
  if (question.type === 'multiple') {
    return answer && answer.length > 0;
  }
  return answer && answer !== '';
};
const handleRoleSelection = (role) => {
  setSelectedRole(role);
  setFormData(prev => ({
    ...prev,
    role: role
  }));
  
  // Show onboarding for both instructors and learners
  setShowOnboarding(true);
  setShowRoleSelection(false);
  setCurrentQuestion(0); // Reset to first question
};

const goBackToRoleSelection = () => {
  setShowRoleSelection(true);
  setShowOnboarding(false);
  setCurrentQuestion(0);
  // Reset onboarding data
  setOnboardingData({
    experience: '',
    certifications: [],
    specializations: [],
    teachingMode: '',
    availability: '',
    motivation: '',
    learning_goals: [],
    learning_style: '',
    time_commitment: '',
    preferred_pace: ''
  });
};
  
  // Check for redirect result on component mount
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const user = await handleRedirectResult();
        if (user) {
          handleGoogleAuthSuccess(user);
        }
      } catch (error) {
        setMessage({ type: 'error', text: error.message });
      }
    };
    
    checkRedirect();
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Password strength check
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };
  
  const calculatePasswordStrength = (password) => {
    // Simple password strength calculation
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  
  setLoading(true);
  setMessage({ type: '', text: '' });
  
  try {
    // Create the user account first
    const user = await signUpWithEmail(
      formData.email, 
      formData.password,
      formData.fullName
    );
    
    // Prepare user profile data
    const userProfileData = {
      uid: user.uid,
      fullName: formData.fullName,
      email: formData.email,
      role: selectedRole,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL || null,
      accountType: 'email' // to distinguish from Google accounts
    };
    
    // Save user profile to Firestore
    await saveUserProfile(user.uid, userProfileData);
    
    // Save onboarding data to Firestore
    await saveOnboardingData(user.uid, onboardingData, selectedRole);
    
    // Success message and redirect
    setMessage({ 
      type: 'success', 
      text: `Registration successful! Setting up your ${selectedRole.toLowerCase()} dashboard...` 
    });
    
  // In handleSubmit, REPLACE:
if (selectedRole === 'Instructor') {
  window.location.href = '/Instructors_dashboard';
} else {
  window.location.href = '/Learners_dashboard';
}

// In handleGoogleAuthSuccess, REPLACE:
if (selectedRole === 'Instructor') {
  window.location.href = '/Instructors_dashboard';
} else {
  window.location.href = '/Learners_dashboard';
}

// WITH consistent URLs:
if (selectedRole === 'Instructor') {
  window.location.href = '/Instuctors_dashboard';
} else {
  window.location.href = '/Leaners_dashboard';
}
    
    // Redirect to appropriate dashboard based on role
    setTimeout(() => {
      if (selectedRole === 'Instructor') {
        window.location.href = '/Instructors_dashboard';
      } else {
        window.location.href = '/Learners_dashboard';
      }
    }, 200);
    
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific Firebase auth errors
    let errorMessage = 'An error occurred during registration. Please try again.';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already registered. Please use a different email or sign in.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'The email address is not valid.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Please choose a stronger password.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setMessage({ type: 'error', text: errorMessage });
  } finally {
    setLoading(false);
  }
};
  
  const handleGoogleSignIn = async (useRedirect = false) => {
    setLoading(true);
    try {
      if (useRedirect) {
        // Better for mobile devices
        await signInWithGoogleRedirect();
        // This will redirect the user, and the page will reload
      } else {
        // Popup method - better for desktop
        const user = await signInWithGoogle();
        handleGoogleAuthSuccess(user);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
    }
  };
  
const handleGoogleAuthSuccess = async (user) => {
  try {
    setMessage({ 
      type: 'success', 
      text: `Welcome, ${user.displayName || 'User'}! Setting up your ${selectedRole.toLowerCase()} dashboard...` 
    });
    
    // Prepare user profile data for Google users
    const userProfileData = {
      uid: user.uid,
      fullName: user.displayName || '',
      email: user.email,
      role: selectedRole,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL || null,
      accountType: 'google'
    };
    
    // Save user profile to Firestore
    await saveUserProfile(user.uid, userProfileData);
    
    // Save onboarding data to Firestore (if user went through onboarding)
    if (Object.keys(onboardingData).some(key => onboardingData[key])) {
      await saveOnboardingData(user.uid, onboardingData, selectedRole);
    }
    
    // Store user data in localStorage
  // localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // Redirect to appropriate dashboard based on role
    setTimeout(() => {
      if (selectedRole === 'Instructor') {
        window.location.href = '/Instructors_dashboard';
      } else {
        window.location.href = '/Learners_dashboard';
      }
    }, 200);
    
  } catch (error) {
    console.error('Error saving Google user data:', error);
    setMessage({ 
      type: 'error', 
      text: 'Account created but there was an issue setting up your profile. Please contact support.' 
    });
  }
  
  setLoading(false);
};
  
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };
  
  // Determine password strength indicator class
  const getPasswordStrengthClass = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
 return (
  <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {showRoleSelection ? 'Choose Your Role' : 'Create your account'}
      </h2>
      {selectedRole && !showRoleSelection && (
        <p className="mt-2 text-center text-sm text-gray-600">
          Signing up as: <span className="font-medium text-blue-600">{selectedRole}</span>
          <button 
            onClick={goBackToRoleSelection}
            className="ml-2 text-blue-600 hover:text-blue-500 underline"
          >
            Change
          </button>
        </p>
      )}
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    {showRoleSelection ? (
  // Role Selection Cards (keep your existing role selection JSX)
    <div className="space-y-4">
          <div 
            onClick={() => handleRoleSelection('Instructor')}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Instructor</h3>
              <p className="mt-2 text-sm text-gray-500">
                Create and manage courses, track student progress, and share your expertise
              </p>
            </div>
          </div>

          <div 
            onClick={() => handleRoleSelection('Learner')}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Learner</h3>
              <p className="mt-2 text-sm text-gray-500">
                Discover courses, learn new skills, and track your learning journey
              </p>
            </div>
          </div>
        </div>
) : showOnboarding ? (
  // Onboarding Questions
  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {currentQuestion + 1} of {
            selectedRole === 'Instructor' 
              ? onboardingQuestions.length 
              : learnerOnboardingQuestions.length
          }
        </span>
        <button
          onClick={goBackToRoleSelection}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Change Role
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${((currentQuestion + 1) / (
              selectedRole === 'Instructor' 
                ? onboardingQuestions.length 
                : learnerOnboardingQuestions.length
            )) * 100}%` 
          }}
        ></div>
      </div>
    </div>

     <div className="text-center mb-8">
      <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">
        {selectedRole === 'Instructor' ? (
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl">👨‍🏫</span>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {selectedRole === 'Instructor' 
          ? onboardingQuestions[currentQuestion].title
          : learnerOnboardingQuestions[currentQuestion].title
        }
      </h3>
      <p className="text-gray-600">
        {selectedRole === 'Instructor' 
          ? onboardingQuestions[currentQuestion].question
          : learnerOnboardingQuestions[currentQuestion].question
        }
      </p>
    </div>


     <div className="space-y-3 mb-8">
      {(selectedRole === 'Instructor' 
        ? onboardingQuestions[currentQuestion].options
        : learnerOnboardingQuestions[currentQuestion].options
      ).map((option) => {
        const currentQuestions = selectedRole === 'Instructor' 
          ? onboardingQuestions 
          : learnerOnboardingQuestions;
        
        const isSelected = currentQuestions[currentQuestion].type === 'multiple'
          ? (onboardingData[currentQuestions[currentQuestion].id] && 
             onboardingData[currentQuestions[currentQuestion].id].includes(option.value))
          : onboardingData[currentQuestions[currentQuestion].id] === option.value;

        return (
          <div
            key={option.value}
            onClick={() => handleOnboardingAnswer(
              currentQuestions[currentQuestion].id, 
              option.value, 
              currentQuestions[currentQuestion].type === 'multiple'
            )}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
              isSelected 
                ? selectedRole === 'Instructor'
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-green-500 bg-green-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{option.icon}</span>
              <div className="flex-1">
                <p className={`font-medium ${
                  isSelected 
                    ? selectedRole === 'Instructor' 
                      ? 'text-blue-900' 
                      : 'text-green-900'
                    : 'text-gray-900'
                }`}>
                  {option.label}
                </p>
              </div>
              {(selectedRole === 'Instructor' 
                ? onboardingQuestions[currentQuestion].type === 'multiple'
                : learnerOnboardingQuestions[currentQuestion].type === 'multiple'
              ) && (
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  isSelected 
                    ? selectedRole === 'Instructor'
                      ? 'bg-blue-500 border-blue-500'
                      : 'bg-green-500 border-green-500'
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between">
      <button
        onClick={prevQuestion}
        disabled={currentQuestion === 0}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          currentQuestion === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Previous
      </button>
      
      <button
        onClick={nextQuestion}
        disabled={!isCurrentQuestionAnswered()}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          !isCurrentQuestionAnswered()
            ? selectedRole === 'Instructor'
              ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
              : 'bg-green-300 text-green-100 cursor-not-allowed'
            : selectedRole === 'Instructor'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {currentQuestion === (selectedRole === 'Instructor' 
          ? onboardingQuestions.length - 1 
          : learnerOnboardingQuestions.length - 1
        ) ? 'Continue to Signup' : 'Next'}
      </button>
    </div>
  </div>
) : (
  // Your existing signup form JSX
 <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Rest of your existing form code goes here unchanged */}
          {message.text && (
            <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message.text}
            </div>
          )}
          
           <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleGoogleSignIn(false)}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="mr-2">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="h-2 rounded-full bg-gray-200">
                      <div 
                        className={`h-full rounded-full ${getPasswordStrengthClass()}`} 
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {passwordStrength <= 2 && "Weak password"}
                      {passwordStrength === 3 && "Medium password"}
                      {passwordStrength >= 4 && "Strong password"}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                </label>
              </div>
              {errors.agreeToTerms && <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms}</p>}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                  {loading ? 'Creating account...' : 'Sign up'}
                </button>
              </div>
            </form>
          </div>
        </div>
)}
    </div>
  </div>
);
};

export default Signup;