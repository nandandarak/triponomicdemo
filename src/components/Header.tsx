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

/* ---------------- DROPDOWN ---------------- */

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
        className={`group relative flex items-center gap-1.5 text-sm font-bold tracking-widest transition-colors ${
          isOpen || isScrolled ? "text-[#344E41]" : "text-white"
        }`}
      >
        {title.toUpperCase()}
        <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
        {/* Animated Underline */}
        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]"
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
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
            >
              <div className="bg-[#FDFCF9] rounded-[2rem] p-8 min-w-[380px] shadow-2xl border border-[#D4AF37]/10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#638C7D] mb-6 font-bold text-center">
                  Explore Destinations
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {destinations.map((dest, i) => (
                    <motion.button
                      key={dest}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        onSelect(dest);
                        onClose();
                      }}
                      className="px-4 py-3 rounded-xl bg-white border border-transparent hover:border-[#D4AF37]/20 hover:shadow-md text-xs font-semibold text-[#344E41] transition-all hover:scale-[1.02]"
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

/* ---------------- MAIN HEADER ---------------- */

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = (key: string) => setOpenDropdown(openDropdown === key ? null : key);
  const closeAll = () => setOpenDropdown(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[0.16, 1, 0.3, 1]">
      <div className={`mx-auto transition-all duration-700 ${isScrolled ? "max-w-5xl mt-4" : "max-w-7xl mt-0"}`}>
        <div 
          className={`relative transition-all duration-700 px-8 flex items-center justify-between ${
            isScrolled 
            ? "bg-white/80 backdrop-blur-xl rounded-full py-3 shadow-lg border border-white/20" 
            : "bg-transparent py-8"
          }`}
        >
          {/* Logo */}
          <Link to="/" className={`font-script text-3xl italic transition-colors duration-500 ${isScrolled ? "text-[#344E41]" : "text-white"}`}>
            Triponomic
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <NavigationDropdown
              title="Domestic"
              destinations={domesticDestinations}
              isOpen={openDropdown === "domestic"}
              onToggle={() => toggle("domestic")}
              onClose={closeAll}
              onSelect={setSelectedDestination}
              isScrolled={isScrolled}
            />

            <NavigationDropdown
              title="International"
              destinations={internationalDestinations}
              isOpen={openDropdown === "international"}
              onToggle={() => toggle("international")}
              onClose={closeAll}
              onSelect={setSelectedDestination}
              isScrolled={isScrolled}
            />

            <Link to="/enquire">
              <MagneticButton className={`px-8 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all ${
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
            className={`md:hidden p-2 rounded-full transition-colors ${isScrolled ? "text-[#344E41] bg-[#344E41]/5" : "text-white bg-white/10"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-[-1] bg-[#FDFCF9] flex flex-col p-10 pt-32"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="space-y-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#638C7D] mb-6 font-bold">Domestic</p>
                  <div className="flex flex-wrap gap-3">
                    {domesticDestinations.map((d) => (
                      <button key={d} onClick={() => { setMobileMenuOpen(false); setSelectedDestination(d); }}
                        className="px-4 py-2 bg-white rounded-xl text-xs font-semibold shadow-sm border border-[#344E41]/5">
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#638C7D] mb-6 font-bold">International</p>
                  <div className="flex flex-wrap gap-3">
                    {internationalDestinations.map((d) => (
                      <button key={d} onClick={() => { setMobileMenuOpen(false); setSelectedDestination(d); }}
                        className="px-4 py-2 bg-white rounded-xl text-xs font-semibold shadow-sm border border-[#344E41]/5">
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
