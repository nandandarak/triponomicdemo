import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import TripEnquiryForm from "./TripEnquiryForm";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
}

const EnquiryModal = ({ isOpen, onClose, destination }: EnquiryModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 40 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl bg-[#FDFCF9] rounded-[28px] shadow-2xl overflow-hidden flex flex-col">

              {/* HEADER */}
              <div className="bg-gradient-to-r from-[#638C7D] to-[#4A7066] px-8 py-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/70 font-medium mb-1">
                    Bespoke Journey Request
                  </p>
                  <h2 className="font-script text-2xl md:text-3xl text-white italic">
                    Plan Your {destination} Adventure
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* TRUST STRIP */}
              <div className="bg-[#FDFCF9] border-b border-[#D4AF37]/20 px-8 py-4">
                <p className="text-sm text-[#638C7D] font-medium">
                  Triponomic Verified · Luxury Travel Partner
                </p>
              </div>

              {/* FORM */}
              <div className="p-8 overflow-y-auto">
                <TripEnquiryForm
                  destination={destination}
                  onSuccess={onClose}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
