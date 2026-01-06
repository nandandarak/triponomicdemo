interface Props {
  destination: string;
  onClose: () => void;
}

const GoogleFormModal = ({ destination, onClose }: Props) => {
  const FORM_BASE_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfqfDU_lEAq_Kv2PVFSZa3lk_vvvE4kBG4dRnp0gWt7XLnFvg/viewform";

  // Google Form field ID for Destination
  const DESTINATION_FIELD_ID = "entry.396208505";

  // Prefilled + embedded Google Form URL
  const src = `${FORM_BASE_URL}?embedded=true&${DESTINATION_FIELD_ID}=${encodeURIComponent(
    destination
  )}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[95%] max-w-4xl h-[90%] bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-white text-2xl hover:bg-black transition"
          aria-label="Close enquiry form"
        >
          ×
        </button>

        {/* Google Form Iframe */}
        <iframe
          title="Trip Enquiry Form"
          src={src}
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};

export default GoogleFormModal;
