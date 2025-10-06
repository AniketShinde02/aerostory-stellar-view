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
  const [isPlaying, setIsPlaying] = useState(() => {
    const saved = localStorage.getItem('bgMusicPlaying');
    return saved === 'true' || saved === null; // Auto-play by default
  });
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('bgMusicVolume');
    return saved ? parseFloat(saved) : 0.05; // 5% volume default
  });
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('bgMusicMuted');
    return saved === 'true';
  });
  const [isVisible, setIsVisible] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
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
    
    // Set audio properties for smooth playback with timeout protection
    audio.loop = true;
    audio.preload = 'metadata'; // Changed from 'auto' to prevent hanging
    audio.volume = isMuted ? 0 : volume;
    
    // Add timeout to prevent hanging
    const loadTimeout = setTimeout(() => {
      if (audio.readyState < 2) {
        console.warn('🎵 Audio loading timeout, skipping auto-play');
        return;
      }
    }, 3000); // 3 second timeout
    
    // Handle audio events
    const handleCanPlay = () => {
      clearTimeout(loadTimeout);
      console.log('🎵 Audio loaded successfully');
      // Auto-play when audio is ready and not muted
      if (isPlaying && !isMuted) {
        audio.play().catch(error => {
          console.log('Auto-play prevented by browser, user interaction required:', error);
          // Don't show error to user, just log it
        });
      }
    };

    const handleError = (e: Event) => {
      console.error('❌ Audio error:', e);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      localStorage.setItem('bgMusicPlaying', 'true');
    };

    const handlePause = () => {
      setIsPlaying(false);
      localStorage.setItem('bgMusicPlaying', 'false');
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
  }, [volume, isMuted, isPlaying]);

  // Handle user interaction to enable auto-play
  useEffect(() => {
    const enableAudio = () => {
      setHasUserInteracted(true);
      // Try to play audio if it should be playing
      if (audioRef.current && isPlaying && !isMuted) {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed after user interaction:', error);
        });
      }
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, [isPlaying, isMuted]);

  // Handle audio source changes when navigating between pages
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const currentSrc = audio.src;
    
    // If source changed, update it
    if (!currentSrc.includes(audioSrc.split('/').pop() || '')) {
      audio.src = audioSrc;
      audio.load();
      
      // Auto-play if music was playing before and user has interacted
      if (isPlaying && hasUserInteracted) {
        audio.play().catch(console.error);
      }
    }
  }, [audioSrc, isPlaying, hasUserInteracted]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      setHasUserInteracted(true); // Mark user interaction
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
            className={`fixed bottom-6 left-6 z-[60] ${className}`}
          >
            <div className="bg-background/90 backdrop-blur-xl border border-primary/20 rounded-xl p-3 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <Music className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {isAeroVerse ? 'Audio 2' : 'Audio 1'}
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
                    max="0.3"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-16 h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                    style={{
                      background: `linear-gradient(to right, #667eea 0%, #667eea ${((isMuted ? 0 : volume) / 0.3) * 100}%, #374151 ${((isMuted ? 0 : volume) / 0.3) * 100}%, #374151 100%)`
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
          className="fixed bottom-6 left-6 z-[60]"
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

    </>
  );
};

export default BackgroundMusic;
