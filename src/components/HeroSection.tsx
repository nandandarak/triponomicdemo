import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-train-video.mp4";
import Floating3DElements from "./Floating3DElements";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Sage Green Overlay */}
        <div className="absolute inset-0 bg-[#638C7D]/25" />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
        
        {/* Vignette effect */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)"
        }} />
      </div>

      {/* Floating 3D Elements with Parallax */}
      <Floating3DElements />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Glow effect behind title */}
          <div className="relative inline-block">
            <div className="absolute inset-0 blur-3xl bg-[#638C7D]/30 scale-150" />
            <h1 className="relative font-script text-6xl md:text-7xl lg:text-8xl font-semibold text-white italic mb-6 drop-shadow-2xl">
              Triponomic
            </h1>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-xl md:text-2xl text-white font-light tracking-wide drop-shadow-lg"
        >
          Your Customized Travel Partner.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mt-4 text-sm md:text-base text-white/90 font-light tracking-wider italic drop-shadow-md"
        >
          Your Vision, Our Plan. Custom-built itineraries tailored to your unique needs.
        </motion.p>

      </div>
    </section>
  );
};

export default HeroSection;
