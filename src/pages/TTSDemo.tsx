import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TextToSpeech from '@/components/TextToSpeech';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Mic } from 'lucide-react';

const TTSDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <TextToSpeech 
        autoDetect={true}
        targetSelector="h1, h2, h3, p, .prose, [data-tts]"
        highlightText={true}
        showControls={true}
        smartMode={true}
      />
      
      <div className="container mx-auto max-w-4xl px-4 pt-20 pb-12">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4" data-tts>
            Text-to-Speech Demo
          </h1>
          <p className="text-xl text-foreground/70" data-tts>
            Experience our advanced text-to-speech feature with auto-detection and voice controls
          </p>
        </div>

        {/* TTS Controls Info */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-white" data-tts>How to Use TTS</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3" data-tts>Manual Controls:</h3>
              <ul className="space-y-2 text-foreground/70" data-tts>
                <li>• Click the speaker icon to enable TTS</li>
                <li>• Use Play button to start reading</li>
                <li>• Pause/Resume with the pause button</li>
                <li>• Stop reading with the stop button</li>
                <li>• Adjust settings with the gear icon</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3" data-tts>Voice Commands:</h3>
              <ul className="space-y-2 text-foreground/70" data-tts>
                <li>• "Start reading" - Begin TTS</li>
                <li>• "Stop reading" - Stop TTS</li>
                <li>• "Pause reading" - Pause TTS</li>
                <li>• "Enable TTS" - Turn on TTS</li>
                <li>• "Disable TTS" - Turn off TTS</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Sample Content */}
        <div className="space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6">
            <h2 className="text-2xl font-semibold text-white mb-4" data-tts>Space Weather Story</h2>
            <div className="prose prose-invert max-w-none">
              <p data-tts>
                In the vast expanse of space, our Sun continuously emits streams of charged particles and radiation. 
                This phenomenon, known as space weather, can have profound effects on Earth and our technological infrastructure.
              </p>
              <p data-tts>
                Solar flares, coronal mass ejections, and solar wind create a dynamic environment that scientists 
                around the world monitor to protect our planet and space-based technologies.
              </p>
            </div>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6">
            <h2 className="text-2xl font-semibold text-white mb-4" data-tts>Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3" data-tts>Auto-Detection</h3>
                <p className="text-foreground/70" data-tts>
                  The TTS system automatically detects new content as it appears on the page, 
                  making it perfect for dynamic web applications and real-time content updates.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3" data-tts>Text Highlighting</h3>
                <p className="text-foreground/70" data-tts>
                  As the system reads text aloud, it highlights the current content being spoken, 
                  providing visual feedback and improving accessibility.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3" data-tts>Voice Controls</h3>
                <p className="text-foreground/70" data-tts>
                  Use natural voice commands to control the TTS system hands-free, 
                  making it accessible for users with mobility limitations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3" data-tts>Customizable Settings</h3>
                <p className="text-foreground/70" data-tts>
                  Adjust speech rate, pitch, volume, and voice selection to create 
                  a personalized listening experience that suits your preferences.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6">
            <h2 className="text-2xl font-semibold text-white mb-4" data-tts>Educational Content</h2>
            <div className="prose prose-invert max-w-none">
              <p data-tts>
                This text-to-speech feature enhances accessibility for users with visual impairments, 
                learning disabilities, or those who prefer auditory learning. It's particularly valuable 
                for educational content, news articles, and documentation.
              </p>
              <p data-tts>
                The system supports multiple languages and voices, making it suitable for international 
                users and diverse content types. Whether you're studying space weather phenomena or 
                exploring interactive stories, TTS makes content more accessible to everyone.
              </p>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/sunny-adventure-story">
              Try TTS with Sunny's Adventure
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TTSDemo;



