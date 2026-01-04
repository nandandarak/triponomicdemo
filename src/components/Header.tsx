import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Plane, Shield, Map, FileCheck, Car, CarFront, Ship } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const domesticDestinations = [
  "Mumbai", "Pune", "Goa", "Leh-Ladakh", "Jaipur",
  "Kerala", "Manali", "Rishikesh", "Udaipur", "Spiti Valley"
];

const internationalDestinations = [
  "Japan", "Bali", "South Korea", "Thailand", "Vietnam",
  "Iceland", "Turkey", "Singapore", "France", "Switzerland"
];

const services = [
  { icon: Plane, label: "Flight & Hotel Bookings", color: "#638C7D" },
  { icon: Shield, label: "Travel Insurance & International eSIM", color: "#638C7D" },
  { icon: Map, label: "Customized Experiences", color: "#638C7D" },
  { icon: FileCheck, label: "Visa Assistance", color: "#638C7D" },
  { icon: Car, label: "Outstation Cabs & Airport Transfers", color: "#638C7D" },
  { icon: CarFront, label: "Self-Drive Cars (International)", color: "#638C7D" },
  { icon: Ship, label: "Cruise Holidays", color: "#638C7D" },
];

const GOOGLE_FORM_BASE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfqfDU_lEAq_Kv2PVFSZa3lk_vvvE4kBG4dRnp0gWt7XLnFvg/viewform?usp=pp_url";
const ENTRY_ID = "entry.396208505";

interface DropdownProps {
  title: string;
  destinations: string[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const NavigationDropdown = ({ title, destinations, isOpen, onToggle, onClose }: DropdownProps) => {
  const handleDestinationClick = (destination: string) => {
    const finalUrl = `${GOOGLE_FORM_BASE_URL}&${ENTRY_ID}=${encodeURIComponent(destination)}`;
    window.open(finalUrl, '_blank');
    onClose();
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="nav-link flex items-center gap-1.5 text-foreground/80 hover:text-foreground font-medium text-sm tracking-wide transition-colors"
      >
        {title}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" 
              onClick={onClose}
            />
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50"
            >
              <div className="bg-[#F8F7F2] border border-[#A3B18A]/30 rounded-[24px] p-6 min-w-[320px] shadow-xl backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#638C7D] mb-4 font-bold">
                  Select Destination
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {destinations.map((destination) => (
                    <button
                      key={destination}
                      onClick={() => handleDestinationClick(destination)}
                      className="px-4 py-2.5 rounded-xl bg-white/50 hover:bg-[#638C7D] hover:text-white text-xs font-medium text-foreground/80 text-left transition-all border border-transparent hover:border-[#638C7D]"
                    >
                      {destination}
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

const ServicesDropdown = ({ isOpen, onToggle, onClose }: { isOpen: boolean; onToggle: () => void; onClose: () => void }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="nav-link flex items-center gap-1.5 text-foreground/80 hover:text-foreground font-medium text-sm tracking-wide transition-colors"
      >
        Services
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" 
              onClick={onClose}
            />
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50"
            >
              <div className="bg-[#F8F7F2] border border-[#A3B18A]/30 rounded-[24px] p-6 min-w-[280px] shadow-xl backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#638C7D] mb-4 font-bold">
                  Our Services
                </p>
                <div className="space-y-1">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#D4AF37]/10 text-left transition-all group"
                      >
                        <service.icon className="w-5 h-5 text-[#638C7D] group-hover:text-[#D4AF37] transition-colors" />
                        <span className="text-sm font-medium text-foreground/80 group-hover:text-[#D4AF37] transition-colors">
                          {service.label}
                        </span>
                      </button>
                    </motion.div>
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

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleClose = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#F8F7F2]/90 border border-[#A3B18A]/20 backdrop-blur-lg rounded-full px-8 py-3 flex items-center justify-between shadow-sm">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-script text-2xl font-semibold text-[#344E41] italic tracking-tight">
              Triponomic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavigationDropdown
              title="Domestic"
              destinations={domesticDestinations}
              isOpen={openDropdown === 'domestic'}
              onToggle={() => handleToggle('domestic')}
              onClose={handleClose}
            />
            
            <NavigationDropdown
              title="International"
              destinations={internationalDestinations}
              isOpen={openDropdown === 'international'}
              onToggle={() => handleToggle('international')}
              onClose={handleClose}
            />

            <ServicesDropdown
              isOpen={openDropdown === 'services'}
              onToggle={() => handleToggle('services')}
              onClose={handleClose}
            />
            
            <MagneticButton
              className="px-6 py-2 bg-[#638C7D] text-white rounded-full text-xs font-bold tracking-widest hover:bg-[#344E41] transition-all"
              onClick={() => window.location.href = '/enquire'}
            >
              CONTACT US
            </MagneticButton>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 bg-[#F8F7F2]/95 backdrop-blur-lg rounded-[24px] p-6 shadow-xl border border-[#A3B18A]/20"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#638C7D] mb-2 font-bold">Domestic</p>
                  <div className="flex flex-wrap gap-2">
                    {domesticDestinations.slice(0, 5).map(dest => (
                      <span key={dest} className="px-3 py-1 bg-white/50 rounded-full text-xs">{dest}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#638C7D] mb-2 font-bold">International</p>
                  <div className="flex flex-wrap gap-2">
                    {internationalDestinations.slice(0, 5).map(dest => (
                      <span key={dest} className="px-3 py-1 bg-white/50 rounded-full text-xs">{dest}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#638C7D] mb-2 font-bold">Services</p>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map(service => (
                      <div key={service.label} className="flex items-center gap-2 text-xs">
                        <service.icon className="w-4 h-4 text-[#638C7D]" />
                        <span>{service.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to="/enquire"
                  className="block w-full py-3 bg-[#638C7D] text-white rounded-full text-xs font-bold tracking-widest text-center"
                >
                  CONTACT US
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
