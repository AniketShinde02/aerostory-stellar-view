import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { seoConfigs } from '@/components/SEO';


// Demo stories data
const demoStories = [
  {
    id: 'sunny-solar-flare-adventure',
    title: 'Sunny the Solar Flare\'s Adventure — Through the Eyes of Earthlings',
    author: 'NASA Space Apps Team',
    authorTitle: 'Space Weather Storytellers',
    category: 'solar-storms',
    type: 'immersive',
    date: '2024-03-25',
    readTime: '15 min read',
    excerpt: 'Join Sunny, the cheerful solar flare, on a wild cosmic journey to Earth. Meet farmers, pilots, astronauts, and kids as they experience the effects of space weather in this cinematic 3D adventure.',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop',
    tags: ['solar flare', 'space weather', '3D adventure', 'educational', 'cinematic', 'NASA'],
    likes: 2100,
    shares: 650,
    comments: 425,
    views: 32100,
    isBookmarked: true,
    isLiked: true,
    rating: 4.9,
    featured: true
  },
  {
    id: 'solar-storm-adventure',
    title: '⚡ The Great Solar Storm of 2024: When the Sky Went Wild',
    author: 'Dr. Sarah Chen',
    authorTitle: 'Space Weather Researcher',
    category: 'solar-storms',
    type: 'traditional',
    date: '2024-03-20',
    readTime: '8 min read',
    excerpt: 'Witness the most intense solar flare in decades as it dances across our atmosphere, affecting communication systems worldwide and painting the sky with spectacular auroras that left millions in awe.',
    imageUrl: 'https://images.unsplash.com/photo-1628510117722-c27501517020?q=80&w=800&auto=format&fit=crop',
    tags: ['solar flare', 'aurora', 'space weather', 'geomagnetic storm', 'spectacular'],
    likes: 1245,
    shares: 321,
    comments: 189,
    views: 15600,
    isBookmarked: false,
    isLiked: false,
    rating: 4.8,
    featured: true
  },
  {
    id: 'aurora-experience',
    title: '🌌 Dancing with the Northern Lights: Iceland\'s Celestial Ballet',
    author: 'Emma Rodriguez',
    authorTitle: 'Aurora Chaser & Photographer',
    category: 'aurora-tales',
    type: 'hybrid',
    date: '2024-03-15',
    readTime: '6 min read',
    excerpt: 'The sky transformed into a living canvas as green and purple lights danced above Iceland\'s frozen wilderness. Join me on this magical night where nature painted its masterpiece.',
    imageUrl: 'https://images.unsplash.com/photo-1523820106-cdd10532107e?q=80&w=800&auto=format&fit=crop',
    tags: ['northern lights', 'iceland', 'travel', 'photography', 'aurora borealis', 'magical'],
    likes: 987,
    shares: 256,
    comments: 120,
    views: 12800,
    isBookmarked: true,
    isLiked: true,
    rating: 4.9,
    featured: false
  },
  {
    id: 'space-mission-discovery',
    title: '🔴 Mars Rover Perseverance: The Water Mystery Unfolds',
    author: 'Dr. Alex Thompson',
    authorTitle: 'Planetary Geologist, NASA',
    category: 'space-exploration',
    type: 'immersive',
    date: '2024-03-10',
    readTime: '10 min read',
    excerpt: 'Breaking: Perseverance rover uncovers compelling evidence of ancient water systems on Mars. This discovery could rewrite our understanding of the Red Planet\'s history and potential for life.',
    imageUrl: 'https://images.unsplash.com/photo-1614728263745-0597b073796c?q=80&w=800&auto=format&fit=crop',
    tags: ['mars', 'rover', 'nasa', 'water', 'exoplanet', 'geology', 'discovery'],
    likes: 2100,
    shares: 540,
    comments: 310,
    views: 25600,
    isBookmarked: false,
    isLiked: true,
    rating: 4.7,
    featured: true
  },
  {
    id: 'cosmic-journey',
    title: '✨ A Photon\'s Epic Journey: From Stellar Death to Your Eyes',
    author: 'Dr. Elena Martinez',
    authorTitle: 'Astrophysicist',
    category: 'cosmic-discoveries',
    type: 'hybrid',
    date: '2024-03-08',
    readTime: '12 min read',
    excerpt: 'Follow a single photon on an incredible 13-billion-year journey from a dying star across the cosmic web, through gravitational lensing, to finally reaching your retina in this moment.',
    imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=800&auto=format&fit=crop',
    tags: ['photons', 'stellar evolution', 'space physics', 'light', 'cosmic web', 'journey'],
    likes: 324,
    shares: 156,
    comments: 89,
    views: 8900,
    isBookmarked: true,
    isLiked: false,
    rating: 4.6,
    featured: false
  },
  {
    id: 'solar-flare-journey',
    title: '☀️ Solar Flare Odyssey: The Sun\'s Fury Meets Earth\'s Shield',
    author: 'Dr. Elena Martinez',
    authorTitle: 'Space Weather Researcher',
    category: 'solar-storms',
    type: 'educational',
    date: '2024-03-05',
    readTime: '15 min read',
    excerpt: 'Experience the dramatic 8-minute journey of a massive solar flare from its explosive birth in the Sun\'s corona to its electrifying collision with Earth\'s protective magnetic shield.',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop',
    tags: ['solar flares', 'space weather', 'aurora', 'radiation', 'technology impact', 'magnetic shield'],
    likes: 567,
    shares: 234,
    comments: 145,
    views: 12300,
    isBookmarked: false,
    isLiked: true,
    rating: 4.9,
    featured: true
  },
  {
    id: 'black-hole-discovery',
    title: '🕳️ First Image of a Black Hole: The Impossible Made Visible',
    author: 'Dr. Katie Bouman',
    authorTitle: 'Computer Vision Scientist',
    category: 'cosmic-discoveries',
    type: 'immersive',
    date: '2024-03-01',
    readTime: '12 min read',
    excerpt: 'Witness the historic moment when humanity captured the first image of a black hole\'s event horizon, proving Einstein\'s theories and opening new frontiers in astrophysics.',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=800&auto=format&fit=crop',
    tags: ['black hole', 'event horizon', 'einstein', 'astrophysics', 'breakthrough', 'imaging'],
    likes: 3420,
    shares: 890,
    comments: 567,
    views: 45600,
    isBookmarked: true,
    isLiked: true,
    rating: 4.9,
    featured: true
  },
  {
    id: 'james-webb-revelations',
    title: '🔭 James Webb\'s Cosmic Revelations: The Universe Like Never Before',
    author: 'Dr. Jane Rigby',
    authorTitle: 'Webb Telescope Scientist',
    category: 'space-exploration',
    type: 'educational',
    date: '2024-02-28',
    readTime: '14 min read',
    excerpt: 'Explore the breathtaking discoveries from the James Webb Space Telescope, revealing ancient galaxies, stellar nurseries, and exoplanet atmospheres in unprecedented detail.',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=800&auto=format&fit=crop',
    tags: ['james webb', 'telescope', 'galaxies', 'exoplanets', 'infrared', 'discovery'],
    likes: 2890,
    shares: 720,
    comments: 445,
    views: 38900,
    isBookmarked: false,
    isLiked: true,
    rating: 4.8,
    featured: true
  }
];

