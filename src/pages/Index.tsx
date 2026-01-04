import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DestinationRow from "@/components/DestinationRow";
import SelectionModal from "@/components/SelectionModal";
import EnquiryModal from "@/components/EnquiryModal";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const GOOGLE_FORM_BASE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfqfDU_lEAq_Kv2PVFSZa3lk_vvvE4kBG4dRnp0gWt7XLnFvg/viewform?usp=pp_url";
const ENTRY_ID = "entry.396208505";

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

const domesticCards = [
  {
    name: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Pune",
    image:
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
  },
];

const internationalCards = [
  {
    name: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "South Korea",
    image:
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&auto=format&fit=crop&q=80",
  },
];

const Index = () => {
  const [modalState, setModalState] = useState<{
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

  const handleDestinationClick = (destination: string) => {
    const finalUrl = `${GOOGLE_FORM_BASE_URL}&${ENTRY_ID}=${encodeURIComponent(
      destination
    )}`;
    window.open(finalUrl, "_blank");
  };

  const handleEnquire = (destination: string) => {
    setEnquiryModal({ isOpen: true, destination });
  };

  const openModal = (type: "domestic" | "international") => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <HeroSection />

          {/* Domestic Section */}
          <DestinationRow
            title="Discover India"
            subtitle="Domestic Journeys"
            destinations={domesticCards}
            gatewayText="Discover More"
            onGatewayClick={() => openModal("domestic")}
            onDestinationClick={handleDestinationClick}
            onEnquire={handleEnquire}
          />

          {/* International Section */}
          <DestinationRow
            title="Beyond Borders"
            subtitle="International Adventures"
            destinations={internationalCards}
            gatewayText="Explore Global"
            onGatewayClick={() => openModal("international")}
            onDestinationClick={handleDestinationClick}
            onEnquire={handleEnquire}
          />
        </main>

        <Footer />

        {/* Selection Modal */}
        <SelectionModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={
            modalState.type === "domestic"
              ? "Domestic Destinations"
              : "International Destinations"
          }
          destinations={
            modalState.type === "domestic"
              ? domesticDestinations
              : internationalDestinations
          }
          onSelect={handleDestinationClick}
        />

        {/* Enquiry Modal */}
        <EnquiryModal
          isOpen={enquiryModal.isOpen}
          onClose={() =>
            setEnquiryModal({ isOpen: false, destination: "" })
          }
          destination={enquiryModal.destination}
        />
      </div>
    </SmoothScroll>
  );
};

export default Index;
