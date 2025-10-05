import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Code, 
  Palette, 
  Database, 
  Globe, 
  BookOpen, 
  Zap, 
  Camera, 
  Music,
  Rocket,
  Shield,
  Cpu,
  Layers,
  Package,
  Github,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const Resources = () => {
  const resourceCategories = [
    {
      title: "Frontend Framework & Libraries",
      icon: <Code className="w-5 h-5" />,
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      items: [
        {
          name: "React 18",
          description: "Modern React with hooks and concurrent features",
          url: "https://reactjs.org/",
          type: "Framework"
        },
        {
          name: "TypeScript",
          description: "Type-safe JavaScript development",
          url: "https://www.typescriptlang.org/",
          type: "Language"
        },
        {
          name: "Vite",
          description: "Fast build tool and development server",
          url: "https://vitejs.dev/",
          type: "Build Tool"
        },
        {
          name: "React Router DOM",
          description: "Declarative routing for React applications",
          url: "https://reactrouter.com/",
          type: "Routing"
        },
        {
          name: "TanStack Query",
          description: "Powerful data synchronization for React",
          url: "https://tanstack.com/query/latest",
          type: "Data Fetching"
        }
      ]
    },
    {
      title: "UI & Styling",
      icon: <Palette className="w-5 h-5" />,
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      items: [
        {
          name: "Tailwind CSS",
          description: "Utility-first CSS framework",
          url: "https://tailwindcss.com/",
          type: "CSS Framework"
        },
        {
          name: "Shadcn/ui",
          description: "Beautifully designed components built with Radix UI",
          url: "https://ui.shadcn.com/",
          type: "Component Library"
        },
        {
          name: "Radix UI",
          description: "Low-level UI primitives for React",
          url: "https://www.radix-ui.com/",
          type: "UI Primitives"
        },
        {
          name: "Framer Motion",
          description: "Production-ready motion library for React",
          url: "https://www.framer.com/motion/",
          type: "Animation"
        },
        {
          name: "Lucide React",
          description: "Beautiful & consistent icon toolkit",
          url: "https://lucide.dev/",
          type: "Icons"
        }
      ]
    },
    {
      title: "3D Graphics & Visualization",
      icon: <Rocket className="w-5 h-5" />,
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
      items: [
        {
          name: "Three.js",
          description: "JavaScript 3D library for WebGL",
          url: "https://threejs.org/",
          type: "3D Library"
        },
        {
          name: "React Three Fiber",
          description: "React renderer for Three.js",
          url: "https://docs.pmnd.rs/react-three-fiber",
          type: "React Integration"
        },
        {
          name: "@react-three/drei",
          description: "Useful helpers for React Three Fiber",
          url: "https://github.com/pmndrs/drei",
          type: "Helpers"
        }
      ]
    },
    {
      title: "NASA APIs & Data Sources",
      icon: <Database className="w-5 h-5" />,
      color: "from-orange-500/20 to-red-500/20 border-orange-500/30",
      items: [
        {
          name: "NASA Open APIs",
          description: "Free APIs for space data and imagery",
          url: "https://api.nasa.gov/",
          type: "API"
        },
        {
          name: "DONKI (Database of Notification of Knowledge Items)",
          description: "Space weather notifications and alerts",
          url: "https://api.nasa.gov/DONKI/",
          type: "Space Weather"
        },
        {
          name: "APOD (Astronomy Picture of the Day)",
          description: "Daily space imagery with explanations",
          url: "https://api.nasa.gov/planetary/apod",
          type: "Astronomy"
        },
        {
          name: "Near Earth Objects (NEO) API",
          description: "Asteroid and comet data",
          url: "https://api.nasa.gov/neo/rest/v1/",
          type: "Asteroids"
        },
        {
          name: "ISS Current Location API",
          description: "Real-time International Space Station tracking",
          url: "https://api.wheretheiss.at/",
          type: "Satellite Tracking"
        },
        {
          name: "NASA Solar Storms and Flares",
          description: "Comprehensive information about solar storms and flares",
          url: "https://science.nasa.gov/sun/solar-storms-and-flares/",
          type: "Solar Science"
        },
        {
          name: "Space Weather User Needs Survey 2024",
          description: "Results of the First National Survey of User Needs for Space Weather",
          url: "https://www.weather.gov/media/nws/Results-of-the-First-National-Survey-of-User-Needs-for-Space-Weather-2024.pdf",
          type: "Research"
        },
        {
          name: "NASA Scientific Visualization Studio",
          description: "High-quality scientific visualizations and animations",
          url: "https://svs.gsfc.nasa.gov/12593/",
          type: "Visualizations"
        }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: <Cpu className="w-5 h-5" />,
      color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30",
      items: [
        {
          name: "Google Gemini API",
          description: "Advanced AI model for chat and content generation",
          url: "https://ai.google.dev/",
          type: "AI Model"
        },
        {
          name: "Web Speech API",
          description: "Browser-native speech recognition and synthesis",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API",
          type: "Speech Technology"
        }
      ]
    },
    {
      title: "Media & Assets",
      icon: <Camera className="w-5 h-5" />,
      color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
      items: [
        {
          name: "NASA Image and Video Library",
          description: "Official NASA media repository",
          url: "https://images.nasa.gov/",
          type: "Images & Videos"
        },
        {
          name: "NASA Solar System Exploration",
          description: "Educational content and imagery",
          url: "https://solarsystem.nasa.gov/",
          type: "Educational Content"
        },
        {
          name: "Interstellar Theme Music",
          description: "Epic orchestral music for AeroVerse",
          url: "https://www.youtube.com/watch?v=Uo2SNtFofWI",
          type: "Background Music"
        },
        {
          name: "Love Story (Epic Orchestra)",
          description: "Romantic orchestral music for main pages",
          url: "https://www.youtube.com/watch?v=4eOdGa6a_q8",
          type: "Background Music"
        }
      ]
    },
    {
      title: "Development Tools & Services",
      icon: <Package className="w-5 h-5" />,
      color: "from-gray-500/20 to-slate-500/20 border-gray-500/30",
      items: [
        {
          name: "Node.js",
          description: "JavaScript runtime for development",
          url: "https://nodejs.org/",
          type: "Runtime"
        },
        {
          name: "npm",
          description: "Package manager for JavaScript",
          url: "https://www.npmjs.com/",
          type: "Package Manager"
        },
        {
          name: "ESLint",
          description: "Code linting and quality assurance",
          url: "https://eslint.org/",
          type: "Code Quality"
        },
        {
          name: "Prettier",
          description: "Code formatting tool",
          url: "https://prettier.io/",
          type: "Code Formatting"
        },
        {
          name: "React Helmet Async",
          description: "Document head management for React",
          url: "https://github.com/staylor/react-helmet-async",
          type: "SEO"
        }
      ]
    },
    {
      title: "Educational Resources",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-teal-500/20 to-cyan-500/20 border-teal-500/30",
      items: [
        {
          name: "NASA Space Weather",
          description: "Official space weather information",
          url: "https://www.weather.gov/safety/space",
          type: "Educational"
        },
        {
          name: "NOAA Space Weather Prediction Center",
          description: "Real-time space weather forecasts",
          url: "https://www.swpc.noaa.gov/",
          type: "Forecasting"
        },
        {
          name: "ESA Space Weather",
          description: "European Space Agency space weather data",
          url: "https://swe.ssa.esa.int/",
          type: "European Data"
        },
        {
          name: "Space Weather Live",
          description: "Real-time space weather monitoring",
          url: "https://www.spaceweatherlive.com/",
          type: "Monitoring"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SEO 
        title="Resources - AeroStory"
        description="Discover all the technologies, APIs, and resources used to build AeroStory - the interactive space weather storytelling platform."
        keywords="resources, technologies, APIs, NASA, space weather, development tools, open source"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Resources & Technologies
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore all the technologies, APIs, libraries, and resources that power AeroStory's 
            interactive space weather storytelling experience.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="space-y-8">
          {resourceCategories.map((category, index) => (
            <Card key={index} className={`bg-card/50 backdrop-blur-sm border-primary/20 p-6 hover:border-primary/40 transition-all duration-300`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((resource, resourceIndex) => (
                  <Card key={resourceIndex} className="bg-background/30 border-border/50 p-4 hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                          {resource.name}
                        </h3>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400 truncate flex-1 mr-2">
                        {resource.url}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 px-2"
                        onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
                      >
                        Visit
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Special Thanks Section */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 mt-12">
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Special Thanks</h2>
              <Heart className="w-6 h-6 text-red-400" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-white mb-3">Open Source Community</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  AeroStory is built on the foundation of countless open-source projects, 
                  libraries, and APIs. We're grateful to all the developers, scientists, 
                  and organizations who make space data accessible to everyone.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-3">NASA & Space Agencies</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Special recognition to NASA, ESA, NOAA, and other space agencies 
                  for providing free access to space data, imagery, and APIs that 
                  make projects like AeroStory possible.
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-purple-500/20">
              <p className="text-gray-400 text-sm">
                Built with ❤️ for the space exploration community
              </p>
            </div>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link to="/">
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
            >
              <Globe className="w-5 h-5 mr-2" />
              Back to AeroStory
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resources;
