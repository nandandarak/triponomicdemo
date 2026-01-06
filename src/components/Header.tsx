import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
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
  "Kashmir",
  "Kerala",
  "Goa",
  "Leh-Ladakh",
  "Jaipur",
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

/* ---------------- HEADER ---------------- */

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () =>
      setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* HEADER BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div
          className={`mx-auto max-w-7xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "glass-header-scrolled" : "glass-header"
          }`}
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <span className="nav-link">Domestic</span>
            <span className="nav-link">International</span>

            <Link to="/enquire">
              <MagneticButton className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-widest">
                CONTACT US
              </MagneticButton>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen((p) => !p)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU — OLD STYLE SLIDE */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden absolute left-4 right-4 top-[88px] bg-card rounded-2xl p-6 shadow-xl border border-border/50 max-h-[75vh] overflow-y-auto z-50"
            >
              {/* Domestic */}
              <p className="text-xs font-bold mb-3 tracking-wide">Domestic</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {domesticDestinations.map((d) => (
                  <button
                    key={d}
                    className="px-4 py-2.5 bg-background/70 rounded-full text-xs"
                    onClick={() => {
                      setSelectedDestination(d);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* International */}
              <p className="text-xs font-bold mb-3 tracking-wide">
                International
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {internationalDestinations.map((d) => (
                  <button
                    key={d}
                    className="px-4 py-2.5 bg-background/70 rounded-full text-xs"
                    onClick={() => {
                      setSelectedDestination(d);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Services — NO FORM */}
              <p className="text-xs font-bold mb-3 tracking-wide">Services</p>
              <div className="space-y-2 mb-6">
                {servicesList.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 px-4 py-3 bg-background/70 rounded-xl text-xs"
                  >
                    <Icon className="w-4 h-4 text-primary mt-0.5" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/enquire"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3 text-center bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-wider"
              >
                CONTACT US
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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
