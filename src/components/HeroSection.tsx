import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import heroVideo from "@/assets/hero-train-video.mp4";
import logo from "@/assets/logo.png";
import { X } from "lucide-react";
import { servicesList } from "./Header";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="relative w-full">
      <section
        ref={containerRef}
        className="
          relative w-full flex items-center justify-center px-6 overflow-hidden z-10
          pt-32 md:pt-0 pb-20 md:pb-0
          min-h-[100svh] md:min-h-screen
        "
      >
        {/* VIDEO BACKGROUND (MOBILE SAFE) */}
        <motion.div
          style={{ y: videoY, scale: videoScale }}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover brightness-90 contrast-105"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />
        </motion.div>

        {/* HERO CONTENT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-5xl mx-auto text-center"
        >
          {/* LOGO */}
          <motion.div variants={itemVariants} className="-mb-6 flex justify-center">
            <img
              src={logo}
              alt="Triponomic"
              className="
                h-28 md:h-56 lg:h-60
                w-auto object-contain
                brightness-0 invert opacity-95
                drop-shadow-[0_20px_55px_rgba(0,0,0,0.65)]
              "
            />
          </motion.div>

          {/* TITLE */}
          <div className="overflow-hidden mb-3 md:mb-6">
            <motion.div variants={itemVariants} className="relative inline-block">
              <motion.div
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                  scale: [1, 1.06, 1],
                }}
                transition={{ duration: 4.5, repeat: Infinity }}
                className="absolute inset-0 blur-3xl bg-primary/25 scale-150"
              />

              <h1 className="relative font-primary text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-primary-foreground drop-shadow-2xl tracking-tight">
                Triponomic
              </h1>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-sm md:text-2xl text-primary-foreground font-secondary font-light tracking-[0.2em] uppercase drop-shadow-lg opacity-90">
              Your Customized Travel Partner
            </p>
          </motion.div>

          {/* SUBTEXT */}
          <motion.p
            variants={itemVariants}
            className="mt-2 md:mt-4 text-[10px] md:text-base text-primary-foreground/80 font-secondary font-light tracking-widest max-w-xl mx-auto leading-relaxed"
          >
            Your Vision, Our Plan. Custom built itineraries{" "}
            <br className="hidden md:block" />
            tailored to your unique needs.
          </motion.p>

          {/* EXPLORE SERVICES BUTTON */}
          <motion.div variants={itemVariants} className="mt-6 md:mt-10 relative z-[100]">
            <button
              className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-sm font-bold tracking-widest flex items-center justify-center gap-3 transition-all backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] mx-auto"
              onClick={() => setIsServicesOpen(true)}
            >
              EXPLORE OUR SERVICES
            </button>
          </motion.div>
        </motion.div>

        {/* SERVICES MODAL */}
        <AnimatePresence>
          {isServicesOpen && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsServicesOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-4xl bg-card rounded-3xl p-6 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] border flex flex-col max-h-[90vh] z-10"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold font-primary tracking-tight mb-2">Explore Experiences</h3>
                    <p className="text-muted-foreground text-sm md:text-base tracking-widest uppercase font-semibold">Everything you need for your journey</p>
                  </div>
                  <button
                    onClick={() => setIsServicesOpen(false)}
                    className="p-3 bg-secondary hover:bg-secondary/80 rounded-full transition-colors border"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[65vh]">
                  {servicesList.map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl bg-background hover:bg-primary transition-all cursor-pointer border hover:border-primary group shadow-sm"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {Icon && <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />}
                      <span className="font-semibold text-sm md:text-base group-hover:text-primary-foreground transition-colors">{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none" />
      </section>
    </div>
  );
};

export default HeroSection;
