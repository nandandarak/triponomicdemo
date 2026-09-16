import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Heart, Home, Backpack, ArrowRight, Sparkles, Compass } from "lucide-react";
import EnquiryModal from "./EnquiryModal";
import TrailBuilderModal from "./TrailBuilderModal";
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
    trailVibe: "Solo" as const,
    actionText: "Plan My Solo Trip",
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
    trailVibe: "Couple" as const,
    actionText: "Plan My Honeymoon Trip",
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
    trailVibe: "Family" as const,
    actionText: "Plan My Family Trip",
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
    trailVibe: "Friends" as const,
    actionText: "Plan My Friends Trip",
  },
];

/* ------------------------------------------------------------------ */
/*  CARD COMPONENT                                                       */
/* ------------------------------------------------------------------ */

const CategoryCard = ({
  category,
  index,
  onPlanTrail,
}: {
  category: (typeof categories)[0];
  index: number;
  onPlanTrail: (vibe: "Couple" | "Family" | "Friends" | "Solo") => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <SpotlightCard
        spotlightColor={category.spotlightColor}
        spotlightSize={360}
        className="relative w-full aspect-[3/4] overflow-hidden rounded-[26px] cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.16)] transition-all duration-500 border border-white/30 bg-slate-900"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onPlanTrail(category.trailVibe)}
      >
        {/* Background image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-slate-900"
          style={{ backgroundImage: `url(${category.image})` }}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Multi-tier gradient overlay for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300" />

        {/* Dynamic top highlight badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide shadow-sm">
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
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-5.5 z-20">
          {/* Icon badge with sleek glassmorphism */}
          <motion.div
            className="mb-2 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md shadow-md"
            style={{
              backgroundColor: `${category.accentColor}30`,
              border: `1.5px solid ${category.accentColor}80`,
            }}
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-4 h-4 text-white" />
          </motion.div>

          {/* Label */}
          <p
            className="text-xs uppercase tracking-wider font-extrabold mb-1 drop-shadow-sm"
            style={{ color: category.accentColor }}
          >
            {category.label}
          </p>

          {/* Title / Tagline */}
          <h3 className="text-white text-lg md:text-xl font-bold leading-tight mb-1.5 drop-shadow-md">
            {category.tagline}
          </h3>

          {/* Description — legible and high contrast */}
          <motion.p
            className="text-white/95 text-xs sm:text-[13px] font-medium leading-snug mb-3 line-clamp-2 drop-shadow-sm"
            animate={{ opacity: hovered ? 1 : 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {category.description}
          </motion.p>

          {/* Happy CTA button */}
          <motion.div
            className="flex items-center justify-between pt-2.5 border-t border-white/15 w-full"
            animate={{ opacity: hovered ? 1 : 0.9 }}
          >
            <span className="text-xs font-bold text-white tracking-wide truncate pr-2">
              {category.actionText}
            </span>
            <motion.div
              className="w-7 h-7 shrink-0 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-gray-900 transition-colors shadow-sm"
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
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
  const navigate = useNavigate();

  const handlePlanTrail = (vibe: "Couple" | "Family" | "Friends" | "Solo") => {
    navigate(`/build-trail?vibe=${vibe}`);
  };

  return (
    <section className="pt-12 pb-8 md:pt-14 md:pb-10 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with BlurText */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/60 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            How Do You Travel?
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight"
              >
                Travel Your Way{" "}
                <span className="font-script italic text-emerald-600 font-normal">With Joy</span>
              </motion.h2>
              <p className="mt-2.5 text-gray-600 text-sm max-w-xl leading-relaxed">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              onPlanTrail={handlePlanTrail}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripCategoriesSection;

