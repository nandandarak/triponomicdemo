import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PhoneIncoming, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import MapHero from "@/components/MapHero";
import DestinationRow from "@/components/DestinationRow";
import TripCategoriesSection from "@/components/TripCategoriesSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import SelectionModal from "@/components/SelectionModal";
import EnquiryModal from "@/components/EnquiryModal";
import Footer from "@/components/Footer";
import { useDestinationCards } from "@/services/cardStore";

// Domestic Images
import kashmirImg from "@/assets/kashmir.jpg";
import ladakhImg from "@/assets/ladakh.jpg";
import spitiImg from "@/assets/spiti.jpg";
import meghalayaImg from "@/assets/meghalaya.jpg";
import himachalImg from "@/assets/himachal.jpg";
import sikkimImg from "@/assets/sikkim.jpg";
import arunachalImg from "@/assets/arunachal.jpg";
import uttarakhandImg from "@/assets/uttarakhand.jpg";
import rajasthanImg from "@/assets/rajasthan.jpg";
import andamanImg from "@/assets/andaman.jpg";

// International Images
import vietnamImg from "@/assets/vietnam.jpg";
import kenyaImg from "@/assets/kenya.jpg";
import thailandImg from "@/assets/thailand.jpg";
import egyptImg from "@/assets/egypt.jpg";
import srilankaImg from "@/assets/srilanka.jpg";
import philippinesImg from "@/assets/philippines.jpg";
import kazakhstanImg from "@/assets/kazakhstan.jpg";
import maldivesImg from "@/assets/maldives.jpg";
import southafricaImg from "@/assets/southafrica.jpg";
import franceImg from "@/assets/france.jpg";
import newzealandImg from "@/assets/newzealand.jpg";
import spainImg from "@/assets/spain.jpg";
import switzerlandImg from "@/assets/switzerland.jpg";
import australiaImg from "@/assets/australia.jpg";
import malaysiaImg from "@/assets/malaysia.jpg";
import mauritiusImg from "@/assets/mauritius.jpg";

/* Destination Lists */
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

