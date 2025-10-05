import { useState, useRef, useEffect, useCallback } from 'react';

interface VoiceOverOptions {
  volume?: number;
  speed?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice | null;
}

interface VoiceOverState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
  currentIndex: number;
  totalSegments: number;
  isMuted: boolean;
  volume: number;
  speed: number;
  pitch: number;
}

const AEROVERSE_CONTENT = [
  {
    title: "Welcome to AeroStory",
    content: "Welcome to AeroStory, your gateway to the cosmos! This is an innovative space education platform that brings the universe to you through immersive storytelling, interactive experiences, and real-time space data. AeroStory combines cutting-edge technology with educational content to make astronomy accessible and engaging for everyone."
  },
  {
    title: "Interactive Star Field Experience",
    content: "You're currently experiencing our AeroVerse - an interactive star field featuring over 100,000 real stars from astronomical databases. Each star's position, brightness, and color represent actual celestial objects visible from Earth. This visualization is powered by Chrome Experiments' Stars technology, providing unprecedented access to our cosmic neighborhood."
  },
  {
    title: "Educational Stories and Adventures",
    content: "AeroStory features immersive space stories and adventures, including Sunny the Solar Flare's journey through space. These educational narratives explain complex astronomical phenomena in engaging, easy-to-understand ways. Each story combines scientific accuracy with creative storytelling to inspire curiosity about space."
  },
  {
    title: "Real-Time Space Data",
    content: "Our platform integrates live data from NASA's APIs, including the Astronomy Picture of the Day, space weather information from DONKI, and real-time solar activity. You can explore current space conditions, view stunning space photography, and learn about ongoing space missions and discoveries."
  },
  {
    title: "Interactive Features",
    content: "Navigate through space using mouse or touch controls. Click and drag to rotate your view, scroll to zoom in and out, and interact with stars to learn about their properties. Our chatbot provides intelligent assistance, and the voice-over system offers guided tours of the cosmos with real human narration."
  },
  {
    title: "Educational Impact",
    content: "AeroStory represents the future of space education, making the cosmos accessible to everyone regardless of age or background. Through interactive experiences, real data visualization, and engaging storytelling, we inspire the next generation of space explorers and scientists. Welcome to your personal journey through the universe!"
  }
];

