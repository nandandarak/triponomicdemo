import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/hero-train-video.mp4";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.1]);

  return (
    <section
      ref={containerRef}
      className="
        relative w-full overflow-hidden
        h-[88vh]
        z-0
      "
    >
      {/* VIDEO BACKGROUND */}
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-95 contrast-105"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Softer overlay */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-full">
        <img
          src={logo}
          alt="Triponomic"
          className="h-36 md:h-48 brightness-0 invert opacity-95 mb-4"
        />

        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Triponomic
        </h1>

        <p className="mt-3 text-xs md:text-lg tracking-[0.35em] text-white/90 uppercase">
          Your Customized Travel Partner
        </p>

        <p className="mt-3 text-xs md:text-base text-white/80 max-w-xl">
          Your Vision, Our Plan. Custom-built itineraries tailored to your needs.
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-23 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
