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
  // Domestic
  "Leh Ladakh": { duration: "6–8 Days", investment: "₹35,000*", bestTime: "Jun – Sep" },
  "Spiti": { duration: "6–8 Days", investment: "₹25,000*", bestTime: "Jun – Sep" },
  Kashmir: { duration: "5–7 Days", investment: "₹25,000*", bestTime: "Mar – Oct" },
  Meghalaya: { duration: "5–7 Days", investment: "₹30,000*", bestTime: "Oct – May" },
  Sikkim: { duration: "5–7 Days", investment: "₹25,000*", bestTime: "Mar – May, Oct – Dec" },
  "Arunachal Pradesh": { duration: "6–8 Days", investment: "₹30,000*", bestTime: "Oct – Apr" },
  Himachal: { duration: "5–7 Days", investment: "₹17,000*", bestTime: "Mar – Jun, Sep – Dec" },
  Uttarakhand: { duration: "5–7 Days", investment: "₹20,000*", bestTime: "Mar – Jun, Sep – Nov" },
  Kerala: { duration: "4–6 Days", investment: "₹30,000*", bestTime: "Sep – Mar" },
  Goa: { duration: "4–5 Days", investment: "₹20,000*", bestTime: "Nov – Feb" },
  Rajasthan: { duration: "5–7 Days", investment: "₹25,000*", bestTime: "Oct – Mar" },
  Andaman: { duration: "5–7 Days", investment: "₹35,000*", bestTime: "Oct – May" },
  Mumbai: { duration: "2-3 Days", investment: "₹15,000*", bestTime: "Oct - Mar" },
  Pune: { duration: "2-3 Days", investment: "₹12,000*", bestTime: "Oct - Feb" },

  // International 
  Vietnam: { duration: "5–7 Days", investment: "₹80,000*", bestTime: "Nov – Apr" },
  Thailand: { duration: "5–7 Days", investment: "₹70,000*", bestTime: "Nov – Apr" },
  "Sri Lanka": { duration: "5–7 Days", investment: "₹60,000*", bestTime: "Dec – Apr" },
  Malaysia: { duration: "5–7 Days", investment: "₹70,000*", bestTime: "Mar – Oct" },
  Kazakhstan: { duration: "6–8 Days", investment: "₹75,000*", bestTime: "May – Sep" },
  Philippines: { duration: "6–8 Days", investment: "₹1,20,000*", bestTime: "Dec – May" },
  Bali: { duration: "5–7 Days", investment: "₹80,000*", bestTime: "Apr – Oct" },
  Egypt: { duration: "6–8 Days", investment: "₹90,000*", bestTime: "Oct – Apr" },
  Turkey: { duration: "7–10 Days", investment: "₹1,50,000*", bestTime: "Apr – May, Sep – Nov" },
  Kenya: { duration: "6–8 Days", investment: "₹1,50,000*", bestTime: "Jul – Oct" },
  "South Africa": { duration: "8–12 Days", investment: "₹1,70,000*", bestTime: "May – Oct" },
  Mauritius: { duration: "6–8 Days", investment: "₹1,30,000*", bestTime: "May – Dec" },
  "South Korea": { duration: "6–8 Days", investment: "₹1,50,000*", bestTime: "Mar – May, Sep – Nov" },
  Japan: { duration: "7–10 Days", investment: "₹2,00,000*", bestTime: "Mar – May, Sep – Nov" },
  Maldives: { duration: "4–6 Days", investment: "₹1,70,000*", bestTime: "Nov – Apr" },
  France: { duration: "7–10 Days", investment: "₹2,50,000*", bestTime: "Apr – Jun, Sep – Nov" },
  Spain: { duration: "7–10 Days", investment: "₹2,50,000*", bestTime: "Apr – Jun, Sep – Oct" },
  Switzerland: { duration: "7–10 Days", investment: "₹2,50,000*", bestTime: "Jun – Aug, Dec – Mar" },
  "New Zealand": { duration: "10–14 Days", investment: "₹3,50,000*", bestTime: "Dec – Feb" },
  Australia: { duration: "10–14 Days", investment: "₹2,90,000*", bestTime: "Sep – Nov, Mar – May" },
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
      duration: "5–7 Days",
      investment: "₹45,000",
      bestTime: "Oct – Mar",
    };

  return (
    <div className="w-full perspective-1000">
      {!isGateway ? (
        <div
          className="relative w-full aspect-[3/4] cursor-pointer"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* FRONT */}
            <div
              className="absolute inset-0 card-destination overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-2xl font-medium text-white">{name}</h3>
              </div>
            </div>

            {/* BACK (SCROLLABLE FOR MOBILE) */}
            <div
              className="absolute inset-0 card-destination flex flex-col"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                backgroundColor: "#FDFCF9",
                backgroundImage:
                  "radial-gradient(circle, #D4AF37 0.5px, transparent 0.5px)",
                backgroundSize: "20px 20px",
              }}
            >
              <div className="flex-1 overflow-y-auto p-6">
                <h3 className="font-script text-3xl italic text-[#344E41] mb-6">
                  {name}
                </h3>

                <div className="space-y-4">
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
                      <p className="text-[10px] uppercase">Ideal Budget</p>
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
              </div>

              <div className="p-4">
                <MagneticButton
                  className="w-full py-3 bg-[#638C7D] hover:bg-[#4A7066] text-white rounded-full text-xs font-bold tracking-widest"
                  onClick={onEnquire}
                >
                  ENQUIRE NOW
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        /* GATEWAY CARD */
        <button
          onClick={onClick}
          className="w-full aspect-[3/4] card-destination flex flex-col items-center justify-center p-8 bg-gradient-to-br from-secondary via-accent to-secondary"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>
          <p className="text-xl font-medium text-center">{gatewayText}</p>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            View all destinations
          </p>
        </button>
      )}
    </div>
  );
};

export default PostcardCard;
