// Mock data for sign language videos
export const signsData = {
  alphabet: [
    {
      id: 'a1',
      name: 'Letter A',
      description: 'Learn how to sign the letter A in American Sign Language',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      category: 'alphabet',
      difficulty: 'beginner'
    },
    {
      id: 'a2',
      name: 'Letter B',
      description: 'Learn how to sign the letter B in American Sign Language',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      category: 'alphabet',
      difficulty: 'beginner'
    },
    {
      id: 'a3',
      name: 'Letter C',
      description: 'Learn how to sign the letter C in American Sign Language',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      category: 'alphabet',
      difficulty: 'beginner'
    }
  ],
  greetings: [
    {
      id: 'g1',
      name: 'Hello',
      description: 'A friendly greeting used to say hello in sign language',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      category: 'greetings',
      difficulty: 'beginner'
    },
    {
      id: 'g2',
      name: 'Good Morning',
      description: 'How to wish someone a good morning in sign language',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      category: 'greetings',
      difficulty: 'beginner'
    },
    {
      id: 'g3',
      name: 'Nice to Meet You',
      description: 'Express pleasure in meeting someone new',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      category: 'greetings',
      difficulty: 'intermediate'
    }
  ],
  phrases: [
    {
      id: 'p1',
      name: 'Please',
      description: 'Learn to say please politely in sign language',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      category: 'phrases',
      difficulty: 'beginner'
    },
    {
      id: 'p2',
      name: 'Thank You',
      description: 'Express gratitude with this essential sign',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      category: 'phrases',
      difficulty: 'beginner'
    },
    {
      id: 'p3',
      name: 'How Are You?',
      description: 'Ask someone about their wellbeing',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Subaru.mp4',
      category: 'phrases',
      difficulty: 'intermediate'
    }
  ],
  family: [
    {
      id: 'f1',
      name: 'Mother',
      description: 'Learn how to sign mother or mom',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      category: 'family',
      difficulty: 'beginner'
    },
    {
      id: 'f2',
      name: 'Father',
      description: 'Learn how to sign father or dad',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
      category: 'family',
      difficulty: 'beginner'
    },
    {
      id: 'f3',
      name: 'Sister',
      description: 'Learn how to sign sister',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      category: 'family',
      difficulty: 'beginner'
    }
  ]
};

// Get all signs as a flat array
export const getAllSigns = () => {
  return Object.values(signsData).flat();
};

// Get a specific sign by ID
export const getSignById = (id) => {
  const allSigns = getAllSigns();
  return allSigns.find(sign => sign.id === id);
};

// Get signs by category
export const getSignsByCategory = (category) => {
  return signsData[category] || [];
};

// Get sign of the day (rotates based on day of year)
export const getSignOfTheDay = () => {
  const allSigns = getAllSigns();
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return allSigns[dayOfYear % allSigns.length];
};

// Categories with metadata
export const categories = [
  {
    id: 'alphabet',
    name: 'Alphabet',
    description: 'Learn the ASL alphabet',
    icon: '🔤',
    color: 'bg-blue-500'
  },
  {
    id: 'greetings',
    name: 'Greetings',
    description: 'Common greetings and introductions',
    icon: '👋',
    color: 'bg-green-500'
  },
  {
    id: 'phrases',
    name: 'Common Phrases',
    description: 'Essential everyday phrases',
    icon: '💭',
    color: 'bg-purple-500'
  },
  {
    id: 'family',
    name: 'Family',
    description: 'Family members and relationships',
    icon: '👨‍👩‍👧‍👦',
    color: 'bg-orange-500'
  }
];