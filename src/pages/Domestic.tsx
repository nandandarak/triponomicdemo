import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Sparkles,
  SlidersHorizontal,
  Search,
  Compass,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  Sun,
  Coins,
  ArrowRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostcardCard from "@/components/PostcardCard";
import EnquiryModal from "@/components/EnquiryModal";
import InteractiveTrailBuilder from "@/components/InteractiveTrailBuilder";
import FloatingTrailBar from "@/components/FloatingTrailBar";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import BlurText from "@/components/animations/BlurText";
import ShinyText from "@/components/animations/ShinyText";
import { useDestinationCards } from "@/services/cardStore";

// Domestic Images from Index
import kashmirImg from "@/assets/kashmir.jpg";
import ladakhImg from "@/assets/ladakh.jpg";
import spitiImg from "@/assets/spiti.jpg";
import meghalayaImg from "@/assets/meghalaya.jpg";
import himachalImg from "@/assets/himachal.jpg";
import sikkimImg from "@/assets/sikkim.jpg";
import arunachalImg from "@/assets/arunachal.jpg";
import uttarakhandImg from "@/assets/uttarakhand.jpg";
import rajasthanImg from "@/assets/rajasthan.jpg";
import andamanImg from "@/assets/andaman.jpg";

interface DomesticDestination {
  name: string;
  image: string;
  category: "Mountains" | "Coastal" | "Heritage" | "Northeast";
  vibe: string;
}

const domesticDestinations: DomesticDestination[] = [
  { name: "Leh Ladakh", image: ladakhImg, category: "Mountains", vibe: "High passes, starlit deserts & monasteries" },
  { name: "Spiti", image: spitiImg, category: "Mountains", vibe: "Rugged canyons, fossil villages & moon lake" },
  { name: "Kashmir", image: kashmirImg, category: "Mountains", vibe: "Shikara sunsets, Gulmarg snow & pine meadows" },
  { name: "Meghalaya", image: meghalayaImg, category: "Northeast", vibe: "Living root bridges, cloud valleys & transparent rivers" },
  { name: "Himachal", image: himachalImg, category: "Mountains", vibe: "Cedar forests, colonial hamlets & riverside cafes" },
  { name: "Sikkim", image: sikkimImg, category: "Northeast", vibe: "Kanchenjunga vistas, orchid sanctuaries & glacial lakes" },
  { name: "Arunachal Pradesh", image: arunachalImg, category: "Northeast", vibe: "Tawang monastery, snow peaks & tribal heritage" },
  { name: "Uttarakhand", image: uttarakhandImg, category: "Mountains", vibe: "Ganga riverside aartis, yoga retreats & alpine meadows" },
  { name: "Rajasthan", image: rajasthanImg, category: "Heritage", vibe: "Palaces of Jaipur & Udaipur, sand dunes of Jaisalmer" },
  { name: "Andaman", image: andamanImg, category: "Coastal", vibe: "Turquoise lagoons, Radhanagar sunsets & scuba reefs" },
  {
    name: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    category: "Coastal",
    vibe: "Backwater houseboats, spice plantations & Ayurvedic wellness",
  },
  {
    name: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    category: "Coastal",
    vibe: "Portuguese villas, sunset beach shacks & luxury resorts",
  },
];

const categoryFilters = [
  { label: "All Destinations", value: "All" },
  { label: "Himalayas & Snow", value: "Mountains" },
  { label: "Beaches & Coastal", value: "Coastal" },
  { label: "Royal Heritage", value: "Heritage" },
  { label: "Pristine Northeast", value: "Northeast" },
];

const domesticFaqs: FAQItem[] = [
  {
    id: "dom-custom",
    category: "Planning & Customization",
    question: "Can I customize the hotel tiers and days in these domestic routes?",
    answer:
      "Yes! Every domestic route is built completely from scratch. You can mix destinations (like Kashmir + Ladakh, or Rajasthan with a desert stay), upgrade to 5-star hotels, and pick your own travel dates.",
  },
  {
    id: "dom-cabs",
    category: "Transport & Drivers",
    question: "What vehicle and driver arrangements do you provide in the hills and cities?",
    answer:
      "We provide private, sanitized vehicles (Innova Crysta, Fortuner, or 4x4 SUVs for high-altitude passes like Khardung La and Spiti) driven by vetted, experienced local mountain chauffeurs with all permits, toll, and fuel covered.",
  },
  {
    id: "dom-permits",
    category: "Permits & Safety",
    question: "Do you arrange Inner Line Permits (ILP) for Ladakh, Spiti, and Arunachal Pradesh?",
    answer:
      "Yes. All official government permits, environmental fees, and wildlife sanctuary passes are secured in advance by our concierge team so you experience zero checkpoints friction.",
  },
  {
    id: "dom-booking",
    category: "Payments & Inclusions",
    question: "What is included in the domestic trip price?",
    answer:
      "All domestic journeys include handpicked 4-star/5-star boutique accommodations, daily gourmet breakfasts & dinners, private dedicated vehicle with driver allowances, sightseeing tickets (such as Gulmarg Gondola Phase 1 & 2 or Dal Lake Shikara), and 24/7 on-trip concierge assistance.",
  },
];

