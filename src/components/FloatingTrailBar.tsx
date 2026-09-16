import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, SlidersHorizontal, ArrowRight, X } from "lucide-react";

interface FloatingTrailBarProps {
  onOpenBuilder?: () => void;
  destinationLabel?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  isVisible?: boolean;
}

export const FloatingTrailBar: React.FC<FloatingTrailBarProps> = ({
  onOpenBuilder,
  destinationLabel = "Discover India & Beyond",
  title = "Craft Your Bespoke Journey",
  subtitle = "Direct partner tariffs • Day-by-day routing",
  buttonText = "CRAFT MY JOURNEY",
  isVisible = true,
}) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  const handleClick = () => {
    if (onOpenBuilder) {
      onOpenBuilder();
    } else {
      navigate("/build-trail");
    }
  };

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-24 z-40 max-w-xl">
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center justify-between gap-3 p-2.5 sm:p-3 bg-[#161C2B]/95 text-white rounded-full border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#404762]/60 text-[#BAC7F5] flex items-center justify-center shrink-0 border border-white/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div className="hidden sm:block min-w-0">
            <p className="text-xs font-bold text-white tracking-wide truncate">
              {title}
            </p>
            <p className="text-[10px] text-[#BAC7F5] font-medium truncate">
              {subtitle}
            </p>
          </div>
          <div className="sm:hidden min-w-0">
            <p className="text-xs font-bold text-white truncate">{title}</p>
          </div>
        </div>

        <button
          onClick={handleClick}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#404762] to-[#4E5779] hover:brightness-110 text-white text-xs font-extrabold tracking-wider uppercase transition-all shadow-md hover:scale-105 active:scale-95 shrink-0"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
};

export default FloatingTrailBar;
