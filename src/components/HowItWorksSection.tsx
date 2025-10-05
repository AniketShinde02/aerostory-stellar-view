import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Eye, 
  Bell,
  ArrowRight
} from "lucide-react";

interface HowItWorksSectionProps {
  id: string;
}

const HowItWorksSection = ({ id }: HowItWorksSectionProps) => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Explore",
      description: "Browse real-time space weather data and daily astronomy images from NASA's official APIs.",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      step: "02", 
      icon: Eye,
      title: "Discover",
      description: "Learn about cosmic phenomena through detailed explanations and interactive visualizations.",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      step: "03",
      icon: Bell,
      title: "Stay Updated",
      description: "Get automatic updates on solar flares, space weather events, and new astronomy images.",
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    }
  ];

  return (
    <section id={id} className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            How It Works
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-glow leading-tight mb-3 xs:mb-4">
            Simple & Powerful
          </h2>
          <p className="text-base xs:text-lg lg:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            Experience the cosmos in three easy steps. No complex setup, no technical knowledge required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 xs:p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--glow-primary)] h-full">
                  <div className="text-center space-y-4 xs:space-y-6">
                    {/* Step Number */}
                    <div className="relative">
                      <div className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl xs:text-3xl font-bold text-primary">{step.step}</span>
                      </div>
                      {/* Icon */}
                      <div className={`absolute -top-2 -right-2 p-2 xs:p-3 bg-gradient-to-br ${step.color} rounded-lg`}>
                        <IconComponent className={`w-5 h-5 xs:w-6 xs:h-6 ${step.iconColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 xs:space-y-4">
                      <h3 className="text-xl xs:text-2xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="text-sm xs:text-base text-foreground/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Arrow (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                    <div className="w-12 h-12 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 xs:mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 xs:gap-6">
            <p className="text-base xs:text-lg text-foreground/80">
              Ready to explore the cosmos?
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('donki-solar-flares');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 xs:px-8 py-3 xs:py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

