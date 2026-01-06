<form
  onSubmit={handleSubmit}
  className="bg-[#faf7f3] p-10 rounded-3xl shadow-sm"
>
  <div className="grid md:grid-cols-2 gap-6">
    {/* FULL NAME */}
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
        className="
          w-full rounded-2xl bg-[#f5efe9]
          px-6 py-4 text-gray-900
          placeholder:text-gray-500
          outline-none
          focus:ring-2 focus:ring-primary
        "
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
        className="
          w-full rounded-2xl bg-[#f5efe9]
          px-6 py-4 text-gray-900
          placeholder:text-gray-500
          outline-none
          focus:ring-2 focus:ring-primary
        "
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
        className="
          w-full rounded-2xl bg-[#f5efe9]
          px-6 py-4 text-gray-900
          placeholder:text-gray-500
          outline-none
          focus:ring-2 focus:ring-primary
        "
      />
    </div>

    {/* DESTINATION */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-800">
        Preferred Destination
      </label>
      <select
        name="destination"
        value={formData.destination}
        onChange={handleChange}
        className="
          w-full rounded-2xl bg-[#f5efe9]
          px-6 py-4 text-gray-900
          outline-none
          focus:ring-2 focus:ring-primary
        "
      >
        <option value="">Select a destination</option>
        <option>Kashmir</option>
        <option>Kerala</option>
        <option>Goa</option>
        <option>Japan</option>
        <option>Bali</option>
      </select>
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
      className="
        w-full rounded-3xl bg-[#f5efe9]
        px-6 py-5 text-gray-900
        placeholder:text-gray-500
        outline-none resize-none
        focus:ring-2 focus:ring-primary
      "
    />
  </div>

  {/* BUTTON */}
  <button
    type="submit"
    disabled={isSubmitting}
    className="
      mt-10 w-full py-5 rounded-full
      bg-primary text-primary-foreground
      flex items-center justify-center gap-2
      text-base font-medium
      hover:opacity-90 transition
    "
  >
    {isSubmitting ? "Sending..." : (
      <>
        <Send className="w-4 h-4" /> Send Inquiry
      </>
    )}
  </button>
</form>
