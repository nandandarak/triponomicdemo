import { motion } from "framer-motion";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt=""
          className="w-full h-full object-cover scale-110 blur-sm"
        />
        {/* Dark overlay to highlight text */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90" />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Glow effect behind title */}
          <div className="relative inline-block">
            <div className="absolute inset-0 blur-3xl bg-primary/20 scale-150" />
            <h1 className="relative font-script text-6xl md:text-7xl lg:text-8xl font-semibold text-logo italic mb-6 drop-shadow-2xl">
              Triponomic
            </h1>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-xl md:text-2xl text-foreground font-light tracking-wide drop-shadow-lg"
        >
          Your Customized Travel Partner.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mt-4 text-sm md:text-base text-foreground/80 font-light tracking-wider italic drop-shadow-md"
        >
          Your Vision, Our Plan. Custom-built itineraries tailored to your unique needs.
        </motion.p>

      </div>
    </section>
  );
};

export default HeroSection;
