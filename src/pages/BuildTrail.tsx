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
      "We use our direct tie-ups with top 5-star hotels and trusted local drivers to give you real prices. When you change your hotel type, group size, or add flights, the quote updates instantly — with no hidden fees.",
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
      "A pre-formatted message with your chosen departure city, destination, traveler count, stay preference, and trip details opens in WhatsApp directly with our trip curator, who will share a customized proposal with you.",
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
              TRIPONOMIC JOURNEY CRAFTER • 100% CUSTOMIZED ITINERARIES
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
              <BlurText text="Build Your Custom Journey" animateBy="words" className="text-white" />
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6 font-light">
              Tailor departure city, destination, pacing, and 5-star hotel tiers with custom tailored tariffs and instant WhatsApp itinerary export.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TRAIL BUILDER MAIN CONTAINER ── */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-4">
        <InteractiveTrailBuilder
          initialDestination={destParam}
          initialVibe={vibeParam}
          initialStep={stepParam || 1}
          className="shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-200/80"
        />
      </main>

      {/* ── FAQ SECTION ── */}
      <FAQSection
        className="!py-6 sm:!py-8 !pt-4 border-t border-gray-100"
        title="Trail Builder Frequently Asked Questions"
        subtitle="Everything you need to know about customizing your itinerary and real-time pricing"
        faqs={trailBuilderFaqs}
      />

      <Footer />
    </div>
  );
};

export default BuildTrail;
