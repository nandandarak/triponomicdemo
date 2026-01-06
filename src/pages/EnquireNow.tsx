import { useState } from "react";

interface Props {
  destination: string;
  onSuccess: () => void;
}

const FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfqfDU_lEAq_Kv2PVFSZa3lk_vvvE4kBG4dRnp0gWt7XLnFvg/formResponse";

const TripEnquiryForm = ({ destination, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    await fetch(FORM_ACTION_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    setLoading(false);
    onSuccess();
  };

  return (
    /* SCROLL AREA */
    <div className="max-h-[65vh] overflow-y-auto pr-2">
      <form onSubmit={handleSubmit} className="space-y-6 pb-6">
        {/* DESTINATION */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Destination
          </label>
          <input
            name="entry.396208505"
            value={destination}
            readOnly
            className="w-full px-4 py-3 rounded-lg border bg-gray-100"
          />
        </div>

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            name="entry.2005620554"
            required
            className="w-full px-4 py-3 rounded-lg border"
            placeholder="Your full name"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone
          </label>
          <input
            name="entry.1166974658"
            required
            className="w-full px-4 py-3 rounded-lg border"
            placeholder="Your phone number"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="entry.1045781291"
            required
            className="w-full px-4 py-3 rounded-lg border"
            placeholder="you@email.com"
          />
        </div>

        {/* BUDGET */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Budget
          </label>
          <input
            name="entry.1203831394"
            className="w-full px-4 py-3 rounded-lg border"
            placeholder="Approx budget"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-[#638C7D] text-white font-medium hover:bg-[#4A7066] transition"
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default TripEnquiryForm;
