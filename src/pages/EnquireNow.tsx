import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

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
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Inquiry Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-4">
              Plan Your Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Tell us about your dream destination and we'll craft a personalized
              experience just for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12">
            {/* CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2 space-y-8"
            >
              <div className="bg-card rounded-card p-8 shadow-card">
                <h2 className="text-xl font-medium text-foreground mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Phone
                      </p>
                      <a
                        href="tel:+919752177088"
                        className="block text-foreground font-medium hover:text-primary transition-colors"
                      >
                        +91 97521 77088
                      </a>
                      <a
                        href="tel:+919611922632"
                        className="block text-foreground font-medium hover:text-primary transition-colors"
                      >
                        +91 96119 22632
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:trips@triponomic.in"
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        trips@triponomic.in
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Address
                      </p>
                      <p className="text-foreground font-medium leading-relaxed">
                        720, 7th Floor, 26, Service Rd, Tapeshwari Bagh Colony,
                        <br />
                        Indore, Madhya Pradesh 452016
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-3"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-card p-8 shadow-card"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-button bg-secondary/50 border border-border/50"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-button bg-secondary/50 border border-border/50"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-button bg-secondary/50 border border-border/50"
                      placeholder="+91 97521 77088"
                    />
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Preferred Destination
                    </label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-button bg-secondary/50 border border-border/50"
                    >
                      <option value="">Select a destination</option>
                      <option value="Domestic">Domestic</option>
                      <option value="International">International</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-button bg-secondary/50 border border-border/50 resize-none"
                    placeholder="Tell us about your travel plans..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 w-full py-4 bg-primary text-primary-foreground rounded-button font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : <>
                    <Send className="w-5 h-5" /> Send Inquiry
                  </>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EnquireNow;
