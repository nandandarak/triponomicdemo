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

const defaultDestinationData: Record<string, DestinationData> = {
  Mumbai: { duration: "2-3 Days", investment: "₹15,000", bestTime: "Oct - Mar" },
  Pune: { duration: "2-3 Days", investment: "₹12,000", bestTime: "Oct - Feb" },
  Goa: { duration: "4-5 Days", investment: "₹25,000", bestTime: "Nov - Feb" },
  Japan: { duration: "7-10 Days", investment: "₹1,50,000", bestTime: "Mar - May" },
  Bali: { duration: "5-7 Days", investment: "₹75,000", bestTime: "Apr - Oct" },
  "South Korea": { duration: "6-8 Days", investment: "₹1,20,000", bestTime: "Mar - May" }
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

  const data =
    destinationData ||
    defaultDestinationData[name] || {
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
        {/* Plane Animation */}
        {showPlane && !isGateway && (
          <motion.div
            className="absolute -top-8 -right-8 z-30 pointer-events-none"
            initial={{ x: 100, y: -50, opacity: 0 }}
            animate={{ x: 20, y: 20, opacity: 1, scale: [1, 1.1, 1] }}
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
            {/* Front */}
            <div
              className="absolute inset-0 card-destination bg-card overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-2xl font-medium text-white">{name}</h3>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-card overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
              }}
            >
              <div
                className="w-full h-full p-6 flex flex-col"
                style={{
                  backgroundColor: "#FDFCF9",
                  backgroundImage:
                    "radial-gradient(circle, #D4AF37 0.5px, transparent 0.5px)",
                  backgroundSize: "20px 20px"
                }}
              >
                <h3 className="font-script text-3xl italic text-[#344E41] mb-6">
                  {name}
                </h3>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] uppercase">Duration</p>
                      <p className="text-sm">{data.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Coins className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] uppercase">Investment</p>
                      <p className="text-sm">From {data.investment}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] uppercase">Best Time</p>
                      <p className="text-sm">{data.bestTime}</p>
                    </div>
                  </div>
                </div>

                <MagneticButton
                  className="mt-4 w-full py-3 bg-[#638C7D] text-white rounded-full text-xs font-bold tracking-widest"
                  onClick={onEnquire}
                >
                  ENQUIRE NOW
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        ) : (
          <button
            onClick={onClick}
            className="w-full h-full card-destination flex flex-col items-center justify-center p-8 bg-gradient-to-br from-secondary via-acce
