import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Globe, 
  Satellite, 
  Wifi, 
  Navigation, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Activity
} from "lucide-react";

interface SpaceWeatherImpactSectionProps {
  id: string;
}

const SpaceWeatherImpactSection = ({ id }: SpaceWeatherImpactSectionProps) => {
  const impacts = [
    {
      icon: Satellite,
      title: "Satellite Operations",
      description: "Solar storms can disrupt satellite communications and GPS accuracy",
      severity: "High",
      color: "from-red-500/20 to-orange-500/20",
      iconColor: "text-red-400"
    },
    {
      icon: Wifi,
      title: "Radio Communications",
      description: "HF radio signals can be affected during solar flares",
      severity: "Medium",
      color: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400"
    },
    {
      icon: Globe,
      title: "Power Grids",
      description: "Geomagnetic storms can induce currents in power lines",
      severity: "High",
      color: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400"
    },
    {
      icon: Navigation,
      title: "Aviation",
      description: "High-altitude flights may need to reroute during storms",
      severity: "Medium",
      color: "from-blue-500/20 to-purple-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: Activity,
      title: "Space Missions",
      description: "Astronauts and spacecraft need protection from radiation",
      severity: "Critical",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: TrendingUp,
      title: "Economic Impact",
      description: "Space weather events can cost billions in damages",
      severity: "High",
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id={id} className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            Space Weather Impact
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-glow leading-tight mb-3 xs:mb-4">
            Real-World Impact
          </h2>
          <p className="text-base xs:text-lg lg:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            Space weather doesn't just create beautiful auroras—it affects our technology, infrastructure, and daily lives in significant ways.
          </p>
        </div>

        {/* Current Status */}
        <div className="mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 xs:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
                  <Clock className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Current Status</h3>
                  <p className="text-foreground/70">Space weather monitoring active</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Activity className="w-4 h-4 mr-2" />
                  All Systems Normal
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Globe className="w-4 h-4 mr-2" />
                  No Alerts Active
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Impact Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon;
            return (
              <Card 
                key={index}
                className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--glow-primary)] group h-full"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 bg-gradient-to-br ${impact.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-6 h-6 ${impact.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                          {impact.title}
                        </h3>
                        <Badge className={`mt-1 ${getSeverityColor(impact.severity)}`}>
                          {impact.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-foreground/70 leading-relaxed flex-grow">
                    {impact.description}
                  </p>
                  
                  {/* Learn More Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 self-start border-primary/30 text-primary hover:bg-primary/10"
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Historical Events */}
        <div className="mt-12 xs:mt-16 sm:mt-20 lg:mt-24">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 xs:p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl xs:text-3xl font-bold text-white mb-3">
                Notable Space Weather Events
              </h3>
              <p className="text-foreground/70">
                Historical events that demonstrate the real impact of space weather
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-400 mx-auto" />
                </div>
                <h4 className="font-semibold text-white mb-2">Carrington Event (1859)</h4>
                <p className="text-sm text-foreground/70">
                  Massive solar storm that disrupted telegraph systems worldwide
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg mb-4">
                  <Zap className="w-8 h-8 text-yellow-400 mx-auto" />
                </div>
                <h4 className="font-semibold text-white mb-2">Quebec Blackout (1989)</h4>
                <p className="text-sm text-foreground/70">
                  Geomagnetic storm that caused a 9-hour power outage in Quebec
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4">
                  <Satellite className="w-8 h-8 text-blue-400 mx-auto" />
                </div>
                <h4 className="font-semibold text-white mb-2">Halloween Storms (2003)</h4>
                <p className="text-sm text-foreground/70">
                  Severe space weather that affected satellite operations globally
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-8 xs:mt-10 sm:mt-12 lg:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 xs:gap-6">
            <p className="text-base xs:text-lg text-foreground/80">
              Want to learn more about space weather monitoring?
            </p>
            <Button 
              onClick={() => {
                const element = document.getElementById('donki-solar-flares');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 xs:px-8 py-3 xs:py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              View Live Data
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceWeatherImpactSection;