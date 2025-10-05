import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceOver } from '@/hooks/useVoiceOver';
import { useLocation } from 'react-router-dom';

const AeroVerseVoiceOver = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const voiceOver = useVoiceOver();
  const location = useLocation();

  // Only show on AeroVerse page
  useEffect(() => {
    const shouldShow = location.pathname.includes('/aeroverse');
    setIsVisible(shouldShow);
    
    // If not on AeroVerse page, stop any playing voice-over and collapse
    if (!shouldShow) {
      setIsExpanded(false);
      voiceOver.stop();
    }
  }, [location.pathname, voiceOver]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && !voiceOver.isPlaying) {
      voiceOver.play();
    }
  };

  const handlePlayPause = () => {
    voiceOver.togglePlayPause();
  };

  const handleClose = () => {
    setIsExpanded(false);
    voiceOver.stop();
  };

  // Don't render if not on AeroVerse page
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isExpanded ? (
          // Collapsed Circular Button
          <motion.button
            key="collapsed"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleToggle}
            className={`
              w-14 h-14 rounded-full flex items-center justify-center
              shadow-lg backdrop-blur-md border-2 transition-all duration-300
              ${voiceOver.isPlaying 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 shadow-green-500/30' 
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 border-purple-400 shadow-purple-500/30'
              }
              hover:scale-110 active:scale-95
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {voiceOver.isPlaying ? (
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
        ) : (
          // Expanded Control Panel
          <motion.div
            key="expanded"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 shadow-2xl"
            style={{ width: '320px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-white font-semibold text-sm">Voice-Over</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => setShowSettings(!showSettings)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 w-8 h-8 p-0"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleClose}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Currently Reading */}
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/60 mb-1">Currently reading:</p>
              <p className="text-white text-xs leading-relaxed">
                {voiceOver.currentText || "Welcome to the AeroVerse - Explore the cosmos..."}
              </p>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <Button
                onClick={voiceOver.skipBack}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 w-8 h-8 p-0"
              >
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button
                onClick={handlePlayPause}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${voiceOver.isPlaying 
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  }
                  shadow-lg transition-all duration-300
                `}
                size="sm"
              >
                {voiceOver.isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" />
                )}
              </Button>

              <Button
                onClick={voiceOver.skipForward}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 w-8 h-8 p-0"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 mb-4">
              <Button
                onClick={voiceOver.toggleMute}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 w-8 h-8 p-0"
              >
                {voiceOver.isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${voiceOver.isMuted ? 0 : voiceOver.volume * 100}%` }} 
                />
              </div>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceOver.isMuted ? 0 : voiceOver.volume}
                onChange={(e) => voiceOver.setVolume(parseFloat(e.target.value))}
                className="w-16 h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
              />
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 pt-3 mt-3"
                >
                  <div className="space-y-3">
                    <div>
                      <label className="text-white/80 text-xs mb-1 block">Speed: {voiceOver.speed.toFixed(1)}x</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={voiceOver.speed}
                        onChange={(e) => voiceOver.setSpeed(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-white/80 text-xs mb-1 block">Pitch: {voiceOver.pitch.toFixed(1)}x</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={voiceOver.pitch}
                        onChange={(e) => voiceOver.setPitch(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mode Selection */}
            <div className="flex gap-1 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-green-500/50 text-green-400 hover:bg-green-500/10 text-xs py-1 h-7"
              >
                Auto
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 text-xs py-1 h-7"
              >
                Smart
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 text-xs py-1 h-7"
              >
                Paused
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse Animation when Playing */}
      {voiceOver.isPlaying && !isExpanded && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-400"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
};

export default AeroVerseVoiceOver;
