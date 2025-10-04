import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface StorySectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  children?: ReactNode;
}

const StorySection = ({
  id,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  reverse = false,
}: StorySectionProps) => {
  return (
    <section id={id} className="py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 px-4 xs:px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center ${reverse ? "sm:flex-row-reverse" : ""}`}>
          {/* Text Content */}
          <div className={`space-y-4 xs:space-y-5 sm:space-y-6 lg:space-y-8 ${reverse ? "sm:order-2" : ""}`}>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-glow leading-tight">
              {title}
            </h2>
            <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-primary font-medium">
              {subtitle}
            </h3>
            <p className="text-base xs:text-lg lg:text-xl text-foreground/80 leading-relaxed">
              {description}
            </p>
            <div className="pt-2 xs:pt-3 sm:pt-4">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 xs:p-5 sm:p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--glow-primary)]">
                <h4 className="text-base xs:text-lg font-semibold mb-2 xs:mb-3 text-primary">Did You Know?</h4>
                <p className="text-sm xs:text-base text-foreground/70 leading-relaxed">
                  {id === "solar-storms" && "Solar storms can reach Earth in as little as 15 minutes, traveling at speeds up to 3 million mph!"}
                  {id === "auroras" && "Auroras occur when charged particles from the sun interact with Earth's magnetic field, creating nature's most spectacular light show."}
                  {id === "cosmic-rays" && "Cosmic rays are high-energy particles from outside our solar system, constantly bombarding Earth from all directions."}
                </p>
              </Card>
            </div>
          </div>

          {/* Image */}
          <div className={`${reverse ? "sm:order-1" : ""}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl xs:rounded-2xl blur-lg xs:blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src={image}
                alt={imageAlt}
                className="relative rounded-xl xs:rounded-2xl shadow-2xl w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
