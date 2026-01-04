import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
}

const GOOGLE_FORM_BASE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfqfDU_lEAq_Kv2PVFSZa3lk_vvvE4kBG4dRnp0gWt7XLnFvg/viewform";

const EnquiryModal = ({ isOpen, onClose, destination }: EnquiryModalProps) => {
  const formUrl = `${GOOGLE_FORM_BASE_URL}?embedded=true&entry.396208505=${encodeURIComponent(destination)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Glassmorphism Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-4 md:inset-12 lg:inset-20 z-50 flex items-center justify-center"
          >
            <div className="w-full h-full max-w-4xl max-h-[85vh] bg-[#FDFCF9] rounded-[32px] shadow-2xl overflow-hidden flex flex-col">
              {/* Custom Header - Masks Google branding */}
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
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Decorative elements */}
              <div className="relative bg-[#FDFCF9] border-b border-[#D4AF37]/20 px-8 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                    <span className="text-[#D4AF37] text-lg">✈</span>
                  </div>
                  <div>
                    <p className="text-sm text-[#638C7D] font-medium">Triponomic Verified</p>
                    <p className="text-xs text-muted-foreground">Luxury Travel Partner</p>
                  </div>
                </div>
                {/* Postage stamp effect */}
                <div className="absolute top-4 right-8 w-16 h-16 border-2 border-dashed border-[#D4AF37]/50 rounded-lg flex items-center justify-center rotate-6">
                  <span className="text-[#D4AF37] text-2xl">✓</span>
                </div>
              </div>

              {/* Embedded Google Form - hidden branding with negative margin */}
              <div className="flex-1 overflow-hidden bg-[#FDFCF9]">
                <iframe
                  src={formUrl}
                  className="w-full h-full border-0"
                  style={{ marginTop: "-50px", height: "calc(100% + 50px)" }}
                  title="Enquiry Form"
                >
                  Loading...
                </iframe>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
