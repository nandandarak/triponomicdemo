import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Plane,
  ShieldCheck,
  Sparkles,
  Stamp,
  Car,
  Key,
  Ship,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import GoogleFormModal from "./GoogleFormModal";
import logo from "@/assets/logo.png";

/* ---------------- DESTINATIONS ---------------- */

const domesticDestinations = [
  "Mumbai",
  "Pune",
  "Goa",
  "Leh-Ladakh",
  "Jaipur",
  "Kerala",
  "Manali",
  "Rishikesh",
  "Udaipur",
  "Spiti Valley",
];

const internationalDestinations = [
  "Japan",
  "Bali",
  "South Korea",
  "Thailand",
  "Vietnam",
  "Iceland",
  "Turkey",
  "Singapore",
  "France",
  "Switzerland",
];

/* ---------------- SERVICES ---------------- */

const servicesList = [
  { label: "Flight & Hotel Bookings", icon: Plane },
  { label: "Travel Insurance & International eSIM", icon: ShieldCheck },
  { label: "Customized Experiences (Domestic & International)", icon: Sparkles },
  { label: "Visa Assistance", icon: Stamp },
  { label: "Outstation Cabs & Airport Transfers", icon: Car },
  { label: "Self-Drive Cars (International)", icon: Key },
  { label: "Cruise Holidays", icon: Ship },
];

/* ---------------- DROPDOWN ---------------- */

interface DropdownItem {
  label: string;
  icon?: any;
}

interface DropdownProps {
  title: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (item: string) => void;
}

const NavigationDropdown = ({
  title,
  items,
  isOpen,
  onToggle,
  onClose,
  onSelect,
}: DropdownProps) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="nav-link flex items-center gap-1.5 text-foreground/80 hover:text-foreground text-sm font-medium font-secondary"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
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
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="bg-[#F8F7F2] rounded-2xl p-6 min-w-[340px] shadow-xl">
                <p className="text-[10px] uppercase tracking-widest text-[#638C7D] mb-4 font-bold font-secondary">
                  {title}
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {items.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => {
                        onSelect(label);
                        onClose();
                      }}
                      className="flex items-start gap-3 px-4 py-2 rounded-xl bg-white/60 hover:bg-[#638C7D] hover:text-white text-xs font-medium transition text-left leading-snug font-secondary"
                    >
                      {Icon && (
                        <Icon className="w-4 h-4 opacity-80 mt-0.5 shrink-0" />
                      )}
                      <span>{label}</span>
                    </button>
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

/* ---------------- HEADER ---------------- */

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show text after scrolling past 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = (key: string) =>
    setOpenDropdown(openDropdown === key ? null : key);

  const closeAll = () => setOpenDropdown(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#F8F7F2]/90 backdrop-blur-lg rounded-full px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Triponomic Logo" 
              className="h-10 w-auto"
            />
            <AnimatePresence>
              {isScrolled && (
                <motion.span
                  initial={{ opacity: 0, x: -20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: "auto" }}
                  exit={{ opacity: 0, x: -20, width: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="font-script text-2xl italic text-[#344E41] overflow-hidden whitespace-nowrap"
                >
                  Triponomic
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavigationDropdown
              title="Domestic"
              items={domesticDestinations.map((d) => ({ label: d }))}
              isOpen={openDropdown === "domestic"}
              onToggle={() => toggle("domestic")}
              onClose={closeAll}
              onSelect={setSelectedDestination}
            />

            <NavigationDropdown
              title="International"
              items={internationalDestinations.map((d) => ({ label: d }))}
              isOpen={openDropdown === "international"}
              onToggle={() => toggle("international")}
              onClose={closeAll}
              onSelect={setSelectedDestination}
            />

            <NavigationDropdown
              title="Services"
              items={servicesList}
              isOpen={openDropdown === "services"}
              onToggle={() => toggle("services")}
              onClose={closeAll}
              onSelect={setSelectedDestination}
            />

            <Link to="/enquire">
              <MagneticButton className="px-6 py-2 bg-[#638C7D] text-white rounded-full text-xs font-bold tracking-widest font-secondary">
                CONTACT US
              </MagneticButton>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 bg-[#F8F7F2] rounded-2xl p-6 shadow-xl max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Logo at top of mobile menu */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#344E41]/10">
                <img 
                  src={logo} 
                  alt="Triponomic Logo" 
                  className="h-10 w-auto"
                />
                <span className="font-script text-2xl italic text-[#344E41]">
                  Triponomic
                </span>
              </div>

              {/* Domestic */}
              <p className="text-xs font-bold mb-2 font-secondary">Domestic</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {domesticDestinations.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSelectedDestination(d);
                    }}
                    className="px-4 py-2 bg-white/70 rounded-full text-xs font-secondary"
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* International */}
              <p className="text-xs font-bold mb-2 font-secondary">International</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {internationalDestinations.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSelectedDestination(d);
                    }}
                    className="px-4 py-2 bg-white/70 rounded-full text-xs font-secondary"
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Services */}
              <p className="text-xs font-bold mb-2 font-secondary">Services</p>
              <div className="flex flex-col gap-2 mb-4">
                {servicesList.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSelectedDestination(label);
                    }}
                    className="flex items-start gap-3 px-4 py-3 bg-white/70 rounded-xl text-xs leading-snug text-left font-secondary"
                  >
                    <Icon className="w-4 h-4 text-[#638C7D] mt-0.5 shrink-0" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <Link
                to="/enquire"
                className="block w-full py-3 bg-[#638C7D] text-white rounded-full text-xs font-bold text-center font-secondary"
              >
                CONTACT US
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* GOOGLE FORM MODAL */}
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
