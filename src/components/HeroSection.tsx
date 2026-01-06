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
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-5xl mx-auto text-center"
        >
          {/* Logo (WHITE – HERO ONLY) */}
          <motion.div
            variants={itemVariants}
            className="mb-4 flex justify-center"
          >
            <img
              src={logo}
              alt="Triponomic"
              className="
                h-44 md:h-48 lg:h-52
                w-auto object-contain
                brightness-0 invert opacity-95
                drop-shadow-[0_18px_50px_rgba(0,0,0,0.65)]
              "
            />
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-6">
            <motion.div variants={itemVariants} className="relative inline-block">
              {/* Ambient glow */}
              <motion.div
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                  scale: [1, 1.06, 1],
                }}
                transition={{ duration: 4.5, repeat: Infinity }}
                className="absolute inset-0 blur-3xl bg-primary/25 scale-150"
              />

              <h1 className="relative font-primary text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-primary-foreground drop-shadow-2xl tracking-tight">
                Triponomic
              </h1>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-xl md:text-2xl text-primary-foreground font-secondary font-light tracking-[0.2em] uppercase drop-shadow-lg opacity-90">
              Your Customized Travel Partner
            </p>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="mt-5 text-sm md:text-base text-primary-foreground/80 font-secondary font-light tracking-widest max-w-xl mx-auto leading-relaxed"
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
