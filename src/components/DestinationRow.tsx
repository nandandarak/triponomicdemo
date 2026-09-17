import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import PostcardCard from "./PostcardCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Sparkles, MapPin } from "lucide-react";

interface Destination {
  name: string;
  image: string;
  duration?: string;
  investment?: string;
  startingPrice?: string;
  bestTime?: string;
  bestSeason?: string;
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
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "150px 0px" });

  // Auto-scroll sliding window: moves continuously, but STOPS when any card is clicked/flipped
  useEffect(() => {
    if (!api || isPaused || !isInView || flippedCard !== null) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [api, isPaused, isInView, flippedCard]);

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-14 px-6 bg-background relative"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-7 md:mb-9 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-bold tracking-widest uppercase mb-2.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {subtitle}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {title}
              </h2>

              <button
                onClick={onGatewayClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider transition-all duration-300 border border-emerald-200/80 shadow-sm hover:shadow hover:scale-105 w-fit cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {gatewayText}
              </button>
            </div>
          </div>
        </div>

        {/* Cards Carousel - renders immediately without blocking delay */}
        <div className="relative w-full max-w-[95vw] md:max-w-none mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
            }}
            className="w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <CarouselContent className="-ml-4 md:-ml-8 cursor-grab active:cursor-grabbing pb-3 pt-1">
              {destinations.map((destination, index) => (
                <CarouselItem
                  key={destination.name + index}
                  className="pl-4 md:pl-8 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 select-none"
                >
                  <PostcardCard
                    name={destination.name}
                    image={destination.image}
                    index={index}
                    isFlipped={flippedCard === destination.name}
                    onFlipToggle={(flipped) => {
                      setFlippedCard(flipped ? destination.name : null);
                    }}
                    destinationData={
                      destination.duration && (destination.investment || destination.startingPrice)
                        ? {
                            duration: destination.duration,
                            investment: destination.investment || destination.startingPrice || "",
                            bestTime: destination.bestTime || destination.bestSeason || "",
                          }
                        : undefined
                    }
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
        </div>
      </div>
    </section>
  );
};

export default DestinationRow;

