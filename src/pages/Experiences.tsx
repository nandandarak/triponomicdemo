import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Hotel,
  Stamp,
  Smartphone,
  Car,
  Key,
  Ship,
  MapPin,
  Globe,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import FAQSection from "@/components/FAQSection";
import TiltedCard from "@/components/animations/TiltedCard";
import BlurText from "@/components/animations/BlurText";
import ShinyText from "@/components/animations/ShinyText";

const experiences = [
  {
    id: "flights",
    title: "Flight Bookings & Baggage Desk",
    icon: Plane,
    tagline: "Stress-free air travel at best corporate tariffs",
    desc: "Domestic and international flight routing with baggage allowances, preferred seat selections, meal requests, and web check-in management.",
    features: [
      "Competitive fares with flexible cancellation options",
      "Extra baggage coordination for family or shopping trips",
      "Flight delay/reschedule alerts and instant rebooking",
    ],
    accentColor: "#0284C7",
    badge: "Air Travel",
  },
  {
    id: "hotels",
    title: "5-Star Hotel Tariffs & Member Perks",
    icon: Hotel,
    tagline: "ITC, Taj, Leela, Oberoi & Marriott privileges",
    desc: "Direct corporate relationships with India and the world's finest hospitality brands, giving you VIP treatment, room upgrades, and dining credits.",
    features: [
      "Complimentary daily 5-star buffet breakfasts",
      "Priority room upgrades & early check-in assistance",
      "Resort dining & spa credits included",
    ],
    accentColor: "#D97706",
    badge: "Luxury Stays",
  },
  {
    id: "visas",
    title: "Comprehensive Visa Assistance",
    icon: Stamp,
    tagline: "100% compliant, hassle-free visa processing",
    desc: "Full guidance with visa documentation, appointment scheduling, cover letter drafting, financial paper review, and biometric assistance.",
    features: [
      "Schengen, UK, USA, Japan, Vietnam & Southeast Asia visas",
      "End-to-end form filling and biometric slot booking",
      "High approval track record with certified documentation",
    ],
    accentColor: "#059669",
    badge: "Documentation",
  },
  {
    id: "esim",
    title: "International High-Speed eSIMs",
    icon: Smartphone,
    tagline: "Stay seamlessly connected the second you land",
    desc: "No more waiting in airport queues for physical SIMs. Instant QR code activation on your phone with blazing-fast 4G/5G data in 150+ countries.",
    features: [
      "Pre-activated before your international departure",
      "Hotspot tethering supported for laptops & companions",
      "Instant top-up anytime via WhatsApp concierge",
    ],
    accentColor: "#7C3AED",
    badge: "Connectivity",
  },
  {
    id: "chauffeur",
    title: "Outstation Cabs & Private Chauffeurs",
    icon: Car,
    tagline: "Verified luxury fleets with professional drivers",
    desc: "Clean, air-conditioned sedans, SUVs, and luxury coaches with experienced, polite, background-checked chauffeurs for intercity and sightseeing tours.",
    features: [
      "Innovas, Crystas, Fortuners, and luxury Mercedes/Audi fleets",
      "All toll, parking, driver allowance, and fuel covered",
      "Punctual airport transfers with flight tracking",
    ],
    accentColor: "#DC2626",
    badge: "Ground Transfers",
  },
  {
    id: "self-drive",
    title: "International Self-Drive Car Rentals",
    icon: Key,
    tagline: "Freedom of the open road in Europe, Dubai & Australia",
    desc: "Explore coastal highways, alpine passes, and desert dunes at your own pace with international car rentals, comprehensive insurance, and GPS.",
    features: [
      "Top-tier fleets: SUVs, convertibles, campervans, and luxury sedans",
      "International Driving Permit (IDP) consultation",
      "Zero-deductible insurance & 24/7 roadside breakdown cover",
    ],
    accentColor: "#EA580C",
    badge: "Road Trips",
  },
  {
    id: "cruise",
    title: "Luxury Cruise Holidays",
    icon: Ship,
    tagline: "Floating 5-star resorts across oceans & rivers",
    desc: "Curated ocean cruises in the Mediterranean, Caribbean, Singapore, and Kerala backwater houseboats with all-inclusive entertainment and dining.",
    features: [
      "Royal Caribbean, Costa Cruises, Cordelia, and Nile river ships",
      "Private ocean-view balcony suites and concierge decks",
      "All meals, onboard theatrical shows, and port shore excursions",
    ],
    accentColor: "#0D9488",
    badge: "Ocean Voyages",
  },
  {
    id: "insurance",
    title: "Comprehensive Travel Insurance",
    icon: ShieldCheck,
    tagline: "Complete financial and medical peace of mind",
    desc: "Overseas emergency medical coverage, trip cancellation protection, baggage loss compensation, and cashless hospitalization worldwide.",
    features: [
      "Schengen & global visa compliant policies",
      "24/7 emergency medical assistance helpline",
      "Flight delay and missed connection compensation",
    ],
    accentColor: "#16A34A",
    badge: "Protection",
  },
];

const Experiences = () => {
  const [enquiryService, setEnquiryService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative pt-36 pb-20 px-6 bg-gradient-to-b from-[#12231A] via-[#1A2E23] to-[#12231A] text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              End-To-End Travel Concierge
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-5">
              <BlurText text="Curated Experiences & Services" animateBy="words" className="text-white" />
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
              From privileged 5-star hotel tariffs and private chauffeurs to seamless visa approvals and international eSIMs — we handle every single detail so you just travel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 px-6 bg-[#FDFCF9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <TiltedCard
                    maxAngle={8}
                    scale={1.02}
                    className="h-full rounded-[28px] overflow-hidden bg-white border border-gray-100 shadow-[0_6px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.1)] hover:border-emerald-200/80 transition-all duration-300 flex flex-col p-8 cursor-pointer"
                    onClick={() => setEnquiryService(exp.title)}
                  >
                    {/* Header with Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: `${exp.accentColor}15`, color: exp.accentColor }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        {exp.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 italic mb-4">
                      {exp.tagline}
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                      {exp.desc}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                      {exp.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEnquiryService(exp.title);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold tracking-widest transition-all duration-200 shadow-md"
                    >
                      ENQUIRE FOR THIS SERVICE
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </TiltedCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ SECTION FOR SERVICES */}
      <FAQSection
        title="Services & Logistics FAQ"
        subtitle="Common questions regarding flights, hotel perks, visas, eSIMs, and private transport."
        badge="Concierge Help"
        showCategories={true}
      />

      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={!!enquiryService}
        destination={enquiryService ? `Service: ${enquiryService}` : ""}
        onClose={() => setEnquiryService(null)}
      />
    </div>
  );
};

export default Experiences;
