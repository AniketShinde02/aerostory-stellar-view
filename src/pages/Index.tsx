import { Suspense, lazy } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// Lazy load NASA API sections for performance optimization
const DonkiSection = lazy(() => import("@/components/DonkiSection"));
const ApodSection = lazy(() => import("@/components/ApodSection"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
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
      
      {/* APOD Section - Lazy Loaded */}
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
      
      <Footer />
    </div>
  );
};

export default Index;
