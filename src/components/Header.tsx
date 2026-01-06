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
  { label: "Customized Experiences (Domestic & International)", icon: Sparkles },
  { label: "Visa Assistance", icon: Stamp },
  { label: "Outstation Cabs & Airport Transfers", icon: Car },
  { label: "Self-Drive Cars (International)", icon: Key },
  { label: "Cruise Holidays", icon: Ship },
];

/* ---------------- HEADER ---------------- */

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HEADER BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
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
            {/* Domestic */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "domestic" ? null : "domestic")
                }
                className="nav-link flex items-center gap-1"
              >
                Domestic <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {openDropdown === "domestic" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-4 bg-card rounded-2xl p-4 shadow-xl border w-56"
                  >
                    {domesticDestinations.map((d) => (
                      <button
                        key={d}
                        className="block w-full text-left px-4 py-2 rounded-lg hover:bg-primary hover:text-white text-sm"
                        onClick={() => {
                          setSelectedDestination(d);
                          setOpenDropdown(null);
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* International */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "international" ? null : "international")
                }
                className="nav-link flex items-center gap-1"
              >
                International <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {openDropdown === "international" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-4 bg-card rounded-2xl p-4 shadow-xl border w-56"
                  >
                    {internationalDestinations.map((d) => (
                      <button
                        key={d}
                        className="block w-full text-left px-4 py-2 rounded-lg hover:bg-primary hover:text-white text-sm"
                        onClick={() => {
                          setSelectedDestination(d);
                          setOpenDropdown(null);
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/enquire">
              <MagneticButton className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-widest">
                CONTACT US
              </MagneticButton>
            </Link>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((p) => !p)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </motion.div>

        {/* MOBILE MENU – OLD STYLE */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 z-40 bg-background px-4 pt-24 pb-10 overflow-y-auto"
            >
              <div className="bg-card rounded-3xl p-6 shadow-xl">

                <h3 className="text-sm font-bold mb-4">Domestic</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {domesticDestinations.map((d) => (
                    <button
                      key={d}
                      className="px-4 py-2 bg-background rounded-full text-xs"
                      onClick={() => {
                        setSelectedDestination(d);
                        setMobileOpen(false);
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <h3 className="text-sm font-bold mb-4">International</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {internationalDestinations.map((d) => (
                    <button
                      key={d}
                      className="px-4 py-2 bg-background rounded-full text-xs"
                      onClick={() => {
                        setSelectedDestination(d);
                        setMobileOpen(false);
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <h3 className="text-sm font-bold mb-4">Services</h3>
                <div className="space-y-2 mb-6">
                  {servicesList.map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-4 py-3 bg-background rounded-xl text-sm"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      {label}
                    </div>
                  ))}
                </div>

                <Link
                  to="/enquire"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full py-3 text-center bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-wider"
                >
                  CONTACT US
                </Link>
              </div>
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