/* Cards */
const domesticCards = [
  { name: "Leh Ladakh", image: ladakhImg },
  { name: "Spiti", image: spitiImg },
  { name: "Kashmir", image: kashmirImg },
  { name: "Meghalaya", image: meghalayaImg },
  { name: "Himachal", image: himachalImg },
  { name: "Sikkim", image: sikkimImg },
  { name: "Arunachal Pradesh", image: arunachalImg },
  { name: "Uttarakhand", image: uttarakhandImg },
  { name: "Rajasthan", image: rajasthanImg },
  { name: "Andaman", image: andamanImg },
  { name: "Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80" },
  { name: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80" },
];

const internationalCards = [
  { name: "Vietnam", image: vietnamImg },
  { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80" },
  { name: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80" },
  { name: "Kenya", image: kenyaImg },
  { name: "Thailand", image: thailandImg },
  { name: "Egypt", image: egyptImg },
  { name: "Sri Lanka", image: srilankaImg },
  { name: "Philippines", image: philippinesImg },
  { name: "Kazakhstan", image: kazakhstanImg },
  { name: "Maldives", image: maldivesImg },
  { name: "Turkey", image: "https://picsum.photos/seed/Turkey/900/1200" },
  { name: "South Africa", image: southafricaImg },
  { name: "France", image: franceImg },
  { name: "New Zealand", image: newzealandImg },
  { name: "Spain", image: spainImg },
  { name: "Switzerland", image: switzerlandImg },
  { name: "Australia", image: australiaImg },
  { name: "Malaysia", image: malaysiaImg },
  { name: "Mauritius", image: mauritiusImg },
  { name: "South Korea", image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=900&q=80" },
];

import HappyTravelStrip from "@/components/HappyTravelStrip";
import VelocityMarquee from "@/components/animations/VelocityMarquee";

const Index = () => {
  const navigate = useNavigate();
  const { domesticCards, internationalCards } = useDestinationCards();
  const [selectionModal, setSelectionModal] = useState<{
    isOpen: boolean;
    type: "domestic" | "international";
  }>({
    isOpen: false,
    type: "domestic",
  });

  const [enquiryModal, setEnquiryModal] = useState<{
    isOpen: boolean;
    destination: string;
  }>({
    isOpen: false,
    destination: "",
  });

  const openEnquiry = (destination: string) => {
    setEnquiryModal({ isOpen: true, destination });
  };

  const closeEnquiry = () => {
    setEnquiryModal({ isOpen: false, destination: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <MapHero />

        {/* Happy Fresh Vibe Strip */}
        <HappyTravelStrip />

        {/* ReactBits Infinite Scrolling Ticker */}
        <div className="border-y border-emerald-100/60 bg-emerald-50/30 backdrop-blur-sm">
          <VelocityMarquee speed={32} />
        </div>

        {/* Trip Categories */}
        <TripCategoriesSection />

        {/* Domestic */}
        <DestinationRow
          title="Discover India"
          subtitle="Domestic Journeys"
          destinations={domesticCards}
          gatewayText="Discover More"
          onGatewayClick={() => navigate("/domestic")}
          onDestinationClick={openEnquiry}
          onEnquire={openEnquiry}
        />

        {/* International */}
        <DestinationRow
          title="Beyond Borders"
          subtitle="International Adventures"
          destinations={internationalCards}
          gatewayText="Explore Global"
          onGatewayClick={() => navigate("/international")}
          onDestinationClick={openEnquiry}
          onEnquire={openEnquiry}
        />

        {/* Happy vibe secondary ticker */}
        <div className="py-2 border-y border-amber-100/60 bg-amber-50/20">
          <VelocityMarquee speed={40} reverse={true} />
        </div>

        {/* Verified Real Google Reviews Section */}
        <div id="google-reviews">
          <GoogleReviewsSection />
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      <Footer />

      {/* Selection Modal */}
      <SelectionModal
        isOpen={selectionModal.isOpen}
        onClose={() =>
          setSelectionModal((prev) => ({ ...prev, isOpen: false }))
        }
        title={
          selectionModal.type === "domestic"
            ? "Domestic Destinations"
            : "International Destinations"
        }
        destinations={
          selectionModal.type === "domestic"
            ? domesticCards.map((c) => c.name)
            : internationalCards.map((c) => c.name)
        }
        onSelect={(destination) => {
          setSelectionModal((prev) => ({ ...prev, isOpen: false }));
          openEnquiry(destination);
        }}
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModal.isOpen}
        onClose={closeEnquiry}
        destination={enquiryModal.destination}
      />

      <WhatsAppButton />
    </div>
  );
};

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let lastVisible = false;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const visible = window.scrollY > 300;
          if (visible !== lastVisible) {
            lastVisible = visible;
            setIsVisible(visible);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-6 bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.12)] flex flex-col gap-4 min-w-[280px] pointer-events-auto relative origin-bottom-right"
          >
            {/* Close Button floating slightly above outside */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute -top-14 right-0 bg-white rounded-full p-2.5 shadow-md hover:bg-gray-50 hover:scale-105 transition-all text-black border border-gray-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>

            <Link 
              to="/enquire"
              className="flex items-center gap-6 w-full bg-white rounded-[20px] shadow-[0_2px_15px_rgba(0,0,0,0.06)] py-6 px-6 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <PhoneIncoming className="w-8 h-8 text-[#00B4D8]" strokeWidth={2.5} /> 
              <span className="font-semibold text-gray-900 text-[15px] flex-1 text-center">Request A Call Back</span>
            </Link>

            <a
              href="https://wa.me/919611922632"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 w-full bg-white rounded-[20px] shadow-[0_2px_15px_rgba(0,0,0,0.06)] py-6 px-6 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="bg-[#25D366] rounded-full p-2 text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.115.549 4.168 1.585 5.952L.15 23.514l5.658-1.485c1.725.95 3.684 1.455 5.723 1.455h.004c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm0 21.46c-1.787 0-3.535-.48-5.068-1.39l-.363-.215-3.766.987.994-3.67-.236-.376C2.613 15.022 2.023 13.568 2.023 12.03c0-5.525 4.498-10.024 10.008-10.024 2.677 0 5.195 1.042 7.087 2.936a10.02 10.02 0 012.937 7.088c-.001 5.525-4.498 10.02-10.024 10.02zM17.53 14.5c-.302-.15-1.786-.882-2.063-.983-.277-.1-.478-.15-.679.15-.201.3-.78 1-.955 1.2-.176.202-.352.227-.654.076a8.216 8.216 0 01-2.427-1.498c-.852-.74-1.427-1.655-1.593-1.956-.166-.302-.018-.465.132-.616.136-.136.302-.352.453-.528.15-.176.201-.302.302-.503.1-.201.05-.377-.025-.528-.075-.15-.679-1.635-.93-2.239-.245-.59-.494-.51-.679-.52a14.28 14.28 0 00-.578-.01c-.201 0-.528.075-.805.377-.276.301-1.055 1.03-1.055 2.513 0 1.483 1.081 2.915 1.232 3.116.15.2 2.124 3.243 5.147 4.545.719.31 1.28.495 1.718.634.721.23 1.378.198 1.895.12.58-.088 1.786-.73 2.037-1.432.251-.703.251-1.307.176-1.432-.075-.126-.276-.201-.578-.352z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900 text-[15px] leading-tight flex-1 text-center">Chat With Our<br/>Executive</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="pointer-events-auto bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 flex items-center justify-center animate-in fade-in zoom-in"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.115.549 4.168 1.585 5.952L.15 23.514l5.658-1.485c1.725.95 3.684 1.455 5.723 1.455h.004c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm0 21.46c-1.787 0-3.535-.48-5.068-1.39l-.363-.215-3.766.987.994-3.67-.236-.376C2.613 15.022 2.023 13.568 2.023 12.03c0-5.525 4.498-10.024 10.008-10.024 2.677 0 5.195 1.042 7.087 2.936a10.02 10.02 0 012.937 7.088c-.001 5.525-4.498 10.02-10.024 10.02zM17.53 14.5c-.302-.15-1.786-.882-2.063-.983-.277-.1-.478-.15-.679.15-.201.3-.78 1-.955 1.2-.176.202-.352.227-.654.076a8.216 8.216 0 01-2.427-1.498c-.852-.74-1.427-1.655-1.593-1.956-.166-.302-.018-.465.132-.616.136-.136.302-.352.453-.528.15-.176.201-.302.302-.503.1-.201.05-.377-.025-.528-.075-.15-.679-1.635-.93-2.239-.245-.59-.494-.51-.679-.52a14.28 14.28 0 00-.578-.01c-.201 0-.528.075-.805.377-.276.301-1.055 1.03-1.055 2.513 0 1.483 1.081 2.915 1.232 3.116.15.2 2.124 3.243 5.147 4.545.719.31 1.28.495 1.718.634.721.23 1.378.198 1.895.12.58-.088 1.786-.73 2.037-1.432.251-.703.251-1.307.176-1.432-.075-.126-.276-.201-.578-.352z" />
        </svg>
      </button>
    </div>
  );
};

export default Index;
