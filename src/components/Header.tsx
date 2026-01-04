import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import GoogleFormModal from "./GoogleFormModal";

const domesticDestinations = [
  "Mumbai", "Pune", "Goa", "Leh-Ladakh", "Jaipur",
  "Kerala", "Manali", "Rishikesh", "Udaipur", "Spiti Valley"
];

const internationalDestinations = [
  "Japan", "Bali", "South Korea", "Thailand", "Vietnam",
  "Iceland", "Turkey", "Singapore", "France", "Switzerland"
];

interface DropdownProps {
  title: string;
  destinations: string[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (destination: string) => void;
  isScrolled: boolean;
}

const NavigationDropdown = ({ title, destinations, isOpen, onToggle, onClose, onSelect, isScrolled }: DropdownProps) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`group relative flex items-center gap-1.5 text-sm font-bold tracking-widest transition-colors duration-500 ${
          isOpen || isScrolled ? "text-[#344E41]" : "text-white"
        }`}
      >
        {title.toUpperCase()}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
        <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 ${isOpen ? "w-full" : "w-0 group-hover:w-full"}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-6 z-50"
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            >
              <div className="bg-[#FDFCF9] rounded-[2rem] p-8 min-w-[360px] shadow-2xl border border-[#D4AF37]/10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#638C7D] mb-6 font-bold text-center italic">
                  Select Your Journey
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {destinations.map((dest, i) => (
                    <motion.button
                      key={dest}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => { onSelect(dest); onClose(); }}
                      className="px-4 py-3 rounded-xl bg-white border border-transparent hover:border-[#D4AF37]/20 hover:shadow-sm text-xs font-semibold text-[#344E41] transition-all"
                    >
                      {dest}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-700">
      <div className={`mx-auto transition-all duration-700 px-6 ${isScrolled ? "max-w-5xl mt-4" : "max-w-7xl mt-0"}`}>
        <div 
          className={`relative transition-all duration-700 px-10 flex items-center justify-between ${
            isScrolled 
            ? "bg-white/80 backdrop-blur-xl rounded-full py-3 shadow-lg border border-white/20" 
            : "bg-transparent py-8"
          }`}
        >
          {/* Logo */}
          <Link 
            to="/" 
            className={`font-script text-3xl italic transition-colors duration-500 ${isScrolled ? "text-[#344E41]" : "text-white"}`}
          >
            Triponomic
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <NavigationDropdown
              title="Domestic"
              destinations={domesticDestinations}
              isOpen={openDropdown === "domestic"}
              onToggle={() => setOpenDropdown(openDropdown === "domestic" ? null : "domestic")}
              onClose={() => setOpenDropdown(null)}
              onSelect={setSelectedDestination}
              isScrolled={isScrolled}
            />

            <NavigationDropdown
              title="International"
              destinations={internationalDestinations}
              isOpen={openDropdown === "international"}
              onToggle={() => setOpenDropdown(openDropdown === "international" ? null : "international")}
              onClose={() => setOpenDropdown(null)}
              onSelect={setSelectedDestination}
              isScrolled={isScrolled}
            />

            <Link to="/enquire">
              <MagneticButton className={`px-8 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all duration-500 ${
                isScrolled 
                ? "bg-[#344E41] text-white hover:bg-[#638C7D]" 
                : "bg-white text-[#344E41] hover:bg-[#FDFCF9]"
              }`}>
                CONTACT US
              </MagneticButton>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 rounded-full transition-colors ${isScrolled ? "text-[#344E41]" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-[-1] bg-[#FDFCF9] flex flex-col p-10 pt-32"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
               <div className="space-y-10 overflow-y-auto">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#638C7D] mb-6 font-bold">Domestic</p>
                  <div className="flex flex-wrap gap-2">
                    {domesticDestinations.map((d) => (
                      <button key={d} onClick={() => { setMobileMenuOpen(false); setSelectedDestination(d); }}
                        className="px-4 py-2 bg-white rounded-xl text-xs font-semibold border border-[#344E41]/5">
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <Link to="/enquire" onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-5 bg-[#344E41] text-white rounded-2xl text-xs font-bold text-center tracking-[0.2em]">
                  CONTACT US
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedDestination && (
        <GoogleFormModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </header>
  );
};

export default Header;
