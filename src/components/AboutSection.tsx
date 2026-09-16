import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Users, MapPin, Award, Sparkles, Heart, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER                                                     */
/* ------------------------------------------------------------------ */

const useCounter = (target: number, duration = 1600, isActive: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Fast start, smooth deceleration
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, isActive]);

  return count;
};

const StatCard = ({
  value,
  suffix,
  label,
  icon: Icon,
  isActive,
  delay,
  color,
  bgLight,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  delay: number;
  color: string;
  bgLight: string;
}) => {
  const count = useCounter(value, 2000, isActive);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col gap-2 p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.08)] transition-all"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-1 transition-transform group-hover:scale-110"
        style={{ backgroundColor: bgLight, color: color }}
      >
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-4xl font-extrabold text-gray-900 tracking-tight">
        {count}
        <span style={{ color: color }}>{suffix}</span>
      </p>
      <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase">{label}</p>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  MOSAIC IMAGES                                                        */
/* ------------------------------------------------------------------ */

const mosaicImages = [
  {
    src: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=600&q=80",
    alt: "Taj Mahal at sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
    alt: "Mountain landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
    alt: "Kerala backwaters",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    alt: "Luxury resort pool",
  },
];

const stats = [
  { value: 9000, suffix: "+", label: "Happy Travellers", icon: Users, delay: 0, color: "#059669", bgLight: "#ECFDF5" },
  { value: 50, suffix: "+", label: "Destinations Covered", icon: MapPin, delay: 0.1, color: "#D97706", bgLight: "#FFFBEB" },
  { value: 5, suffix: "+", label: "Years of Excellence", icon: Award, delay: 0.2, color: "#0284C7", bgLight: "#F0F9FF" },
  { value: 100, suffix: "%", label: "Personalized Care", icon: Sparkles, delay: 0.3, color: "#7C3AED", bgLight: "#F5F3FF" },
];

/* ------------------------------------------------------------------ */
/*  SECTION                                                              */
/* ------------------------------------------------------------------ */

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 px-6 bg-gradient-to-b from-background via-emerald-50/20 to-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main content — split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Copy + Stats + CTA */}
          <div className="flex flex-col justify-center">
            {/* Section Header */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/60 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                More Than a <span className="text-emerald-700">Travel Agency</span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4 mb-8"
            >
              <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
                Triponomic was born from a deep love for wanderlust and the belief that travel should make your heart skip a beat. We don't do cookie-cutter tours — we handcraft happy memories that linger forever.
              </p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                From morning mist in Gulmarg to twilight over the caldera in Santorini, our team takes the stress completely off your plate:
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "100% custom-crafted domestic & international routes",
                  "Direct 5-star hotel partner rates (ITC, Taj, Leela, Marriott & more)",
                  "End-to-end support with flights, visas, and private chauffeurs",
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} isActive={isInView} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                to="/enquire"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-bold tracking-widest transition-all duration-300 shadow-[0_10px_25px_rgba(5,150,105,0.25)] hover:shadow-[0_15px_30px_rgba(5,150,105,0.35)] hover:scale-105"
              >
                PLAN MY DREAM TRIP
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919611922632"
                className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
              >
                Direct Call: <span className="font-bold text-gray-900">+91-96119 22632</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Image mosaic with floating happiness card */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {mosaicImages.map((img, i) => (
                <motion.div
                  key={img.alt}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                  className={`overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/60 ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                    }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-108 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Floating happiness badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-emerald-100 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">100% Worry-Free Trips</p>
                <p className="text-[11px] text-gray-500">Every booking personally verified</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

