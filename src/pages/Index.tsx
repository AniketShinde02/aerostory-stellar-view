import { Suspense, lazy } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import TextToSpeech from "@/components/TextToSpeech";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/components/SEO";

// Lazy load NASA API sections for performance optimization
const DonkiSection = lazy(() => import("@/components/DonkiSection"));
const ApodSection = lazy(() => import("@/components/ApodSection"));
const SpaceWeatherImpactSection = lazy(() => import("@/components/SpaceWeatherImpactSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const StoriesSection = lazy(() => import("@/components/StoriesSection"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO {...seoConfigs.home} />
      <Navigation />
      <TextToSpeech 
        autoDetect={true}
        targetSelector="h1, h2, h3, p, .prose, [data-tts]"
        highlightText={true}
        smartMode={true}
        showControls={true}
      />
      <Hero />
      
      {/* APOD Section - Lazy Loaded (Moved up for better hero experience) */}
      <Suspense fallback={
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-foreground/70">Loading today's space image...</p>
            </div>
          </div>
        </section>
      }>
        <ApodSection id="apod-daily-image" />
      </Suspense>
      
      {/* Space Weather Impact Section - Lazy Loaded */}
      <Suspense fallback={
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-foreground/70">Loading space weather impact data...</p>
            </div>
          </div>
        </section>
      }>
        <SpaceWeatherImpactSection id="space-weather-impact" />
      </Suspense>
      
      {/* How It Works Section - Lazy Loaded */}
      <Suspense fallback={
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-foreground/70">Loading how it works...</p>
            </div>
          </div>
        </section>
      }>
        <HowItWorksSection id="how-it-works" />
      </Suspense>
      
      {/* DONKI Section - Lazy Loaded */}
      <Suspense fallback={
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-foreground/70">Loading solar flare data...</p>
            </div>
          </div>
        </section>
      }>
        <DonkiSection id="donki-solar-flares" />
      </Suspense>
      
      {/* Stories Section - Lazy Loaded */}
      <Suspense fallback={
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-foreground/70">Loading stories...</p>
            </div>
          </div>
        </section>
      }>
        <StoriesSection id="stories" />
      </Suspense>
      
      <Footer />
    </div>
  );
};

export default Index;
