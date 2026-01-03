import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard";

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
}

const DestinationRow = ({
  title,
  subtitle,
  destinations,
  gatewayText,
  onGatewayClick,
  onDestinationClick,
}: DestinationRowProps) => {
  return (
    <section className="py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 mb-8"
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-2">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground">
            {title}
          </h2>
        </div>
      </motion.div>

      {/* Cards Container */}
      <div className="relative">
        <div className="flex gap-6 px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
          <div className="max-w-7xl mx-auto flex gap-6">
            {destinations.slice(0, 3).map((dest, index) => (
              <DestinationCard
                key={dest.name}
                name={dest.name}
                image={dest.image}
                onClick={() => onDestinationClick(dest.name)}
                index={index}
              />
            ))}
            
            {/* Gateway Card */}
            <DestinationCard
              name="gateway"
              image=""
              isGateway
              gatewayText={gatewayText}
              onClick={onGatewayClick}
              index={3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationRow;
