import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Sparkles,
  SlidersHorizontal,
  Search,
  Compass,
  Phone,
  MessageSquare,
  ShieldCheck,
  Plane,
  Stamp,
  Clock,
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

// International Images from Index
import vietnamImg from "@/assets/vietnam.jpg";
import kenyaImg from "@/assets/kenya.jpg";
import thailandImg from "@/assets/thailand.jpg";
import egyptImg from "@/assets/egypt.jpg";
import srilankaImg from "@/assets/srilanka.jpg";
import philippinesImg from "@/assets/philippines.jpg";
import kazakhstanImg from "@/assets/kazakhstan.jpg";
import maldivesImg from "@/assets/maldives.jpg";
import southafricaImg from "@/assets/southafrica.jpg";
import franceImg from "@/assets/france.jpg";
import newzealandImg from "@/assets/newzealand.jpg";
import spainImg from "@/assets/spain.jpg";
import switzerlandImg from "@/assets/switzerland.jpg";
import australiaImg from "@/assets/australia.jpg";
import malaysiaImg from "@/assets/malaysia.jpg";
import mauritiusImg from "@/assets/mauritius.jpg";

interface InternationalDestination {
  name: string;
  image: string;
  category: "Asia" | "Europe" | "Africa" | "Oceania" | "MiddleEast";
  regionLabel: string;
  vibe: string;
}

