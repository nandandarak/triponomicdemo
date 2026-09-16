import React, { useState, useEffect } from "react";
import { DestinationCard } from "@/services/cardStore";
import { X, Upload, Image as ImageIcon, Sparkles } from "lucide-react";

interface CardEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cardData: Omit<DestinationCard, "id"> | DestinationCard) => void;
  cardToEdit?: DestinationCard | null;
  defaultType: "domestic" | "international";
}

export const CardEditModal: React.FC<CardEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cardToEdit,
  defaultType,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<"domestic" | "international">(defaultType);
  const [category, setCategory] = useState("");
  const [vibe, setVibe] = useState("");
  const [duration, setDuration] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [bestSeason, setBestSeason] = useState("");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (cardToEdit) {
      setName(cardToEdit.name);
      setType(cardToEdit.type);
      setCategory(cardToEdit.category || "");
      setVibe(cardToEdit.vibe || "");
      setDuration(cardToEdit.duration);
      setStartingPrice(cardToEdit.startingPrice || cardToEdit.investment || "");
      setBestSeason(cardToEdit.bestSeason || cardToEdit.bestTime || "");
      setImage(cardToEdit.image);
      setFeatured(cardToEdit.featured || false);
    } else {
      setName("");
      setType(defaultType);
      setCategory(defaultType === "domestic" ? "Hills & Nature" : "Asia");
      setVibe("Bespoke Journey");
      setDuration("5 Nights / 6 Days");
      setStartingPrice("₹24,999");
      setBestSeason("Oct - Mar");
      setImage("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80");
      setFeatured(false);
    }
    setImageError("");
  }, [cardToEdit, defaultType, isOpen]);

  if (!isOpen) return null;

  // Handle local image file upload and convert to base64 Data URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please upload an image file (PNG, JPG, WebP, etc.)");
      return;
    }

    // Limit size to ~5MB to avoid exceeding localStorage limits
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be under 5MB. Please choose a smaller image.");
      return;
    }

    setImageUploadLoading(true);
    setImageError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setImage(result);
      }
      setImageUploadLoading(false);
    };
    reader.onerror = () => {
      setImageError("Failed to read image file. Please try another one.");
      setImageUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a destination name.");
      return;
    }
    if (!image.trim()) {
      alert("Please provide an image or upload one from your device.");
      return;
    }

    if (cardToEdit) {
      onSave({
        ...cardToEdit,
        name: name.trim(),
        type,
        category: category.trim(),
        vibe: vibe.trim(),
        duration: duration.trim(),
        startingPrice: startingPrice.trim(),
        investment: startingPrice.trim() || cardToEdit.investment || "",
        bestSeason: bestSeason.trim(),
        bestTime: bestSeason.trim() || cardToEdit.bestTime || "",
        image: image.trim(),
        featured,
      });
    } else {
      onSave({
        name: name.trim(),
        type,
        category: category.trim(),
        vibe: vibe.trim(),
        duration: duration.trim(),
        startingPrice: startingPrice.trim(),
        investment: startingPrice.trim(),
        bestSeason: bestSeason.trim(),
        bestTime: bestSeason.trim(),
        image: image.trim(),
        featured,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-[#151B40] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-base tracking-wide">
                {cardToEdit ? `Edit Destination: ${cardToEdit.name}` : `Create New ${type === "domestic" ? "Domestic" : "International"} Card`}
              </h3>
              <p className="text-xs text-slate-300">
                Changes will immediately reflect on the live website
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Destination Type & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Section Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "domestic" | "international")}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#151B40] transition"
              >
                <option value="domestic">Domestic (India)</option>
                <option value="international">International (Beyond Borders)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Destination Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kashmir, Bali, Switzerland"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#151B40] transition"
              />
            </div>
          </div>

          {/* Category & Vibe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Category / Region
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Snow & Valleys, Europe, Tropical Island"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#151B40] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Vibe / Tagline
              </label>
              <input
                type="text"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                placeholder="e.g. Paradise on Earth, Island of Gods"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#151B40] transition"
              />
            </div>
          </div>

          {/* Duration, Starting Price & Best Season */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Duration *
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 5N / 6D"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#151B40] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Starting Price *
              </label>
              <input
                type="text"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                placeholder="e.g. ₹24,999 or $850"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#151B40] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Best Season
              </label>
              <input
                type="text"
                value={bestSeason}
                onChange={(e) => setBestSeason(e.target.value)}
                placeholder="e.g. Oct - Mar"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#151B40] transition"
              />
            </div>
          </div>

          {/* Image Upload & URL */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Card Cover Image *
            </label>

            {/* Local Image File Upload Area */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-[#151B40] transition bg-slate-50/50">
              <input
                type="file"
                id="card-image-file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="card-image-file"
                className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-medium text-slate-700">
                  <span className="text-[#151B40] underline font-semibold">Upload an image from your computer</span> or drag and drop
                </div>
                <div className="text-[11px] text-slate-400">
                  PNG, JPG, WebP up to 5MB (auto-saved locally)
                </div>
              </label>
            </div>

            {imageUploadLoading && (
              <div className="text-xs text-blue-600 font-medium animate-pulse">
                Processing uploaded image...
              </div>
            )}
            {imageError && (
              <div className="text-xs text-red-500 font-medium">{imageError}</div>
            )}

            {/* Direct Image URL input */}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] font-medium text-slate-600">Or enter direct image URL:</span>
              </div>
              <input
                type="text"
                value={image.startsWith("data:") ? "(Custom image uploaded from your device)" : image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#151B40] transition font-mono"
              />
            </div>

            {/* Image Preview */}
            {image && (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] w-full max-h-48 bg-slate-900 group">
                <img
                  src={image}
                  alt="Card Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      {type}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{name || "Destination Title"}</h4>
                    <p className="text-[11px] text-slate-200">{duration || "5N / 6D"} • {startingPrice || "₹24,999"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured-check"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-[#151B40] focus:ring-[#151B40] border-slate-300"
            />
            <label htmlFor="featured-check" className="text-xs font-medium text-slate-700 cursor-pointer">
              Mark as Featured Destination (pinned highlight)
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#151B40] hover:bg-[#1f285e] rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {cardToEdit ? "Save Changes" : "Add Destination"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
