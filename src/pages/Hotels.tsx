import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, SlidersHorizontal, Sparkles, CheckCircle2, Volume2, VolumeX } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import FAQSection from "@/components/FAQSection";
import BlurText from "@/components/animations/BlurText";
import SpotlightCard from "@/components/animations/SpotlightCard";

/* ------------------------------------------------------------------ */
/*  DATA                                                                 */
/* ------------------------------------------------------------------ */

const hotels = [
  {
    name: "ITC Hotels",
    tier: "Luxury",
    stars: 5,
    tagline: "Where responsible luxury meets timeless India",
    description:
      "ITC's award-winning hotels blend sustainability with opulence, offering curated Indian experiences across premium destinations.",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
    accentColor: "#B8860B",
    perk: "Signature Dinners & Spa Credits",
    locations: ["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai"],
  },
  {
    name: "The Lalit",
    tier: "Grand Luxury",
    stars: 5,
    tagline: "Magnificence redefined across India",
    description:
      "The Lalit hotels embody grand heritage and contemporary luxury, known for their legendary hospitality and iconic properties.",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
    accentColor: "#8B0000",
    perk: "Heritage View Rooms",
    locations: ["Delhi", "Mumbai", "Jaipur", "Udaipur"],
  },
  {
    name: "The Leela",
    tier: "Ultra Luxury",
    stars: 5,
    tagline: "An experience beyond the ordinary",
    description:
      "The Leela defines ultra-luxury in India — palatial settings, world-class cuisine, and service that anticipates your every need.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
    accentColor: "#2F4F4F",
    perk: "Complimentary Suite Upgrades",
    locations: ["Goa", "Kerala", "Udaipur", "New Delhi"],
  },
  {
    name: "Taj Hotels",
    tier: "Iconic Luxury",
    stars: 5,
    tagline: "Creating memories, one experience at a time",
    description:
      "India's most iconic hotel brand — from the legendary Taj Mahal Palace Mumbai to stunning palace hotels across Rajasthan.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
    accentColor: "#8B6914",
    perk: "Taj Club Lounge Privileges",
    locations: ["Mumbai", "Agra", "Jaipur", "Udaipur", "Goa"],
  },
  {
    name: "JW Marriott",
    tier: "Upper Upscale",
    stars: 5,
    tagline: "Mindful luxury for the modern traveller",
    description:
      "JW Marriott delivers understated luxury with a focus on well-being, thoughtful design, and elevated culinary experiences.",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
    accentColor: "#1a3a5c",
    perk: "Buffet Breakfast for 2",
    locations: ["Mumbai", "Bengaluru", "Delhi", "Kolkata"],
  },
  {
    name: "The Oberoi",
    tier: "Ultra Luxury",
    stars: 5,
    tagline: "Every luxury. Wherever you go.",
    description:
      "The Oberoi Group is synonymous with unparalleled luxury — intimate, elegant properties that redefine the art of hospitality.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    accentColor: "#4A4A6A",
    perk: "Private Butler Experience",
    locations: ["Delhi", "Mumbai", "Agra", "Rajasthan"],
  },
  {
    name: "Hyatt Regency",
    tier: "Upscale",
    stars: 5,
    tagline: "Thoughtfully designed for vibrant stays",
    description:
      "Hyatt Regency brings energetic, contemporary luxury to India's major business and leisure destinations.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
    accentColor: "#1B4F72",
    perk: "Early Check-in & Late Checkout",
    locations: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Hyderabad"],
  },
  {
    name: "Radisson Blu",
    tier: "Upper Upscale",
    stars: 5,
    tagline: "Simply stylish. Radically different.",
    description:
      "Radisson Blu's bold, distinctive style brings modern comfort and superior service to gateway cities across India.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80",
    accentColor: "#005B9A",
    perk: "Free Airport Pickup",
    locations: ["Delhi", "Mumbai", "Bengaluru", "Amritsar"],
  },
  {
    name: "Four Seasons",
    tier: "Ultra Luxury",
    stars: 5,
    tagline: "The art of perfect hospitality",
    description:
      "Four Seasons sets the global gold standard for luxury — immaculate rooms, Michelin-worthy dining, and personalized service.",
    image:
      "https://images.unsplash.com/photo-1549294413-26f195471c9b?auto=format&fit=crop&w=900&q=80",
    accentColor: "#8B7355",
    perk: "$100 Resort Credit",
    locations: ["Mumbai", "Bengaluru"],
  },
  {
    name: "Fairmont",
    tier: "Luxury",
    stars: 5,
    tagline: "Turning moments into memories",
    description:
      "Fairmont's iconic heritage properties blend grand architecture with warm, personal hospitality for an unforgettable stay.",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80",
    accentColor: "#556B2F",
    perk: "Royal High Tea Experience",
    locations: ["Jaipur", "Singapore", "Dubai"],
  },
  {
    name: "Marriott",
    tier: "Upscale",
    stars: 5,
    tagline: "The world is your home away from home",
    description:
      "Marriott's global network delivers consistent excellence, making it the trusted choice for discerning Indian travellers worldwide.",
    image:
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&w=900&q=80",
    accentColor: "#8B1A1A",
    perk: "Exclusive Triponomic Tariffs",
    locations: ["Pan India", "Global"],
  },
  {
    name: "Sofitel",
    tier: "Luxury",
    stars: 5,
    tagline: "A dialogue between French Art de Vivre and local culture",
    description:
      "Sofitel merges French luxury elegance with local cultural flair — creating distinctly sophisticated hotels across the world.",
    image:
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=900&q=80",
    accentColor: "#4B3A80",
    perk: "French Gourmet Breakfast",
    locations: ["Mumbai", "Dubai", "Paris"],
  },
];

