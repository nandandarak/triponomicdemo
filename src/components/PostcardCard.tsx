import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Clock, Coins, Sun, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

const PostcardCard = ({ name, image, isGateway = false, gatewayText, onClick, onEnquire, index }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  if (isGateway) {
    return (
      <div className="w-full h-full relative">
        <button onClick={onClick} className="w-full h-full rounded-[2rem] border-2 border-dashed border-[#638C7D]/30 flex flex-col items-center justify-center bg-[#f4f1ea]">
          <ArrowRight className="mb-4 text-[#638C7D]" />
          <p className="font-script text-2xl italic">{gatewayText}</p>
        </button>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full relative"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ rotateX: isFlipped ? 0 : rotateX, rotateY: isFlipped ? 180 : rotateY }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden z-20 backface-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <h3 className="absolute bottom-8 left-8 text-3xl font-script italic text-white">{name}</h3>
        </div>

        {/* BACK - THE DOTS */}
        <div
          className="absolute inset-0 w-full h-full rounded-[2rem] p-8 flex flex-col justify-between z-10"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "#FDFCF9",
            backgroundImage: "radial-gradient(circle, #D4AF37 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
            /* THIS IS THE CRITICAL LINE */
            display: isFlipped ? "flex" : "none" 
          }}
        >
          <h3 className="font-script text-3xl italic text-[#344E41]">{name}</h3>
          <MagneticButton className="w-full py-3 bg-[#638C7D] text-white rounded-xl text-xs font-bold" onClick={onEnquire}>
            ENQUIRE NOW
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  );
};

export default PostcardCard;
