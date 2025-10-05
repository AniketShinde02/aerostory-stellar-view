import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface VoiceOverIconProps {
  onVoiceOverClick: () => void;
}

const VoiceOverIcon = ({ onVoiceOverClick }: VoiceOverIconProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const location = useLocation();

  // Show voice-over icon only on non-AeroVerse routes
  useEffect(() => {
    const shouldShow = !location.pathname.includes('/aeroverse');
    setIsVisible(shouldShow);
  }, [location.pathname]);

  const handleClick = () => {
    if (isPlaying) {
      setIsPlaying(false);
      // Stop voice-over logic here
    } else {
      setIsPlaying(true);
      onVoiceOverClick();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          {/* Main Voice-Over Button */}
          <motion.button
            onClick={handleClick}
            className={`
              w-14 h-14 rounded-full flex items-center justify-center
              shadow-lg backdrop-blur-md border-2 transition-all duration-300
              ${isPlaying 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 shadow-green-500/30' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-400 shadow-blue-500/30'
              }
              hover:scale-110 active:scale-95
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="playing"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Volume2 className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="stopped"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Mic className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mute Toggle Button */}
          <motion.button
            onClick={toggleMute}
            className={`
              absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center
              text-xs transition-all duration-300
              ${isMuted 
                ? 'bg-red-500 border-2 border-red-400 text-white' 
                : 'bg-gray-600 border-2 border-gray-400 text-gray-300'
              }
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </motion.button>

          {/* Pulse Animation when Playing */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2"
          >
            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap backdrop-blur-sm">
              {isPlaying ? 'Stop Voice-Over' : 'Start Voice-Over'}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-2 border-t-transparent border-b-2 border-b-transparent" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceOverIcon;