const tiers = ["All", "Ultra Luxury", "Iconic Luxury", "Grand Luxury", "Luxury", "Upper Upscale", "Upscale"];

const hotelFaqs = [
  {
    id: "hotel-partnerships-how",
    category: "Hotel Stays",
    question: "How does Triponomic offer privileged member rates and perks at 5-star hotels?",
    answer:
      "Through established direct trade relationships with premier hospitality chains like Taj, ITC, The Leela, The Oberoi, and Marriott, we unlock contracted partner tariffs, complimentary daily buffet breakfasts, early check-in preference, and resort dining/spa credits that are not accessible via standard public travel portals.",
  },
  {
    id: "hotel-standalone-booking",
    category: "Hotel Stays",
    question: "Can I book only a hotel through Triponomic without booking a full holiday package?",
    answer:
      "Yes, absolutely! Whether you're booking an intimate weekend retreat in Udaipur, a business stay in Mumbai, or a luxury resort in Dubai, you can reserve standalone hotel stays through Triponomic and still receive all partner perks and privileged pricing.",
  },
  {
    id: "hotel-loyalty-programs",
    category: "Hotel Stays",
    question: "Will I still earn my hotel loyalty points (e.g. Marriott Bonvoy, Taj InnerCircle)?",
    answer:
      "In most cases, direct partner reservations qualify for loyalty night credits and elite member privileges. Simply provide your membership number when submitting your inquiry, and our team will ensure your profile is tied directly to the property reservation.",
  },
  {
    id: "hotel-upgrades-guarantee",
    category: "Hotel Stays",
    question: "Are complimentary room upgrades and early check-ins guaranteed?",
    answer:
      "Room upgrades and early check-in/late check-out are subject to availability upon arrival. However, because Triponomic coordinates directly with hotel general managers and sales directors, our guests receive top VIP priority over standard retail online bookings.",
  },
  {
    id: "hotel-cancellation-policy",
    category: "Hotel Stays",
    question: "What is the cancellation and refund policy for luxury hotel bookings?",
    answer:
      "Cancellation policies depend on the specific hotel and season (e.g., peak holiday dates vs. regular flexible seasons). We provide full, transparent cancellation terms and deadlines in writing before any payment is collected.",
  },
  {
    id: "hotel-special-requests",
    category: "Hotel Stays",
    question: "Can you arrange special celebrations, anniversary setups, or airport transfers?",
    answer:
      "Yes! We coordinate directly with on-property concierges to set up curated amenities — from honeymoon bed decorations and celebratory cakes to private beachside candlelit dinners and luxury chauffeur airport transfers.",
  },
];

/* ------------------------------------------------------------------ */
/*  HOTEL CARD                                                           */
/* ------------------------------------------------------------------ */

