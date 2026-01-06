import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
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

/* ---------------- HEADER ---------------- */

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div
              className="nav-link cursor-pointer"
              onClick={() => setOpenDropdown(openDropdown === "domestic" ? null : "domestic")}
            >
              Domestic <ChevronDown className="inline w-4 h-4 ml-1" />
            </div>

            <div
              className="nav-link cursor-pointer"
              onClick={() =>
                setOpenDropdown(openDropdown === "international" ? null : "international")
              }
            >
              International <ChevronDown className="inline w-4 h-4 ml-1" />
            </div>

            <Link to="/enquire">
              <MagneticButton className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-widest">
                CONTACT US
              </MagneticButton>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu />
          </button>
        </motion.div>
      </header>

      {/* MOBILE MENU (FIXED & FULLSCREEN) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed inset-0 z-[61] bg-background p-6 overflow-y-auto"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-6">
                <img src={logo} alt="Triponomic" className="h-10" />
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X />
                </button>
              </div>

              {/* Domestic */}
              <p className="text-xs font-bold mb-3">Domestic</p>
              <div className="space-y-2 mb-6">
                {domesticDestinations.map((d) => (
                  <button
                    key={d}
                    className="w-full text-left px-4 py-3 rounded-xl bg-muted"
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
              <p className="text-xs font-bold mb-3">International</p>
              <div className="space-y-2 mb-8">
                {internationalDestinations.map((d) => (
                  <button
                    key={d}
                    className="w-full text-left px-4 py-3 rounded-xl bg-muted"
                    onClick={() => {
                      setSelectedDestination(d);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <Link
                to="/enquire"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3 text-center bg-primary text-primary-foreground rounded-full font-bold tracking-wide"
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
