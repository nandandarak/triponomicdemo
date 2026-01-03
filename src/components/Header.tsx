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

const GOOGLE_FORM_BASE_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=pp_url&entry.FIELD_ID=";

interface DropdownProps {
  title: string;
  destinations: string[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const NavigationDropdown = ({ title, destinations, isOpen, onToggle, onClose }: DropdownProps) => {
  const handleDestinationClick = (destination: string) => {
    window.open(`${GOOGLE_FORM_BASE_URL}${encodeURIComponent(destination)}`, '_blank');
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
            <div className="glass-panel rounded-[24px] p-6 min-w-[320px] shadow-glass">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                Select Destination
              </p>
              <div className="grid grid-cols-2 gap-2">
                {destinations.map((destination) => (
                  <button
                    key={destination}
                    onClick={() => handleDestinationClick(destination)}
                    className="chip-destination px-4 py-2.5 bg-secondary/50 hover:bg-primary hover:text-primary-foreground text-sm font-medium text-foreground/80 text-left transition-all"
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
        <div className="glass-panel rounded-full px-8 py-4 flex items-center justify-between shadow-soft">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-script text-3xl font-semibold text-logo italic">
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
              className="nav-link text-foreground/80 hover:text-foreground font-medium text-sm tracking-wide transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
