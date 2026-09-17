import { useState, useRef } from "react";
import { Clock, Coins, Sun, ArrowRight } from "lucide-react";

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
  onClick?: () => void;
  onEnquire: () => void;
  index: number;
  destinationData?: DestinationData;
  isFlipped?: boolean;
  onFlipToggle?: (flipped: boolean) => void;
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
  isFlipped: controlledFlipped,
  onFlipToggle,
}: PostcardCardProps) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isTouchRef = useRef(false);
  const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;

  const data =
    destinationData ||
    defaultDestinationData[name] || {
      duration: "5–7 Days",
      investment: "₹45,000",
      bestTime: "Oct – Mar",
    };

  const handleTouchStart = () => {
    isTouchRef.current = true;
  };

  const handleMouseEnter = () => {
    if (isTouchRef.current) return;
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;

    setInternalFlipped(true);
    onFlipToggle?.(true);
  };

  const handleMouseLeave = () => {
    if (isTouchRef.current) return;
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;

    setInternalFlipped(false);
    onFlipToggle?.(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const next = !isFlipped;
    setInternalFlipped(next);
    onFlipToggle?.(next);

    setTimeout(() => {
      isTouchRef.current = false;
    }, 400);
  };

  return (
    <div className="w-full [perspective:1000px]">
      {!isGateway ? (
        <div
          className="relative w-full aspect-[3/4] cursor-pointer group select-none"
          onTouchStart={handleTouchStart}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
        >
          <div
            className={`w-full h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* FRONT FACE */}
            <div
              className="absolute inset-0 overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.1)] group-hover:shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition-shadow duration-300 border border-white/20 rounded-2xl bg-slate-900 [backface-visibility:hidden]"
            >
              <img
                src={image}
                alt={name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-black/25 to-transparent" />
              
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 shadow-sm">
                  Explore
                </span>
              </div>

              <div className="absolute bottom-0 p-5 w-full">
                <p className="text-xs font-semibold text-emerald-400 mb-1">
                  Featured Destination
                </p>
                <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-sm">
                  {name}
                </h3>
              </div>
            </div>

            {/* BACK FACE */}
            <div
              className="absolute inset-0 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-emerald-100 rounded-2xl bg-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
            >
              <div className="flex-1 overflow-y-auto p-5">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {name}
                    </h3>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block mt-1">
                      Curated Itinerary
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Duration</p>
                      <p className="text-sm font-semibold text-gray-800">{data.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Ideal Budget</p>
                      <p className="text-sm font-semibold text-emerald-700">From {data.investment}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Best Season</p>
                      <p className="text-sm font-semibold text-gray-800">{data.bestTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50/90 border-t border-gray-100 rounded-b-2xl">
                <button
                  type="button"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-full text-xs font-bold tracking-widest shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnquire();
                  }}
                >
                  ENQUIRE NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* GATEWAY CARD */
        <button
          onClick={onClick}
          className="w-full aspect-[3/4] rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 border border-emerald-200 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-600/10 flex items-center justify-center mb-6 text-emerald-700">
            <ArrowRight className="w-6 h-6" />
          </div>
          <p className="text-xl font-bold text-gray-900 text-center">{gatewayText}</p>
          <p className="text-xs text-gray-600 mt-2 text-center font-medium">
            View all destinations
          </p>
        </button>
      )}
    </div>
  );
};

export default PostcardCard;
