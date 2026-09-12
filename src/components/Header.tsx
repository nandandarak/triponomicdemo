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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
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
}: {
  title: string;
  items: { label: string; icon?: React.ElementType; tier?: string }[];
  onSelect?: (label: string) => void;
  isHotels?: boolean;
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
              className="absolute top-full mt-4 right-0 z-[9999]"
            >
              {isHotels ? (
                /* Hotels mega-dropdown — 2 column grid */
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
                /* Standard dropdown */
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
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState<"services" | "hotels">("services");

  useEffect(() => {
    const onScroll = () =>
      setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="absolute top-4 left-0 right-0 z-[9999] px-4">
        <motion.div
          className="mx-auto max-w-7xl rounded-full px-6 py-3 flex items-center justify-between glass-header"
          animate={{
            backgroundColor: isScrolled
              ? "hsl(40 40% 99% / 0.95)"
              : "hsl(40 40% 99% / 0.85)",
          }}
        >
          {/* LOGO + TITLE */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Triponomic" className="h-9 w-auto" />
            <span className="font-semibold text-lg">Triponomic</span>
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

            <DesktopDropdown title="Services" items={servicesList} />

            <Link
              to="/hotels"
              className="nav-link text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors"
            >
              Hotels
            </Link>

            {/* <Link to="/enquire">
              <MagneticButton className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-widest">
                CONTACT US
              </MagneticButton>
            </Link> */}

            <a
              href="tel:+919611922632"
              className="flex items-center gap-2 px-5 py-2 border border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8] hover:text-white transition-colors rounded-full text-sm font-medium whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              +91-9611922632
            </a>
          </nav>

          {/* MOBILE TOGGLE & PHONE */}
          <div className="flex md:hidden items-center gap-4">
            <a
              href="tel:+919611922632"
              className="flex items-center justify-center p-2 rounded-full border border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8] hover:text-white transition-colors"
              aria-label="Call Us"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen((p) => !p)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* MOBILE MENU — SERVICES ONLY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="
                fixed top-[96px]
                left-4 right-4
                z-[9999]
                bg-card
                rounded-2xl
                p-6
                shadow-2xl
                max-h-[calc(100vh-120px)]
                overflow-y-auto
              "
            >
              {/* Mobile Tab Switcher */}
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => setMobileSection("services")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                    mobileSection === "services"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/70 text-muted-foreground"
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => setMobileSection("hotels")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                    mobileSection === "hotels"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/70 text-muted-foreground"
                  }`}
                >
                  Hotels
                </button>
              </div>

              {mobileSection === "services" ? (
                <div className="space-y-2 mb-6">
                  {servicesList.map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-4 py-3 bg-background/70 rounded-xl text-xs"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      {label}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-6">
                  <Link
                    to="/hotels"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#344E41] text-white rounded-2xl text-sm font-bold tracking-widest hover:bg-[#2A3E34] transition-colors"
                  >
                    <Hotel className="w-5 h-5" />
                    View All Hotel Partners
                  </Link>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    ITC · Taj · Leela · Oberoi · JW Marriott &amp; more
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <a
                  href="tel:+919611922632"
                  className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#00B4D8] text-[#00B4D8] rounded-full text-xs font-bold tracking-widest"
                >
                  <Phone className="w-4 h-4" />
                  +91-9611922632
                </a>
                {/* <Link
                  to="/enquire"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 bg-primary text-primary-foreground rounded-full text-xs font-bold text-center tracking-widest"
                >
                  CONTACT US
                </Link> */}
              </div>
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
