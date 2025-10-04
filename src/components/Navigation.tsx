import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-glow">AeroStory</h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("solar-storms")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Solar Storms
            </button>
            <button
              onClick={() => scrollToSection("auroras")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Auroras
            </button>
            <button
              onClick={() => scrollToSection("cosmic-rays")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Cosmic Rays
            </button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-left text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("solar-storms")}
              className="text-left text-foreground/80 hover:text-primary transition-colors"
            >
              Solar Storms
            </button>
            <button
              onClick={() => scrollToSection("auroras")}
              className="text-left text-foreground/80 hover:text-primary transition-colors"
            >
              Auroras
            </button>
            <button
              onClick={() => scrollToSection("cosmic-rays")}
              className="text-left text-foreground/80 hover:text-primary transition-colors"
            >
              Cosmic Rays
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
