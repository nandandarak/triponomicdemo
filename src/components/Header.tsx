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
  { label: "Customized Experiences", icon: Sparkles },
  { label: "Visa Assistance", icon: Stamp },
  { label: "Outstation Cabs & Transfers", icon: Car },
  { label: "Self-Drive Cars (International)", icon: Key },
  { label: "Cruise Holidays", icon: Ship },
];

/* ---------------- DESKTOP DROPDOWN ---------------- */

const DesktopDropdown = ({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: { label: string; icon?: any }[];
  onSelect?: (label: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="nav-link flex items-center gap-1"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[9998]"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-[9999]"
            >
              <div className="bg-card rounded-2xl p-6 min-w-[320px] shadow-xl border">
                <p className="text-[10px] uppercase tracking-widest text-primary mb-4 font-bold">
                  {title}
                </p>

                <div className="space-y-2">
                  {items.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => {
                        onSelect?.(label);
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-background/60 hover:bg-primary hover:text-primary-foreground text-xs transition text-left"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
     import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import TripEnquiryForm from "./TripEnquiryForm";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
}

const EnquiryModal = ({ isOpen, onClose, destination }: EnquiryModalProps) => {
  // 🔒 Lock body scroll + hide header
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99999]"
            onClick={onClose}
          />

          {/* MODAL WRAPPER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 40 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[100000] flex items-center justify-center px-4"
          >
            <div className="w-full max-w-4xl h-[90vh] bg-[#FDFCF9] rounded-[28px] shadow-2xl overflow-hidden flex flex-col">

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

        <motion.div
          className="mx-auto max-w-7xl rounded-full px-6 py-3 flex items-center justify-between glass-header"
          animate={{
            backgroundColor: isScrolled
              ? "hsl(40 40% 99% / 0.95)"
              : "hsl(40 40% 99% / 0.85)",
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Triponomic" className="h-9 w-auto" />
            {isScrolled && (
              <span className="hidden sm:block font-semibold text-lg">
                Triponomic
              </span>
            )}
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            <DesktopDropdown
              title="Domestic"
              items={domesticDestinations.map((d) => ({ label: d }))}
              onSelect={setSelectedDestination}
            />

            <DesktopDropdown
              title="International"
              items={internationalDestinations.map((d) => ({ label: d }))}
              onSelect={setSelectedDestination}
            />

            <DesktopDropdown
              title="Services"
              items={servicesList}
            />

            <Link to="/enquire">
              <MagneticButton className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-widest">
                CONTACT US
              </MagneticButton>
            </Link>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen((p) => !p)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </motion.div>
      </header>

      {/* MOBILE MENU (unchanged & working) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-[96px] left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md bg-card rounded-2xl p-6 shadow-2xl"
            >
              <p className="text-xs font-bold mb-3">Services</p>
              <div className="space-y-2 mb-6">
                {servicesList.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 px-4 py-3 bg-background/70 rounded-xl text-xs">
                    <Icon className="w-4 h-4 text-primary" />
                    {label}
                  </div>
                ))}
              </div>

              <Link
                to="/enquire"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3 bg-primary text-primary-foreground rounded-full text-xs font-bold text-center tracking-widest"
              >
                CONTACT US
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={!!selectedDestination}
        destination={selectedDestination ?? ""}
        onClose={() => setSelectedDestination(null)}
      />
    </>
  );
};

export default Header;
