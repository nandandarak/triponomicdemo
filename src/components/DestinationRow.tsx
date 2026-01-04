import { motion } from "framer-motion";
import PostcardCard from "./PostcardCard";

const DestinationRow = ({ title, subtitle, destinations, gatewayText, onGatewayClick, onDestinationClick, onEnquire }: any) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <section className="py-24 px-6 bg-[#FDFCF9] relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-[#638C7D] font-bold mb-3">{subtitle}</p>
          <h2 className="font-script text-5xl md:text-6xl text-[#344E41] italic">{title}</h2>
        </div>

        {/* The Grid Fix: Added 'relative' to the grid and the map items */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {destinations.map((destination: any, index: number) => (
            <div key={destination.name} className="relative w-full aspect-[3/4]">
              <PostcardCard
                name={destination.name}
                image={destination.image}
                index={index}
                onClick={() => onDestinationClick(destination.name)}
                onEnquire={() => onEnquire(destination.name)}
              />
            </div>
          ))}
          
          <div className="relative w-full aspect-[3/4]">
            <PostcardCard
              name="Gateway"
              isGateway
              gatewayText={gatewayText}
              index={destinations.length}
              onClick={onGatewayClick}
              onEnquire={() => {}}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationRow;
