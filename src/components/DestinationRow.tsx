import { motion } from "framer-motion";
import PostcardCard from "./PostcardCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  const headerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-28 px-6 bg-[#FDFCF9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="mb-20 relative"
        >
          <motion.p
            variants={headerVariants}
            className="text-xs uppercase tracking-[0.4em] text-[#638C7D] font-bold mb-4"
          >
            {subtitle}
          </motion.p>

          <div className="flex items-center gap-8">
            <motion.h2
              variants={headerVariants}
              className="font-script text-5xl md:text-6xl text-[#344E41] italic leading-tight"
            >
              {title}
            </motion.h2>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/40 to-transparent origin-left"
            />
          </div>
        </motion.div>

        {/* Cards Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative perspective-1000 mt-12 w-full max-w-[95vw] md:max-w-none mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8 cursor-grab active:cursor-grabbing pb-8 pt-4">
              {destinations.map((destination, index) => (
                <CarouselItem key={destination.name + index} className="pl-4 md:pl-8 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 select-none">
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
              <CarouselPrevious className="-left-14 xl:-left-16 bg-[#FDFCF9] border-[#638C7D] text-[#638C7D] hover:bg-[#638C7D] hover:text-[#FDFCF9] w-12 h-12 absolute top-1/2 -translate-y-1/2 transition-colors duration-300" />
              <CarouselNext className="-right-14 xl:-right-16 bg-[#FDFCF9] border-[#638C7D] text-[#638C7D] hover:bg-[#638C7D] hover:text-[#FDFCF9] w-12 h-12 absolute top-1/2 -translate-y-1/2 transition-colors duration-300" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationRow;
