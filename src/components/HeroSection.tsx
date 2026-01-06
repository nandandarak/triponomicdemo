import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/hero-train-video.mp4";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 }, // reduced from 70 → fixes big gap
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full">
      <section
        ref={containerRef}
        className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden z-10"
      >
        {/* Video Background */}
        <motion.div
          style={{ y: videoY, scale: videoScale }}
          className="absolute inset-0 -z-10"
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

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-4xl mx-auto text-center"
        >
          {/* Logo (bigger + closer to title) */}
          <motion.div
            variants={itemVariants}
            className="mb-4 flex justify-center"
          >
            <img
              src={logo}
              alt="Triponomic"
              className="
                h-36 md:h-40 lg:h-44
                w-auto object-contain
                drop-shadow-[0_14px_40px_rgba(0,0,0,0.45)]
              "
            />
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-5">
            <motion.div variants={itemVariants} className="relative inline-block">
              {/* Ambient glow */}
              <motion.div
                animate={{
                  opacity: [0.12, 0.3, 0.12],
                  scale: [1, 1.04, 1],
                }}
                transition={{ duration: 4.5, repeat: Infinity }}
                className="absolute inset-0 blur-3xl bg-primary/20 scale-150"
              />

              <h1 className="relative font-primary text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground drop-shadow-2xl tracking-tight">
                Triponomic
              </h1>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-lg md:text-xl text-primary-foreground font-secondary font-light tracking-[0.18em] uppercase drop-shadow-lg opacity-90">
              Your Customized Travel Partner
            </p>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="mt-5 text-sm md:text-base text-primary-foreground/80 font-secondary font-light tracking-widest max-w-lg mx-auto leading-relaxed"
          >
            Your Vision, Our Plan. Custom-built itineraries
            <br className="hidden md:block" />
            tailored to your unique needs.
          </motion.p>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none" />
      </section>
    </div>
  );
};

export default HeroSection;
