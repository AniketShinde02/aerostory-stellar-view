import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash navigation when page loads
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash && location.pathname === '/') {
      // Wait for page to fully load, then scroll to section
      setTimeout(() => {
        scrollToSection(hash);
      }, 500);
    }
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navigateToSection = (sectionId: string) => {
    // If we're already on the home page, just scroll to the section
    if (location.pathname === '/') {
      scrollToSection(sectionId);
      setIsMobileMenuOpen(false);
    } else {
      // If we're on a different page, navigate to home with hash for the section
      navigate(`/#${sectionId}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      <div className="container mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 flex justify-center">
        {/* Responsive glassmorphism header with white border */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/30 rounded-full px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-3 shadow-2xl max-w-fit w-full xs:w-auto">
          <div className="flex items-center justify-between xs:justify-center gap-2 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full xs:w-auto">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Logo size="md" className="text-white" />
            </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
                  <button
                    onClick={() => navigateToSection("hero")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => navigateToSection("apod-daily-image")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Daily Image
                  </button>
                  <button
                    onClick={() => navigateToSection("space-weather-impact")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Impact
                  </button>
                  <button
                    onClick={() => navigateToSection("donki-solar-flares")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Solar Flares
                  </button>
                  <Link
                    to="/stories"
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Stories
                  </Link>
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
                  onClick={() => navigateToSection("hero")}
                  className="block w-full text-left px-3 xs:px-4 py-2 xs:py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm xs:text-base"
                >
                  Home
                </button>
                <button
                  onClick={() => navigateToSection("apod-daily-image")}
                  className="block w-full text-left px-3 xs:px-4 py-2 xs:py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm xs:text-base"
                >
                  Daily Image
                </button>
                <button
                  onClick={() => navigateToSection("space-weather-impact")}
                  className="block w-full text-left px-3 xs:px-4 py-2 xs:py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm xs:text-base"
                >
                  Impact
                </button>
                <button
                  onClick={() => navigateToSection("donki-solar-flares")}
                  className="block w-full text-left px-3 xs:px-4 py-2 xs:py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm xs:text-base"
                >
                  Solar Flares
                </button>
                <Link
                  to="/stories"
                  className="block w-full text-left px-3 xs:px-4 py-2 xs:py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm xs:text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Stories
                </Link>
              </div>
            )}
      </div>
    </nav>
  );
};

export default Navigation;
