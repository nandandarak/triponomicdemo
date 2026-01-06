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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 1200));

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

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* IMPORTANT padding so header doesn't overlap */}
      <main className="pt-[140px] pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-medium mb-4">
              Plan Your Journey
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tell us about your destination and we’ll design a perfect trip.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12">
            {/* CONTACT INFO */}
            <div className="md:col-span-2">
              <div className="bg-card p-8 rounded-2xl shadow-card">
                <h2 className="text-xl font-medium mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
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
                        720, 7th Floor, 26, Service Rd<br />
                        Tapeshwari Bagh Colony<br />
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
                className="bg-card p-8 rounded-2xl shadow-card"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    required
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                  />
                  <input
                    required
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                  />
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select Destination</option>
                    <option>Kashmir</option>
                    <option>Kerala</option>
                    <option>Goa</option>
                    <option>Japan</option>
                    <option>Bali</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your travel requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className="input mt-6 resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 w-full py-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : <>
                    <Send className="w-4 h-4" /> Send Inquiry
                  </>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EnquireNow;
