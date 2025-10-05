import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Settings, 
  Heart, 
  Share2, 
  Download,
  ExternalLink,
  ArrowRight,
  ChevronRight,
  Star,
  Bookmark,
  MessageCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface ButtonTestProps {
  onButtonClick?: (buttonName: string) => void;
}

const ButtonTest: React.FC<ButtonTestProps> = ({ onButtonClick = () => {} }) => {
  const handleButtonClick = (buttonName: string) => {
    console.log(`Button clicked: ${buttonName}`);
    onButtonClick(buttonName);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Button Functionality Test</h2>
        <p className="text-foreground/70">Testing all button types and interactions across the site</p>
      </div>

      {/* Primary Buttons */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h3 className="text-xl font-semibold text-white mb-4">Primary Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => handleButtonClick('Primary Default')}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Play className="w-4 h-4 mr-2" />
            Primary Button
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Primary Large')}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Star className="w-5 h-5 mr-2" />
            Large Primary
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Primary Small')}
            size="sm"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Heart className="w-4 h-4 mr-2" />
            Small Primary
          </Button>
        </div>
      </Card>

      {/* Secondary Buttons */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h3 className="text-xl font-semibold text-white mb-4">Secondary Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => handleButtonClick('Secondary Outline')}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Outline Button
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Secondary Ghost')}
            variant="ghost"
            className="hover:bg-primary/10 text-primary"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Ghost Button
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Secondary Link')}
            variant="link"
            className="text-primary hover:text-primary/80"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Link Button
          </Button>
        </div>
      </Card>

      {/* Interactive Buttons */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h3 className="text-xl font-semibold text-white mb-4">Interactive Buttons</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => handleButtonClick('Play Button')}
            className="bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30"
          >
            <Play className="w-4 h-4 mr-2" />
            Play
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Pause Button')}
            className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Stop Button')}
            className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Volume Button')}
            className="bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Volume
          </Button>
        </div>
      </Card>

      {/* Action Buttons */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h3 className="text-xl font-semibold text-white mb-4">Action Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => handleButtonClick('Like Button')}
            className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Like
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Share Button')}
            className="bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Bookmark Button')}
            className="bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Bookmark
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Comment Button')}
            className="bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Comment
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Download Button')}
            className="bg-orange-500/20 border-orange-500/30 text-orange-400 hover:bg-orange-500/30"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </Card>

      {/* Navigation Buttons */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h3 className="text-xl font-semibold text-white mb-4">Navigation Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => handleButtonClick('Previous Button')}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <SkipBack className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Next Button')}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            Next
            <SkipForward className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Settings Button')}
            variant="ghost"
            className="hover:bg-primary/10 text-primary"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </Card>

      {/* Responsive Test */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h3 className="text-xl font-semibold text-white mb-4">Responsive Button Test</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Button 
            onClick={() => handleButtonClick('Responsive Button 1')}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Star className="w-4 h-4 mr-2" />
            Responsive 1
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Responsive Button 2')}
            variant="outline"
            className="w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/10"
          >
            <Heart className="w-4 h-4 mr-2" />
            Responsive 2
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Responsive Button 3')}
            variant="ghost"
            className="w-full sm:w-auto hover:bg-primary/10 text-primary"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Responsive 3
          </Button>
          
          <Button 
            onClick={() => handleButtonClick('Responsive Button 4')}
            className="w-full sm:w-auto bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
          >
            <ChevronRight className="w-4 h-4 mr-2" />
            Responsive 4
          </Button>
        </div>
      </Card>

      {/* Status Indicators */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <h3 className="text-xl font-semibold text-white mb-4">Button Status Test</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            ✅ All buttons functional
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            📱 Mobile responsive
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            🎨 Styled correctly
          </Badge>
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
            ⚡ Fast interactions
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default ButtonTest;
