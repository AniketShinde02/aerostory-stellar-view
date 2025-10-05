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
        <div className="bg-white/5 backdrop-blur-xl border border-white/30 rounded-full px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 shadow-2xl max-w-fit">
          <div className="flex items-center justify-between md:justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Logo size="sm" className="text-white" />
            </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-3 lg:gap-4">
                  <button
                    onClick={() => navigateToSection("hero")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-xs lg:text-sm whitespace-nowrap"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => navigateToSection("apod-daily-image")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-xs lg:text-sm whitespace-nowrap"
                  >
                    Daily Image
                  </button>
                  <button
                    onClick={() => navigateToSection("space-weather-impact")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-xs lg:text-sm whitespace-nowrap"
                  >
                    Impact
                  </button>
                  <button
                    onClick={() => navigateToSection("donki-solar-flares")}
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-xs lg:text-sm whitespace-nowrap"
                  >
                    Solar Flares
                  </button>
                  <Link
                    to="/stories"
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-xs lg:text-sm whitespace-nowrap"
                  >
                    Stories
                  </Link>
                  <Link
                    to="/resources"
                    className="text-white/90 hover:text-white transition-colors duration-200 font-medium text-xs lg:text-sm whitespace-nowrap"
                  >
                    Resources
                  </Link>
                </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white/90 hover:text-white transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-3 bg-white/5 backdrop-blur-xl border border-white/30 rounded-2xl p-4 space-y-2 w-full max-w-sm mx-auto">
                <button
                  onClick={() => navigateToSection("hero")}
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm"
                >
                  Home
                </button>
                <button
                  onClick={() => navigateToSection("apod-daily-image")}
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm"
                >
                  Daily Image
                </button>
                <button
                  onClick={() => navigateToSection("space-weather-impact")}
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm"
                >
                  Impact
                </button>
                <button
                  onClick={() => navigateToSection("donki-solar-flares")}
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm"
                >
                  Solar Flares
                </button>
                <Link
                  to="/stories"
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Stories
                </Link>
                <Link
                  to="/resources"
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resources
                </Link>
              </div>
            )}
      </div>
    </nav>
  );
};

export default Navigation;