const HotelCard = ({
  hotel,
  onEnquire,
  index,
}: {
  hotel: (typeof hotels)[0];
  onEnquire: (name: string) => void;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <SpotlightCard
        spotlightColor="rgba(212, 175, 55, 0.18)"
        spotlightSize={400}
        className="group rounded-[28px] overflow-hidden bg-white shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-emerald-200/80 hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer flex flex-col h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onEnquire(hotel.name)}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Tier badge */}
          <div className="absolute top-4 left-4">
            <span
              className="text-[10px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-amber-300 border border-white/20 shadow-sm"
            >
              {hotel.tier}
            </span>
          </div>

          {/* Stars */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-[10px] text-white font-bold ml-1">5.0</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
            {hotel.name}
          </h3>
          <p className="text-xs text-emerald-700 font-semibold italic mb-3">{hotel.tagline}</p>
          <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">
            {hotel.description}
          </p>

          {/* Special Triponomic Perk Badge */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="text-xs font-semibold text-amber-900">
              {hotel.perk}
            </span>
          </div>

          {/* Locations */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {hotel.locations.slice(0, 3).map((loc) => (
              <span
                key={loc}
                className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium"
              >
                {loc}
              </span>
            ))}
            {hotel.locations.length > 3 && (
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                +{hotel.locations.length - 3} more
              </span>
            )}
          </div>

          {/* CTA */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold tracking-widest transition-all duration-300 shadow-md group-hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onEnquire(hotel.name);
            }}
          >
            ENQUIRE FOR PRIVILEGED RATES
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                                 */
/* ------------------------------------------------------------------ */

const Hotels = () => {
  const [activeTier, setActiveTier] = useState("All");
  const [enquiry, setEnquiry] = useState<{ isOpen: boolean; destination: string }>({
    isOpen: false,
    destination: "",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Pause video decoding when off-screen to free GPU/CPU for smooth 60fps scrolling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const filtered =
    activeTier === "All"
      ? hotels
      : hotels.filter((h) => h.tier === activeTier);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* PAGE HERO WITH LOOPING HOTEL VIDEO */}
      <section className="relative min-h-[75vh] md:min-h-[82vh] flex flex-col justify-center items-center pt-32 pb-20 px-6 overflow-hidden bg-[#0a1018] text-white">
        {/* Looping Hotel Video Background - Full Fit & Cinematic Framing */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80"
            className="w-full h-full object-cover object-center brightness-[0.80] contrast-[1.05]"
          >
            <source src="/video/hotel.mp4" type="video/mp4" />
          </video>
          {/* Subtle cinematic overlays for legibility without losing video vibrancy */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0a1018]" />
        </div>

        {/* Ambient Sound Toggle Button */}
        <div className="absolute top-28 md:top-32 right-6 z-20">
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 hover:bg-black/75 text-white/85 hover:text-white backdrop-blur-md border border-white/20 text-xs font-medium shadow-xl transition-all hover:scale-105"
            title={isMuted ? "Turn sound on" : "Mute sound"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/70" />
                <span className="hidden sm:inline">Audio Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">Audio Playing</span>
              </>
            )}
          </button>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Direct 5★ Hotel Partnerships
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-5 max-w-4xl mx-auto">
              <BlurText text="Stay In Pure Luxury" animateBy="words" className="text-white" />
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-light drop-shadow">
              Direct trade relationships with India's most iconic hotel chains — Taj, Oberoi, ITC, and The Leela. Contracted partner tariffs, complimentary suite upgrades, and bespoke welcome amenities.
            </p>

            {/* Quick stats with glassmorphic cards */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {[
                { num: "12+", label: "Iconic Hotel Chains" },
                { num: "50+", label: "Palaces & Resorts" },
                { num: "5★", label: "Luxury Standard" },
                { num: "100%", label: "Exclusive Member Perks" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="px-4 py-2.5 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 shadow-sm text-center"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{s.num}</p>
                  <p className="text-white/70 text-[11px] font-semibold uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR WITH SPRING ANIMATION */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 items-center w-max md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700 shrink-0 mr-1" />
            {tiers.map((tier) => {
              const isActive = activeTier === tier;
              return (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200/70"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="hotelFilterPill"
                      className="absolute inset-0 bg-emerald-700 rounded-full shadow-md -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tier}
                </button>
              );
            })}
          </div>
        </div>
      </div>


      {/* HOTEL GRID */}
      <section className="py-16 px-6 bg-[#FDFCF9]">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTier}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((hotel, index) => (
                <HotelCard
                  key={hotel.name}
                  hotel={hotel}
                  index={index}
                  onEnquire={(name) =>
                    setEnquiry({ isOpen: true, destination: `${name} Hotel Stay` })
                  }
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No hotels match this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Hotel Partnerships FAQ Section */}
      <FAQSection
        faqs={hotelFaqs}
        title="Luxury Hotels & Partnerships FAQ"
        subtitle="Frequently asked questions about booking 5-star properties, complimentary upgrades, and privileged tariffs through Triponomic."
        badge="Hotel Perks & Privileges"
        showCategories={false}
      />

      {/* BOTTOM CTA BANNER */}
      <section className="py-20 px-6 bg-[#1C2B22]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-4">
              Get Exclusive Rates
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to book your luxury stay?
            </h2>
            <p className="text-white/60 text-base mb-8 max-w-lg mx-auto">
              Tell us where you want to stay and we'll handle everything — from best-rate negotiations to special arrangements.
            </p>
            <button
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4AF37] hover:bg-[#BF9A2A] text-[#1C2B22] rounded-full text-sm font-bold tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() =>
                setEnquiry({ isOpen: true, destination: "Luxury Hotel Stay" })
              }
            >
              ENQUIRE FOR BEST RATES
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiry.isOpen}
        destination={enquiry.destination}
        onClose={() => setEnquiry({ isOpen: false, destination: "" })}
      />
    </div>
  );
};

export default Hotels;
