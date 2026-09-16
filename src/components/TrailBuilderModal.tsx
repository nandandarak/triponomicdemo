import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveTrailBuilder } from "./InteractiveTrailBuilder";

interface TrailBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVibe?: "Couple" | "Family" | "Friends" | "Solo";
  initialDestination?: string;
  initialStep?: 1 | 2 | 3;
}

export const TrailBuilderModal: React.FC<TrailBuilderModalProps> = ({
  isOpen,
  onClose,
  initialVibe,
  initialDestination,
  initialStep = 1,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop blur & dark overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl my-auto max-h-[92vh] overflow-y-auto rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.5)] border border-white/20"
        >
          <InteractiveTrailBuilder
            initialVibe={initialVibe}
            initialDestination={initialDestination}
            initialStep={initialStep}
            onClose={onClose}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TrailBuilderModal;
