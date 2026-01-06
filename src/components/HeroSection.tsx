import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/hero-train-video.mp4";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* Parallax scroll */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.15]);

  /* Animation variants */
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* VIDEO BACKGROUND */}
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
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </motion.div>

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        {/* LOGO */}
        <motion.div
          variants={item}
          className="relative flex justify-center mb-6"
        >
          {/* Glow */}
          <motion.div
            animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 blur-3xl bg-primary/30 scale-150"
          />

          <img
            src={logo}
            alt="Triponomic"
            className="h-40 md:h-52 w-auto brightness-0 invert drop-shadow-[0_20px_55px_rgba(0,0,0,0.7)]"
          />
        </motion.div>

        {/* TITLE */}
        <motion.h1
          variants={item}
          className="font-primary text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground drop-shadow-2xl"
        >
          Triponomic
        </motion.h1>

        {/* TAGLINE (FLOATING) */}
        <motion.p
          variants={item}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 text-lg md:text-2xl tracking-[0.25em] uppercase text-primary-foreground/90"
        >
          Your Customized Travel Partner
        </motion.p>

        {/* SUBTEXT */}
        <motion.p
          variants={item}
          className="mt-6 text-sm md:text-base text-primary-foreground/80 tracking-wide max-w-xl mx-auto"
        >
          Your Vision, Our Plan. Custom-built itineraries <br className="hidden md:block" />
          tailored to your unique needs.
        </motion.p>
      </motion.div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