const internationalDestinations: InternationalDestination[] = [
  { name: "Vietnam", image: vietnamImg, category: "Asia", regionLabel: "Southeast Asia", vibe: "Halong Bay overnight cruise & lantern-lit Hoi An" },
  { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80", category: "Asia", regionLabel: "Southeast Asia", vibe: "Private pool jungle villas & Nusa Penida cliffs" },
  { name: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80", category: "Asia", regionLabel: "East Asia", vibe: "Shinkansen bullet trains, Kyoto shrines & Tokyo neon" },
  { name: "Kenya", image: kenyaImg, category: "Africa", regionLabel: "East Africa", vibe: "The Great Migration & luxury savannah tented safaris" },
  { name: "Thailand", image: thailandImg, category: "Asia", regionLabel: "Southeast Asia", vibe: "Phuket luxury catamarans & vibrant Bangkok street food" },
  { name: "Egypt", image: egyptImg, category: "MiddleEast", regionLabel: "North Africa & Middle East", vibe: "Great Pyramids of Giza & 5-Star Nile river cruises" },
  { name: "Sri Lanka", image: srilankaImg, category: "Asia", regionLabel: "South Asia", vibe: "Scenic tea train to Ella & golden southern beaches" },
  { name: "Philippines", image: philippinesImg, category: "Asia", regionLabel: "Southeast Asia", vibe: "Hidden lagoons of El Nido & white sand beaches of Boracay" },
  { name: "Kazakhstan", image: kazakhstanImg, category: "Asia", regionLabel: "Central Asia", vibe: "Almaty ski resorts, Charyn Canyon & sunken forest of Kaindy" },
  { name: "Maldives", image: maldivesImg, category: "Asia", regionLabel: "Indian Ocean", vibe: "Overwater private villas & seaplane arrival transfers" },
  { name: "Turkey", image: "https://picsum.photos/seed/Turkey/900/1200", category: "MiddleEast", regionLabel: "Eurasia", vibe: "Cappadocia hot air balloons & Bosphorus private yachts" },
  { name: "South Africa", image: southafricaImg, category: "Africa", regionLabel: "Southern Africa", vibe: "Cape Town Table Mountain & Kruger luxury Big Five game drives" },
  { name: "France", image: franceImg, category: "Europe", regionLabel: "Western Europe", vibe: "Parisian romance, French Riviera & Bordeaux vineyards" },
  { name: "New Zealand", image: newzealandImg, category: "Oceania", regionLabel: "Oceania", vibe: "Milford Sound fjords, Queenstown adventure & hobbiton" },
  { name: "Spain", image: spainImg, category: "Europe", regionLabel: "Southern Europe", vibe: "Barcelona Gaudí architecture, tapas & Balearic islands" },
  { name: "Switzerland", image: switzerlandImg, category: "Europe", regionLabel: "Central Europe", vibe: "Panoramic glacier trains, Jungfrau & Zermatt Matterhorn" },
  { name: "Australia", image: australiaImg, category: "Oceania", regionLabel: "Oceania", vibe: "Sydney Harbour, Great Barrier Reef & Great Ocean Road" },
  { name: "Malaysia", image: malaysiaImg, category: "Asia", regionLabel: "Southeast Asia", vibe: "Petronas towers, Langkawi geopark & Penang heritage" },
  { name: "Mauritius", image: mauritiusImg, category: "Africa", regionLabel: "Indian Ocean", vibe: "Underwater waterfall helicopter tours & luxury beach resorts" },
  { name: "South Korea", image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=900&q=80", category: "Asia", regionLabel: "East Asia", vibe: "Seoul K-culture, royal palaces & Jeju Island nature" },
];

const categoryFilters = [
  { label: "All Destinations", value: "All" },
  { label: "Southeast & East Asia", value: "Asia" },
  { label: "Europe & Alps", value: "Europe" },
  { label: "Africa & Safaris", value: "Africa" },
  { label: "Oceania & Islands", value: "Oceania" },
  { label: "Middle East & Egypt", value: "MiddleEast" },
];

const internationalFaqs: FAQItem[] = [
  {
    id: "int-visa",
    category: "Visas & Documentation",
    question: "Do you handle complete tourist visa processing and documentation?",
    answer:
      "Yes! Our visa concierge manages documentation review, cover letters, appointment slots (Schengen, UK, Japan, etc.), and eVisa submissions (Vietnam, Bali, Sri Lanka, Kenya) with a high approval track record.",
  },
  {
    id: "int-flight",
    category: "Flights & Luggage",
    question: "Can you arrange international flights with baggage and seat preferences?",
    answer:
      "Yes. We secure competitive airfares with trusted full-service airlines, including baggage allowances, meal selections, seat assignments, and web check-in.",
  },
  {
    id: "int-esim",
    category: "Connectivity",
    question: "How do international eSIMs work during my trip?",
    answer:
      "We provide high-speed 4G/5G international eSIM QR codes prior to your departure. Simply scan the code, and your phone connects automatically the moment you land — no airport SIM queues required.",
  },
  {
    id: "int-custom",
    category: "Customization",
    question: "Can I combine multiple countries in one itinerary?",
    answer:
      "Absolutely! Many of our travelers combine France + Switzerland, Vietnam + Bali, or South Africa + Kenya. We handle seamless inter-country flight connections and visa coordination.",
  },
];

const International = () => {
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

  const { internationalCards } = useDestinationCards();

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

  const filtered = internationalCards.filter((dest) => {
    const matchesCategory =
      selectedFilter === "All" ||
      (dest.category && dest.category.toLowerCase().includes(selectedFilter.toLowerCase()));
    const matchesSearch =
      searchQuery.trim() === "" ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dest.category && dest.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (dest.vibe && dest.vibe.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openEnquiry = (name: string) => {
    setEnquiryModal({ isOpen: true, destination: `${name} (International)` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* PAGE HERO WITH LOOPING WORLD VIDEO */}
      <section className="relative min-h-[75vh] md:min-h-[82vh] flex flex-col justify-center items-center pt-32 pb-20 px-6 overflow-hidden bg-[#0c1622] text-white">
        {/* Looping World Video Background - Full Fit & Cinematic Framing */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={switzerlandImg}
            className="w-full h-full object-cover object-center brightness-[0.82] contrast-[1.05]"
          >
            <source src="/video/world.mp4" type="video/mp4" />
          </video>
          {/* Subtle cinematic overlays for legibility without losing video vibrancy */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0c1622]" />
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
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-4">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Beyond Borders • International Adventures
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-5">
              <BlurText text="Wander Beyond Borders" animateBy="words" className="text-white" />
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
              From Alpine glacier trains in Switzerland and savannah safaris in Kenya to overwater villas in Maldives and lantern nights in Vietnam.
            </p>

            {/* Quick Search */}
            <div className="max-w-xl mx-auto relative mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search global destination (e.g. Switzerland, Bali, Japan, Kenya)..."
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
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                20 Global Destinations
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">
                <Stamp className="w-3.5 h-3.5 text-emerald-400" />
                Fast-Track Visa Concierge
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">
                <Plane className="w-3.5 h-3.5 text-amber-300" />
                Curated Flights & 5★ Stays
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
                      layoutId="internationalFilterPill"
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
            Showing <span className="text-emerald-700 font-bold">{filtered.length}</span> global destinations
          </p>
        </div>
      </div>

      {/* INTERACTIVE POSTCARD CARDS GRID */}
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
              <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-lg font-bold text-gray-700">No global destinations match your query</p>
              <p className="text-xs text-gray-500 mt-1">Try another country name or reset the region filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* INTERACTIVE TRAIL BUILDER (PICKYOURTRAIL STYLE) */}
      <section id="trail-builder" className="py-24 px-6 bg-gradient-to-b from-[#FDFCF9] via-emerald-50/25 to-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              DIY Global Customizer • PickYourTrail Style
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Build Your Custom Global Trail
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto mt-3">
              Select your departure hub, international destination, travel vibe, and hotel tier to preview real-time dynamic pricing.
            </p>
          </div>

          <InteractiveTrailBuilder initialDestination="Bali" />
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection
        faqs={internationalFaqs}
        title="International Travel FAQ"
        subtitle="Common questions regarding visas, currency, international flights, and global concierge."
        badge="International Travel Clarity"
        showCategories={false}
      />

      {/* BOTTOM ACTION BANNER */}
      <section className="py-20 px-6 bg-[#1C2B22] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-5">
            Planning an international vacation?
          </h2>
          <p className="text-white/70 text-base max-w-xl mx-auto mb-8">
            Tell us which country you'd love to visit. We'll handle everything from visa documentation to 5-star hotel upgrades and 24/7 on-ground assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openEnquiry("Custom International Itinerary")}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              PLAN MY GLOBAL TRIP
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
        title="Craft Your Global Journey"
        subtitle="Direct partner tariffs • 100% bespoke routing"
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

export default International;
