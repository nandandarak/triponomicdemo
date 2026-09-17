import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { useToast } from "@/hooks/use-toast";
import BlurText from "@/components/animations/BlurText";
import { addEnquiry } from "@/services/enquiryStore";

const enquiryFaqs = [
  {
    id: "enq-response-time",
    category: "Consultation & Quotes",
    question: "How quickly will Triponomic get back to me?",
    answer:
      "Our team reviews new inquiries promptly. You can expect a response within 2-4 business hours (or within 30 minutes on WhatsApp during business hours) to schedule a short consultation call and understand your travel vision.",
  },
  {
    id: "enq-quote-cost",
    category: "Consultation & Quotes",
    question: "Is receiving a custom itinerary and quote completely free?",
    answer:
      "Yes, 100% free with zero obligation! We take the time to learn your travel style, pacing, and preferences, and curate a detailed itinerary proposal without any upfront fee or pressure.",
  },
  {
    id: "enq-itinerary-revisions",
    category: "Consultation & Quotes",
    question: "Can I adjust or modify the itinerary after receiving the initial quote?",
    answer:
      "Absolutely. Custom travel planning is fully collaborative. You can adjust sightseeing spots, upgrade or change hotel categories, modify dates, or tweak flight times with unlimited revisions until it's just right.",
  },
  {
    id: "enq-info-needed",
    category: "Consultation & Quotes",
    question: "What details should I mention to get the most tailored proposal?",
    answer:
      "Helpful details include your tentative travel month/dates, travel party size (adults & children), preferred vibe (relaxed leisure, romantic escape, action-packed adventure), hotel tier (boutique, 4-star, 5-star luxury), and any special milestones (honeymoon, birthday, anniversary).",
  },
  {
    id: "enq-direct-call",
    category: "Consultation & Quotes",
    question: "Can I speak directly with a travel architect right away?",
    answer:
      "Yes! If you prefer a quick phone conversation instead of waiting, call our direct lines at +91-96119 22632 or +91-97521 77088, or tap the WhatsApp button to chat with our team immediately.",
  },
];

const EnquireNow = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const url = "https://docs.google.com/forms/d/e/1FAIpQLSfqfDU_lEAq_Kv2PVFSZa3lk_vvvE4kBG4dRnp0gWt7XLnFvg/formResponse";
    
    const formParams = new URLSearchParams();
    formParams.append("entry.2005620554", formData.name.trim());
    formParams.append("entry.1166974658", formData.phone.trim());
    formParams.append("entry.1045781291", formData.email.trim());
    formParams.append("entry.1203831394", "Quote On Request");
    formParams.append("entry.396208505", formData.destination.trim() || "General Inquiry");
    formParams.append("entry.1012744002", formData.message.trim());

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: formParams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Also record in local store & trigger background sync to Google Sheet
      addEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        destination: formData.destination.trim() || "General Inquiry",
        source: "Contact Us Page",
        budget: "Quote On Request",
        notes: formData.message.trim() || undefined,
      });

      toast({
        title: "Inquiry Sent!",
        description: "Our team will contact you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Content */}
      <main className="pt-[140px] pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/60 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Let's Plan Your Dream Trip
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              <BlurText text="Plan Your Journey" animateBy="words" className="text-gray-900" />
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Tell us what you love, and our expert travel architects will craft a custom-tailored itinerary packed with unforgettable memories.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12">
            {/* CONTACT INFO */}
            <div className="md:col-span-2">
              <div className="bg-card p-8 rounded-3xl shadow-sm">
                <h2 className="text-xl font-medium mb-8">
                  Contact Information
                </h2>

                <div className="space-y-8">
                  {/* PHONE */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href="tel:+919752177088"
                        className="block font-medium hover:text-primary"
                      >
                        +91 9752177088
                      </a>
                      <a
                        href="tel:+919611922632"
                        className="block font-medium hover:text-primary"
                      >
                        +91 9611922632
                      </a>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href="mailto:trips@triponomic.in"
                        className="font-medium hover:text-primary"
                      >
                        trips@triponomic.in
                      </a>
                    </div>
                  </div>

                  {/* ADDRESS */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium leading-relaxed">
                        720, 7th Floor, 26, Service Rd
                        <br />
                        Tapeshwari Bagh Colony
                        <br />
                        Indore, Madhya Pradesh 452016
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="md:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-[#faf7f3] p-10 rounded-3xl shadow-sm"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* NAME */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-800">
                      Full Name
                    </label>
                    <input
                      required
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-[#f5efe9] px-6 py-4
                        text-gray-900 placeholder:text-gray-500
                        outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-800">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-[#f5efe9] px-6 py-4
                        text-gray-900 placeholder:text-gray-500
                        outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* PHONE */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-800">
                      Phone Number
                    </label>
                    <input
                      required
                      name="phone"
                      placeholder="+91 98897 79890"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-[#f5efe9] px-6 py-4
                        text-gray-900 placeholder:text-gray-500
                        outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* DESTINATION – TEXT INPUT */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-800">
                      Preferred Destination
                    </label>
                    <input
                      name="destination"
                      placeholder="Eg. Kashmir, Japan, Europe, Bali..."
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-[#f5efe9] px-6 py-4
                        text-gray-900 placeholder:text-gray-500
                        outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="flex flex-col gap-2 mt-6">
                  <label className="text-sm font-medium text-gray-800">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your travel plans, preferences, and any special requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-3xl bg-[#f5efe9] px-6 py-5
                      text-gray-900 placeholder:text-gray-500
                      outline-none resize-none
                      focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-10 w-full py-5 rounded-full
                    bg-primary text-primary-foreground
                    flex items-center justify-center gap-2
                    text-base font-medium
                    hover:opacity-90 transition"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Inquiry FAQ Section */}
        <FAQSection
          faqs={enquiryFaqs}
          title="Inquiry & Consultation FAQ"
          subtitle="Everything you need to know about the Triponomic consultation process, quotes, and customization."
          badge="Quick Answers"
          showCategories={false}
          className="mt-16 -mx-6 px-6"
        />
      </main>

      <Footer />
    </div>
  );
};

export default EnquireNow;
