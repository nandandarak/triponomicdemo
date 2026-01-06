import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Coins, Sun, ArrowRight } from "lucide-react";
import MagneticButton from "../MagneticButton";

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
  "South Korea": {
    duration: "6-8 Days",
    investment: "₹1,20,000",
    bestTime: "Mar - May",
  },
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

  const data =
    destinationData ||
    defaultDestinationData[name] || {
      duration: "5-7 Days",
      investment: "₹45,000",
      bestTime: "Oct - Mar",
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      {!isGateway ? (
        <div
          className="relative w-full aspect-[3/4] card-destination cursor-pointer"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          {!isFlipped ? (
            <div className="absolute inset-0 overflow-hidden">
              <img src={image} alt={name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-2xl text-white">{name}</h3>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-[#FDFCF9] p-6 flex flex-col">
              <h3 className="font-script text-3xl italic mb-6">{name}</h3>

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <div>
                    <p className="text-xs uppercase">Duration</p>
                    <p>{data.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Coins className="w-5 h-5" />
                  <div>
                    <p className="text-xs uppercase">Ideal Budget</p>
                    <p>From {data.investment}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5" />
                  <div>
                    <p className="text-xs uppercase">Best Time</p>
                    <p>{data.bestTime}</p>
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
          )}
        </div>
      ) : (
        <button
          onClick={onClick}
          className="w-full aspect-[3/4] card-destination flex flex-col items-center justify-center p-8 bg-gradient-to-br from-secondary via-accent to-secondary"
        >
          <ArrowRight className="w-6 h-6 mb-4" />
          <p className="text-xl font-medium text-center">{gatewayText}</p>
          <p className="text-sm mt-2">View all destinations</p>
        </button>
      )}
    </motion.div>
  );
};

export default PostcardCard;

