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
      {/* ── VIDEO WITH ENHANCED CONTRAST & HARDWARE SHARPNESS ── */}
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
          filter: "contrast(1.08) saturate(1.15) brightness(1.02)",
          transform: "translateZ(0)",
        }}
      >
        <source src="/video/map-loop.mp4" type="video/mp4" />
      </video>

      {/* ── SUBTLE DARK OVERLAYS FOR MAXIMUM CONTRAST & SLEEK GLASSMORPHIC POP ── */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75 pointer-events-none z-[3]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.55)_100%)] pointer-events-none z-[4]" />

      {/* ── TOP VIGNETTE FOR NAV READABILITY ── */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-[5]" />

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28">
        {/* Tagline Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-[#90E0EF] text-xs sm:text-sm font-medium mb-3 shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="text-white/95">Your Customized Travel Partner</span>
        </motion.div>

        {/* Prominent Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white text-center font-primary tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] mb-6 leading-tight"
        >
          Craft Your Dream Journey
        </motion.h1>

        {/* ── REFINED GLASSMORPHIC SEARCH BAR ── */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 24, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="
            w-full max-w-2xl
            bg-slate-950/55 hover:bg-slate-950/65
            backdrop-blur-2xl
            border border-white/25
            shadow-[0_20px_50px_rgba(0,0,0,0.5)]
            rounded-3xl md:rounded-full
            p-2.5 md:p-2
            flex flex-col sm:flex-row items-stretch sm:items-center
            gap-2.5 sm:gap-2
            transition-all duration-300
          "
        >
          {/* ─ Destination Input with consistent padding ─ */}
          <div className="flex items-center gap-3.5 flex-1 px-5 py-3.5 md:py-3">
            <MapPin className="w-[18px] h-[18px] text-[#00B4D8] shrink-0 drop-shadow" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any destination (e.g. Switzerland, Kashmir, Bali, Spiti)..."
              className="
                w-full bg-transparent text-white text-sm md:text-base
                placeholder:text-white/50
                outline-none caret-[#00B4D8]
                font-light tracking-wide
              "
            />
          </div>

          {/* ─ Plan Trip Button (Logo Brand Color #151B40) ─ */}
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
                  ? "bg-[#151B40] hover:bg-[#1C2556] border border-white/25 text-white shadow-[0_4px_20px_rgba(21,27,64,0.6)] hover:shadow-[0_6px_28px_rgba(21,27,64,0.85)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  : "bg-slate-800/60 border border-white/10 text-white/40 cursor-not-allowed opacity-60"
              }
            `}
          >
            <Plane className={`w-4 h-4 -rotate-45 ${hasQuery ? "text-cyan-300" : "text-white/30"}`} />
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
          <span className="text-white/80 font-medium flex items-center gap-1.5 drop-shadow mr-1">
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
                bg-slate-950/75 hover:bg-[#151B40]
                backdrop-blur-md border border-white/30 hover:border-cyan-400/60
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

      {/* ── SCROLL TO EXPLORE CUE ── */}
      <motion.button
        type="button"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="
          absolute bottom-6 left-1/2 -translate-x-1/2 z-20
          flex flex-col items-center gap-2
          text-white/60 hover:text-white transition-colors cursor-pointer group
        "
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-light drop-shadow">
          Scroll to explore
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-white/30 group-hover:border-white/60 flex justify-center pt-1.5 transition-colors shadow-sm">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] shadow-[0_0_8px_rgba(0,180,216,0.8)]"
          />
        </div>
      </motion.button>
    </section>
  );
};

export default MapHero;
