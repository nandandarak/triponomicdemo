import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/hero-train-video.mp4";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Parallax effect (safe & layout-stable)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

const itemVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    /* OUTER WRAPPER — reserves layout space (IMPORTANT) */
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

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2f6f73]/20 via-transparent to-black/40" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-4xl mx-auto text-center"
        >
          {/* Title */}
          <div className="overflow-hidden mb-6">
            <motion.div variants={itemVariants} className="relative inline-block">
              {/* Glow */}
              <motion.div
                animate={{
                  opacity: [0.35, 0.6, 0.35],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 blur-3xl bg-[#638C7D]/40 scale-150"
              />

              <h1 className="relative font-script text-7xl md:text-8xl lg:text-9xl font-semibold text-white italic drop-shadow-2xl tracking-tight">
                Triponomic
              </h1>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-xl md:text-2xl text-white font-light tracking-[0.2em] uppercase drop-shadow-lg opacity-90">
              Your Customized Travel Partner
            </p>
          </motion.div>

          {/* Sub text */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-sm md:text-base text-white/80 font-light tracking-widest italic max-w-lg mx-auto leading-relaxed"
          >
            Your Vision, Our Plan. Custom-built itineraries
            <br className="hidden md:block" />
            tailored to your unique needs.
          </motion.p>
        </motion.div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none" />
      </section>
    </div>
  );
};

export default HeroSection;
