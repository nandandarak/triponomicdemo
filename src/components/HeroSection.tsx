import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="font-script text-6xl md:text-7xl lg:text-8xl font-semibold text-logo italic mb-6">
            Triponomic
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-xl md:text-2xl text-foreground/70 font-light tracking-wide"
        >
          Your Customized Travel Partner.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mt-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/50 text-muted-foreground text-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Crafting journeys since 2020
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
