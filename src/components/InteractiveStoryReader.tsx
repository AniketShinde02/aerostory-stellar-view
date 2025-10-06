import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Play, Pause, Volume2, VolumeX, Mic, MicOff, 
  MessageCircle, BookOpen, Lightbulb, User, 
  Send, Loader2, Sparkles, Brain, Heart
} from 'lucide-react';
import SunnyImage from '@/assets/Sunny.png';
import { storyAI } from '@/api/storyAI';

interface StorySection {
  id: string;
  title: string;
  content: string;
  questions?: string[];
  choices?: { text: string; nextSection?: string; impact?: string }[];
  highlights?: { text: string; explanation: string }[];
}

interface ConversationMessage {
  id: string;
  type: 'user' | 'sunny' | 'system';
  content: string;
  timestamp: Date;
  isAudio?: boolean;
}

interface InteractiveStoryReaderProps {
  story: StorySection[];
  title: string;
  onClose: () => void;
}

const InteractiveStoryReader: React.FC<InteractiveStoryReaderProps> = ({ 
  story, 
  title, 
  onClose 
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([
    {
      id: '1',
      type: 'sunny',
      content: `Hi there! ☀️ I'm Sunny, and I'm so excited to read "${title}" with you! This is going to be an amazing journey. Would you like me to start reading, or do you have any questions about the story first?`,
      timestamp: new Date()
    }
  ]);
  const [userQuestion, setUserQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(1.0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserQuestion(transcript);
        handleUserMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  // Auto-scroll conversation
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Text-to-Speech functionality
  const speakText = useCallback((text: string, onEnd?: () => void) => {
    if (!voiceEnabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = readingSpeed;
    utterance.pitch = 1.2;
    utterance.volume = 0.8;

    // Find Sunny's voice if available
    const voices = speechSynthesis.getVoices();
    const sunnyVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Samantha') ||
      voice.name.includes('Karen')
    );
    if (sunnyVoice) {
      utterance.voice = sunnyVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    speechRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [voiceEnabled, readingSpeed]);

  // Highlight text as it's being read
  const highlightTextAsRead = useCallback((text: string, duration: number = 3000) => {
    setHighlightedText(text);
    setTimeout(() => {
      setHighlightedText('');
    }, duration);
  }, []);

  // Handle user voice input
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      addConversationMessage('system', 'Listening... Speak now!');
    }
  };

  // Add message to conversation
  const addConversationMessage = (type: 'user' | 'sunny' | 'system', content: string) => {
    const message: ConversationMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, message]);
  };

  // Handle user questions and interactions
  const handleUserMessage = async (message: string) => {
    if (!message.trim()) return;

    addConversationMessage('user', message);
    setIsProcessing(true);

    try {
      // Generate Sunny's response using enhanced AI system
      const aiResponse = await storyAI.generateSunnyResponse({
        currentSection: story[currentSection],
        userMessage: message,
        conversationHistory: conversation.slice(-5).map(msg => ({
          type: msg.type,
          content: msg.content
        })),
        storyMetadata: {
          title: title,
          topics: ['Solar Flares', 'Space Weather', 'Auroras', 'Earth\'s Magnetosphere', 'Cosmic Connection']
        }
      });

      addConversationMessage('sunny', aiResponse.response);
      
      // Speak the response if enabled
      if (voiceEnabled && aiResponse.shouldSpeak) {
        speakText(aiResponse.response);
      }

      // Handle next actions
      if (aiResponse.nextAction === 'ask-question' && aiResponse.suggestedQuestions) {
        setTimeout(() => {
          const question = aiResponse.suggestedQuestions[0];
          addConversationMessage('sunny', `Here's a question for you: ${question}`);
          if (voiceEnabled) {
            speakText(`Here's a question for you: ${question}`);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      addConversationMessage('sunny', "I'm having trouble understanding that right now. Could you try asking in a different way?");
    } finally {
      setIsProcessing(false);
    }
  };


  // Start/stop reading
  const toggleReading = () => {
    if (isReading) {
      if (isPaused) {
        speechSynthesis.resume();
        setIsPaused(false);
      } else {
        speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      startReading();
    }
  };

  const startReading = () => {
    const section = story[currentSection];
    const fullText = `${section.title}. ${section.content}`;
    
    setIsReading(true);
    setIsPaused(false);
    setCurrentText(fullText);
    
    // Highlight and read text
    highlightTextAsRead(section.title, 2000);
    setTimeout(() => {
      highlightTextAsRead(section.content, 8000);
    }, 2500);
    
    speakText(fullText, () => {
      setIsReading(false);
      setIsPaused(false);
      
      // Add interactive questions after reading
      if (section.questions && section.questions.length > 0) {
        const question = section.questions[0];
        addConversationMessage('sunny', `Now that we've read this part, here's a question for you: ${question}`);
        speakText(`Now that we've read this part, here's a question for you: ${question}`);
      }
    });
  };

  // Add note
  const addNote = () => {
    if (currentNote.trim()) {
      setNotes(prev => [...prev, currentNote]);
      setCurrentNote('');
      addConversationMessage('sunny', "Great note! I love how you're thinking about this. What else would you like to explore?");
    }
  };

  // Navigate story sections
  const nextSection = () => {
    if (currentSection < story.length - 1) {
      setCurrentSection(prev => prev + 1);
      addConversationMessage('sunny', `Let's move to the next part of our story: "${story[currentSection + 1]?.title}"`);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      addConversationMessage('sunny', `Let's go back to: "${story[currentSection - 1]?.title}"`);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const currentStorySection = story[currentSection];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] bg-card/95 backdrop-blur-xl border-primary/20 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <img 
              src={SunnyImage} 
              alt="Sunny" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="text-sm text-foreground/70">Interactive Story with Sunny</p>
            </div>
          </div>
          <Button onClick={onClose} variant="outline" size="sm">
            Close
          </Button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Story Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Current Section */}
              <div className="mb-6">
                <Badge variant="outline" className="mb-3">
                  Section {currentSection + 1} of {story.length}
                </Badge>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {currentStorySection.title}
                </h3>
                <div className="relative">
                  <p className={`text-lg leading-relaxed ${
                    highlightedText ? 'bg-primary/20 rounded-lg p-4 transition-all duration-300' : ''
                  }`}>
                    {currentStorySection.content}
                  </p>
                  {highlightedText && (
                    <div className="absolute inset-0 bg-primary/10 rounded-lg animate-pulse"></div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-2 mb-6">
                <Button 
                  onClick={prevSection} 
                  disabled={currentSection === 0}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextSection} 
                  disabled={currentSection === story.length - 1}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mb-6">
                <Button
                  onClick={toggleReading}
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  {isReading ? (
                    isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  <span className="ml-2">
                    {isReading ? (isPaused ? 'Resume' : 'Pause') : 'Start Reading'}
                  </span>
                </Button>

                <Button
                  onClick={toggleListening}
                  variant={isListening ? "default" : "outline"}
                  size="sm"
                  className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  <Mic className="w-4 h-4" />
                  <span className="ml-2">
                    {isListening ? 'Listening...' : 'Voice Chat'}
                  </span>
                </Button>

                <Button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  variant="outline"
                  size="sm"
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>

              {/* Notes Section */}
              <div className="bg-card/50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  My Story Notes
                </h4>
                <div className="space-y-2 mb-3">
                  {notes.map((note, index) => (
                    <div key={index} className="bg-primary/10 rounded-lg p-3 text-sm">
                      {note}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Add a note about this part of the story..."
                    className="flex-1"
                    rows={2}
                  />
                  <Button onClick={addNote} size="sm" className="self-end">
                    Add Note
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation Panel */}
          <div className="w-96 border-l border-primary/20 flex flex-col">
            <div className="p-4 border-b border-primary/20">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat with Sunny
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversation.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-white' 
                      : message.type === 'sunny'
                      ? 'bg-orange-500/20 text-white border border-orange-500/30'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {message.type === 'sunny' && (
                      <div className="flex items-center gap-2 mb-2">
                        <img 
                          src={SunnyImage} 
                          alt="Sunny" 
                          className="w-4 h-4 rounded-full"
                        />
                        <span className="text-xs font-medium">Sunny</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-orange-500/20 text-white border border-orange-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <img 
                        src={SunnyImage} 
                        alt="Sunny" 
                        className="w-4 h-4 rounded-full"
                      />
                      <span className="text-xs font-medium">Sunny</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={conversationEndRef} />
            </div>

            <div className="p-4 border-t border-primary/20">
              <div className="flex gap-2">
                <Textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ask Sunny anything about the story..."
                  className="flex-1"
                  rows={2}
                />
                <Button 
                  onClick={() => handleUserMessage(userQuestion)}
                  disabled={!userQuestion.trim() || isProcessing}
                  size="sm"
                  className="self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InteractiveStoryReader;
