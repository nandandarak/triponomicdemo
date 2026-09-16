import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, ShieldCheck, Compass, HeartHandshake, PhoneCall } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteractiveTrailBuilder } from "@/components/InteractiveTrailBuilder";
import BlurText from "@/components/animations/BlurText";
import ShinyText from "@/components/animations/ShinyText";
import FAQSection, { FAQItem } from "@/components/FAQSection";

const trailBuilderFaqs: FAQItem[] = [
  {
    id: "tb-flow",
    category: "How It Works",
    question: "How does the Interactive Trail Builder calculate pricing?",
    answer:
      "Our pricing engine uses live contracts with our 5-star hospitality partners (Taj, ITC, The Leela, Marriott, etc.) and vetted local private chauffeurs. When you toggle flights, hotel tiers, or group size, rates update dynamically in real time with zero hidden markups.",
  },
  {
    id: "tb-custom-spot",
    category: "Destinations",
    question: "Can I type a custom destination not listed in the recommendations?",
    answer:
      "Yes! You can type ANY destination worldwide (e.g. Norway, Georgia, Spiti, Coorg, Iceland, Greece). Our system immediately generates a tailored dynamic itinerary framework and sends your custom parameters straight to our senior travel curators.",
  },
  {
    id: "tb-changes",
    category: "Customization",
    question: "Can I customize the day-by-day activities after building my trail?",
    answer:
      "Absolutely. Once you export your trail to WhatsApp or request a detailed PDF proposal, our dedicated 1-on-1 concierge will fine-tune hotel rooms, private transfers, candlelight dinners, and sightseeing passes to your exact preferences.",
  },
  {
    id: "tb-whatsapp",
    category: "Booking & Support",
    question: "What happens when I click 'Send Trail to WhatsApp'?",
    answer:
      "A pre-formatted message with your chosen departure city, destination, traveler count, hotel tier, and price estimate opens in WhatsApp directly with our trip curator. We usually reply within 15 minutes with a comprehensive proposal.",
  },
];

const BuildTrail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const vibeParam = searchParams.get("vibe") as any;
  const destParam = searchParams.get("destination") || undefined;
  const stepParam = searchParams.get("step")
    ? (Number(searchParams.get("step")) as 1 | 2 | 3 | 4)
    : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#404762] selection:text-white">
      <Header />

      {/* ── TOP HERO BANNER ── */}
      <section className="relative pt-36 pb-16 px-6 bg-gradient-to-b from-[#0f1b29] via-[#151B40] to-background text-white overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#A5B4FC] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              ✨ TRIPONOMIC JOURNEY CRAFTER • 100% BESPOKE ITINERARIES
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
              <BlurText text="Build Your Bespoke Journey" animateBy="words" className="text-white" />
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6 font-light">
              Tailor departure city, destination, pacing, and 5-star hotel tiers with custom tailored tariffs and instant WhatsApp itinerary export.
            </p>

            {/* Quick trust strip */}
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-white/80">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                <Compass className="w-3.5 h-3.5 text-[#93C5FD]" />
                Bespoke Partner Tariffs
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#86EFAC]" />
                Direct 5★ Partner Tariffs
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
                24/7 Dedicated Concierge
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRAIL BUILDER MAIN CONTAINER ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-20">
        <InteractiveTrailBuilder
          initialDestination={destParam}
          initialVibe={vibeParam}
          initialStep={stepParam || 1}
          className="shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-200/80"
        />
      </main>

      {/* ── FAQ SECTION ── */}
      <section className="bg-emerald-50/20 py-16 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <FAQSection
            title="Trail Builder Frequently Asked Questions"
            subtitle="Everything you need to know about customizing your itinerary and real-time pricing"
            faqs={trailBuilderFaqs}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuildTrail;
