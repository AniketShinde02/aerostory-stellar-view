const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-glow">AeroStory</h3>
            <p className="text-foreground/70">
              Bringing the wonders of space weather to life through immersive storytelling.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Explore</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>Solar Storms</li>
              <li>Auroras</li>
              <li>Cosmic Rays</li>
              <li>Space Weather</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Connect</h4>
            <p className="text-foreground/70">
              Experience the cosmos through the eyes of Earthlings.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-foreground/60">
          <p>&copy; 2025 AeroStory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
