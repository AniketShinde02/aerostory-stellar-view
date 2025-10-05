import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Settings, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceOverControlsProps {
  isVisible: boolean;
  onClose: () => void;
  currentText: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSkipForward: () => void;
  onSkipBack: () => void;
  onVolumeChange: (volume: number) => void;
  volume: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

const VoiceOverControls = ({
  isVisible,
  onClose,
  currentText,
  isPlaying,
  onTogglePlay,
  onSkipForward,
  onSkipBack,
  onVolumeChange,
  volume,
  isMuted,
  onToggleMute
}: VoiceOverControlsProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [voicePitch, setVoicePitch] = useState(1.0);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="bg-gradient-to-t from-black/95 to-black/80 backdrop-blur-xl border-t border-white/20 p-4">
          <div className="container mx-auto max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-white font-semibold">AeroVerse Voice-Over</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowSettings(!showSettings)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  ×
                </Button>
              </div>
            </div>

            {/* Currently Reading */}
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-white/80 mb-1">Currently reading:</p>
              <p className="text-white text-sm leading-relaxed">
                {currentText || "Welcome to the AeroVerse - Explore the cosmos with interactive star fields..."}
              </p>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* Skip Back */}
              <Button
                onClick={onSkipBack}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <SkipBack className="w-5 h-5" />
              </Button>

              {/* Play/Pause */}
              <Button
                onClick={onTogglePlay}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${isPlaying 
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  }
                  shadow-lg transition-all duration-300
                `}
                size="lg"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-0.5" />
                )}
              </Button>

              {/* Skip Forward */}
              <Button
                onClick={onSkipForward}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 mb-4">
              <Button
                onClick={onToggleMute}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                     style={{ width: `${isMuted ? 0 : volume * 100}%` }} />
              </div>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-20 h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 100%)`
                }}
              />
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 pt-4 mt-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/80 text-sm mb-2 block">Voice Speed</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={voiceSpeed}
                        onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                      />
                      <span className="text-white/60 text-xs">{voiceSpeed.toFixed(1)}x</span>
                    </div>
                    <div>
                      <label className="text-white/80 text-sm mb-2 block">Voice Pitch</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={voicePitch}
                        onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                      />
                      <span className="text-white/60 text-xs">{voicePitch.toFixed(1)}x</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mode Selection */}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-green-500/50 text-green-400 hover:bg-green-500/10"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                Auto
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                Smart
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                Paused
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceOverControls;