const Domestic = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [enquiryModal, setEnquiryModal] = useState<{
    isOpen: boolean;
    destination: string;
  }>({
    isOpen: false,
    destination: "",
  });

  const { domesticCards } = useDestinationCards();

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
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const filtered = domesticCards.filter((dest) => {
    const matchesCategory =
      selectedFilter === "All" ||
      (dest.category && dest.category.toLowerCase().includes(selectedFilter.toLowerCase()));
    const matchesSearch =
      searchQuery.trim() === "" ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dest.vibe && dest.vibe.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openEnquiry = (name: string) => {
    setEnquiryModal({ isOpen: true, destination: name });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header transparentAtTop />

      {/* PAGE HERO WITH LOOPING INDIA VIDEO */}
      <section className="relative min-h-[75vh] md:min-h-[82vh] flex flex-col justify-center items-center pt-32 pb-20 px-6 overflow-hidden bg-[#0a150f] text-white">
        {/* Looping India Video Background - Full Fit & Cinematic Framing */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={kashmirImg}
            className="w-full h-full object-cover object-center brightness-[0.82] contrast-[1.05]"
          >
            <source src="/video/india.mp4" type="video/mp4" />
          </video>
          {/* Subtle cinematic overlays for legibility without losing video vibrancy */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-[#0a150f]" />
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
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Audio Playing</span>
              </>
            )}
          </button>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Discover India • Domestic Journeys
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-5">
              <BlurText text="Explore Incredible India" animateBy="words" className="text-white" />
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
              From snow-crowned Himalayan passes and misty Northeast living bridges to royal Rajasthani palaces and tranquil Kerala backwaters.
            </p>

            {/* Quick Search */}
            <div className="max-w-xl mx-auto relative mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search domestic destination (e.g. Kashmir, Ladakh, Spiti, Kerala)..."
                className="w-full px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/45 text-sm shadow-xl focus:outline-none focus:border-white/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/60 hover:text-white px-2 py-1 bg-white/15 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick stats pills */}
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-white/80">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                12 Curated Regions
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                Vetted Mountain Chauffeurs
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Direct 5★ Partner Tariffs
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700 mr-1 shrink-0" />
            {categoryFilters.map((cat) => {
              const isActive = selectedFilter === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedFilter(cat.value)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900 bg-gray-100"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="domesticFilterPill"
                      className="absolute inset-0 bg-emerald-700 rounded-full shadow-md -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-500 font-semibold">
            Showing <span className="text-emerald-700 font-bold">{filtered.length}</span> domestic destinations
          </p>
        </div>
      </div>

      {/* INTERACTIVE CARDS GRID */}
      <section className="py-16 px-6 bg-[#FDFCF9]">
        <div className="max-w-7xl mx-auto">
          {/* Instruction hint */}
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-emerald-700 font-extrabold flex items-center justify-center gap-2">
              <span>✨ Hover or Tap cards to flip & see duration, budget & details</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                className="h-full"
              >
                <PostcardCard
                  name={destination.name}
                  image={destination.image}
                  index={index}
                  onClick={() => openEnquiry(destination.name)}
                  onEnquire={() => openEnquiry(destination.name)}
                />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <Compass className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-lg font-bold text-gray-700">No destinations match your search</p>
              <p className="text-xs text-gray-500 mt-1">Try another keyword or reset the category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* INTERACTIVE TRAIL BUILDER (PICKYOURTRAIL STYLE) */}
      <section id="trail-builder" className="py-24 px-6 bg-gradient-to-b from-[#FDFCF9] via-emerald-50/25 to-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              DIY Customizer • PickYourTrail Style
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Build Your Custom Indian Trail
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto mt-3">
              Select your departure hub, travel vibe, hotel tier, and customize flight/meal inclusions with real-time dynamic pricing.
            </p>
          </div>

          <InteractiveTrailBuilder />
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection
        faqs={domesticFaqs}
        title="Domestic Travel FAQ"
        subtitle="Frequently asked questions about traveling across India with Triponomic."
        badge="India Travel Clarity"
        showCategories={false}
      />

      {/* BOTTOM ACTION BANNER */}
      <section className="py-20 px-6 bg-[#1C2B22] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-5">
            Can't decide where to go in India?
          </h2>
          <p className="text-white/70 text-base max-w-xl mx-auto mb-8">
            Tell us your preferred month and mood. Our travel curators will design a custom itinerary with weather recommendations and hotel partner perks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openEnquiry("Custom India Itinerary")}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              PLAN MY DOMESTIC TRIP
            </button>
            <a
              href="https://wa.me/919611922632"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full text-xs font-bold tracking-widest transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Quick Action Trail Bar */}
      <FloatingTrailBar
        title="Craft Your India Journey"
        subtitle="Direct 5★ partner tariffs • Day-by-day routing"
        buttonText="CRAFT MY JOURNEY"
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModal.isOpen}
        destination={enquiryModal.destination}
        onClose={() => setEnquiryModal({ isOpen: false, destination: "" })}
      />
    </div>
  );
};

export default Domestic;
