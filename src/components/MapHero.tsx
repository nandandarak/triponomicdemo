import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Plane, Sparkles, Flame } from "lucide-react";

const TRENDING_DESTINATIONS = [
  "Vietnam",
  "Bali",
  "Switzerland",
  "Kashmir",
  "Ladakh",
  "Dubai",
];

const MapHero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Pause video decoding when off-screen to free GPU/CPU for smooth 60fps scrolling
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

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

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const hasQuery = searchQuery.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasQuery) return;
    navigate(`/build-trail?destination=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* ── VIDEO — boosted brightness, rich colors ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          imageRendering: "-webkit-optimize-contrast",
          filter: "contrast(1.06) saturate(1.25) brightness(1.12)",
          transform: "translateZ(0)",
        }}
      >
        <source src="/video/window.mp4" type="video/mp4" />
      </video>

      {/* ── LIGHT CINEMATIC OVERLAYS — only where needed ── */}
      {/* Very subtle base tint — just enough to boost text contrast */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-[2]" />
      {/* Bottom fade so search bar area reads cleanly */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none z-[3]" />
      {/* Top vignette for nav bar readability */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/35 to-transparent pointer-events-none z-[4]" />
      {/* Soft dark halo behind text — only the center zone */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_48%,rgba(0,0,0,0.42)_0%,transparent_100%)] pointer-events-none z-[5]" />

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.25)] tracking-wide"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>Your Customized Travel Partner</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white text-center font-primary tracking-tight mb-3 leading-tight"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7), 0 8px 40px rgba(0,0,0,0.6)" }}
        >
          Craft Your Dream Journey
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/95 text-sm sm:text-base font-medium mb-6 text-center max-w-lg"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)" }}
        >
          100% customized itineraries with personal travel curators, handpicked stays &amp; transparent pricing.
        </motion.p>

        {/* ── SEARCH BAR ── */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 24, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="
            w-full max-w-2xl
            bg-white/15 hover:bg-white/20
            backdrop-blur-xl
            border border-white/40
            shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]
            rounded-3xl md:rounded-full
            p-2.5 md:p-2
            flex flex-col sm:flex-row items-stretch sm:items-center
            gap-2.5 sm:gap-2
            transition-all duration-300
          "
        >
          <div className="flex items-center gap-3.5 flex-1 px-5 py-3.5 md:py-3">
            <MapPin className="w-[18px] h-[18px] text-white/80 shrink-0 drop-shadow" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any destination (e.g. Switzerland, Kashmir, Bali, Spiti)..."
              className="
                w-full bg-transparent text-white text-sm md:text-base
                placeholder:text-white/60
                outline-none caret-white
                font-light tracking-wide
              "
            />
          </div>

          <button
            type="submit"
            disabled={!hasQuery}
            title={hasQuery ? "Plan your custom trail" : "Type a destination to plan your trip"}
            className={`
              flex items-center justify-center gap-2
              px-8 py-3.5 md:py-3 md:mx-1
              rounded-2xl md:rounded-full
              text-sm font-semibold tracking-wide
              transition-all duration-300
              whitespace-nowrap shrink-0
              ${
                hasQuery
                  ? "bg-white text-[#151B40] hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  : "bg-white/20 border border-white/20 text-white/40 cursor-not-allowed opacity-60"
              }
            `}
          >
            <Plane className={`w-4 h-4 -rotate-45 ${hasQuery ? "text-[#151B40]" : "text-white/30"}`} />
            <span>Plan Trip</span>
          </button>
        </motion.form>

        {/* ── TRENDING DESTINATION PILLS ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span className="text-white/90 font-semibold flex items-center gap-1.5 drop-shadow mr-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Trending:
          </span>
          {TRENDING_DESTINATIONS.map((destination) => (
            <button
              key={destination}
              type="button"
              onClick={() => {
                setSearchQuery(destination);
                navigate(`/build-trail?destination=${encodeURIComponent(destination)}`);
              }}
              className="
                px-4 py-1.5 rounded-full
                bg-white/20 hover:bg-white/35
                backdrop-blur-md border border-white/40 hover:border-white/70
                text-white text-xs sm:text-sm font-medium tracking-wide
                transition-all duration-200
                shadow-md hover:scale-105 active:scale-95 cursor-pointer
              "
            >
              {destination}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── SCROLL CUE ── */}
      <motion.button
        type="button"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="
          absolute bottom-6 left-1/2 -translate-x-1/2 z-20
          flex flex-col items-center gap-2
          text-white/70 hover:text-white transition-colors cursor-pointer group
        "
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-light drop-shadow">
          Scroll to explore
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-white/40 group-hover:border-white/70 flex justify-center pt-1.5 transition-colors shadow-sm">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
        </div>
      </motion.button>
    </section>
  );
};

export default MapHero;
