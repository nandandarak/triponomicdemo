import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Coins, Sun, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface DestinationData {
  duration: string;
  investment: string;
  bestTime: string;
}

interface PostcardCardProps {
  name: string;
  image: string;
  isGateway?: boolean;
  gatewayText?: string;
  onClick: () => void;
  onEnquire: () => void;
  index: number;
  destinationData?: DestinationData;
}

// Default data for destinations
const defaultDestinationData: Record<string, DestinationData> = {
  Mumbai: { duration: "2-3 Days", investment: "₹15,000", bestTime: "Oct - Mar" },
  Pune: { duration: "2-3 Days", investment: "₹12,000", bestTime: "Oct - Feb" },
  Goa: { duration: "4-5 Days", investment: "₹25,000", bestTime: "Nov - Feb" },
  Japan: { duration: "7-10 Days", investment: "₹1,50,000", bestTime: "Mar - May" },
  Bali: { duration: "5-7 Days", investment: "₹75,000", bestTime: "Apr - Oct" },
  "South Korea": { duration: "6-8 Days", investment: "₹1,20,000", bestTime: "Mar - May" },
};

const PostcardCard = ({ 
  name, 
  image, 
  isGateway = false, 
  gatewayText,
  onClick,
  onEnquire,
  index,
  destinationData
}: PostcardCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPlane, setShowPlane] = useState(false);

  const data = destinationData || defaultDestinationData[name] || {
    duration: "5-7 Days",
    investment: "₹45,000",
    bestTime: "Oct - Mar"
  };

  const handleHover = () => {
    if (!isGateway) {
      setShowPlane(true);
      setTimeout(() => setIsFlipped(true), 300);
    }
  };

  const handleLeave = () => {
    setIsFlipped(false);
    setShowPlane(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -10, y: 40 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className="w-full perspective-1000"
    >
      <div
        className="relative w-full aspect-[3/4] cursor-pointer"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Plane Landing Animation */}
        {showPlane && !isGateway && (
          <motion.div
            className="absolute -top-8 -right-8 z-30 pointer-events-none"
            initial={{ x: 100, y: -50, opacity: 0 }}
            animate={{ 
              x: 20, 
              y: 20, 
              opacity: 1,
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              scale: { delay: 0.4, duration: 0.2 }
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M28 8L4 16L12 18L14 28L18 22L24 26L28 8Z"
                fill="#638C7D"
                stroke="#4A7066"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        )}

        {!isGateway ? (
          <motion.div
            className="w-full h-full"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Side */}
            <div 
              className="absolute inset-0 card-destination bg-card overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="absolute inset-0">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-medium text-white tracking-wide drop-shadow-lg">
                  {name}
                </h3>
              </div>
            </div>

            {/* Back Side - Luxury Postcard */}
            <div 
              className="absolute inset-0 rounded-card overflow-hidden"
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {/* Parchment Background with dot grid */}
              <div 
                className="w-full h-full p-6 flex flex-col"
                style={{
                  backgroundColor: "#FDFCF9",
                  backgroundImage: `radial-gradient(circle, #D4AF37 0.5px, transparent 0.5px)`,
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Vertical dashed line */}
                <div className="absolute left-1/2 top-8 bottom-8 border-l-2 border-dashed border-[#D4AF37]/30" />

                {/* Postage Stamp */}
                <div className="absolute top-4 right-4 w-16 h-20 border-2 border-[#D4AF37] rounded-sm flex flex-col items-center justify-center bg-white/80">
                  <span className="text-[8px] uppercase tracking-wider text-[#638C7D] font-bold">Triponomic</span>
                  <span className="text-lg text-[#D4AF37]">✓</span>
                  <span className="text-[8px] text-[#638C7D]">Verified</span>
                </div>

                {/* Destination Name */}
                <h3 className="font-script text-3xl italic text-[#344E41] mb-6">
                  {name}
                </h3>

                {/* Details with Gold Icons */}
                <div className="flex-1 space-y-4 pr-12">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium text-foreground">{data.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Coins className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Investment</p>
                      <p className="text-sm font-medium text-foreground">From {data.investment}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Best Time</p>
                      <p className="text-sm font-medium text-foreground">{data.bestTime}</p>
                    </div>
                  </div>
                </div>

                {/* Enquire Button */}
                <MagneticButton
                  className="mt-4 w-full py-3 bg-[#638C7D] hover:bg-[#4A7066] text-white rounded-full text-xs font-bold tracking-widest transition-colors"
                  onClick={() => onEnquire()}
                >
                  ENQUIRE NOW
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Gateway Card */
          <button
            onClick={onClick}
            className="w-full h-full card-destination flex flex-col items-center justify-center p-8 bg-gradient-to-br from-secondary via-accent to-secondary group"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xl font-medium text-foreground text-center">
              {gatewayText}
            </p>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              View all destinations
            </p>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PostcardCard;
