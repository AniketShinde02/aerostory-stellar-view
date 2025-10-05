import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  SkipForward, 
  Settings,
  Eye,
  EyeOff,
  Mic,
  MicOff
} from 'lucide-react';

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

interface TTSProps {
  className?: string;
  autoDetect?: boolean;
  targetSelector?: string; // CSS selector for elements to read
  highlightText?: boolean;
  showControls?: boolean;
  smartMode?: boolean; // Enable smart aero space detection
}

interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
}

const TextToSpeech: React.FC<TTSProps> = ({
  className = '',
  autoDetect = true,
  targetSelector = 'h1, h2, h3, h4, h5, h6, p, .prose, [data-tts]',
  highlightText = true,
  showControls = true,
  smartMode = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [highlightedElements, setHighlightedElements] = useState<Set<HTMLElement>>(new Set());
  const [isAutoDetect, setIsAutoDetect] = useState(autoDetect);
  const [isListening, setIsListening] = useState(false);

  const [settings, setSettings] = useState<VoiceSettings>({
    rate: 0.9, // Slightly slower for more natural speech
    pitch: 1.1, // Slightly higher pitch for more engaging voice
    volume: 0.8, // Moderate volume
    voice: null
  });

  // Smart content detection keywords
  const aeroSpaceKeywords = [
    'aerospace', 'aerostory', 'space', 'cosmos', 'universe', 'galaxy', 'star', 'stars',
    'solar', 'sun', 'moon', 'planet', 'earth', 'mars', 'jupiter', 'saturn', 'neptune',
    'aurora', 'northern lights', 'solar flare', 'coronal mass ejection', 'space weather',
    'astronaut', 'rocket', 'satellite', 'spacecraft', 'mission', 'exploration',
    'nebula', 'black hole', 'comet', 'asteroid', 'meteor', 'meteorite',
    'nasa', 'spacex', 'iss', 'international space station', 'hubble', 'webb',
    'radiation', 'magnetic field', 'solar wind', 'cosmic ray', 'gravity',
    'orbit', 'launch', 'landing', 'docking', 'eva', 'spacewalk'
  ];

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check for TTS support
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      loadVoices();
    }
  }, []);

  // Load available voices
  const loadVoices = useCallback(() => {
    const voices = speechSynthesis.getVoices();
    setAvailableVoices(voices);
    
    // Set default voice (prefer natural-sounding English voices)
    if (voices.length > 0 && !settings.voice) {
      // Prefer voices that sound more natural and human-like
      const preferredVoices = [
        'Microsoft David Desktop - English (United States)',
        'Microsoft Zira Desktop - English (United States)', 
        'Google US English',
        'Alex', 'Samantha', 'Victoria', 'Daniel'
      ];
      
      let selectedVoice = voices.find(voice => 
        preferredVoices.some(preferred => voice.name.includes(preferred))
      );
      
      // Fallback to any English voice
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.lang.startsWith('en') || voice.lang.includes('English')
        ) || voices[0];
      }
      
      setSettings(prev => ({ ...prev, voice: selectedVoice }));
    }
  }, [settings.voice]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
      return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    }
  }, [loadVoices]);

  // Smart content detection
  const isAeroSpaceContent = useCallback((text: string): boolean => {
    if (!smartMode) return true; // If smart mode is off, always allow
    
    const lowerText = text.toLowerCase();
    const keywordCount = aeroSpaceKeywords.filter(keyword => 
      lowerText.includes(keyword.toLowerCase())
    ).length;
    
    // Content is considered aero space related if it contains at least 2 relevant keywords
    // or if it's explicitly marked with data-tts attribute
    return keywordCount >= 2 || lowerText.includes('aerostory') || lowerText.includes('space weather');
  }, [smartMode, aeroSpaceKeywords]);

  // Extract text from DOM elements
  const extractTextFromElements = useCallback((elements: NodeListOf<Element>): string => {
    return Array.from(elements)
      .map(el => el.textContent?.trim())
      .filter(text => text && text.length > 0)
      .join(' ');
  }, []);

  // Highlight text being spoken
  const highlightCurrentText = useCallback((text: string, elements: NodeListOf<Element>) => {
    if (!highlightText) return;

    // Clear previous highlights
    highlightedElements.forEach(el => {
      el.classList.remove('tts-highlight', 'tts-current');
    });
    setHighlightedElements(new Set());

    // Find and highlight current text
    const newHighlights = new Set<HTMLElement>();
    elements.forEach(el => {
      if (el.textContent?.includes(text)) {
        el.classList.add('tts-highlight');
        newHighlights.add(el as HTMLElement);
      }
    });
    setHighlightedElements(newHighlights);
  }, [highlightText, highlightedElements]);

  // Start TTS
  const startTTS = useCallback((text?: string) => {
    if (!isSupported) return;

    let textToSpeak = text;
    let elementsToHighlight: NodeListOf<Element> | null = null;

    if (!textToSpeak) {
      elementsToHighlight = document.querySelectorAll(targetSelector);
      textToSpeak = extractTextFromElements(elementsToHighlight);
    }

    if (!textToSpeak.trim()) {
      console.log('No text found to read');
      return;
    }

    // Smart detection: Only proceed if content is aero space related
    if (!isAeroSpaceContent(textToSpeak)) {
      console.log('🎯 Smart TTS: Content not aero space related, skipping...');
      return;
    }

    console.log('🚀 Smart TTS: Aero space content detected, starting narration...');

    // Stop current speech
    speechSynthesis.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    // Apply settings
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    utterance.voice = settings.voice;

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentText(textToSpeak!);
      if (elementsToHighlight) {
        highlightCurrentText(textToSpeak!, elementsToHighlight);
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentText('');
      // Clear highlights
      highlightedElements.forEach(el => {
        el.classList.remove('tts-highlight', 'tts-current');
      });
      setHighlightedElements(new Set());
    };

    utterance.onerror = (event) => {
      console.error('TTS Error:', event);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    // Start speaking
    speechSynthesis.speak(utterance);
  }, [isSupported, settings, targetSelector, extractTextFromElements, highlightCurrentText, highlightedElements]);

  // Stop TTS
  const stopTTS = useCallback(() => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentText('');
    // Clear highlights
    highlightedElements.forEach(el => {
      el.classList.remove('tts-highlight', 'tts-current');
    });
    setHighlightedElements(new Set());
  }, [highlightedElements]);

  // Pause/Resume TTS
  const togglePause = useCallback(() => {
    if (isPaused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.pause();
    }
  }, [isPaused]);

  // Auto-detect and read new content
  useEffect(() => {
    if (!isAutoDetect || !isEnabled) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if new text content was added
          const hasTextContent = Array.from(mutation.addedNodes).some(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              return element.matches && element.matches(targetSelector);
            }
            return false;
          });

          if (hasTextContent && !isPlaying) {
            // Small delay to ensure content is rendered
            setTimeout(() => {
              // Extract text and check if it's aero space related before starting
              const newElements = document.querySelectorAll(targetSelector);
              const newText = extractTextFromElements(newElements);
              
              if (newText && isAeroSpaceContent(newText)) {
                console.log('🎯 Smart TTS: New aero space content detected, auto-starting...');
                startTTS();
              } else {
                console.log('🎯 Smart TTS: New content detected but not aero space related, skipping...');
              }
            }, 500);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isAutoDetect, isEnabled, isPlaying, startTTS, targetSelector]);

  // Voice commands
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return;
    }

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      const command = lastResult[0].transcript.toLowerCase().trim();

      if (command.includes('start reading') || command.includes('read text')) {
        startTTS();
      } else if (command.includes('stop reading') || command.includes('stop')) {
        stopTTS();
      } else if (command.includes('pause reading') || command.includes('pause')) {
        togglePause();
      } else if (command.includes('enable tts') || command.includes('turn on tts')) {
        setIsEnabled(true);
      } else if (command.includes('disable tts') || command.includes('turn off tts')) {
        setIsEnabled(false);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [startTTS, stopTTS, togglePause]);

  // Toggle voice commands
  const toggleVoiceCommands = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className={`fixed top-20 right-4 z-50 ${className}`}>
      {/* Main TTS Toggle */}
      <Card className="bg-background/90 backdrop-blur-sm border-primary/30 p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsEnabled(!isEnabled)}
            variant={isEnabled ? "default" : "outline"}
            size="sm"
            className={isEnabled ? "bg-primary text-white" : "border-primary/30 text-primary hover:bg-primary/10"}
          >
            {isEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>

          {showControls && isEnabled && (
            <>
              <Button
                onClick={() => startTTS()}
                variant="outline"
                size="sm"
                className="border-primary/30 text-primary hover:bg-primary/10"
                disabled={isPlaying}
              >
                <Play className="h-4 w-4" />
              </Button>

              <Button
                onClick={togglePause}
                variant="outline"
                size="sm"
                className="border-primary/30 text-primary hover:bg-primary/10"
                disabled={!isPlaying}
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>

              <Button
                onClick={stopTTS}
                variant="outline"
                size="sm"
                className="border-primary/30 text-primary hover:bg-primary/10"
                disabled={!isPlaying}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </>
          )}

          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="outline"
            size="sm"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
            <Button
              onClick={toggleVoiceCommands}
              variant={isListening ? "default" : "outline"}
              size="sm"
              className={isListening ? "bg-green-500 text-white" : "border-primary/30 text-primary hover:bg-primary/10"}
            >
              {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Status Badges */}
        <div className="flex gap-1 mt-2 flex-wrap">
          {isEnabled && (
            <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
              {isAutoDetect ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
              {isAutoDetect ? 'Auto' : 'Manual'}
            </Badge>
          )}
          {smartMode && (
            <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">
              🧠 Smart
            </Badge>
          )}
          {isPlaying && (
            <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
              {isPaused ? 'Paused' : 'Playing'}
            </Badge>
          )}
          {isListening && (
            <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400">
              Listening
            </Badge>
          )}
        </div>
      </Card>

      {/* Settings Panel */}
      {showSettings && (
        <Card className="mt-3 bg-background/90 backdrop-blur-sm border-primary/30 p-4 shadow-lg min-w-64">
          <h3 className="text-sm font-semibold text-white mb-3">TTS Settings</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-foreground/70 mb-1 block">Voice</label>
              <select
                value={settings.voice?.name || ''}
                onChange={(e) => {
                  const voice = availableVoices.find(v => v.name === e.target.value);
                  setSettings(prev => ({ ...prev, voice }));
                }}
                className="w-full text-xs bg-card border border-primary/20 rounded px-2 py-1 text-white"
              >
                {availableVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-foreground/70 mb-1 block">
                Speed: {settings.rate.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.rate}
                onChange={(e) => setSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs text-foreground/70 mb-1 block">
                Pitch: {settings.pitch.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.pitch}
                onChange={(e) => setSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs text-foreground/70 mb-1 block">
                Volume: {Math.round(settings.volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.volume}
                onChange={(e) => setSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoDetect"
                checked={isAutoDetect}
                onChange={(e) => setIsAutoDetect(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="autoDetect" className="text-xs text-foreground/70">
                Auto-detect new content
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="smartMode"
                checked={smartMode}
                onChange={(e) => {
                  // This would need to be passed up to parent component
                  console.log('Smart mode:', e.target.checked);
                }}
                className="rounded"
              />
              <label htmlFor="smartMode" className="text-xs text-foreground/70">
                🧠 Smart aero space detection
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="highlightText"
                checked={highlightText}
                onChange={(e) => {
                  // This would need to be passed up to parent component
                  console.log('Highlight text:', e.target.checked);
                }}
                className="rounded"
              />
              <label htmlFor="highlightText" className="text-xs text-foreground/70">
                Highlight text being read
              </label>
            </div>
          </div>

          {!isSupported && (
            <div className="mt-3 p-2 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400">
              Text-to-speech is not supported in this browser.
            </div>
          )}
        </Card>
      )}

      {/* Current Text Display */}
      {isPlaying && currentText && (
        <Card className="mt-3 bg-background/90 backdrop-blur-sm border-primary/30 p-3 shadow-lg max-w-sm">
          <div className="text-xs text-foreground/70 mb-1">Currently reading:</div>
          <div className="text-sm text-white line-clamp-3">{currentText}</div>
        </Card>
      )}
    </div>
  );
};

export default TextToSpeech;
