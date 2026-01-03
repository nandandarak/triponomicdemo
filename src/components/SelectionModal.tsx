import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  destinations: string[];
  onSelect: (destination: string) => void;
}

const SelectionModal = ({
  isOpen,
  onClose,
  title,
  destinations,
  onSelect,
}: SelectionModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 max-w-2xl w-full z-50"
          >
            <div className="bg-card rounded-card p-8 shadow-hover">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-1">
                    Explore
                  </p>
                  <h2 className="text-2xl font-medium text-foreground">
                    {title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Destination Chips */}
              <div className="flex flex-wrap gap-3">
                {destinations.map((destination, index) => (
                  <motion.button
                    key={destination}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onSelect(destination);
                      onClose();
                    }}
                    className="chip-destination px-6 py-3 bg-secondary/50 hover:bg-primary hover:text-primary-foreground text-foreground/80 font-medium transition-all"
                  >
                    {destination}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SelectionModal;
