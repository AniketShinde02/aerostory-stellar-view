import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  MessageCircle, 
  Sparkles, 
  Users,
  BookOpen,
  Star,
  Zap,
  Globe,
  Camera,
  Satellite,
  ChevronRight
} from 'lucide-react';

interface StoriesSectionProps {
  id: string;
}

const StoriesSection = ({ id }: StoriesSectionProps) => {
  const storyTypes = [
    {
      id: 'solar-storms',
      icon: Zap,
      title: 'Solar Storm Adventures',
      description: 'Epic tales of solar flares and space weather phenomena',
      color: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-400'
    },
    {
      id: 'aurora-tales',
      icon: Sparkles,
      title: 'Aurora Experiences',
      description: 'Stories of witnessing the Northern Lights and auroras',
      color: 'from-green-500/20 to-cyan-500/20',
      iconColor: 'text-green-400'
    },
    {
      id: 'space-exploration',
      icon: Globe,
      title: 'Space Exploration',
      description: 'Adventures in space missions and cosmic discoveries',
      color: 'from-blue-500/20 to-purple-500/20',
      iconColor: 'text-blue-400'
    },
    {
      id: 'astronomy-photos',
      icon: Camera,
      title: 'Astronomy Photography',
      description: 'Stories behind amazing space photography and observations',
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400'
    },
    {
      id: 'satellite-missions',
      icon: Satellite,
      title: 'Satellite Missions',
      description: 'Behind-the-scenes stories of satellite operations and data',
      color: 'from-indigo-500/20 to-violet-500/20',
      iconColor: 'text-indigo-400'
    }
  ];

  const recentStories = [
    {
      id: 'solar-storm-adventure',
      title: 'The Great Solar Storm of 2024',
      author: 'Dr. Sarah Chen',
      type: 'solar-storms',
      excerpt: 'Witnessed the most intense solar flare in decades...',
      date: '2 days ago',
      readTime: '8 min read'
    },
    {
      id: 'aurora-experience',
      title: 'Dancing with the Northern Lights in Iceland',
      author: 'Emma Rodriguez',
      type: 'aurora-tales',
      excerpt: 'The sky danced with green and purple lights...',
      date: '1 week ago',
      readTime: '6 min read'
    },
    {
      id: 'space-mission-discovery',
      title: 'Mars Rover Discovers Ancient Water Evidence',
      author: 'Dr. Alex Thompson',
      type: 'space-exploration',
      excerpt: 'New evidence of ancient water on Mars...',
      date: '2 weeks ago',
      readTime: '10 min read'
    }
  ];

  return (
    <section id={id} className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Stories
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-glow leading-tight mb-3 xs:mb-4">
            Cosmic Storytelling
          </h2>
          <p className="text-base xs:text-lg lg:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            Discover and share incredible stories about space weather, cosmic phenomena, and astronomical adventures from enthusiasts around the world.
          </p>
        </div>

        {/* Hero Section */}
        <div className="mb-12 xs:mb-16 sm:mb-20 lg:mb-24">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-8 xs:p-10 lg:p-12 text-center">
            <div className="space-y-6 xs:space-y-8 max-w-4xl mx-auto">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl">
                  <BookOpen className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white">
                Share Your Cosmic Adventures
              </h3>
              
              <p className="text-lg xs:text-xl text-foreground/80 leading-relaxed">
                Join our community of space enthusiasts and share incredible stories about solar phenomena, astronomical observations, space weather events, and cosmic discoveries.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg">
                    <Zap className="w-6 h-6 text-yellow-400" />
                  </div>
                  <span className="text-sm text-foreground/70">Solar Storms</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-lg">
                    <Sparkles className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-sm text-foreground/70">Auroras</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-sm text-foreground/70">Space Missions</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                    <Camera className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-sm text-foreground/70">Astronomy</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Story Categories */}
        <div className="mb-12 xs:mb-16 sm:mb-20 lg:mb-24">
          <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white text-center mb-8 xs:mb-10">
            Story Categories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
            {storyTypes.map((storyType, index) => {
              const IconComponent = storyType.icon;
              return (
                <Card 
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--glow-primary)] group cursor-pointer"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 bg-gradient-to-br ${storyType.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-6 h-6 ${storyType.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                          {storyType.title}
                        </h4>
                      </div>
                    </div>
                    
                    <p className="text-foreground/70 leading-relaxed flex-grow mb-4">
                      {storyType.description}
                    </p>
                    
                    <Link to={`/story/${storyType.id}`}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="self-start border-primary/30 text-primary hover:bg-primary/10"
                      >
                        Explore Stories
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Stories */}
        <div className="mb-12 xs:mb-16 sm:mb-20 lg:mb-24">
          <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white text-center mb-8 xs:mb-10">
            Recent Stories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
            {recentStories.map((story, index) => {
              const storyType = storyTypes.find(type => type.id === story.type);
              const IconComponent = storyType?.icon || Star;
              const color = storyType?.color || 'from-gray-500/20 to-gray-600/20';
              const iconColor = storyType?.iconColor || 'text-gray-400';
              
              return (
                <Link key={index} to={`/story/${story.id}`}>
                  <Card 
                    className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--glow-primary)] group cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gradient-to-br ${color} rounded-lg`}>
                          <IconComponent className={`w-5 h-5 ${iconColor}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-primary transition-colors">
                            {story.title}
                          </h4>
                          <p className="text-sm text-foreground/60">by {story.author}</p>
                        </div>
                      </div>
                      
                      <p className="text-foreground/70 leading-relaxed">
                        {story.excerpt}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-sm text-foreground/60">
                          <span>{story.date}</span>
                          <span>•</span>
                          <span>{story.readTime}</span>
                        </div>
                        <Button variant="link" size="sm" className="text-primary hover:text-primary/80 p-0">
                          Read More →
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Immersive Stories Section */}
        <div className="mb-12 xs:mb-16 sm:mb-20">
          <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-glow leading-tight mb-6 text-center">
            Immersive Storytelling Experiences
          </h3>
          <p className="text-base xs:text-lg text-foreground/70 max-w-3xl mx-auto mb-8 text-center">
            Dive into interactive 3D storytelling with mouse-based animations, real-time effects, and ambient audio.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link to="/immersive-story/cosmic-journey">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--glow-primary)] group cursor-pointer h-full">
                <div className="space-y-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg w-fit">
                    <Globe className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-white group-hover:text-primary transition-colors">
                    The Cosmic Journey
                  </h4>
                  <p className="text-foreground/70 text-sm">
                    Follow a photon's journey from a dying star to your eye in this immersive 3D experience.
                  </p>
                  <div className="flex items-center text-primary text-sm">
                    <span>3D Interactive</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/immersive-story/solar-storm-epic">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--glow-primary)] group cursor-pointer h-full">
                <div className="space-y-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg w-fit">
                    <Zap className="w-6 h-6 text-orange-400" />
                  </div>
                  <h4 className="font-semibold text-white group-hover:text-primary transition-colors">
                    The Great Solar Storm
                  </h4>
                  <p className="text-foreground/70 text-sm">
                    Experience the power of solar flares and coronal mass ejections in real-time 3D.
                  </p>
                  <div className="flex items-center text-primary text-sm">
                    <span>Real-time Effects</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/immersive-story/aurora-dance">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--glow-primary)] group cursor-pointer h-full">
                <div className="space-y-4">
                  <div className="p-3 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-lg w-fit">
                    <Sparkles className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="font-semibold text-white group-hover:text-primary transition-colors">
                    Dance of the Northern Lights
                  </h4>
                  <p className="text-foreground/70 text-sm">
                    Watch auroras dance across the sky with mouse-interactive particle systems.
                  </p>
                  <div className="flex items-center text-primary text-sm">
                    <span>Mouse Interaction</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-8 xs:p-10 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl xs:text-3xl font-bold text-white">
                Share Your Cosmic Story
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Have an amazing space experience to share? Join our community of space enthusiasts and tell your story about solar phenomena, astronomical observations, or cosmic adventures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-8 py-3">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Share Your Story
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-3">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
