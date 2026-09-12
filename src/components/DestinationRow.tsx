import { motion } from "framer-motion";
import PostcardCard from "./PostcardCard";
import BlurText from "./animations/BlurText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Sparkles, MapPin } from "lucide-react";

interface Destination {
  name: string;
  image: string;
}

interface DestinationRowProps {
  title: string;
  subtitle: string;
  destinations: Destination[];
  gatewayText: string;
  onGatewayClick: () => void;
  onDestinationClick: (destination: string) => void;
  onEnquire: (destination: string) => void;
}

const DestinationRow = ({
  title,
  subtitle,
  destinations,
  gatewayText,
  onGatewayClick,
  onDestinationClick,
  onEnquire,
}: DestinationRowProps) => {
  /* Softer stagger for premium feel */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background via-white to-background relative overflow-hidden">
      {/* Subtle joyful aura in the corner */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {subtitle}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                <BlurText text={title} animateBy="words" className="text-gray-900" />
              </h2>
            </div>

            <button
              onClick={onGatewayClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider transition-all duration-300 border border-emerald-200/80 shadow-sm hover:shadow hover:scale-105 w-fit"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {gatewayText}
            </button>
          </div>
        </div>

        {/* Cards Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative perspective-1000 w-full max-w-[95vw] md:max-w-none mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8 cursor-grab active:cursor-grabbing pb-8 pt-4">
              {destinations.map((destination, index) => (
                <CarouselItem
                  key={destination.name + index}
                  className="pl-4 md:pl-8 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 select-none"
                >
                  <PostcardCard
                    name={destination.name}
                    image={destination.image}
                    index={index}
                    onClick={() => onDestinationClick(destination.name)}
                    onEnquire={() => onEnquire(destination.name)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 xl:-left-14 bg-white/90 backdrop-blur-md border-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-white w-12 h-12 absolute top-1/2 -translate-y-1/2 shadow-lg transition-all duration-300" />
              <CarouselNext className="-right-12 xl:-right-14 bg-white/90 backdrop-blur-md border-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-white w-12 h-12 absolute top-1/2 -translate-y-1/2 shadow-lg transition-all duration-300" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationRow;

