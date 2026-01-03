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

      </div>
    </section>
  );
};

export default HeroSection;
