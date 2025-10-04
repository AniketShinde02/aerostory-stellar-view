const Footer = () => {
  return (
    <footer className="border-t border-border py-8 xs:py-10 sm:py-12 lg:py-16 px-4 xs:px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 xs:gap-8 lg:gap-12">
          <div className="xs:col-span-2 md:col-span-1">
            <h3 className="text-lg xs:text-xl lg:text-2xl font-bold mb-3 xs:mb-4 text-glow">AeroStory</h3>
            <p className="text-sm xs:text-base text-foreground/70 leading-relaxed">
              Bringing the wonders of space weather to life through immersive storytelling.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 xs:mb-4 text-primary text-sm xs:text-base">Explore</h4>
            <ul className="space-y-1 xs:space-y-2 text-sm xs:text-base text-foreground/70">
              <li>Solar Storms</li>
              <li>Auroras</li>
              <li>Cosmic Rays</li>
              <li>Space Weather</li>
            </ul>
          </div>
          <div className="xs:col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-3 xs:mb-4 text-primary text-sm xs:text-base">Connect</h4>
            <p className="text-sm xs:text-base text-foreground/70 leading-relaxed">
              Experience the cosmos through the eyes of Earthlings.
            </p>
          </div>
        </div>
        <div className="mt-8 xs:mt-10 sm:mt-12 lg:mt-16 pt-6 xs:pt-8 border-t border-border text-center text-foreground/60">
          <p className="text-xs xs:text-sm">&copy; 2025 AeroStory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
