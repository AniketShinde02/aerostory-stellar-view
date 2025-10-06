import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import SunnyImage from '@/assets/Sunny.png';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Sparkles,
  Loader2,
  AlertCircle,
  RefreshCw,
  Settings,
  Volume2,
  VolumeX,
  Lightbulb,
  BookOpen,
  Globe,
  Camera,
  Zap,
  Star,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Heart,
  Share2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  ExternalLink
} from 'lucide-react';
import { sendChatMessage } from '@/api/chat';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isError?: boolean;
  suggestions?: string[];
  richContent?: RichContent;
  isTyping?: boolean;
}


interface RichContent {
  type: 'story' | 'image' | 'link' | 'video' | 'nasa-image' | 'story-preview';
  title?: string;
  description?: string;
  url?: string;
  thumbnail?: string;
  data?: any;
}

interface SmartFeature {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! ☀️ I'm Sunny, your friendly solar flare! I love traveling from the Sun to Earth and creating beautiful auroras. Ask me anything about my cosmic adventures, space weather, or how I affect life on your planet!\n\n⚠️ Note: While I strive for accuracy, please verify important information from official sources like NASA or NOAA.",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Tell me about your journey to Earth",
        "What's happening with solar activity?",
        "How do you create auroras?",
        "What's your favorite part of space?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('connected');
  const [retryCount, setRetryCount] = useState(0);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [quickQuestionsUsed, setQuickQuestionsUsed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [smartFeatures, setSmartFeatures] = useState<SmartFeature[]>([
    { id: 'suggestions', name: 'Smart Suggestions', icon: Lightbulb, enabled: true },
    { id: 'rich-content', name: 'Rich Content', icon: Camera, enabled: true },
    { id: 'proactive', name: 'Proactive Help', icon: Sparkles, enabled: true }
  ]);
  const [userPreferences, setUserPreferences] = useState({
    interests: [] as string[],
    visitedStories: [] as string[],
    preferredTopics: [] as string[]
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);


  // Context-aware suggestions based on current page
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/story/') || currentPath.includes('/stories')) {
      // User is viewing stories - suggest story-related questions
      updateContextualSuggestions('story');
    } else if (currentPath.includes('/aeroverse')) {
      // User is in AeroVerse - suggest 3D experience questions
      updateContextualSuggestions('aeroverse');
    } else if (currentPath === '/') {
      // User is on homepage - suggest general space weather topics
      updateContextualSuggestions('homepage');
    }
  }, []);

  const updateContextualSuggestions = (context: string) => {
    const contextSuggestions: Record<string, string[]> = {
      story: [
        "Tell me more about this story",
        "What causes solar flares?",
        "How do auroras form?",
        "Show me related stories"
      ],
      aeroverse: [
        "How does this 3D experience work?",
        "What am I looking at?",
        "Tell me about the cosmic phenomena",
        "How do I interact with this?"
      ],
      homepage: [
        "What's new in space weather?",
        "Show me today's space image",
        "Tell me about solar activity",
        "What stories do you recommend?"
      ]
    };

    // Add contextual suggestions to the last bot message
    setMessages(prev => prev.map((msg, index) => 
      index === prev.length - 1 && msg.sender === 'bot'
        ? { ...msg, suggestions: contextSuggestions[context] }
        : msg
    ));
  };

  const handleSendMessage = async (messageContent?: string) => {
    const contentToSend = messageContent || inputValue;
    if (!contentToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: contentToSend.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    // Reset quick questions if this is a new conversation
    if (messages.length === 0) {
      setQuickQuestionsUsed(false);
      setShowQuickQuestions(true);
    }

    setMessages(prev => [...prev, userMessage]);
    if (!messageContent) {
      setInputValue(''); // Only clear input if we're using the current input value
    }
    setIsLoading(true);
    setIsTyping(true);
    setConnectionStatus('disconnected');

    // Check API key availability
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    console.log('🔑 API Keys Check:', {
      geminiAvailable: !!geminiApiKey,
      geminiLength: geminiApiKey?.length || 0,
      groqAvailable: !!groqApiKey,
      groqLength: groqApiKey?.length || 0
    });

    if (!geminiApiKey && !groqApiKey) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "⚠️ API configuration error: No API keys found. Please add VITE_GEMINI_API_KEY or VITE_GROQ_API_KEY to your environment variables.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      setConnectionStatus('error');
      setIsLoading(false);
      return;
    }

    try {
      console.log('🚀 Sending message to AI API...');
      const response = await sendChatMessage({
        message: userMessage.content,
        context: getWebsiteContext()
      });
      
      const enhancedBotMessage = enhanceBotResponse(response.response);
      setMessages(prev => [...prev, enhancedBotMessage]);
      setConnectionStatus('connected');
      setRetryCount(0);
      setIsTyping(false);
      
      console.log('✅ Message sent successfully');
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setConnectionStatus('error');
      setRetryCount(prev => prev + 1);
      
      let errorContent = "I'm sorry, I'm having trouble connecting right now.";
      
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          errorContent = "🔑 Authentication failed. Please check your API key configuration.";
        } else if (error.message.includes('403')) {
          errorContent = "🚫 Access forbidden. Please check your API permissions.";
        } else if (error.message.includes('429')) {
          errorContent = "⏰ Rate limit exceeded. Please wait a moment before trying again.";
        } else if (error.message.includes('500')) {
          errorContent = "🔧 Server error. The API service might be temporarily unavailable.";
        } else {
          errorContent = `❌ Error: ${error.message}`;
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorContent,
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const getWebsiteContext = () => {
    return {
      website: "AeroStory - Stellar Stories",
      description: "A space weather storytelling platform that brings cosmic phenomena to life through immersive narratives",
      topics: [
        "Solar flares and their effects on Earth",
        "Aurora borealis and aurora australis",
        "Space weather impacts on technology",
        "NASA missions and discoveries",
        "Mars exploration and rovers",
        "Black holes and cosmic phenomena",
        "James Webb Space Telescope discoveries",
        "Space weather forecasting",
        "Geomagnetic storms",
        "Solar wind and coronal mass ejections",
        "Impact on GPS, aviation, and power grids",
        "Astronaut safety and radiation",
        "Northern lights photography and observation",
        "Cosmic ray effects",
        "Space exploration missions"
      ],
      stories: [
        "Sunny the Solar Flare's Adventure",
        "The Great Solar Storm of 2024",
        "Dancing with the Northern Lights in Iceland",
        "Mars Rover Perseverance discoveries",
        "A Photon's Epic Journey",
        "Solar Flare Odyssey",
        "First Image of a Black Hole",
        "James Webb's Cosmic Revelations"
      ],
      currentPage: window.location.pathname
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are solar flares?",
    "How do auroras form?",
    "What is space weather?",
    "Tell me about Sunny's adventure"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage(question); // Pass the question directly to avoid race condition
    // Hide quick questions section after clicking
    setQuickQuestionsUsed(true);
    setShowQuickQuestions(false);
  };



  const generateSmartSuggestions = (userInput: string): string[] => {
    const input = userInput.toLowerCase();
    
    if (input.includes('solar') || input.includes('flare')) {
      return [
        "How do flares affect Earth?",
        "What causes solar flares?",
        "Show recent activity",
        "Sunny's adventure?"
      ];
    }
    
    if (input.includes('aurora') || input.includes('northern lights')) {
      return [
        "How do auroras form?",
        "Where can I see them?",
        "Why different colors?",
        "Aurora photography tips"
      ];
    }
    
    if (input.includes('space weather')) {
      return [
        "What is space weather?",
        "How affects tech?",
        "Current conditions?",
        "Space weather forecast"
      ];
    }
    
    if (input.includes('story') || input.includes('stories')) {
      return [
        "Show all stories",
        "Most popular story?",
        "Sunny's adventure",
        "Mars rover stories"
      ];
    }
    
    return [
      "Tell me about solar flares",
      "How do auroras form?",
      "What is space weather?",
      "Show today's space image"
    ];
  };

  const enhanceBotResponse = (content: string): Message => {
    const suggestions = generateSmartSuggestions(content);
    let richContent: RichContent | undefined;

    

    // Add rich content based on response
    if (content.toLowerCase().includes('nasa') || content.toLowerCase().includes('image of the day')) {
      richContent = {
        type: 'nasa-image',
        title: 'NASA Astronomy Picture of the Day',
        description: 'Today\'s stunning space image from NASA',
        url: '/',
        thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=400&auto=format&fit=crop'
      };
    }

    if (content.toLowerCase().includes('sunny') || content.toLowerCase().includes('solar flare adventure')) {
      richContent = {
        type: 'story-preview',
        title: 'Sunny the Solar Flare\'s Adventure',
        description: 'Join Sunny on a wild cosmic journey to Earth',
        url: '/sunny-adventure-story',
        thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=400&auto=format&fit=crop'
      };
    }

    return {
      id: (Date.now() + 1).toString(),
      content,
      sender: 'bot',
      timestamp: new Date(),
      suggestions,
      richContent
    };
  };

  const renderRichContent = (richContent: RichContent) => {
    switch (richContent.type) {
      case 'nasa-image':
        return (
          <div className="mt-3 p-3 bg-card/30 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-3">
              <img 
                src={richContent.thumbnail} 
                alt={richContent.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm">{richContent.title}</h4>
                <p className="text-xs text-foreground/70 mt-1">{richContent.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 text-xs border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => window.location.href = richContent.url || '/'}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Image
                </Button>
              </div>
            </div>
          </div>
        );

      case 'story-preview':
        return (
          <div className="mt-3 p-3 bg-card/30 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-3">
              <img 
                src={richContent.thumbnail} 
                alt={richContent.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm">{richContent.title}</h4>
                <p className="text-xs text-foreground/70 mt-1">{richContent.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 text-xs border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => window.location.href = richContent.url || '/stories'}
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  Read Story
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Show chatbot on all pages
  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => {
            setIsOpen(true);
            // Reset quick questions when opening chat
            setQuickQuestionsUsed(false);
            setShowQuickQuestions(true);
          }}
          data-chatbot-trigger
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-110 p-1"
        >
          <img 
            src={SunnyImage} 
            alt="Sunny the Solar Flare" 
            className="w-full h-full rounded-full object-cover"
          />
        </Button>
      )}


      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-[350px] sm:w-[380px] lg:w-[380px] h-[600px] sm:h-[650px] lg:h-[600px] bg-card/95 backdrop-blur-xl border-primary/20 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Balanced Fixed Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20 bg-card/95 backdrop-blur-xl sticky top-0 z-10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full overflow-hidden border-2 ${
                connectionStatus === 'connected' 
                  ? 'border-green-500' 
                  : connectionStatus === 'error'
                  ? 'border-red-500'
                  : 'border-green-500'
              }`}>
                <img 
                  src={SunnyImage} 
                  alt="Sunny the Solar Flare" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Sunny the Solar Flare</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' 
                      ? 'bg-green-500' 
                      : connectionStatus === 'error'
                      ? 'bg-red-500'
                      : 'bg-green-500'
                  }`} />
                  <p className="text-xs text-foreground/70">
                    {connectionStatus === 'connected' 
                      ? 'Ready to help!' 
                      : connectionStatus === 'error'
                      ? 'Connection Error'
                      : 'Ready'
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {connectionStatus === 'error' && retryCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setConnectionStatus('disconnected');
                    setRetryCount(0);
                  }}
                  className="text-foreground/70 hover:text-white"
                  title="Retry Connection"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-foreground/70 hover:text-red-400 hover:bg-red-500/10 h-7 w-7 p-0"
              title="Close Chat"
            >
              <X className="w-4 h-4" />
            </Button>
            </div>
          </div>

            <>
              {/* Messages Container - Scrollable */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : message.isError
                          ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                          : 'bg-card/50 border border-primary/20 text-foreground'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === 'bot' && (
                          message.isError ? (
                            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Bot className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          )
                        )}
                        {message.sender === 'user' && (
                          <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          {message.richContent && renderRichContent(message.richContent)}
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-card/50 border border-orange-500/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <img 
                          src={SunnyImage} 
                          alt="Sunny" 
                          className="w-4 h-4 rounded-full object-cover"
                        />
                      <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground/70">Sunny is typing</span>
                          <div className="flex gap-1">
                            <div className="w-1 h-1 bg-orange-500/60 rounded-full animate-pulse" />
                            <div className="w-1 h-1 bg-orange-500/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1 h-1 bg-orange-500/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-card/50 border border-orange-500/20 p-4 rounded-lg max-w-[80%]">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={SunnyImage} 
                            alt="Sunny" 
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-orange-500/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-orange-500/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-orange-500/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="text-sm text-foreground/70 font-medium">Sunny is thinking...</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-foreground/50">
                        Gathering cosmic wisdom from NASA & AI
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Smart Suggestions */}
              {messages.length > 0 && messages[messages.length - 1]?.suggestions && !quickQuestionsUsed && (
                <div className="border-t border-primary/20 bg-gradient-to-br from-card/30 to-card/10">
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <p className="text-sm text-foreground/90 font-semibold">Quick questions:</p>
                    </div>
                    <Button
                      onClick={() => setShowQuickQuestions(!showQuickQuestions)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-foreground/50 hover:text-foreground/80 hover:bg-primary/10 transition-all duration-200"
                    >
                      {showQuickQuestions ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {showQuickQuestions && (
                    <div className="px-3 pb-3">
                      <div className="flex flex-col gap-2">
                        {messages[messages.length - 1].suggestions?.slice(0, 4).map((suggestion, index) => {
                          const icons = ["🌌", "🛰️", "☀️", "🌌"];
                          return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                              onClick={() => handleQuickQuestion(suggestion)}
                              className="text-sm border-primary/30 text-primary hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 group h-8 px-3 text-left justify-start w-full overflow-hidden"
                              title={suggestion}
                            >
                              <span className="mr-2 text-lg group-hover:scale-110 transition-transform duration-200">
                                {icons[index] || "🌟"}
                              </span>
                              <span className="group-hover:text-primary/90 transition-colors duration-200">
                                {suggestion.length > 30 ? suggestion.substring(0, 27) + '...' : suggestion}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}


              {/* Fixed Input Area */}
              <div className="p-3 border-t border-primary/20 bg-card/95 backdrop-blur-xl flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about space weather..."
                    className="flex-1 bg-background/50 border-primary/30 focus:border-primary/50 text-sm h-8"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    size="sm"
                    className="bg-primary hover:bg-primary/80 h-8 w-8 p-0"
                  >
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
                {/* AI Disclaimer */}
                <div className="mt-2 text-center">
                  <p className="text-xs text-foreground/50 leading-relaxed">
                    ⚠️ AI responses may contain inaccuracies. Always verify important information from official sources.
                  </p>
                </div>
              </div>
            </>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
