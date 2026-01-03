import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface DestinationCardProps {
  name: string;
  image: string;
  isGateway?: boolean;
  gatewayText?: string;
  onClick: () => void;
  index: number;
}

const DestinationCard = ({ 
  name, 
  image, 
  isGateway = false, 
  gatewayText,
  onClick, 
  index 
}: DestinationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className="flex-shrink-0 w-[280px] md:w-[320px]"
    >
      <button
        onClick={onClick}
        className="card-destination w-full aspect-[3/4] relative group bg-card overflow-hidden cursor-pointer text-left"
      >
        {!isGateway ? (
          <>
            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-medium text-primary-foreground tracking-wide">
                {name}
              </h3>
            </div>
          </>
        ) : (
          /* Gateway Card */
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-secondary via-accent to-secondary">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xl font-medium text-foreground text-center">
              {gatewayText}
            </p>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              View all destinations
            </p>
          </div>
        )}
      </button>
    </motion.div>
  );
};

export default DestinationCard;
