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
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      <div className="container mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 flex justify-center">
        {/* Responsive glassmorphism header with white border */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/30 rounded-full px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-3 shadow-2xl max-w-fit w-full xs:w-auto">
          <div className="flex items-center justify-between xs:justify-center gap-2 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full xs:w-auto">
            {/* Logo with icon */}
            <div className="flex items-center gap-1 xs:gap-2 sm:gap-3">
              <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-sm xs:rounded-md flex items-center justify-center">
                <div className="w-2 h-2 xs:w-3 xs:h-3 sm:w-4 sm:h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white whitespace-nowrap">
                AeroStory
              </h1>
            </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("donki-solar-flares")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Solar Flares
                  </button>
                  <button
                    onClick={() => scrollToSection("apod-daily-image")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Daily Image
                  </button>
                  <button
                    onClick={() => scrollToSection("solar-storms")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Stories
                  </button>
                </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white/90 hover:text-white transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 xs:h-6 xs:w-6" /> : <Menu className="h-5 w-5 xs:h-6 xs:w-6" />}
            </button>
          </div>
        </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-2 xs:mt-3 sm:mt-4 bg-white/5 backdrop-blur-xl border border-white/30 rounded-2xl p-3 xs:p-4 sm:p-6 space-y-2 xs:space-y-3 w-full xs:w-auto">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="block w-full text-left px-3 xs:px-4 py-2 xs:py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm xs:text-base"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("donki-solar-flares")}
                  className="block w-full text-left px-3 xs:px-4 py-2 xs:py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm xs:text-base"
                >
                  Solar Flares
                </button>
                <button
                  onClick={() => scrollToSection("apod-daily-image")}
                  className="block w-full text-left px-3 xs:px-4 py-2 xs:py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm xs:text-base"
                >
                  Daily Image
                </button>
                <button
                  onClick={() => scrollToSection("solar-storms")}
                  className="block w-full text-left px-3 xs:px-4 py-2 xs:py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm xs:text-base"
                >
                  Stories
                </button>
              </div>
            )}
      </div>
    </nav>
  );
};

export default Navigation;
