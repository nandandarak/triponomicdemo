import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/hero-train-video.mp4";
import heroPoster from "@/assets/hero-poster.jpg"; // 🔴 ADD THIS IMAGE
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* Parallax */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  /* Animations */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 28, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="
        relative w-full overflow-hidden
        min-h-[calc(100vh-96px)] md:min-h-screen
        flex items-center justify-center
        pt-28 md:pt-0
      "
    >
      {/* ================= BACKGROUND ================= */}

      {/* DESKTOP VIDEO */}
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="hidden md:block absolute inset-0 -z-10"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>

      {/* MOBILE IMAGE */}
      <div
        className="block md:hidden absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroPoster})` }}
      />

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/35 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 -z-10" />

      {/* ================= CONTENT ================= */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center px-6"
      >
        {/* LOGO */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-4"
        >
          <img
            src={logo}
            alt="Triponomic"
            className="
              h-40 md:h-56
              w-auto
              brightness-0 invert
              drop-shadow-[0_18px_45px_rgba(0,0,0,0.65)]
            "
          />
        </motion.div>

        {/* TITLE */}
        <motion.h1
          variants={itemVariants}
          className="
            font-primary
            text-5xl md:text-7xl lg:text-8xl
            font-bold text-white
            tracking-tight
            drop-shadow-2xl
          "
        >
          Triponomic
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          variants={itemVariants}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="
            mt-4
            text-sm md:text-xl
            uppercase tracking-[0.3em]
            text-white/90
            font-secondary
          "
        >
          Your Customized Travel Partner
        </motion.p>

        {/* SUBTEXT */}
        <motion.p
          variants={itemVariants}
          className="
            mt-6 max-w-xl mx-auto
            text-xs md:text-base
            text-white/80
            font-secondary
            tracking-wide
            leading-relaxed
          "
        >
          Your Vision, Our Plan. Custom-built itineraries
          <br className="hidden md:block" />
          tailored to your unique needs.
        </motion.p>
      </motion.div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
