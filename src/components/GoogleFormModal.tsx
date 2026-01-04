interface Props {
  destination: string;
  onClose: () => void;
}

const GoogleFormModal = ({ destination, onClose }: Props) => {
  const FORM_BASE =
    "https://docs.google.com/forms/d/e/1FAIpQLSfqfDU_lEAq_Kv2PVFSZa3lk_vvvE4kBG4dRnp0gWt7XLnFvg/viewform";

  const ENTRY_ID = "entry.396208505";

  const src = `${FORM_BASE}?embedded=true&${ENTRY_ID}=${encodeURIComponent(
    destination
  )}`;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center">
      <div className="relative w-[95%] max-w-4xl h-[90%] bg-white rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/70 text-white rounded-full w-10 h-10 text-xl"
        >
          ×
        </button>

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
