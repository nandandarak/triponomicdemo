import { motion } from "framer-motion";
import {
  HelpCircle,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BlurText from "@/components/animations/BlurText";

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "diff-portal",
    category: "Planning & Customization",
    question: "How is Triponomic different from online booking portals?",
    answer:
      "Unlike automated aggregators that lock you into rigid, pre-packaged tours with hidden clauses, Triponomic provides 100% custom-crafted travel. We pair you with a dedicated travel architect who designs your journey from scratch — factoring in your pace, personal interests, dietary needs, and budget. Plus, you get direct 5-star hotel partner privileges and round-the-clock on-ground concierge support.",
  },
  {
    id: "customization-flexibility",
    category: "Planning & Customization",
    question: "Can I customize every detail of my itinerary, and are changes allowed?",
    answer:
      "Yes, completely! You have full control over your dates, hotel tiers, sightseeing pace, and transport options. Once our travel architect drafts your initial itinerary, you can fine-tune, add excursions, or swap stays with unlimited revisions until you are 100% satisfied.",
  },
  {
    id: "hotel-only-booking",
    category: "Hotels & Stays",
    question: "Can I book only luxury hotels through Triponomic without a full tour package?",
    answer:
      "Yes! If you already have your flights sorted and just want a great hotel, we can book it for you with better rates and added perks like free breakfast or room upgrades.",
  },
  {
    id: "visas-flights",
    category: "Flights & Visas",
    question: "Do you handle international visa applications, flight bookings, and travel insurance?",
    answer:
      "Yes, we handle everything. We book your flights, help with visa documents, arrange travel insurance, and even get you an international SIM card so your phone works the moment you land.",
  },
  {
    id: "payment-terms",
    category: "Payments & Safety",
    question: "What is your payment structure, and are there any hidden fees?",
    answer:
      "No hidden fees, ever. We charge a small deposit to confirm your trip, and the rest is paid in easy parts before you travel. You can pay via UPI, bank transfer, or credit card.",
  },
  {
    id: "on-trip-support",
    category: "Payments & Safety",
    question: "What support do you offer while I am actively travelling on my trip?",
    answer:
      "Every Triponomic guest gets a personal trip manager and is added to a private WhatsApp group. Whether you need to reschedule a pickup, find a good restaurant, or handle an unexpected delay — we're available 24/7 to help.",
  },
  {
    id: "group-trips",
    category: "Planning & Customization",
    question: "Do you organize squad getaways, corporate offsites, and destination wedding guest travel?",
    answer:
      "Yes! We handle group trips with friends, family outings, and even corporate team travel — with group discounts, private buses, and activities planned for everyone.",
  },
];

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  faqs?: FAQItem[];
  items?: FAQItem[];
  className?: string;
  id?: string;
}

const FAQSection = ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about crafting your dream journey with Triponomic.",
  badge = "Clear Answers, Zero Doubts",
  faqs,
  items,
  className = "",
  id = "faq",
}: FAQSectionProps) => {
  const allFaqs = faqs || items || DEFAULT_FAQS;

  return (
    <section
      id={id}
      className={`py-12 md:py-16 px-6 relative overflow-hidden bg-gradient-to-b from-background via-emerald-50/15 to-background ${className}`}
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            {badge}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            <BlurText text={title} animateBy="words" className="text-gray-900" />
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 mb-10"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {allFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-gray-100 rounded-2xl px-5 py-1 transition-all duration-200 hover:border-emerald-200/70 data-[state=open]:border-emerald-300 data-[state=open]:bg-emerald-50/20"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 text-base py-4 hover:no-underline hover:text-emerald-700 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-xs font-bold text-emerald-700/70 bg-emerald-100/60 rounded-full px-2 py-0.5 mt-0.5 shrink-0">
                      Q{index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm leading-relaxed pt-1 pb-4 pl-9 pr-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still Have Questions CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#12231A] via-[#1A2E23] to-[#12231A] text-white p-8 sm:p-10 shadow-xl"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold tracking-wider uppercase border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Personal Trip Architect
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Have a unique question about your journey?
              </h3>
              <p className="text-white/70 text-sm max-w-lg">
                Talk directly with our trip curation team. We're happy to discuss custom routes, special hotel requests, or private group arrangements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href="https://wa.me/919611922632?text=Hi%20Triponomic%20team,%20I%20have%20a%20question%20about%20planning%20my%20trip."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                CHAT ON WHATSAPP
              </a>

              <a
                href="tel:+919611922632"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs tracking-wider transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                CALL +91 96119 22632
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
