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
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-2">
            {subtitle}
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-foreground italic">
            {title}
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </div>
      </div>
    </section>
  );
};

export default DestinationRow;
