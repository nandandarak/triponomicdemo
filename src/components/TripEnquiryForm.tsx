import { useState } from "react";
import { addEnquiry } from "@/services/enquiryStore";
import { AlertCircle } from "lucide-react";

interface Props {
  destination: string;
  onSuccess: () => void;
}

const FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfqfDU_lEAq_Kv2PVFSZa3lk_vvvE4kBG4dRnp0gWt7XLnFvg/formResponse";

const TripEnquiryForm = ({ destination, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("entry.2005620554") as string) || "Traveler";
    const budget = (formData.get("entry.1203831394") as string) || undefined;

    // 1. Strict 10-digit Phone Validation
    const phoneDigits = phone.replace(/\D/g, "");
    const isValidPhone = phoneDigits.length === 10 || (phoneDigits.length === 12 && phoneDigits.startsWith("91"));
    if (!isValidPhone) {
      setErrorMsg("Phone number must be a valid 10-digit mobile number.");
      return;
    }

    // 2. Strict Email @ Validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg("Email address must contain '@' and a valid domain (e.g. name@domain.com).");
      return;
    }

    setLoading(true);

    try {
      await fetch(FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
    } catch (err) {
      console.error("Google form post error", err);
    }

    // Save lead in admin store
    addEnquiry({
      name,
      phone,
      email: trimmedEmail,
      destination,
      source: "Enquire Modal",
      budget,
      notes: "Submitted via bespoke journey enquiry modal.",
    });

    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* DESTINATION */}
      <div>
        <label className="block text-sm font-medium mb-1">Destination</label>
        <input
          name="entry.396208505"
          value={destination}
          readOnly
          className="w-full px-4 py-3 rounded-lg border bg-gray-100"
        />
      </div>

      {/* NAME */}
      <div>
        <label className="block text-sm font-medium mb-1">Name *</label>
        <input
          name="entry.2005620554"
          required
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#638C7D]"
          placeholder="Your full name"
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number (10 Digits) *</label>
        <input
          type="tel"
          name="entry.1166974658"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errorMsg) setErrorMsg("");
          }}
          required
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#638C7D]"
          placeholder="e.g. 9876543210"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm font-medium mb-1">Email Address *</label>
        <input
          type="email"
          name="entry.1045781291"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMsg) setErrorMsg("");
          }}
          required
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#638C7D]"
          placeholder="you@email.com"
        />
      </div>

      {/* BUDGET */}
      <div>
        <label className="block text-sm font-medium mb-1">Budget (Optional)</label>
        <input
          name="entry.1203831394"
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#638C7D]"
          placeholder="Approx budget"
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-[#638C7D] text-white font-medium hover:bg-[#4A7066] transition cursor-pointer"
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
};

export default TripEnquiryForm;

