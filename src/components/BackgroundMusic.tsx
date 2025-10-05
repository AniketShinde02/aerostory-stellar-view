import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundMusicProps {
  className?: string;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ className = '' }) => {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('bgMusicVolume');
    return saved ? parseFloat(saved) : 0.3; // 30% volume default
  });
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('bgMusicMuted');
    return saved === 'true';
  });
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Determine which audio file to use based on current page
  const isAeroVerse = location.pathname.includes('/aeroverse');
  const audioSrc = isAeroVerse 
    ? '/Interstellar-Theme.mp3'
    : '/Indila - Love Story (Epic Orchestra).mp3';

  // Initialize audio
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    // Set audio properties for smooth playback
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = isMuted ? 0 : volume;
    
    // Handle audio events
    const handleCanPlay = () => {
      console.log('🎵 Audio loaded successfully');
    };

    const handleError = (e: Event) => {
      console.error('❌ Audio error:', e);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [volume, isMuted]);

  // Handle audio source changes when navigating between pages
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const currentSrc = audio.src;
    
    // If source changed, update it
    if (!currentSrc.includes(audioSrc.split('/').pop() || '')) {
      audio.src = audioSrc;
      audio.load();
      
      // Auto-play if music was playing before
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    }
  }, [audioSrc, isPlaying]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('bgMusicMuted', newMuted.toString());
    audioRef.current.volume = newMuted ? 0 : volume;
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem('bgMusicVolume', newVolume.toString());
    if (!audioRef.current) return;
    
    audioRef.current.volume = isMuted ? 0 : newVolume;
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      {/* Music Control Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`fixed bottom-6 left-6 z-50 ${className}`}
          >
            <div className="bg-background/90 backdrop-blur-xl border border-primary/20 rounded-xl p-3 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <Music className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {isAeroVerse ? 'Interstellar' : 'Love Story'}
                </span>
                <Button
                  onClick={() => setIsVisible(false)}
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-6 w-6 p-0 text-foreground/50 hover:text-foreground"
                >
                  ×
                </Button>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <Button
                  onClick={togglePlayPause}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-primary" />
                  ) : (
                    <Play className="w-4 h-4 text-primary" />
                  )}
                </Button>

                {/* Mute/Unmute */}
                <Button
                  onClick={toggleMute}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-primary" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-primary" />
                  )}
                </Button>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 ml-2">
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-16 h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #667eea 0%, #667eea ${((isMuted ? 0 : volume) / 0.5) * 100}%, #374151 ${((isMuted ? 0 : volume) / 0.5) * 100}%, #374151 100%)`
                    }}
                  />
                  <span className="text-xs text-foreground/60 w-8">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show Music Button (when panel is hidden) */}
      {!isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <Button
            onClick={() => setIsVisible(true)}
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0 border-primary/30 hover:border-primary hover:bg-primary/10 bg-background/90 backdrop-blur-xl"
          >
            <Music className="w-4 h-4 text-primary" />
          </Button>
        </motion.div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

export default BackgroundMusic;
