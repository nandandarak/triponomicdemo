import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const domesticDestinations = [
  "Mumbai", "Pune", "Goa", "Leh-Ladakh", "Jaipur",
  "Kerala", "Manali", "Rishikesh", "Udaipur", "Spiti Valley"
];

const internationalDestinations = [
  "Japan", "Bali", "South Korea", "Thailand", "Vietnam",
  "Iceland", "Turkey", "Singapore", "France", "Switzerland"
];

// WIRING COMPLETED: Your actual Form URL and Entry ID
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
    // Correct logic for pre-filling the destination
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
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={onClose}
          />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 animate-slide-down">
            {/* Added pastel styling to match your theme */}
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
          </div>
        </>
      )}
    </div>
  );
};

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleClose = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Updated to use your Sage/Parchment palette */}
        <div className="bg-[#F8F7F2]/90 border border-[#A3B18A]/20 backdrop-blur-lg rounded-full px-8 py-3 flex items-center justify-between shadow-sm">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-serif text-2xl font-semibold text-[#344E41] italic tracking-tight">
              Triponomic
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
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
            
            <Link
              to="/enquire"
              className="px-6 py-2 bg-[#638C7D] text-white rounded-full text-xs font-bold tracking-widest hover:bg-[#344E41] transition-all"
            >
              CONTACT US
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
