import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Clock, Coins, Sun } from "lucide-react";
import MagneticButton from "./MagneticButton";

const PostcardCard = ({ name, image, isGateway, gatewayText, onEnquire, index, onClick }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Tilt transforms (only active when NOT flipped)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsFlipped(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="w-full aspect-[3/4] perspective-1000"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsFlipped(true)}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="relative w-full h-full cursor-pointer preserve-3d"
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[2rem] overflow-hidden shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-8">
            <h3 className="text-3xl font-script italic text-white drop-shadow-md">{name}</h3>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-[2rem] shadow-2xl p-8 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "#FDFCF9",
            backgroundImage: "radial-gradient(circle, #D4AF37 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        >
          <div>
            <h3 className="font-script text-4xl italic text-[#344E41] mb-6 border-b border-[#D4AF37]/20 pb-2">
              {name}
            </h3>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-sm font-medium text-[#344E41]">4-5 Days</p>
              </div>
              <div className="flex items-center gap-3">
                <Coins className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-sm font-medium text-[#344E41]">From ₹25,000</p>
              </div>
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-sm font-medium text-[#344E41]">Best: Oct - Mar</p>
              </div>
            </div>
          </div>

          <MagneticButton
            className="w-full py-4 bg-[#638C7D] text-white rounded-xl text-xs font-bold tracking-[0.2em] shadow-lg shadow-[#638C7D]/20"
            onClick={(e: any) => {
              e.stopPropagation();
              onEnquire();
            }}
          >
            ENQUIRE NOW
          </MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PostcardCard;
