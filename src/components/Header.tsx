import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Plane,
  Hotel,
  ShieldCheck,
  Smartphone,
  Stamp,
  Car,
  Key,
  Ship,
  MapPin,
  Globe,
  Phone,
  HelpCircle,
  Sparkles,
  Compass,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryModal from "./EnquiryModal";
import logo from "@/assets/logo.png";

/* ---------------- DATA ---------------- */

const domesticDestinations = [
  "Leh Ladakh",
  "Spiti Valley",
  "Kashmir",
  "Meghalaya",
  "Sikkim",
  "Arunachal Pradesh",
  "Himachal",
  "Uttarakhand",
  "Kerala",
  "Goa",
  "Rajasthan",
  "Andaman",
];

const internationalDestinations = [
  "Vietnam",
  "Bali",
  "Japan",
  "Kenya",
  "Thailand",
  "Egypt",
  "Sri Lanka",
  "Philippines",
  "Kazakhstan",
  "Maldives",
  "Turkey",
  "South Africa",
  "France",
  "New Zealand",
  "Spain",
  "Switzerland",
  "Australia",
  "Malaysia",
  "Mauritius",
  "South Korea",
];

export const servicesList = [
  { label: "Flight Bookings", icon: Plane },
  { label: "Hotel Bookings", icon: Hotel },

  { label: "Travel Insurance", icon: ShieldCheck },
  { label: "International eSIM", icon: Smartphone },

  { label: "Customized Domestic Experiences", icon: MapPin },
  { label: "Customized International Experiences", icon: Globe },

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
  isHotels,
  isScrolled,
}: {
  title: string;
  items: { label: string; icon?: React.ElementType; tier?: string }[];
  onSelect?: (label: string) => void;
  isHotels?: boolean;
  isScrolled: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
          isScrolled
            ? "text-foreground hover:text-primary"
            : "text-white/90 hover:text-white"
        }`}
      >
        {title}
        <ChevronDown className={`w-3.5 h-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[9998]"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full mt-4 right-0 z-[9999]"
            >
              {isHotels ? (
                <div className="bg-card rounded-2xl p-6 shadow-xl border" style={{ minWidth: "480px" }}>
                  <p className="text-[10px] uppercase tracking-widest text-primary mb-1 font-bold">
                    Hotel Partners
                  </p>
                  <p className="text-[10px] text-muted-foreground mb-5">
                    Exclusive rates &amp; curated upgrades at India's finest hotels
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {items.map(({ label, tier }) => (
                      <button
                        key={label}
                        onClick={() => {
                          onSelect?.(`${label} Hotel Stay`);
                          setOpen(false);
                        }}
                        className="flex flex-col items-start gap-0.5 px-4 py-3 rounded-xl bg-background/60 hover:bg-primary hover:text-primary-foreground text-left transition group"
                      >
                        <span className="text-xs font-semibold">{label}</span>
                        {tier && (
                          <span className="text-[9px] text-muted-foreground group-hover:text-primary-foreground/70 uppercase tracking-wide">
                            {tier}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
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
              )}
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
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let lastScrolled = false;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > window.innerHeight * 0.15;
          if (scrolled !== lastScrolled) {
            lastScrolled = scrolled;
            setIsScrolled(scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          isScrolled ? "py-2 px-4" : "py-4 px-4"
        }`}
      >
        <motion.div
          className={`mx-auto max-w-7xl rounded-full px-6 py-2.5 flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? "glass-header shadow-[0_4px_30px_rgba(139,125,107,0.12)] border border-border/40"
              : "bg-transparent border border-transparent hover:bg-black/15 hover:border-white/10 hover:backdrop-blur-sm"
          }`}
        >
          {/* LEFT: LOGO + DESKTOP NAV */}
          <div className="flex items-center gap-8 lg:gap-10">
            {/* LOGO + TITLE */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src={logo}
                alt="Triponomic"
                className={`h-8 md:h-9 w-auto transition-all duration-300 ${
                  isScrolled ? "" : "brightness-0 invert"
                }`}
              />
              <span
                className={`font-semibold text-lg transition-colors duration-300 ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                Triponomic
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-7">
              <Link
                to="/domestic"
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Domestic
              </Link>

              <Link
                to="/international"
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                International
              </Link>

              <Link
                to="/hotels"
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Hotels
              </Link>

              <Link
                to="/experiences"
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Experiences
              </Link>

              <Link
                to="/about"
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                About
              </Link>

              <Link
                to="/faq"
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                FAQs
              </Link>
            </nav>
          </div>

          {/* RIGHT: DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+919611922632"
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                isScrolled
                  ? "border border-[#151B40] text-[#151B40] hover:bg-[#151B40] hover:text-white shadow-[0_2px_12px_rgba(21,27,64,0.15)]"
                  : "bg-[#151B40]/85 hover:bg-[#151B40] border border-white/20 text-white shadow-[0_4px_16px_rgba(21,27,64,0.45)] backdrop-blur-md"
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-cyan-300" />
              +91-9611922632
            </a>
          </div>

          {/* MOBILE TOGGLE & PHONE */}
          <div className="flex md:hidden items-center gap-4">
            <a
              href="tel:+919611922632"
              className={`flex items-center justify-center p-2 rounded-full transition-colors duration-300 ${
                isScrolled
                  ? "border border-[#151B40] text-[#151B40] hover:bg-[#151B40] hover:text-white"
                  : "bg-[#151B40]/85 hover:bg-[#151B40] border border-white/20 text-white shadow-[0_2px_12px_rgba(21,27,64,0.35)]"
              }`}
              aria-label="Call Us"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
            </a>
            <button
              onClick={() => setMobileMenuOpen((p) => !p)}
              className={`transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* MOBILE MENU (FULL-SCREEN LUXURY DRAWER) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] bg-[#141926]/98 backdrop-blur-2xl text-white flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar inside Mobile Menu */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/20">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <img
                  src={logo}
                  alt="Triponomic"
                  className="h-8 w-auto brightness-0 invert"
                />
                <span className="font-semibold text-lg text-white">Triponomic</span>
              </Link>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+919611922632"
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 hover:bg-white/20 transition active:scale-95"
                  aria-label="Call Us"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Items List */}
            <div className="px-5 py-5 space-y-2 flex-1">
              {[
                {
                  to: "/domestic",
                  label: "Domestic Journeys",
                  sub: "Kashmir, Ladakh, Kerala, Spiti, Rajasthan",
                  icon: MapPin,
                  tag: "India",
                },
                {
                  to: "/international",
                  label: "International Escapes",
                  sub: "Bali, Vietnam, Switzerland, Maldives, Europe",
                  icon: Plane,
                  tag: "Global",
                },
                {
                  to: "/hotels",
                  label: "5★ Partner Hotels",
                  sub: "Contracted direct tariffs with Taj, ITC, Oberoi & Leela",
                  icon: Hotel,
                  tag: "Direct Tariffs",
                },
                {
                  to: "/experiences",
                  label: "Curated Experiences",
                  sub: "Artisanal adventures, candlelit dining & scenic tours",
                  icon: Compass,
                },
                {
                  to: "/build-trail",
                  label: "Build Your Journey",
                  sub: "Interactive 100% custom itinerary crafter",
                  icon: Sparkles,
                  highlight: true,
                  tag: "Bespoke Studio",
                },
                {
                  to: "/about",
                  label: "About Triponomic",
                  sub: "Our philosophy, direct partner story & curators",
                  icon: Globe,
                },
                {
                  to: "/faq",
                  label: "FAQs & Support",
                  sub: "Booking assistance, partner tariffs & concierge",
                  icon: HelpCircle,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                      item.highlight
                        ? "bg-gradient-to-r from-[#404762] to-[#2E364E] text-white border border-[#BAC7F5]/30 shadow-lg"
                        : "bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] text-white/90 border border-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          item.highlight
                            ? "bg-white/20 text-amber-300"
                            : "bg-white/10 text-[#BAC7F5]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white truncate">
                            {item.label}
                          </span>
                          {item.tag && (
                            <span
                              className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                item.highlight
                                  ? "bg-amber-400 text-gray-950 font-black"
                                  : "bg-white/10 text-[#BAC7F5]"
                              }`}
                            >
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-white/60 truncate mt-0.5 font-light">
                          {item.sub}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-white/40 shrink-0 ml-2" />
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions & Trust Footnote */}
            <div className="p-5 border-t border-white/10 bg-black/40 space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+919611922632"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-xs font-bold transition border border-white/15"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-300" />
                  Call Concierge
                </a>

                <a
                  href="https://wa.me/919611922632?text=Hi%20Triponomic%2C%20I%20would%20like%20to%20plan%20a%20journey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white text-xs font-bold transition shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>

              <Link
                to="/build-trail"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-[#404762] hover:bg-[#4E5779] active:scale-95 text-white text-xs font-extrabold tracking-wider uppercase text-center transition block shadow-lg"
              >
                ✦ Plan A Bespoke Trip
              </Link>

              <p className="text-center text-[10px] text-white/50 tracking-wider">
                Direct Contracted Tariffs • 24/7 Dedicated Concierge
              </p>
            </div>
          </motion.div>
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
