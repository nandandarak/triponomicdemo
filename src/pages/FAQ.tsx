import { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection, { DEFAULT_FAQS } from "@/components/FAQSection";
import BlurText from "@/components/animations/BlurText";
import EnquiryModal from "@/components/EnquiryModal";

const FAQ = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO BANNER */}
      <section className="relative pt-36 pb-20 px-6 bg-gradient-to-b from-[#12231A] via-[#1A2E23] to-[#12231A] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              Help & Knowledge Hub
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-5">
              <BlurText text="Frequently Asked Questions" animateBy="words" className="text-white" />
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-6">
              Got questions about planning, payments, hotel partnerships, visas, or on-trip concierge? We've got clear, honest answers.
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
              <a
                href="https://wa.me/919611922632"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-center group"
              >
                <MessageSquare className="w-6 h-6 text-[#25D366] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs text-white/60">Fastest Response</p>
                <p className="text-sm font-bold text-white">WhatsApp Chat</p>
              </a>

              <a
                href="tel:+919611922632"
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-center group"
              >
                <Phone className="w-6 h-6 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs text-white/60">Talk to Curator</p>
                <p className="text-sm font-bold text-white">+91 96119 22632</p>
              </a>

              <a
                href="mailto:trips@triponomic.in"
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-center group"
              >
                <Mail className="w-6 h-6 text-amber-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs text-white/60">Email Inquiries</p>
                <p className="text-sm font-bold text-white">trips@triponomic.in</p>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL FAQ SECTION COMPONENT */}
      <FAQSection
        title="Explore Common Questions"
        subtitle="Search or filter through categories to find quick answers about our custom-tailored travel service."
        badge="Zero Guesswork"
        showCategories={true}
        className="bg-[#FDFCF9]"
      />

      <Footer />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        destination="FAQ Assistance"
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
};

export default FAQ;
