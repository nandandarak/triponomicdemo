import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Coins, Sun, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

const PostcardCard = ({ name, image, isGateway = false, gatewayText, onClick, onEnquire }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  // This ensures the pattern is isolated ONLY to the back of the card
  const dottedStyle = {
    backgroundColor: "#FDFCF9",
    backgroundImage: "radial-gradient(circle, #D4AF37 0.6px, transparent 0.6px)",
    backgroundSize: "24px 24px",
  };

  if (isGateway) {
    return (
      <div className="w-full aspect-[3/4] relative">
        <button 
          onClick={onClick} 
          className="w-full h-full rounded-[2.5rem] border-2 border-dashed border-[#638C7D]/30 flex flex-col items-center justify-center bg-[#f4f1ea] p-8 group transition-all hover:border-[#638C7D]"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 group-hover:bg-[#638C7D] transition-colors shadow-sm">
            <ArrowRight className="text-[#638C7D] group-hover:text-white transition-colors" />
          </div>
          <p className="font-script text-2xl italic text-[#344E41]">{gatewayText}</p>
        </button>
      </div>
    );
  }

  return (
    <div 
      className="w-full aspect-[3/4] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          /* FRONT SIDE - The Image */
          <motion.div
            key="front"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden shadow-lg z-10"
          >
            <img src={image} alt={name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <h3 className="absolute bottom-8 left-8 text-3xl font-script italic text-white">{name}</h3>
          </motion.div>
        ) : (
          /* BACK SIDE - The Dots (Only exists when hovered) */
          <motion.div
            key="back"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 w-full h-full rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl z-20"
            style={dottedStyle}
          >
            <div className="text-left">
              <h3 className="font-script text-4xl italic text-[#344E41] border-b border-[#D4AF37]/20 pb-3 mb-6">
                {name}
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-medium text-[#344E41]">5-7 Days</span>
                </div>
                <div className="flex items-center gap-4">
                  <Coins className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-medium text-[#344E41]">From ₹45,000</span>
                </div>
              </div>
            </div>

            <MagneticButton 
              className="w-full py-4 bg-[#638C7D] text-white rounded-2xl text-[10px] font-bold tracking-widest shadow-md"
              onClick={(e: any) => {
                e.stopPropagation();
                onEnquire();
              }}
            >
              ENQUIRE NOW
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostcardCard;
