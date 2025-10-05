import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Chrome as Home, Maximize2, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

// AeroVerse with embedded Stars Chrome Experiment

const AeroVerse = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Navigation Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-md border-b border-border/50"
      >
        <div className="container mx-auto px-4 xs:px-6 sm:px-8 py-3 xs:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="md" showText={false} />
            <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-glow">AeroVerse</h1>
          </div>
          <div className="flex gap-2 xs:gap-3">
             <Button
               onClick={() => window.open('https://stars.chromeexperiments.com/', '_blank')}
               variant="outline"
               size="sm"
               className="border-primary/50 hover:border-primary hover:bg-primary/10 text-xs xs:text-sm px-2 xs:px-3 py-1.5 xs:py-2"
             >
               <ExternalLink className="mr-1 xs:mr-2 h-3 w-3 xs:h-4 xs:w-4" />
               <span className="hidden xs:inline">Open in New Tab</span>
               <span className="xs:hidden">New Tab</span>
             </Button>
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="icon"
              className="border-primary/50 hover:border-primary hover:bg-primary/10 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10"
            >
              <Maximize2 className="h-3 w-3 xs:h-4 xs:w-4" />
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-primary/50 hover:border-primary hover:bg-primary/10 text-xs xs:text-sm px-2 xs:px-3 py-1.5 xs:py-2"
            >
              <Home className="mr-1 xs:mr-2 h-3 w-3 xs:h-4 xs:w-4" />
              <span className="hidden xs:inline">Back to Home</span>
              <span className="xs:hidden">Home</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Embedded Stars Chrome Experiment */}
      <div className="fixed inset-0 pt-16">
        <iframe
          src="https://stars.chromeexperiments.com/"
          title="Interactive Star Field - Chrome Experiments"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default AeroVerse;
