import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Galaxy from "./Galaxy";

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
      {/* Galaxy Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Galaxy 
          mouseInteraction={true}
          mouseRepulsion={true}
          density={2.0}
          glowIntensity={0.8}
          saturation={1.0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.05}
          repulsionStrength={2.0}
          autoCenterRepulsion={0}
          starSpeed={0.2}
          speed={0.3}
          transparent={false}
          focal={[0.5, 0.5]}
          rotation={[1.0, 0.0]}
        />
      </div>


      {/* Content */}
      <div className="relative text-center px-6 max-w-5xl mx-auto" style={{ zIndex: 10 }}>
        
        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white animate-fade-in leading-tight" style={{ animationDelay: "0.2s" }}>
          From the Fiery Sun to Our Blue Planet
        </h1>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button
            onClick={() => navigate('/aeroverse')}
            size="lg"
            variant="outline"
            className="bg-transparent border border-gray-600 text-white hover:bg-white/10 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200"
          >
            Explore AeroVerse
          </Button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
