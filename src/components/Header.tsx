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

/* ---------------- HEADER ---------------- */

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
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
      <header className="fixed top-4 left-0 right-0 z-[9999] px-4">
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
          </Link>

          {/* DESKTOP NAV (unchanged) */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/">Domestic</Link>
            <Link to="/">International</Link>
            <Link to="/">Services</Link>

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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* MENU */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="
                fixed top-[96px]
                left-1/2 -translate-x-1/2
                z-[9999]
                w-[90%] max-w-md
                bg-card
                rounded-2xl
                p-6
                shadow-2xl
                max-h-[calc(100vh-120px)]
                overflow-y-auto
              "
            >
              {/* DOMESTIC */}
              <p className="text-xs font-bold mb-2">Domestic</p>
              <div className="space-y-2 mb-6">
                {domesticDestinations.map((place) => (
                  <button
                    key={place}
                    onClick={() => {
                      setSelectedDestination(place);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-xl bg-background/70 text-xs"
                  >
                    {place}
                  </button>
                ))}
              </div>

              {/* INTERNATIONAL */}
              <p className="text-xs font-bold mb-2">International</p>
              <div className="space-y-2 mb-6">
                {internationalDestinations.map((place) => (
                  <button
                    key={place}
                    onClick={() => {
                      setSelectedDestination(place);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-xl bg-background/70 text-xs"
                  >
                    {place}
                  </button>
                ))}
              </div>

              {/* SERVICES */}
              <p className="text-xs font-bold mb-2">Services</p>
              <div className="space-y-2 mb-6">
                {servicesList.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-4 py-2 bg-background/70 rounded-xl text-xs"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    {label}
                  </div>
                ))}
              </div>

              {/* CTA */}
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
