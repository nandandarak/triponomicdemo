import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Clock, Coins, Sun, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

// ... (keep the interfaces and defaultDestinationData same as before)

const PostcardCard = ({ name, image, isGateway = false, gatewayText, onClick, onEnquire, index, destinationData }: PostcardCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const data = destinationData || defaultDestinationData[name] || {
    duration: "5-7 Days", investment: "₹45,000", bestTime: "Oct - Mar",
  };

  if (isGateway) {
    return (
      <div className="w-full aspect-[3/4]">
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
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
      >
        {/* FRONT SIDE - Forced to be on top and solid */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] overflow-hidden shadow-xl bg-white"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            zIndex: isFlipped ? 1 : 2, // Drops priority when flipped
            transform: "translateZ(1px)"
          }}
        >
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-10 w-full text-left">
            <h3 className="text-3xl font-script italic text-white">{name}</h3>
          </div>
        </div>

        {/* BACK SIDE - Forced to be hidden until needed */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] shadow-2xl p-10 flex flex-col justify-between border border-[#D4AF37]/10 bg-[#FDFCF9]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
            backgroundImage: "radial-gradient(circle, #D4AF37 0.7px, transparent 0.7px)",
            backgroundSize: "28px 28px",
            opacity: isFlipped ? 1 : 0, // <--- THIS PREVENTS GHOSTING ON FRONT
            zIndex: isFlipped ? 2 : 1,
          }}
        >
          <div className="text-left">
            <h3 className="font-script text-4xl italic text-[#344E41] mb-8 border-b border-[#D4AF37]/30 pb-3">
              {name}
            </h3>
            <div className="space-y-6">
              {[
                { Icon: Clock, label: "Duration", val: data.duration },
                { Icon: Coins, label: "Ideal Budget", val: data.investment },
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
            className="w-full py-4 bg-[#638C7D] text-white rounded-2xl text-[10px] font-bold tracking-[0.25em]"
            onClick={(e) => { e.stopPropagation(); onEnquire(); }}
          >
            ENQUIRE NOW
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  );
};

export default PostcardCard;
