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
  destinationData,
}: PostcardCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsFlipped(false);
  };

  const data =
    destinationData ||
    defaultDestinationData[name] || {
      duration: "5-7 Days",
      investment: "₹45,000",
      bestTime: "Oct - Mar",
    };

  return (
    /* IMPORTANT: z-0 locks stacking order */
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative z-0 w-full perspective-1000"
    >
      {!isGateway ? (
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsFlipped(true)}
          onClick={() => setIsFlipped((prev) => !prev)}
          style={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 180 : rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative w-full aspect-[3/4] cursor-pointer will-change-transform"
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <motion.img
              src={image}
              alt={name}
              animate={{ scale: isFlipped ? 1.15 : 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-60" />

            <div className="absolute bottom-0 p-8 w-full">
              <h3 className="text-3xl font-script italic text-white drop-shadow-lg">
                {name}
              </h3>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-[2rem] shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              backgroundColor: "#FDFCF9",
              backgroundImage:
                "radial-gradient(circle, #D4AF37 0.4px, transparent 0.4px)",
              backgroundSize: "24px 24px",
            }}
          >
            <div className="w-full h-full p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-script text-4xl italic text-[#344E41] mb-8 border-b border-[#D4AF37]/20 pb-2">
                  {name}
                </h3>

                <div className="space-y-6">
                  {[
                    { Icon: Clock, label: "Duration", val: data.duration },
                    {
                      Icon: Coins,
                      label: "Ideal Budget",
                      val: `From ${data.investment}`,
                    },
                    { Icon: Sun, label: "Best Time", val: data.bestTime },
                  ].map(({ Icon, label, val }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isFlipped ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="p-2 rounded-full bg-[#638C7D]/10">
                        <Icon className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-tighter text-[#344E41]/60 font-bold">
                          {label}
                        </p>
                        <p className="text-sm font-medium text-[#344E41]">
                          {val}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <MagneticButton
                className="w-full py-4 bg-[#638C7D] hover:bg-[#344E41] text-white rounded-xl text-xs font-bold tracking-[0.2em] transition-colors shadow-lg shadow-[#638C7D]/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onEnquire();
                }}
              >
                ENQUIRE NOW
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      ) : (
        /* GATEWAY CARD */
        <motion.button
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="w-full aspect-[3/4] rounded-[2rem] flex flex-col items-center justify-center p-8 bg-[#f4f1ea] border-2 border-dashed border-[#638C7D]/30 group"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-[#638C7D] transition-colors"
          >
            <ArrowRight className="w-8 h-8 text-[#638C7D] group-hover:text-white transition-colors" />
          </motion.div>

          <p className="text-2xl font-script italic text-[#344E41]">
            {gatewayText}
          </p>

          <div className="h-[1px] w-12 bg-[#D4AF37] my-4" />

          <p className="text-xs uppercase tracking-widest text-[#344E41]/50 font-bold">
            View all destinations
          </p>
        </motion.button>
      )}
    </motion.div>
  );
};

export default PostcardCard;
