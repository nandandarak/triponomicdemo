import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Plane,
  Hotel,
  Compass,
} from "lucide-react";
import EnquiryModal from "./EnquiryModal";
import ItineraryTimeline from "./ItineraryTimeline";

export interface DestinationDetail {
  name: string;
  category: "Domestic" | "International";
  region: string;
  image: string;
  tagline: string;
  bestTimeToVisit: string;
  duration: string;
  highlightExperiences: string[];
  sampleItinerary: { day: string; title: string; desc: string }[];
  inclusions: string[];
}

interface DestinationDetailModalProps {
  destination: DestinationDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "inclusions">("overview");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  if (!destination) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
            >
              {/* Header Image with Gradient & Close */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                    {destination.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                    {destination.region}
                  </span>
                </div>

                {/* Title & Metadata */}
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1">
                    {destination.name}
                  </h2>
                  <p className="text-sm text-emerald-300 font-medium italic mb-2">
                    {destination.tagline}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      Suggested: {destination.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-300" />
                      Best: {destination.bestTimeToVisit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-gray-100 bg-gray-50/50 px-6 shrink-0">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-3.5 px-4 text-xs font-bold tracking-wider uppercase transition-colors relative ${
                    activeTab === "overview"
                      ? "text-emerald-700"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Overview & Highlights
                  {activeTab === "overview" && (
                    <motion.div
                      layoutId="modalTabPill"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("itinerary")}
                  className={`py-3.5 px-4 text-xs font-bold tracking-wider uppercase transition-colors relative ${
                    activeTab === "itinerary"
                      ? "text-emerald-700"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Sample Itinerary
                  {activeTab === "itinerary" && (
                    <motion.div
                      layoutId="modalTabPill"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("inclusions")}
                  className={`py-3.5 px-4 text-xs font-bold tracking-wider uppercase transition-colors relative ${
                    activeTab === "inclusions"
                      ? "text-emerald-700"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Inclusions & Perks
                  {activeTab === "inclusions" && (
                    <motion.div
                      layoutId="modalTabPill"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700"
                    />
                  )}
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-gray-600">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-extrabold text-emerald-800 mb-2">
                        Top Curated Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {destination.highlightExperiences.map((exp, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/40 border border-emerald-100/60"
                          >
                            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-gray-800 text-xs font-medium">{exp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center gap-3">
                      <Compass className="w-5 h-5 text-amber-600 shrink-0" />
                      <p className="text-xs text-amber-900 leading-relaxed font-medium">
                        Remember: Every detail in this journey can be custom-tailored — swap hotels, extend days, add helicopter rides or private tastings.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "itinerary" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <ItineraryTimeline
                      days={destination.sampleItinerary.map((item) => ({
                        day: item.day,
                        title: item.title,
                        desc: item.desc,
                        location: destination.name,
                        tags: ["5★ Stay", "Private Chauffeur", "Sightseeing"],
                      }))}
                      destinationName={destination.name}
                    />
                  </motion.div>
                )}

                {activeTab === "inclusions" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h4 className="text-xs uppercase tracking-widest font-extrabold text-emerald-800 mb-2">
                      What's Included In This Custom Route
                    </h4>
                    <div className="space-y-2">
                      {destination.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-gray-800">
                          24/7 Dedicated Trip Manager Support Included
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        Zero Worry Guarantee
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-gray-500 font-medium">Bespoke Proposal</p>
                  <p className="text-sm font-bold text-emerald-800">100% Free Consultation & Quote</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      onClose();
                      setIsEnquiryOpen(true);
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold tracking-widest transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    CUSTOMIZE THIS ROUTE
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <EnquiryModal
        isOpen={isEnquiryOpen}
        destination={`${destination.name} (${destination.category})`}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </>
  );
};

export default DestinationDetailModal;
