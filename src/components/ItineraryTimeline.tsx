import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Hotel,
  Car,
  Utensils,
  Camera,
  Compass,
  Clock,
  Sparkles,
  ChevronDown,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export interface TimelineDay {
  day: string;
  title: string;
  desc: string;
  location?: string;
  tags?: string[];
  meals?: string;
  stay?: string;
  transport?: string;
  highlightImage?: string;
}

interface ItineraryTimelineProps {
  days: TimelineDay[];
  destinationName?: string;
  onCustomizeDay?: (dayIndex: number) => void;
  className?: string;
}

const getTagIcon = (tag: string) => {
  const lower = tag.toLowerCase();
  if (lower.includes("flight") || lower.includes("arrival") || lower.includes("departure"))
    return Plane;
  if (lower.includes("hotel") || lower.includes("resort") || lower.includes("stay") || lower.includes("villa"))
    return Hotel;
  if (lower.includes("drive") || lower.includes("transfer") || lower.includes("shikara") || lower.includes("cruise") || lower.includes("car"))
    return Car;
  if (lower.includes("dinner") || lower.includes("lunch") || lower.includes("breakfast") || lower.includes("food"))
    return Utensils;
  return Camera;
};

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({
  days,
  destinationName = "Your Journey",
  onCustomizeDay,
  className = "",
}) => {
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 0: true });

  const toggleDay = (idx: number) => {
    setExpandedDays((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    days.forEach((_, i) => (all[i] = true));
    setExpandedDays(all);
  };

  const collapseAll = () => {
    setExpandedDays({});
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header controls */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
            Day-By-Day Route Plan
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
            {days.length} Days
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <button
            onClick={expandAll}
            className="hover:text-emerald-700 transition-colors"
          >
            Expand All
          </button>
          <span>•</span>
          <button
            onClick={collapseAll}
            className="hover:text-emerald-700 transition-colors"
          >
            Collapse
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-emerald-200 ml-4 pl-6 space-y-6 py-2">
        {days.map((item, index) => {
          const isExpanded = !!expandedDays[index];
          const tags = item.tags || ["Sightseeing", "Private Chauffeur", "5★ Stay"];

          return (
            <div key={index} className="relative group">
              {/* Timeline marker node */}
              <div
                onClick={() => toggleDay(index)}
                className={`absolute -left-[35px] top-1 w-5 h-5 rounded-full border-2 border-white ring-2 ring-emerald-300 flex items-center justify-center transition-colors cursor-pointer ${
                  isExpanded ? "bg-emerald-600" : "bg-emerald-100 group-hover:bg-emerald-400"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Day Card */}
              <div
                onClick={() => toggleDay(index)}
                className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.08)] transition-all cursor-pointer"
              >
                {/* Day Header Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100/80 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
                      {item.day}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-emerald-700" : ""
                    }`}
                  />
                </div>

                {/* Day Title */}
                <h4 className="text-base font-bold text-gray-900 mt-2 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h4>

                {/* Quick activity tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tags.map((tag, tIdx) => {
                    const TagIcon = getTagIcon(tag);
                    return (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-600 bg-gray-50 border border-gray-200/70 px-2 py-0.5 rounded-md"
                      >
                        <TagIcon className="w-2.5 h-2.5 text-emerald-600" />
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Expandable Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-gray-600 leading-relaxed mt-4 pt-3 border-t border-gray-100">
                        {item.desc}
                      </p>

                      {/* Day Logistics Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 text-[11px]">
                        <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100/60">
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Accommodation</p>
                          <p className="font-semibold text-emerald-950 mt-0.5">{item.stay || "Handpicked 5★ Resort"}</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-100/60">
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Included Meals</p>
                          <p className="font-semibold text-amber-950 mt-0.5">{item.meals || "Daily Breakfast & Dinner"}</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-sky-50/50 border border-sky-100/60">
                          <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Private Transport</p>
                          <p className="font-semibold text-sky-950 mt-0.5">{item.transport || "Dedicated Chauffeur Car"}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItineraryTimeline;
