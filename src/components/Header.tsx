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
import EnquiryModal from "./EnquiryModal"; // ✅ CUSTOM UI MODAL
import logo from "@/assets/logo.png";

/* ---------------- DATA ---------------- */

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
              <div className="bg-card rounded-2xl p-6 min-w-[340px] shadow-xl border border-border/50">
                <p className="text-[10px] uppercase tracking-widest text-primary mb-4 font-bold font-secondary">
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
                      className="flex items-start gap-3 px-4 py-2 rounded-xl bg-background/60 hover:bg-primary hover:text-primary-foreground text-xs font-medium transition text-left leading-snug font-secondary"
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
    const handleScroll = () =>
      setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = (key: string) =>
    setOpenDropdown(openDropdown === key ? null : key);

  const closeAll = () => setOpenDropdown(null);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[10000] px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className={`rounded-full px-8 py-3 flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "glass-header-scrolled" : "glass-header"
            }`}
            animate={{
              backgroundColor: isScrolled
                ? "hsl(40 40% 99% / 0.95)"
                : "hsl(40 40% 99% / 0.85)",
            }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Triponomic Logo" className="h-10 w-auto" />
              <AnimatePresence>
                {isScrolled && (
                  <motion.span
                    initial={{ opacity: 0, x: -20, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: "auto" }}
                    exit={{ opacity: 0, x: -20, width: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-primary text-xl font-semibold text-foreground"
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
                onSelect={() => {}} // ❌ NO FORM
              />

              <Link to="/enquire">
                <MagneticButton className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-widest">
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
          </motion.div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="fixed inset-0 z-[9999] bg-background px-6 pt-28 pb-10 overflow-y-auto md:hidden"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
              >
                {/* Domestic */}
                <p className="text-xs font-bold mb-3">Domestic</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {domesticDestinations.map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        setSelectedDestination(d);
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 rounded-full bg-card text-xs"
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {/* International */}
                <p className="text-xs font-bold mb-3">International</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {internationalDestinations.map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        setSelectedDestination(d);
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 rounded-full bg-card text-xs"
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {/* Services */}
                <p className="text-xs font-bold mb-3">Services</p>
                <div className="space-y-2 mb-6">
                  {servicesList.map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl text-xs"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      {label}
                    </div>
                  ))}
                </div>

                <Link
                  to="/enquire"
                  className="block w-full py-3 text-center bg-primary text-primary-foreground rounded-full text-xs font-bold"
                >
                  CONTACT US
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ✅ CUSTOM ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={!!selectedDestination}
        destination={selectedDestination ?? ""}
        onClose={() => setSelectedDestination(null)}
      />
    </>
  );
};

export default Header;
