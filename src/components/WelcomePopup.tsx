import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Sparkles, Zap, Globe, Star, MessageCircle } from 'lucide-react';
import SunnyImage from '@/assets/Sunny.png';

interface WelcomePopupProps {
  onClose: () => void;
  onStartChat: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose, onStartChat }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup with a slight delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="fixed bottom-4 right-4 w-72 sm:w-80 max-w-[calc(100vw-2rem)] pointer-events-auto">
        <Card className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl border-primary/20 shadow-2xl animate-in slide-in-from-bottom-4 fade-in-0 duration-500 hover:shadow-primary/20 transition-shadow">
          <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-0.5">
                <img 
                  src={SunnyImage} 
                  alt="Sunny the Solar Flare" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Welcome to AeroStory!</h2>
                <p className="text-xs text-foreground/70">Your cosmic adventure awaits</p>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-foreground/50 hover:text-foreground/80"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Meet Sunny the Solar Flare! 🌟
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">
                Your friendly space weather guide! Ask me about solar flares, auroras, and cosmic phenomena.
              </p>
            </div>

            {/* Features - Compact */}
            <div className="flex flex-wrap gap-1">
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-primary/10">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-xs font-medium text-foreground">Space Weather</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-primary/10">
                <Globe className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-medium text-foreground">Real-time Data</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-primary/10">
                <Star className="w-3 h-3 text-purple-400" />
                <span className="text-xs font-medium text-foreground">Aurora Forecasts</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-primary/10">
                <Sparkles className="w-3 h-3 text-pink-400" />
                <span className="text-xs font-medium text-foreground">Stories</span>
              </div>
            </div>

            {/* CTA - Compact */}
            <div className="space-y-1.5">
              <Button
                onClick={onStartChat}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 text-sm"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Start Chatting with Sunny!
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/10 text-xs py-1.5"
              >
                Explore the Site First
              </Button>
            </div>
          </div>

          {/* Footer - Compact */}
          <div className="mt-2 pt-2 border-t border-primary/20">
            <p className="text-xs text-center text-foreground/60">
              Click the floating button anytime! 🚀
            </p>
          </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WelcomePopup;
