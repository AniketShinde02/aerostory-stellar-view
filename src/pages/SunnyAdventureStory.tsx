import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SunnyAdventureStory: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set video to start at 11 seconds when loaded
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        video.currentTime = 11; // Start at 11 seconds
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  // Story data - minimal and clean
  const story = {
    title: 'Sunny the Solar Flare\'s Adventure — Through the Eyes of Earthlings',
    author: 'NASA Space Apps Team',
    date: 'March 25, 2024',
    readTime: '15 min read',
    excerpt: 'Join Sunny, the cheerful solar flare, on a wild cosmic journey to Earth. Meet farmers, pilots, astronauts, and kids as they experience the effects of space weather in this cinematic 3D adventure.',
    keyPoints: [
      {
        title: 'The Sun & Sunny\'s Birth',
        description: 'Deep in the heart of our Sun, where temperatures reach 15 million degrees Celsius, a burst of magnetic energy creates our hero: Sunny the Solar Flare.'
      },
      {
        title: 'What is Space Weather?',
        description: 'Space weather refers to the conditions in space that can affect Earth and its technological systems, primarily driven by the Sun\'s solar wind, flares, and coronal mass ejections.'
      },
      {
        title: 'Journey to Earth',
        description: 'Sunny zips past Mercury and Venus, approaching the beautiful blue marble of Earth as his ultimate destination.'
      },
      {
        title: 'GPS Impact on Farmers',
        description: 'As Sunny\'s energy brushes past Earth, GPS signals momentarily glitch, causing tractors to swerve - a reminder of space weather\'s reach.'
      },
      {
        title: 'Radio Disruption for Pilots',
        description: 'Solar flares disrupt high-frequency radio communications, making it harder for planes to communicate with air traffic control.'
      },
      {
        title: 'Radiation Concerns for Astronauts',
        description: 'On the International Space Station, astronauts must quickly move to shielded areas when radiation levels spike from solar activity.'
      },
      {
        title: 'Power Grid Effects',
        description: 'Geomagnetic storms can induce currents in power lines, potentially overloading transformers and causing blackouts in cities.'
      },
      {
        title: 'Beautiful Auroras',
        description: 'Children in the north witness vibrant green, pink, and purple auroras created when Sunny\'s particles interact with Earth\'s atmosphere.'
      },
      {
        title: 'Scientists Track & Predict',
        description: 'Scientists monitor satellites and observatories to track space weather and predict impacts, helping protect our planet.'
      }
    ],
    endingMessage: 'Even the Sun\'s wildest storms connect us all — from space to soil, from sky to heart.'
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8">
        <div className="container mx-auto max-w-4xl px-4">
          <Link to="/stories" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>

          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {story.title}
            </h1>

          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="pb-8">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl overflow-hidden shadow-2xl">
            <video 
              ref={videoRef}
              width="100%" 
              height="100%" 
              controls
              preload="metadata"
              className="w-full h-full"
            >
              <source src="https://ik.imagekit.io/introvertani26/captioncraft_uploads/Nasa%20clip/OrbitX%20team%20_%20Nasa%20space%20apps%202025%20_%20stellar%20stories%C2%A0challenge%20_%20project%202(1080P_HD)%20(1).mp4?updatedAt=1759617096031" type="video/mp4" />
              <p className="text-center text-foreground/70 p-8">
                Your browser doesn't support HTML5 video. 
                <a href="https://ik.imagekit.io/introvertani26/captioncraft_uploads/Nasa%20clip/OrbitX%20team%20_%20Nasa%20space%20apps%202025%20_%20stellar%20stories%C2%A0challenge%20_%20project%202(1080P_HD)%20(1).mp4?updatedAt=1759617096031" className="text-primary hover:underline">
                  Download the video
                </a>
              </p>
            </video>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="pb-12">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Excerpt */}
          <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6 mb-8">
            <p className="text-lg text-foreground/80 leading-relaxed">
              {story.excerpt}
            </p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {story.keyPoints.map((point, index) => (
              <div key={index} className="bg-card/20 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                  </span>
                  {point.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed pl-10 text-sm">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          {/* Ending Message */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-8">
              <blockquote className="text-xl md:text-2xl font-medium text-white italic leading-relaxed">
                "{story.endingMessage}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SunnyAdventureStory;