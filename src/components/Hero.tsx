import heroImage from "@/assets/hero-space.jpg";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToContent = () => {
    const element = document.getElementById("solar-storms");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Earth from space with stellar phenomena"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background"></div>
      </div>

      {/* Star Field */}
      <div className="absolute inset-0 star-field opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow animate-fade-in">
          Stellar Stories
        </h1>
        <h2 className="text-2xl md:text-4xl mb-8 text-primary/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Space Weather Through the Eyes of Earthlings
        </h2>
        <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Journey through the cosmos and discover how stellar phenomena shape our world. 
          Experience the beauty and power of space weather like never before.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button
            onClick={scrollToContent}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-[var(--glow-primary)] transition-all duration-300"
          >
            Begin Your Journey
            <ArrowDown className="ml-2 animate-float" />
          </Button>
          <Button
            onClick={() => navigate('/aeroverse')}
            size="lg"
            className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-primary-foreground rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-[var(--glow-accent)] transition-all duration-300 animate-shimmer bg-[length:200%_100%]"
          >
            Enter the AeroVerse
            <Sparkles className="ml-2 animate-glow" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-glow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
