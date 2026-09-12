import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import EnquiryModal from "./EnquiryModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/* ------------------------------------------------------------------ */
/*  DATA                                                                 */
/* ------------------------------------------------------------------ */

const hotels = [
  {
    name: "ITC Hotels",
    tier: "Luxury",
    stars: 5,
    tagline: "Where responsible luxury meets timeless India",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
    accentColor: "#B8860B",
  },
  {
    name: "The Lalit",
    tier: "Grand Luxury",
    stars: 5,
    tagline: "Magnificence redefined across India",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
    accentColor: "#8B0000",
  },
  {
    name: "The Leela",
    tier: "Ultra Luxury",
    stars: 5,
    tagline: "An experience beyond the ordinary",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
    accentColor: "#2F4F4F",
  },
  {
    name: "Taj Hotels",
    tier: "Iconic Luxury",
    stars: 5,
    tagline: "Creating memories, one experience at a time",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
    accentColor: "#8B6914",
  },
  {
    name: "JW Marriott",
    tier: "Upper Upscale",
    stars: 5,
    tagline: "Mindful luxury for the modern traveller",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
    accentColor: "#1a3a5c",
  },
  {
    name: "The Oberoi",
    tier: "Ultra Luxury",
    stars: 5,
    tagline: "Every luxury. Wherever you go.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    accentColor: "#4A4A6A",
  },
  {
    name: "Hyatt Regency",
    tier: "Upscale",
    stars: 5,
    tagline: "Thoughtfully designed for vibrant stays",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
    accentColor: "#1B4F72",
  },
  {
    name: "Radisson Blu",
    tier: "Upper Upscale",
    stars: 5,
    tagline: "Simply stylish. Radically different.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80",
    accentColor: "#005B9A",
  },
  {
    name: "Four Seasons",
    tier: "Ultra Luxury",
    stars: 5,
    tagline: "The art of perfect hospitality",
    image: "https://images.unsplash.com/photo-1549294413-26f195471c9b?auto=format&fit=crop&w=900&q=80",
    accentColor: "#8B7355",
  },
  {
    name: "Fairmont",
    tier: "Luxury",
    stars: 5,
    tagline: "Turning moments into memories",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80",
    accentColor: "#556B2F",
  },
];

/* Marquee items — duplicated for infinite scroll effect */
const marqueeItems = [...hotels, ...hotels];

/* ------------------------------------------------------------------ */
/*  HOTEL CARD                                                           */
/* ------------------------------------------------------------------ */

const HotelCard = ({
  hotel,
  onEnquire,
}: {
  hotel: (typeof hotels)[0];
  onEnquire: (name: string) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-[28px] cursor-pointer select-none"
      style={{ minHeight: "380px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onEnquire(hotel.name)}
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hotel.image})` }}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Top badge */}
      <div className="absolute top-5 left-5">
        <span
          className="text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 rounded-full"
          style={{
            backgroundColor: `${hotel.accentColor}25`,
            border: `1px solid ${hotel.accentColor}80`,
            color: hotel.accentColor === "#1a3a5c" || hotel.accentColor === "#005B9A" ? "#7BBFEA" : hotel.accentColor,
          }}
        >
          {hotel.tier}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Stars */}
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
          ))}
        </div>

        <h3 className="text-white text-xl font-semibold leading-tight mb-1">
          {hotel.name}
        </h3>

        <motion.p
          className="text-white/65 text-xs leading-relaxed mb-4"
          animate={{ opacity: hovered ? 1 : 0.7 }}
        >
          {hotel.tagline}
        </motion.p>

        {/* CTA */}
        <motion.button
          className="flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white transition-colors w-fit"
          animate={{ opacity: hovered ? 1 : 0.5, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.stopPropagation();
            onEnquire(hotel.name);
          }}
        >
          <span>Enquire Now</span>
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.25 }}>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION                                                              */
/* ------------------------------------------------------------------ */

const HotelPartnersSection = () => {
  const [enquiry, setEnquiry] = useState<{ isOpen: boolean; destination: string }>({
    isOpen: false,
    destination: "",
  });

  return (
    <section className="py-28 bg-[#FDFCF9] overflow-hidden">
      <div className="px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-20"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-[#638C7D] font-bold mb-4">
              Our Hotel Partners
            </p>
            <div className="flex items-center gap-8">
              <h2 className="font-script text-5xl md:text-6xl text-[#344E41] italic leading-tight">
                Stay in Luxury
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/40 to-transparent origin-left"
              />
            </div>
            <p className="mt-4 text-muted-foreground text-sm max-w-xl leading-relaxed">
              We partner with India's and the world's most iconic hotel brands — giving you access to exclusive rates, curated upgrades, and seamless stays at properties that define true luxury.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[95vw] md:max-w-none mx-auto"
          >
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4 md:-ml-8 cursor-grab active:cursor-grabbing pb-8 pt-4">
                {hotels.map((hotel, index) => (
                  <CarouselItem
                    key={hotel.name + index}
                    className="pl-4 md:pl-8 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 select-none"
                  >
                    <HotelCard
                      hotel={hotel}
                      onEnquire={(name) =>
                        setEnquiry({ isOpen: true, destination: `${name} Hotel Stay` })
                      }
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
      </div>

      {/* Marquee ticker */}
      <div className="mt-16 border-t border-b border-[#D4AF37]/20 py-5 overflow-hidden bg-[#F9F7F4]">
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ width: "max-content" }}
        >
          {marqueeItems.map((hotel, i) => (
            <span
              key={i}
              className="text-xs uppercase tracking-[0.3em] text-[#344E41]/50 font-semibold flex items-center gap-4"
            >
              {hotel.name}
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50 inline-block" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiry.isOpen}
        destination={enquiry.destination}
        onClose={() => setEnquiry({ isOpen: false, destination: "" })}
      />
    </section>
  );
};

export default HotelPartnersSection;
