import { motion } from "framer-motion";
import PostcardCard from "./PostcardCard";

interface Destination {
  name: string;
  image: string;
}

interface DestinationRowProps {
  title: string;
  subtitle: string;
  destinations: Destination[];
  gatewayText: string;
  onGatewayClick: () => void;
  onDestinationClick: (destination: string) => void;
  onEnquire: (destination: string) => void;
}

const DestinationRow = ({
  title,
  subtitle,
  destinations,
  gatewayText,
  onGatewayClick,
  onDestinationClick,
  onEnquire,
}: DestinationRowProps) => {
  /* Softer stagger for premium feel */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-28 px-6 bg-[#FDFCF9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="mb-20 relative"
        >
          <motion.p
            variants={headerVariants}
            className="text-xs uppercase tracking-[0.4em] text-[#638C7D] font-bold mb-4"
          >
            {subtitle}
          </motion.p>

          <div className="flex items-center gap-8">
            <motion.h2
              variants={headerVariants}
              className="font-script text-5xl md:text-6xl text-[#344E41] italic leading-tight"
            >
              {title}
            </motion.h2>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/40 to-transparent origin-left"
            />
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="
            relative
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-10
            perspective-1000
          "
        >
          {destinations.map((destination, index) => (
            <PostcardCard
              key={destination.name}
              name={destination.name}
              image={destination.image}
              index={index}
              onClick={() => onDestinationClick(destination.name)}
              onEnquire={() => onEnquire(destination.name)}
            />
          ))}

          {/* Gateway Card */}
          <PostcardCard
            name="Gateway"
            image=""
            isGateway
            gatewayText={gatewayText}
            index={destinations.length}
            onClick={onGatewayClick}
            onEnquire={() => {}}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationRow;
