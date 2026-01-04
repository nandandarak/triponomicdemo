import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/hero-train-video.mp4";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.08]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[68vh] w-full overflow-hidden flex items-center justify-center px-6"
    >
      {/* VIDEO */}
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 -z-10"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-90 contrast-105"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2f6f73]/10 via-transparent to-black/25" />
      </motion.div>

      {/* CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl"
      >
        <motion.h1
          variants={itemVariants}
          className="font-script text-6xl md:text-7xl lg:text-8xl italic text-white drop-shadow-2xl"
        >
          Triponomic
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-2 text-base md:text-lg uppercase tracking-[0.16em] text-white/90"
        >
          Your Customized Travel Partner
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-3 text-xs md:text-sm text-white/75 italic tracking-widest"
        >
          Your Vision, Our Plan. Custom-built itineraries
          <br className="hidden md:block" />
          tailored to your unique needs.
        </motion.p>
      </motion.div>

      {/* 🔥 ULTRA SMALL FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
