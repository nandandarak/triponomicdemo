import React, { memo } from "react";
import { Compass, Sparkles, Heart, Sun, Palmtree, Mountain, Camera, Plane } from "lucide-react";

interface MarqueeItem {
  text: string;
  icon?: React.ElementType;
  tag?: string;
}

const defaultItems: MarqueeItem[] = [
  { text: "Bespoke Itineraries", icon: Sparkles, tag: "100% Tailored" },
  { text: "Bali Bliss & Sunsets", icon: Palmtree, tag: "Trending" },
  { text: "Kashmir Meadows & Lakes", icon: Mountain, tag: "Domestic" },
  { text: "Maldives Overwater Luxury", icon: Heart, tag: "Honeymoon" },
  { text: "Swiss Alpine Escapes", icon: Compass, tag: "Europe" },
  { text: "Serengeti Safari Wonders", icon: Camera, tag: "Adventure" },
  { text: "Leh & Spiti Road Trips", icon: Mountain, tag: "Solo / Group" },
  { text: "5-Star Partner Privileges", icon: Sun, tag: "Exclusive" },
];

export const VelocityMarquee: React.FC<{
  items?: MarqueeItem[];
  reverse?: boolean;
  speed?: number;
  className?: string;
}> = memo(({ items = defaultItems, reverse = false, speed = 35, className = "" }) => {
  // Render two sets for seamless infinite loop on GPU compositor
  const displayItems = [...items, ...items];

  return (
    <div className={`relative w-full overflow-hidden py-3 select-none ${className}`}>
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* GPU hardware-composited ticker */}
      <div
        className={`flex gap-4 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}
        style={{
          animationDuration: `${speed}s`,
          transform: "translateZ(0)",
        }}
      >
        {displayItems.map((item, idx) => {
          const Icon = item.icon || Sparkles;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/95 border border-emerald-500/20 shadow-sm hover:border-emerald-500/40 hover:scale-105 transition-transform duration-200 group"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:rotate-12 transition-transform">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs md:text-sm font-semibold text-gray-800 whitespace-nowrap">
                {item.text}
              </span>
              {item.tag && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                  {item.tag}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

VelocityMarquee.displayName = "VelocityMarquee";

export default VelocityMarquee;