export const useVoiceOver = () => {
  const [state, setState] = useState<VoiceOverState>({
    isPlaying: false,
    isPaused: false,
    currentText: '',
    currentIndex: 0,
    totalSegments: AEROVERSE_CONTENT.length,
    isMuted: false,
    volume: 0.8,
    speed: 1.0,
    pitch: 1.0
  });

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      console.log('Available voices:', availableVoices.length);
      setVoices(availableVoices);
      
      // Prefer male voices for a more authoritative narration
      const maleVoice = availableVoices.find(voice => 
        voice.name.toLowerCase().includes('male') || 
        voice.name.toLowerCase().includes('man') ||
        voice.name.toLowerCase().includes('david') ||
        voice.name.toLowerCase().includes('alex') ||
        voice.name.toLowerCase().includes('daniel') ||
        voice.name.toLowerCase().includes('thomas') ||
        voice.name.toLowerCase().includes('james') ||
        voice.name.toLowerCase().includes('michael') ||
        voice.name.toLowerCase().includes('google') ||
        voice.name.toLowerCase().includes('microsoft')
      );
      
      if (maleVoice) {
        console.log('Selected male voice:', maleVoice.name);
        setSelectedVoice(maleVoice);
      } else if (availableVoices.length > 0) {
        console.log('Fallback to first voice:', availableVoices[0].name);
        setSelectedVoice(availableVoices[0]);
      } else {
        console.warn('No voices available');
        setSelectedVoice(null);
      }
    };

    // Load voices immediately
    loadVoices();
    
    // Some browsers load voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Also try loading after a short delay for some browsers
    const timeoutId = setTimeout(loadVoices, 1000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Create speech utterance
  const createUtterance = useCallback((text: string, options: VoiceOverOptions = {}) => {
    console.log('Creating utterance with text:', text.substring(0, 50) + '...');
    console.log('Voice:', selectedVoice?.name || 'Default');
    console.log('Volume:', options.volume ?? (state.isMuted ? 0 : state.volume));
    console.log('Speed:', options.speed ?? state.speed);
    console.log('Pitch:', options.pitch ?? state.pitch);
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice properties
    utterance.volume = options.volume ?? (state.isMuted ? 0 : state.volume);
    utterance.rate = options.speed ?? state.speed;
    utterance.pitch = options.pitch ?? state.pitch;
    utterance.voice = options.voice ?? selectedVoice;
    
    // Set up event handlers
    utterance.onstart = () => {
      console.log('Speech started');
      setState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
    };
    
    utterance.onend = () => {
      console.log('Speech ended');
      setState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error, event.type);
      setState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
    };
    
    utterance.onpause = () => {
      console.log('Speech paused');
      setState(prev => ({ ...prev, isPaused: true }));
    };
    
    utterance.onresume = () => {
      console.log('Speech resumed');
      setState(prev => ({ ...prev, isPaused: false }));
    };
    
    return utterance;
  }, [state.isMuted, state.volume, state.speed, state.pitch, selectedVoice]);

  // Play voice-over
  const play = useCallback(() => {
    if (state.isPlaying) return;
    
    console.log('Attempting to play voice-over...');
    
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }
    
    // Check if voices are loaded
    if (!selectedVoice && voices.length === 0) {
      console.warn('No voices loaded yet, retrying...');
      setTimeout(() => {
        const availableVoices = speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          console.log('Voices loaded, retrying play...');
          play();
        }
      }, 500);
      return;
    }
    
    const currentSegment = AEROVERSE_CONTENT[state.currentIndex];
    if (!currentSegment) {
      console.error('No current segment found');
      return;
    }
    
    const fullText = `${currentSegment.title}. ${currentSegment.content}`;
    setState(prev => ({ ...prev, currentText: fullText }));
    
    // Cancel any existing speech
    speechSynthesis.cancel();
    
    const utterance = createUtterance(fullText);
    utteranceRef.current = utterance;
    
    try {
      speechSynthesis.speak(utterance);
      console.log('Speech synthesis started');
    } catch (error) {
      console.error('Error starting speech synthesis:', error);
    }
  }, [state.isPlaying, state.currentIndex, createUtterance, selectedVoice, voices.length]);

  // Pause voice-over
  const pause = useCallback(() => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
    }
  }, []);

  // Resume voice-over
  const resume = useCallback(() => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  }, []);

  // Stop voice-over
  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
  }, []);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      if (state.isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      play();
    }
  }, [state.isPlaying, state.isPaused, play, pause, resume]);

  // Skip to next segment
  const skipForward = useCallback(() => {
    stop();
    setState(prev => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, AEROVERSE_CONTENT.length - 1)
    }));
    
    // Auto-play next segment
    setTimeout(() => {
      const nextSegment = AEROVERSE_CONTENT[Math.min(state.currentIndex + 1, AEROVERSE_CONTENT.length - 1)];
      if (nextSegment) {
        const fullText = `${nextSegment.title}. ${nextSegment.content}`;
        setState(prev => ({ ...prev, currentText: fullText }));
        
        const utterance = createUtterance(fullText);
        speechSynthesis.speak(utterance);
      }
    }, 100);
  }, [stop, state.currentIndex, createUtterance]);

  // Skip to previous segment
  const skipBack = useCallback(() => {
    stop();
    setState(prev => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0)
    }));
    
    // Auto-play previous segment
    setTimeout(() => {
      const prevSegment = AEROVERSE_CONTENT[Math.max(state.currentIndex - 1, 0)];
      if (prevSegment) {
        const fullText = `${prevSegment.title}. ${prevSegment.content}`;
        setState(prev => ({ ...prev, currentText: fullText }));
        
        const utterance = createUtterance(fullText);
        speechSynthesis.speak(utterance);
      }
    }, 100);
  }, [stop, state.currentIndex, createUtterance]);

  // Set volume
  const setVolume = useCallback((volume: number) => {
    console.log('Setting volume to:', volume);
    setState(prev => ({ ...prev, volume, isMuted: volume === 0 }));
    
    // Update current utterance if playing
    if (utteranceRef.current) {
      utteranceRef.current.volume = volume;
      console.log('Updated utterance volume to:', volume);
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const newMutedState = !state.isMuted;
    console.log('Toggling mute to:', newMutedState);
    setState(prev => ({ ...prev, isMuted: newMutedState }));
    
    // Update current utterance if playing
    if (utteranceRef.current) {
      utteranceRef.current.volume = newMutedState ? 0 : state.volume;
      console.log('Updated utterance volume to:', newMutedState ? 0 : state.volume);
    }
  }, [state.isMuted, state.volume]);

  // Set speed
  const setSpeed = useCallback((speed: number) => {
    setState(prev => ({ ...prev, speed }));
    
    // Update current utterance if playing
    if (utteranceRef.current) {
      utteranceRef.current.rate = speed;
    }
  }, []);

  // Set pitch
  const setPitch = useCallback((pitch: number) => {
    setState(prev => ({ ...prev, pitch }));
    
    // Update current utterance if playing
    if (utteranceRef.current) {
      utteranceRef.current.pitch = pitch;
    }
  }, []);

  // Set voice
  const setVoice = useCallback((voice: SpeechSynthesisVoice | null) => {
    setSelectedVoice(voice);
    
    // Update current utterance if playing
    if (utteranceRef.current) {
      utteranceRef.current.voice = voice;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  // Test speech synthesis on mount
  useEffect(() => {
    const testSpeech = () => {
      if ('speechSynthesis' in window) {
        const testUtterance = new SpeechSynthesisUtterance('Test');
        testUtterance.volume = 0.1; // Very quiet test
        testUtterance.rate = 2; // Fast test
        speechSynthesis.speak(testUtterance);
        console.log('Speech synthesis test completed');
      } else {
        console.warn('Speech synthesis not supported in this browser');
      }
    };
    
    // Test after a delay to ensure voices are loaded
    setTimeout(testSpeech, 2000);
  }, []);

  return {
    // State
    ...state,
    voices,
    selectedVoice,
    
    // Actions
    play,
    pause,
    resume,
    stop,
    togglePlayPause,
    skipForward,
    skipBack,
    setVolume,
    toggleMute,
    setSpeed,
    setPitch,
    setVoice,
    
    // Content
    currentSegment: AEROVERSE_CONTENT[state.currentIndex],
    totalSegments: AEROVERSE_CONTENT.length,
    
    // Progress
    progress: state.totalSegments > 0 ? (state.currentIndex / (state.totalSegments - 1)) * 100 : 0
  };
};
