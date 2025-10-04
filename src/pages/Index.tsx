import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";
import solarStormImage from "@/assets/solar-storm.jpg";
import auroraImage from "@/assets/aurora.jpg";
import cosmicRaysImage from "@/assets/cosmic-rays.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      <StorySection
        id="solar-storms"
        title="Solar Storms"
        subtitle="The Sun's Fury Unleashed"
        description="Witness the raw power of our star as massive solar flares and coronal mass ejections burst forth from the Sun's surface. These cosmic tempests travel millions of miles through space, carrying enough energy to disrupt satellites, power grids, and create spectacular auroras. Solar storms remind us of our star's incredible dynamism and its profound influence on our technological civilization."
        image={solarStormImage}
        imageAlt="Solar storm and coronal mass ejection"
      />

      <StorySection
        id="auroras"
        title="Aurora Borealis"
        subtitle="Nature's Celestial Light Show"
        description="Dancing curtains of green, purple, and red light paint the polar skies in one of nature's most breathtaking displays. Auroras occur when charged particles from solar winds collide with Earth's magnetic field, exciting atmospheric gases into luminescence. These ethereal lights have captivated humanity for millennia, inspiring myths, art, and scientific wonder across cultures."
        image={auroraImage}
        imageAlt="Aurora borealis with vibrant colors"
        reverse
      />

      <StorySection
        id="cosmic-rays"
        title="Cosmic Rays"
        subtitle="Messengers from the Distant Universe"
        description="High-energy particles from the far reaches of space constantly bombard our planet, carrying secrets about supernovae, black holes, and the most violent events in the cosmos. These invisible messengers travel at nearly the speed of light, penetrating Earth's atmosphere and even our bodies. Cosmic rays connect us to the universe's most extreme phenomena, making us all cosmic beings."
        image={cosmicRaysImage}
        imageAlt="Cosmic rays visualization in space"
      />

      <Footer />
    </div>
  );
};

export default Index;
