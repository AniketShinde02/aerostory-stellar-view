import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag,
  Heart,
  Share2,
  MessageCircle,
  Star,
  Clock
} from 'lucide-react';

// Demo story data
const demoStories = {
  'solar-storm-adventure': {
    id: 'solar-storm-adventure',
    title: 'The Great Solar Storm of 2024: A Night to Remember',
    author: 'Dr. Sarah Chen',
    authorTitle: 'Space Weather Researcher',
    date: 'March 15, 2024',
    category: 'Solar Storm Adventures',
    categoryIcon: '⚡',
    readTime: '8 min read',
    likes: 247,
    shares: 89,
    image: '/api/placeholder/800/400',
    excerpt: 'Witnessing the most intense solar flare in decades from the comfort of my backyard observatory...',
    content: `
      <p>It was a quiet Tuesday evening when my space weather alert system started buzzing frantically. As a space weather researcher, I'm used to solar activity, but this was different. The alerts were coming in rapid succession, indicating something extraordinary was happening on our Sun.</p>

      <p>I rushed to my backyard observatory, where my solar telescope was already tracking the massive sunspot group AR3664. What I saw through the eyepiece took my breath away - a colossal solar flare was erupting from the Sun's surface, releasing energy equivalent to millions of nuclear bombs.</p>

      <h3>The Science Behind the Storm</h3>
      <p>Solar flares are classified by their X-ray brightness. This particular event was classified as an X8.7 flare - one of the most powerful ever recorded. The flare was associated with a coronal mass ejection (CME) that sent billions of tons of charged particles racing toward Earth at speeds exceeding 2,000 kilometers per second.</p>

      <p>As the particles reached Earth's magnetosphere, they began interacting with our planet's magnetic field, creating spectacular auroras visible as far south as Florida and Texas. The geomagnetic storm reached G5 level - the highest category on NOAA's space weather scale.</p>

      <h3>Witnessing History</h3>
      <p>From my location in Colorado, I was treated to one of the most incredible aurora displays I've ever seen. The sky danced with vibrant greens, purples, and reds for hours. My camera captured over 500 images that night, each more stunning than the last.</p>

      <p>The storm also affected satellite communications and GPS systems worldwide. Many airlines rerouted flights to avoid the radiation exposure at high altitudes. It was a stark reminder of how connected we are to our star's activity.</p>

      <h3>Lessons Learned</h3>
      <p>This event reinforced the importance of space weather monitoring and prediction. While beautiful, solar storms can have significant impacts on our technology-dependent society. As we continue to explore space and rely more heavily on satellite technology, understanding and preparing for these cosmic events becomes increasingly crucial.</p>
    `,
    tags: ['Solar Flare', 'Aurora', 'Space Weather', 'Astronomy', 'CME'],
    relatedStories: [
      {
        title: 'Understanding Solar Flares: A Beginner\'s Guide',
        author: 'Prof. Michael Torres',
        readTime: '5 min read'
      },
      {
        title: 'Photographing Auroras: Tips from a Pro',
        author: 'Lisa Wang',
        readTime: '6 min read'
      }
    ]
  },
  'aurora-experience': {
    id: 'aurora-experience',
    title: 'Dancing with the Northern Lights in Iceland',
    author: 'Emma Rodriguez',
    authorTitle: 'Aurora Chaser',
    date: 'February 28, 2024',
    category: 'Aurora Experiences',
    categoryIcon: '🌌',
    readTime: '6 min read',
    likes: 189,
    shares: 156,
    image: '/api/placeholder/800/400',
    excerpt: 'Chasing auroras across Iceland led me to the most magical night of my life...',
    content: `
      <p>After months of planning and saving, I finally made it to Iceland - the land of fire and ice, and more importantly for me, the Northern Lights. My journey began in Reykjavik, but I knew the real adventure would take me far from the city lights.</p>

      <p>I spent the first few days exploring the Golden Circle and Blue Lagoon, but my heart was set on witnessing the aurora borealis. The weather forecast looked promising for my third night, so I drove north to the Snaefellsnes Peninsula, away from light pollution.</p>

      <h3>The Perfect Storm</h3>
      <p>As darkness fell, I set up my camera equipment on the shores of the Atlantic Ocean. The aurora forecast indicated strong activity (KP index of 6), and the sky was crystal clear. I waited patiently, watching the stars emerge one by one.</p>

      <p>Around 10 PM, a faint green glow appeared on the northern horizon. My heart raced as the light slowly intensified and began to dance across the sky. Within minutes, the entire northern sky was alive with swirling curtains of green, purple, and pink light.</p>

      <h3>A Celestial Dance</h3>
      <p>The aurora moved like a living thing, pulsing and swirling in ways that seemed impossible. At one point, the lights formed what looked like a massive spiral galaxy directly overhead. The display was so intense that I could hear crackling sounds - the aurora was literally singing!</p>

      <p>I captured over 200 photos that night, but no image could truly capture the magic of standing under that celestial dance. The lights reflected off the ocean waves, creating a double aurora effect that was absolutely mesmerizing.</p>

      <h3>Beyond the Lights</h3>
      <p>What struck me most wasn't just the visual spectacle, but the profound sense of connection to something greater. Standing there under the aurora, I felt connected to our planet's magnetic field, to the solar wind streaming from our Sun, and to the cosmic forces that shape our universe.</p>

      <p>As the aurora faded with the approaching dawn, I knew I had witnessed something truly special. It wasn't just a natural phenomenon - it was a reminder of the incredible beauty and mystery of our cosmic neighborhood.</p>
    `,
    tags: ['Aurora', 'Iceland', 'Photography', 'Travel', 'Northern Lights'],
    relatedStories: [
      {
        title: 'The Science of Aurora Formation',
        author: 'Dr. James Mitchell',
        readTime: '7 min read'
      },
      {
        title: 'Best Places to See the Northern Lights',
        author: 'Travel Guide Team',
        readTime: '4 min read'
      }
    ]
  },
  'space-mission-discovery': {
    id: 'space-mission-discovery',
    title: 'Mars Rover Discovers Ancient Water Evidence',
    author: 'Dr. Alex Thompson',
    authorTitle: 'Planetary Geologist, NASA',
    date: 'January 22, 2024',
    category: 'Space Exploration',
    categoryIcon: '🚀',
    readTime: '10 min read',
    likes: 423,
    shares: 234,
    image: '/api/placeholder/800/400',
    excerpt: 'The latest data from Perseverance reveals compelling evidence of ancient river systems on Mars...',
    content: `
      <p>After two years of exploration in Jezero Crater, NASA's Perseverance rover has made what could be one of the most significant discoveries in planetary science: definitive evidence of ancient river systems that once flowed across the Martian surface.</p>

      <p>As part of the Mars 2020 mission team, I've been analyzing data from Perseverance's instruments, and the latest findings from the rover's ground-penetrating radar and spectroscopic analysis are nothing short of revolutionary.</p>

      <h3>The Discovery</h3>
      <p>Perseverance's SHERLOC instrument detected mineral signatures in the crater floor that are consistent with sedimentary rocks formed in flowing water. More importantly, the rover's ground-penetrating radar revealed layered structures beneath the surface that match patterns seen in terrestrial river deltas.</p>

      <p>The rover collected samples from what appears to be an ancient river delta, where water once flowed into a lake that filled Jezero Crater. The samples contain clay minerals and organic compounds that suggest this environment could have been habitable billions of years ago.</p>

      <h3>Implications for Life</h3>
      <p>This discovery significantly increases the likelihood that Mars once harbored life. The river delta environment would have provided the perfect conditions for microbial life to thrive - water, nutrients, and protection from radiation.</p>

      <p>The organic compounds detected aren't necessarily evidence of life themselves, but they are the building blocks of life as we know it. Combined with the water evidence, this paints a picture of a much more Earth-like Mars in its ancient past.</p>

      <h3>Future Missions</h3>
      <p>These findings will directly influence future Mars missions. The Mars Sample Return mission, scheduled for the late 2020s, will bring these samples back to Earth for detailed analysis in laboratories that far exceed the capabilities of any rover.</p>

      <p>We're also planning to explore other locations on Mars that show similar geological features. The goal is to understand how widespread these ancient water systems were and whether they could have supported life across the planet.</p>

      <h3>The Bigger Picture</h3>
      <p>This discovery doesn't just tell us about Mars - it tells us about the potential for life throughout the universe. If Mars, which is now cold and dry, once had conditions suitable for life, then countless other worlds might have as well.</p>
    `,
    tags: ['Mars', 'NASA', 'Perseverance', 'Water', 'Life', 'Exploration'],
    relatedStories: [
      {
        title: 'The Future of Mars Exploration',
        author: 'Mission Planning Team',
        readTime: '8 min read'
      },
      {
        title: 'What We\'ve Learned from Mars Rovers',
        author: 'Dr. Maria Santos',
        readTime: '9 min read'
      }
    ]
  }
};

