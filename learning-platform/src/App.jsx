import React from 'react';
import './index.css'; // Make sure your index.css is imported here
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import VideoLearningPage from './pages/VideoLearningPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/video/:id" element={<VideoLearningPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;