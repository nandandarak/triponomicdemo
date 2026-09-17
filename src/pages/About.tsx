import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Award,
  Users,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  Compass,
  Star,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import CountUp from "@/components/animations/CountUp";
import BlurText from "@/components/animations/BlurText";
import ShinyText from "@/components/animations/ShinyText";
import TiltedCard from "@/components/animations/TiltedCard";

import traveler1 from "@/assets/traveler_1.jpg";
import traveler2 from "@/assets/traveler_2.jpg";
import traveler3 from "@/assets/traveler_3.jpg";
import traveler4 from "@/assets/traveler_4.jpg";

const stats = [
  { value: 9000, suffix: "+", label: "Happy Travellers Handled", desc: "Curated with love across India & worldwide" },
  { value: 50, suffix: "+", label: "Destinations Covered", desc: "From Himalayan valleys to European lakes" },
  { value: 100, suffix: "%", label: "Tailor-Made Routes", desc: "Zero cookie-cutter off-the-shelf packages" },
];

const pillars = [
  {
    icon: Compass,
    title: "100% Customized Trips",
    desc: "Every trip is designed around your preferences, pace, and budget. No rushed tours or fixed schedules.",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    icon: Star,
    title: "Handpicked Quality Stays",
    desc: "Direct partnerships with top-rated hotels and trusted resorts to give you the best comfort, service, and rates.",
    color: "#D97706",
    bg: "#FFFBEB",
  },
  {
    icon: ShieldCheck,
    title: "Zero Hidden Costs",
    desc: "Clear and honest pricing. Stays, sightseeing, private cabs, and taxes are clearly listed upfront with no surprises.",
    color: "#0284C7",
    bg: "#F0F9FF",
  },
  {
    icon: Heart,
    title: "24/7 Personal Support",
    desc: "Real travel experts available on WhatsApp and call anytime, from planning until you return home safely.",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
];

const About = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden bg-gradient-to-b from-[#12231A] via-[#1A2E23] to-[#12231A] text-white">
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-4">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              The Triponomic Story
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
              <BlurText text="We Don't Sell Tours. We Handcraft Memories." animateBy="words" className="text-white" />
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10">
              Born in Indore out of an obsession with authentic wanderlust, Triponomic was built to replace impersonal, rigid travel packages with genuine human care, insider routes, and effortless luxury.
            </p>
          </motion.div>

          {/* STATS STRIP WITH REACTBITS COUNTUP */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center"
              >
                <p className="text-4xl sm:text-5xl font-extrabold text-emerald-300 mb-1">
                  <CountUp to={stat.value} duration={2.2} />
                  <span>{stat.suffix}</span>
                </p>
                <p className="text-xs sm:text-sm font-bold text-white mb-1">
                  {stat.label}
                </p>
                <p className="text-[11px] text-white/60">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY & PHILOSOPHY SECTION */}
      <section className="py-24 px-6 bg-[#FDFCF9]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Our Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Travel Should Make Your Heart Skip a Beat
            </h2>

            <div className="space-y-4 text-gray-600 text-base leading-relaxed mb-8">
              <p>
                For too long, booking a vacation in India meant either gambling with random online booking sites or getting crammed into a bus on a rigid 50-person group tour with fixed dining stops and rushed sights.
              </p>
              <p>
                Triponomic was founded by <strong>Keshav Rathi</strong> with a clear promise: <em>Every traveler deserves a dedicated travel curator who listens to their dreams and designs a journey that feels exclusively theirs.</em>
              </p>
              <p>
                Whether you're sipping kahwa on a private shikara in Dal Lake, waking up to the mist in a tea estate in Munnar, or crossing Swiss mountain passes on a first-class panoramic train — our team is behind the scenes orchestrating every single detail with precision and warmth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-xl">
                ★
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  Headquartered in Indore, Planning Trips Globally
                </p>
                <p className="text-xs text-gray-600">
                  720, 7th Floor, 26 Service Rd, Tapeshwari Bagh Colony, Indore, MP. Available on call & WhatsApp 24 hours a day.
                </p>
              </div>
            </div>
          </div>

          {/* REAL TRAVELER GALLERY */}
          <div className="grid grid-cols-2 gap-4">
            <TiltedCard maxAngle={10} className="rounded-3xl overflow-hidden aspect-square shadow-lg">
              <img src={traveler1} alt="Triponomic Himalayan traveler" className="w-full h-full object-cover" />
            </TiltedCard>
            <TiltedCard maxAngle={10} className="rounded-3xl overflow-hidden aspect-square shadow-lg mt-6">
              <img src={traveler2} alt="Triponomic heritage traveler" className="w-full h-full object-cover" />
            </TiltedCard>
            <TiltedCard maxAngle={10} className="rounded-3xl overflow-hidden aspect-square shadow-lg -mt-6">
              <img src={traveler3} alt="Triponomic tropical holiday traveler" className="w-full h-full object-cover" />
            </TiltedCard>
            <TiltedCard maxAngle={10} className="rounded-3xl overflow-hidden aspect-square shadow-lg">
              <img src={traveler4} alt="Triponomic alpine explorer" className="w-full h-full object-cover" />
            </TiltedCard>
          </div>
        </div>
      </section>

      {/* 4 TRUST PILLARS */}
      <section className="py-20 px-6 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Why Travelers Choose Us
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Our 4 simple promises for every trip we plan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, index) => {
              const Icon = p.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-[#faf8f5] border border-gray-100 hover:border-emerald-200 transition-all shadow-sm flex flex-col"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: p.bg, color: p.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed flex-1">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIRECT INQUIRY CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#12231A] via-[#1A2E23] to-[#12231A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-5">
            Ready to craft your next unforgettable story?
          </h2>
          <p className="text-white/70 text-base max-w-xl mx-auto mb-8">
            Tell us where your heart wants to wander. We'll design a complimentary, fully customized itinerary tailored just for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              PLAN MY CUSTOM TRIP
            </button>
            <a
              href="https://wa.me/919611922632"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full text-xs font-bold tracking-widest transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        destination="About Triponomic - Custom Journey"
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
};

export default About;
