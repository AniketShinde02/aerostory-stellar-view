import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Chrome as Home, Maximize2, Info, Star, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AeroVerseVoiceOver from "@/components/AeroVerseVoiceOver";
import Logo from "@/components/Logo";

// AeroVerse with embedded Stars Chrome Experiment

const AeroVerse = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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

      {/* Info Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-8 z-40"
      >
        <Button
          onClick={() => setShowInfo(!showInfo)}
          variant="outline"
          size="lg"
          className="border-cyan-500/50 hover:border-cyan-500 bg-background/20 backdrop-blur-md hover:bg-background/30 text-cyan-400"
        >
          <Info className="mr-2 h-5 w-5" />
          {showInfo ? 'Hide' : 'Show'} Info
        </Button>
      </motion.div>

      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-8 right-8 z-30 max-w-4xl mx-auto"
        >
          <div className="bg-background/20 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Welcome to the AeroVerse</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="text-cyan-400 font-semibold mb-2">Interactive Star Field:</h3>
                <ul className="text-foreground/70 space-y-1">
                  <li>• 100,000+ Real Stars</li>
                  <li>• Accurate Stellar Positions</li>
                  <li>• Interactive 3D Navigation</li>
                  <li>• Temperature-based Colors</li>
                  <li>• Educational Star Information</li>
                  <li>• Smooth Performance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-cyan-400 font-semibold mb-2">Explore:</h3>
                <ul className="text-foreground/70 space-y-1">
                  <li>• Click & Drag: Rotate view</li>
                  <li>• Scroll: Zoom in/out</li>
                  <li>• Click stars for details</li>
                  <li>• Learn about stellar properties</li>
                  <li>• Discover our cosmic neighborhood</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-xs text-primary/80">
                <strong>Powered by:</strong> <a href="https://stars.chromeexperiments.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Chrome Experiments Stars</a> - An interactive visualization of 100,000 nearby stars.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Status Panel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed top-20 right-8 z-30 bg-background/20 backdrop-blur-xl border border-green-500/30 rounded-xl p-4"
      >
        <h4 className="text-green-400 text-sm font-bold mb-2">AeroVerse Status</h4>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-foreground/60">Experience:</span>
            <span className="font-mono text-green-400">Chrome Stars</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-foreground/60">Stars:</span>
            <span className="font-mono text-green-400">100,000+</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-foreground/60">Status:</span>
            <span className="font-mono text-green-400">ACTIVE</span>
          </div>
        </div>
      </motion.div>

      {/* Circular Voice-Over Button */}
      <AeroVerseVoiceOver />
    </div>
  );
};

export default AeroVerse;
