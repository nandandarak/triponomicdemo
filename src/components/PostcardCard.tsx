import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  Mumbai: { duration: "2-3 Days", investment: "15,000", bestTime: "Oct - Mar" },
  Pune: { duration: "2-3 Days", investment: "12,000", bestTime: "Oct - Feb" },
  Goa: { duration: "4-5 Days", investment: "25,000", bestTime: "Nov - Feb" },
  Japan: { duration: "7-10 Days", investment: "1,50,000", bestTime: "Mar - May" },
  Bali: { duration: "5-7 Days", investment: "75,000", bestTime: "Apr - Oct" },
  "South Korea": { duration: "6-8 Days", investment: "1,20,000", bestTime: "Mar - May" },
};

const PostcardCard = ({ name, image, isGateway = false, gatewayText, onClick, onEnquire, index, destinationData }: PostcardCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  // These only apply when NOT flipped to avoid math conflicts
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const data = destinationData || defaultDestinationData[name] || {
    duration: "5-7 Days", investment: "45,000", bestTime: "Oct - Mar",
  };

  if (isGateway) {
    return (
      <div className="w-full aspect-[3/4] perspective-1000">
        <motion.button
          whileHover={{ y: -8 }}
          onClick={onClick}
          className="w-full h-full rounded-[2.5rem] flex flex-col items-center justify-center p-8 bg-[#f4f1ea] border-2 border-dashed border-[#638C7D]/30 group"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 group-hover:bg-[#638C7D] transition-colors">
            <ArrowRight className="w-6 h-6 text-[#638C7D] group-hover:text-white transition-colors" />
          </div>
          <p className="text-2xl font-script italic text-[#344E41]">{gatewayText}</p>
        </motion.button>
      </div>
    );
  }

  return (
    <div 
      className="w-full aspect-[3/4] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ cursor: 'pointer' }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden shadow-xl bg-white"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(50px)", // Increased Z-gap
            zIndex: isFlipped ? 1 : 2,
            visibility: isFlipped ? 'hidden' : 'visible' // Force hide logic
          }}
        >
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-10 w-full text-left">
            <h3 className="text-3xl font-script italic text-white drop-shadow-md">{name}</h3>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full rounded-[2.5rem] shadow-2xl p-10 flex flex-col justify-between border border-[#D4AF37]/10"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(50px)", // Match Z-gap
            backgroundColor: "#FDFCF9",
            backgroundImage: "radial-gradient(circle, #D4AF37 0.7px, transparent 0.7px)",
            backgroundSize: "28px 28px",
            zIndex: isFlipped ? 2 : 1,
            pointerEvents: isFlipped ? 'auto' : 'none' // Prevent accidental clicks through the card
          }}
        >
          <div className="text-left">
            <h3 className="font-script text-4xl italic text-[#344E41] mb-8 border-b border-[#D4AF37]/30 pb-3">
              {name}
            </h3>
            <div className="space-y-6">
              {[
                { Icon: Clock, label: "Duration", val: data.duration },
                { Icon: Coins, label: "Investment", val: `₹${data.investment}` },
                { Icon: Sun, label: "Best Time", val: data.bestTime },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="w-9 h-9 rounded-full bg-[#638C7D]/10 flex items-center justify-center">
                    <item.Icon className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#638C7D] font-bold leading-none mb-1.5">{item.label}</p>
                    <p className="text-[15px] font-semibold text-[#344E41]">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <MagneticButton
            className="w-full py-4.5 bg-[#638C7D] text-white rounded-2xl text-[10px] font-bold tracking-[0.25em] shadow-lg shadow-[#638C7D]/25 hover:bg-[#344E41] transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onEnquire();
            }}
          >
            ENQUIRE NOW
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  );
};

export default PostcardCard;
