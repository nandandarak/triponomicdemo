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
import EnquiryModal from "./EnquiryModal";
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
  { label: "Customized Experiences", icon: Sparkles },
  { label: "Visa Assistance", icon: Stamp },
  { label: "Outstation Cabs & Airport Transfers", icon: Car },
  { label: "Self-Drive Cars", icon: Key },
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
        className="flex items-center gap-1.5 text-sm font-medium"
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
              <div className="bg-card rounded-2xl p-6 min-w-[320px] shadow-xl">
                <p className="text-xs uppercase tracking-widest text-primary mb-4">
                  {title}
                </p>

                <div className="grid gap-2">
                  {items.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => {
                        onSelect(label);
                        onClose();
                      }}
                      className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-primary hover:text-white text-sm text-left transition"
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {label}
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
  const [enquiryDestination, setEnquiryDestination] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = (key: string) =>
    setOpenDropdown(openDropdown === key ? null : key);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-full px-8 py-3 flex items-center justify-between bg-background/90 backdrop-blur">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Triponomic" className="h-10" />
              {isScrolled && (
                <span className="text-xl font-semibold">Triponomic</span>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <NavigationDropdown
                title="Domestic"
                items={domesticDestinations.map((d) => ({ label: d }))}
                isOpen={openDropdown === "domestic"}
                onToggle={() => toggle("domestic")}
                onClose={() => setOpenDropdown(null)}
                onSelect={setEnquiryDestination}
              />

              <NavigationDropdown
                title="International"
                items={internationalDestinations.map((d) => ({ label: d }))}
                isOpen={openDropdown === "international"}
                onToggle={() => toggle("international")}
                onClose={() => setOpenDropdown(null)}
                onSelect={setEnquiryDestination}
              />

              {/* ❌ SERVICES — DOES NOT OPEN FORM */}
              <NavigationDropdown
                title="Services"
                items={servicesList}
                isOpen={openDropdown === "services"}
                onToggle={() => toggle("services")}
                onClose={() => setOpenDropdown(null)}
                onSelect={() => {}}
              />

              <Link to="/enquire">
                <MagneticButton className="px-6 py-2 bg-primary text-white rounded-full text-xs font-bold">
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
        </div>
      </header>

      {/* ✅ ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={!!enquiryDestination}
        destination={enquiryDestination || ""}
        onClose={() => setEnquiryDestination(null)}
      />
    </>
  );
};

export default Header;
