import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize } from 'lucide-react';

const VideoPlayer = ({ videoUrl, title, autoplay = true, loop = true }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && autoplay) {
      video.play().catch(console.error);
    }
  }, [videoUrl, autoplay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const restart = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    if (!isPlaying) {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const changePlaybackRate = (rate) => {
    const video = videoRef.current;
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div 
      className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        loop={loop}
        muted={isMuted}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={togglePlay}
      >
        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg">
          {isPlaying ? (
            <Pause size={32} className="text-gray-800" fill="currentColor" />
          ) : (
            <Play size={32} className="text-gray-800 ml-1" fill="currentColor" />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              {isPlaying ? (
                <Pause size={18} className="text-white" fill="currentColor" />
              ) : (
                <Play size={18} className="text-white ml-0.5" fill="currentColor" />
              )}
            </button>
            
            <button
              onClick={restart}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              <RotateCcw size={18} className="text-white" />
            </button>
            
            <button
              onClick={toggleMute}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              {isMuted ? (
                <VolumeX size={18} className="text-white" />
              ) : (
                <Volume2 size={18} className="text-white" />
              )}
            </button>
          </div>

          {/* Speed Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm font-medium">Speed:</span>
            {[0.5, 1, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => changePlaybackRate(rate)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  playbackRate === rate
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <Maximize size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;