const Stories = () => {
  // Only show the Sunny story
  const filteredStories = demoStories.filter(story => story.id === 'sunny-solar-flare-adventure');



  return (
    <div className="min-h-screen bg-background">
      <SEO {...seoConfigs.stories} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 pb-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-7xl px-4 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary text-sm font-medium">Featured Story</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-glow leading-tight mb-6">
              Cosmic Stories & 
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"> Narratives</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
              Experience the universe through <span className="text-primary font-semibold">immersive storytelling</span> and discover how space weather connects us all.
            </p>
          </div>
        </div>
      </section>


      {/* Main Story Section */}
      <section className="py-16 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"></div>
          </div>

        <div className="container mx-auto max-w-7xl px-4 relative">
          {/* Story Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              {filteredStories.map(story => {
                return (
                  <Card key={story.id} className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-primary/30 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 group overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02]">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-0 min-h-[500px]">
                      
                      {/* Image Section */}
                      <div className="xl:col-span-7 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
                        <img 
                          src={story.imageUrl} 
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                        
                        {/* Overlay Effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-background/30 group-hover:from-transparent group-hover:via-background/5 group-hover:to-background/20 transition-all duration-700" />
                        
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out" />
                        
                        {/* Floating Elements */}
                        <div className="absolute top-6 right-6 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-3 py-1">
                          <span className="text-primary text-xs font-medium">Featured</span>
                        </div>
                        
                        <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white text-sm font-medium">Available Now</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="xl:col-span-5 p-8 lg:p-12 flex flex-col justify-center relative">
                        {/* Content Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent"></div>
                        
                        <div className="relative z-10 space-y-6">
                          {/* Category Badge */}
                          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-primary text-sm font-medium">Solar Storm Adventure</span>
                          </div>
                          
                          {/* Title */}
                          <Link to={story.id === 'sunny-solar-flare-adventure' ? '/sunny-adventure-story' : `/story/${story.id}`}>
                            <h3 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-primary transition-all duration-300 leading-tight hover:drop-shadow-lg">
                              {story.title}
                            </h3>
                          </Link>
                          
                          {/* Author and Meta */}
                          <div className="flex flex-wrap items-center gap-4 text-foreground/70">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary text-sm font-bold">N</span>
                              </div>
                              <span className="font-medium">{story.author}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                  <span>{story.readTime}</span>
                              <span>•</span>
                              <span>{story.date}</span>
                            </div>
                          </div>
                          
                          {/* Excerpt */}
                          <p className="text-foreground/80 text-lg leading-relaxed line-clamp-4">
                            {story.excerpt}
                          </p>
                          
                          {/* Stats */}
                          <div className="flex items-center gap-6 pt-4 border-t border-primary/20">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              <span className="text-foreground/70 text-sm">Educational</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              <span className="text-foreground/70 text-sm">NASA Content</span>
                            </div>
                          </div>
                          
                          {/* Action Button */}
                          <div className="pt-4">
                            <Link to={story.id === 'sunny-solar-flare-adventure' ? '/sunny-adventure-story' : `/story/${story.id}`}>
                              <Button className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary/90 text-white font-semibold px-10 py-4 text-lg transition-all duration-300 hover:scale-105 group/btn shadow-lg hover:shadow-xl hover:shadow-primary/25">
                                <span>Start Adventure</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </Button>
                              </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
              </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stories;
