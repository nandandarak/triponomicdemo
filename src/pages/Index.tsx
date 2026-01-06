import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DestinationRow from "@/components/DestinationRow";
import SelectionModal from "@/components/SelectionModal";
import EnquiryModal from "@/components/EnquiryModal";
import Footer from "@/components/Footer";

/* Destination Lists */
const domesticDestinations = [
  "Kashmir",
  "Kerala",
  "Goa",
  "Leh-Ladakh",
  "Jaipur",
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
    name: "Kashmir",
    image:
      "https://images.unsplash.com/photo-1602473485900-3b9df7d0a8b8?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
  },
];

const internationalCards = [
  {
    name: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "South Korea",
    image:
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=900&q=80",
  },
];

const Index = () => {
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
        <HeroSection />

        {/* Domestic */}
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

        {/* International */}
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

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModal.isOpen}
        onClose={closeEnquiry}
        destination={enquiryModal.destination}
      />
    </div>
  );
};

export default Index;