const StoryPage: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  
  // Redirect to Sunny's Adventure page if the story ID matches
  if (storyId === 'sunny-solar-flare-adventure') {
    window.location.href = '/sunny-adventure-story';
    return null;
  }
  
  const story = storyId ? demoStories[storyId as keyof typeof demoStories] : null;

  if (!story) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Story Not Found</h1>
          <p className="text-foreground/70 mb-8">The story you're looking for doesn't exist.</p>
          <Link to="/#stories">
            <Button>Back to Stories</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="container mx-auto max-w-4xl px-4">
          <Link to="/#stories" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>

          <div className="space-y-6">
            {/* Category Badge */}
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {story.categoryIcon} {story.category}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {story.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-foreground/70">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{story.author}</span>
                {story.authorTitle && <span className="text-foreground/50">• {story.authorTitle}</span>}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{story.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{story.readTime}</span>
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-foreground/70">
                <Heart className="w-4 h-4" />
                <span>{story.likes} likes</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Share2 className="w-4 h-4" />
                <span>{story.shares} shares</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Featured Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-foreground/50">Featured Image</span>
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <p className="text-lg text-foreground/80 leading-relaxed italic">
                  {story.excerpt}
                </p>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: story.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-primary/30 text-primary">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Engagement Actions */}
              <div className="flex items-center gap-4 pt-8 border-t border-primary/20">
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Like Story
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Card */}
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{story.author}</h3>
                    {story.authorTitle && (
                      <p className="text-sm text-foreground/70">{story.authorTitle}</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Related Stories */}
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6">
                <h3 className="font-semibold text-white mb-4">Related Stories</h3>
                <div className="space-y-4">
                  {story.relatedStories.map((relatedStory, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="text-sm font-medium text-white hover:text-primary cursor-pointer">
                        {relatedStory.title}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-foreground/70">
                        <span>{relatedStory.author}</span>
                        <span>{relatedStory.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6">
                <div className="text-center space-y-4">
                  <Star className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-semibold text-white">Stay Updated</h3>
                  <p className="text-sm text-foreground/70">
                    Get the latest cosmic stories delivered to your inbox.
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Subscribe
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StoryPage;
