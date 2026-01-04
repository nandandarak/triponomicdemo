import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DestinationRow from "@/components/DestinationRow";
import SelectionModal from "@/components/SelectionModal";
import EnquiryModal from "@/components/EnquiryModal";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

/* Destination Lists */
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

/* Cards */
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
  /* Selection Modal (Discover / Explore More) */
  const [selectionModal, setSelectionModal] = useState<{
    isOpen: boolean;
    type: "domestic" | "international";
  }>({
    isOpen: false,
    type: "domestic",
  });

  /* Enquiry Modal (Google Form UI) */
  const [enquiryModal, setEnquiryModal] = useState<{
    isOpen: boolean;
    destination: string;
  }>({
    isOpen: false,
    destination: "",
  });

  /* ONE SINGLE FUNCTION TO OPEN FORM */
  const openEnquiry = (destination: string) => {
    setEnquiryModal({
      isOpen: true,
      destination,
    });
  };

  const closeEnquiry = () => {
    setEnquiryModal({
      isOpen: false,
      destination: "",
    });
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
            onGatewayClick={() =>
              setSelectionModal({ isOpen: true, type: "domestic" })
            }
            onDestinationClick={openEnquiry}
            onEnquire={openEnquiry}
          />

          {/* International Section */}
          <DestinationRow
            title="Beyond Borders"
            subtitle="International Adventures"
            destinations={internationalCards}
            gatewayText="Explore Global"
            onGatewayClick={() =>
              setSelectionModal({ isOpen: true, type: "international" })
            }
            onDestinationClick={openEnquiry}
            onEnquire={openEnquiry}
          />
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
              ? domesticDestinations
              : internationalDestinations
          }
          onSelect={(destination) => {
            setSelectionModal((prev) => ({ ...prev, isOpen: false }));
            openEnquiry(destination);
          }}
        />

        {/* Enquiry Modal (SINGLE SOURCE) */}
        <EnquiryModal
          isOpen={enquiryModal.isOpen}
          onClose={closeEnquiry}
          destination={enquiryModal.destination}
        />
      </div>
    </SmoothScroll>
  );
};

export default Index;
