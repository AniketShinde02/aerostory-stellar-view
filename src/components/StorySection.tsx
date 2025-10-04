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
    <section id={id} className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? "md:flex-row-reverse" : ""}`}>
          {/* Text Content */}
          <div className={`space-y-6 ${reverse ? "md:order-2" : ""}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-glow">{title}</h2>
            <h3 className="text-xl md:text-2xl text-primary">{subtitle}</h3>
            <p className="text-lg text-foreground/80 leading-relaxed">{description}</p>
            <div className="pt-4">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--glow-primary)]">
                <h4 className="text-lg font-semibold mb-3 text-primary">Did You Know?</h4>
                <p className="text-foreground/70">
                  {id === "solar-storms" && "Solar storms can reach Earth in as little as 15 minutes, traveling at speeds up to 3 million mph!"}
                  {id === "auroras" && "Auroras occur when charged particles from the sun interact with Earth's magnetic field, creating nature's most spectacular light show."}
                  {id === "cosmic-rays" && "Cosmic rays are high-energy particles from outside our solar system, constantly bombarding Earth from all directions."}
                </p>
              </Card>
            </div>
          </div>

          {/* Image */}
          <div className={`${reverse ? "md:order-1" : ""}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src={image}
                alt={imageAlt}
                className="relative rounded-2xl shadow-2xl w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
