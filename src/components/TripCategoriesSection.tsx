import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Heart, Home, Backpack, ArrowRight, Sparkles, Compass } from "lucide-react";
import EnquiryModal from "./EnquiryModal";
import BlurText from "./animations/BlurText";
import SpotlightCard from "./animations/SpotlightCard";

import soloImg from "@/assets/category_solo.jpg";
import honeymoonImg from "@/assets/category_honeymoon.jpg";
import familyImg from "@/assets/category_family.jpg";
import friendsImg from "@/assets/category_friends.jpg";

/* ------------------------------------------------------------------ */
/*  DATA                                                                 */
/* ------------------------------------------------------------------ */

const categories = [
  {
    id: "solo",
    label: "Solo Explorer",
    badge: "🎒 Soul Journeys",
    tagline: "Your pace. Your rules.",
    description: "Handcrafted itineraries for the independent soul. Discover yourself while discovering the world.",
    image: soloImg,
    icon: Backpack,
    accentColor: "#F59E0B",
    spotlightColor: "rgba(245, 158, 11, 0.22)",
    enquiryLabel: "Solo Trip",
  },
  {
    id: "honeymoon",
    label: "Honeymoon",
    badge: "💖 Romantic Escapes",
    tagline: "Romance, perfected.",
    description: "Intimate escapes curated to ignite love — from overwater villas to candlelit mountain hideaways.",
    image: honeymoonImg,
    icon: Heart,
    accentColor: "#EC4899",
    spotlightColor: "rgba(236, 72, 153, 0.22)",
    enquiryLabel: "Honeymoon Package",
  },
  {
    id: "family",
    label: "Family Escape",
    badge: "🌿 Cherished Memories",
    tagline: "Memories for everyone.",
    description: "Safe, fun, and enriching adventures the whole family will treasure for a lifetime.",
    image: familyImg,
    icon: Home,
    accentColor: "#10B981",
    spotlightColor: "rgba(16, 185, 129, 0.22)",
    enquiryLabel: "Family Trip",
  },
  {
    id: "friends",
    label: "Friends Getaway",
    badge: "⚡ Squad Adventures",
    tagline: "Legendary trips. Legendary stories.",
    description: "Epic group adventures with the squad — curated for maximum fun, zero stress.",
    image: friendsImg,
    icon: Users,
    accentColor: "#8B5CF6",
    spotlightColor: "rgba(139, 92, 246, 0.22)",
    enquiryLabel: "Friends Group Trip",
  },
];

/* ------------------------------------------------------------------ */
/*  CARD COMPONENT                                                       */
/* ------------------------------------------------------------------ */

const CategoryCard = ({
  category,
  index,
  onEnquire,
}: {
  category: (typeof categories)[0];
  index: number;
  onEnquire: (label: string) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 min-w-0"
    >
      <SpotlightCard
        spotlightColor={category.spotlightColor}
        spotlightSize={420}
        className="relative overflow-hidden rounded-[28px] cursor-pointer group h-full shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.14)] transition-all duration-500 border border-white/40"
        style={{ minHeight: "530px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onEnquire(category.enquiryLabel)}
      >
        {/* Background image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Multi-tier gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/30 to-black/10 transition-opacity duration-300" />

        {/* Dynamic top highlight badge */}
        <div className="absolute top-5 left-5 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide shadow-sm">
            {category.badge}
          </span>
        </div>

        {/* Hover tint overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: category.accentColor }}
          animate={{ opacity: hovered ? 0.12 : 0 }}
          transition={{ duration: 0.35 }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-7 lg:p-8 z-20">
          {/* Icon badge with sleek glassmorphism */}
          <motion.div
            className="mb-4 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-lg"
            style={{
              backgroundColor: `${category.accentColor}30`,
              border: `1.5px solid ${category.accentColor}80`,
            }}
            animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>

          {/* Label */}
          <p
            className="text-[11px] uppercase tracking-[0.3em] font-extrabold mb-1.5 drop-shadow-sm"
            style={{ color: category.accentColor }}
          >
            {category.label}
          </p>

          {/* Title / Tagline */}
          <h3 className="text-white text-2xl lg:text-3xl font-bold leading-snug mb-2 drop-shadow-md">
            {category.tagline}
          </h3>

          {/* Description — smooth revelation */}
          <motion.p
            className="text-white/80 text-sm leading-relaxed mb-5 line-clamp-3"
            animate={{
              opacity: hovered ? 1 : 0.85,
              y: hovered ? 0 : 4,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {category.description}
          </motion.p>

          {/* Happy CTA button */}
          <motion.div
            className="flex items-center justify-between pt-3 border-t border-white/15 w-full"
            animate={{ opacity: hovered ? 1 : 0.85 }}
          >
            <span className="text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
              Plan My {category.label.split(" ")[0]} Trip
            </span>
            <motion.div
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-gray-900 transition-colors"
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION                                                              */
/* ------------------------------------------------------------------ */

const TripCategoriesSection = () => {
  const [enquiry, setEnquiry] = useState<{ isOpen: boolean; destination: string }>({
    isOpen: false,
    destination: "",
  });

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background via-emerald-50/20 to-background relative overflow-hidden">
      {/* Decorative cheerful background aura */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with BlurText */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/60 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            How Do You Travel?
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                <BlurText text="Travel Your Way" animateBy="words" className="text-gray-900" />{" "}
                <span className="font-script italic text-emerald-600 font-normal">With Joy</span>
              </h2>
              <p className="mt-3 text-gray-600 text-sm md:text-base max-w-xl leading-relaxed">
                Whether you're chasing mindful solitude, unforgettable romance, joyful family moments, or wild adventures with your favorite crew — we craft journeys full of happy memories.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500 hidden sm:inline-block">
                ✨ 4 Signature Experiences
              </span>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              onEnquire={(label) => setEnquiry({ isOpen: true, destination: label })}
            />
          ))}
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiry.isOpen}
        destination={enquiry.destination}
        onClose={() => setEnquiry({ isOpen: false, destination: "" })}
      />
    </section>
  );
};

export default TripCategoriesSection;

