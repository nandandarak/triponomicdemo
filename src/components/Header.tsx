// ... (keep imports and destination arrays the same)

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Added 'isolate' to ensure the header always wins the stacking contest
    <header className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 isolate">
      <div className={`mx-auto transition-all duration-700 px-6 ${isScrolled ? "max-w-5xl mt-4" : "max-w-7xl mt-0"}`}>
        <div 
          className={`relative transition-all duration-700 px-10 flex items-center justify-between ${
            isScrolled 
            ? "bg-white/90 backdrop-blur-2xl rounded-full py-3 shadow-xl border border-white/20" 
            : "bg-transparent py-8"
          }`}
        >
          {/* Logo */}
          <Link 
            to="/" 
            className={`font-script text-3xl italic transition-colors duration-500 ${isScrolled ? "text-[#344E41]" : "text-white"}`}
          >
            Triponomic
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <NavigationDropdown
              title="Domestic"
              destinations={domesticDestinations}
              isOpen={openDropdown === "domestic"}
              onToggle={() => setOpenDropdown(openDropdown === "domestic" ? null : "domestic")}
              onClose={() => setOpenDropdown(null)}
              onSelect={setSelectedDestination}
              isScrolled={isScrolled}
            />

            <NavigationDropdown
              title="International"
              destinations={internationalDestinations}
              isOpen={openDropdown === "international"}
              onToggle={() => setOpenDropdown(openDropdown === "international" ? null : "international")}
              onClose={() => setOpenDropdown(null)}
              onSelect={setSelectedDestination}
              isScrolled={isScrolled}
            />

            <Link to="/enquire">
              <MagneticButton className={`px-8 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all duration-500 ${
                isScrolled 
                ? "bg-[#344E41] text-white hover:bg-[#638C7D]" 
                : "bg-white text-[#344E41] hover:bg-[#FDFCF9]"
              }`}>
                CONTACT US
              </MagneticButton>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 rounded-full transition-colors ${isScrolled ? "text-[#344E41]" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-[-1] bg-[#FDFCF9] flex flex-col p-10 pt-32"
              initial={{ opacity: 0, x: "100%" }} // Changed to slide from right for better feel
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
               <div className="space-y-10 overflow-y-auto">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#638C7D] mb-6 font-bold">Domestic</p>
                  <div className="flex flex-wrap gap-2">
                    {domesticDestinations.map((d) => (
                      <button key={d} onClick={() => { setMobileMenuOpen(false); setSelectedDestination(d); }}
                        className="px-4 py-2 bg-white rounded-xl text-xs font-semibold border border-[#344E41]/5 shadow-sm">
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Added International to Mobile Menu as it was missing */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#638C7D] mb-6 font-bold">International</p>
                  <div className="flex flex-wrap gap-2">
                    {internationalDestinations.map((d) => (
                      <button key={d} onClick={() => { setMobileMenuOpen(false); setSelectedDestination(d); }}
                        className="px-4 py-2 bg-white rounded-xl text-xs font-semibold border border-[#344E41]/5 shadow-sm">
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <Link to="/enquire" onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-5 bg-[#344E41] text-white rounded-2xl text-xs font-bold text-center tracking-[0.2em]">
                  CONTACT US
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedDestination && (
        <GoogleFormModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </header>
  );
};
