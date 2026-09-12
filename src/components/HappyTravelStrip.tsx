import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, ShieldCheck, HeartHandshake, Compass, Clock } from "lucide-react";

export const HappyTravelStrip = () => {
  const highlights = [
    {
      icon: Compass,
      title: "100% Customized Trips",
      desc: "Tailored to your mood, pace & budget",
      color: "#059669",
      bgColor: "#ECFDF5",
    },
    {
      icon: Star,
      title: "Handpicked 5-Star Stays",
      desc: "ITC, Taj, Leela, Oberoi & boutique gems",
      color: "#D97706",
      bgColor: "#FFFBEB",
    },
    {
      icon: HeartHandshake,
      title: "Zero-Stress Travel",
      desc: "Flights, visas, transfers & local guides handled",
      color: "#0284C7",
      bgColor: "#F0F9FF",
    },
    {
      icon: Clock,
      title: "24/7 Live Concierge",
      desc: "Always a WhatsApp ping away during your journey",
      color: "#7C3AED",
      bgColor: "#F5F3FF",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      {/* Happy Travelers Pill Counter */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 md:p-6 rounded-3xl bg-gradient-to-r from-emerald-50/80 via-amber-50/50 to-teal-50/80 border border-emerald-100/80 shadow-[0_8px_30px_rgba(16,185,129,0.05)] backdrop-blur-sm"
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3 overflow-hidden">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Happy traveler"
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              alt="Happy traveler"
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
              alt="Happy traveler"
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
              alt="Happy traveler"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-gray-800 ml-1">4.9 / 5.0</span>
            </div>
            <p className="text-xs text-gray-600 font-medium">
              Trusted by <span className="font-bold text-emerald-800">500+ happy wanderers</span> across India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-emerald-700 font-semibold text-xs border border-emerald-200/80 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Fresh 2026 Itineraries Open
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-teal-700 font-semibold text-xs border border-teal-200/80 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Verified Partners
          </span>
        </div>
      </motion.div>

      {/* Grid of 4 joyful feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.08)] hover:border-emerald-200/60 transition-all flex items-start gap-3.5"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: item.bgColor, color: item.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HappyTravelStrip;
