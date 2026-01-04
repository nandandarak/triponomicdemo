import heroVideo from "@/assets/hero-train-video.mp4";

const HeroSection = () => {
  return (
    <section className="relative h-[58vh] md:h-[60vh] w-full overflow-hidden flex items-center justify-center px-6 bg-black">
      
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="font-script text-5xl md:text-6xl lg:text-7xl italic text-white drop-shadow-2xl">
          Triponomic
        </h1>

        <p className="mt-2 text-sm md:text-base uppercase tracking-[0.16em] text-white/90">
          Your Customized Travel Partner
        </p>

        <p className="mt-3 text-[11px] md:text-sm text-white/75 italic tracking-wider leading-relaxed">
          Your Vision, Our Plan. Custom-built itineraries
          <br className="hidden md:block" />
          tailored to your unique needs.
        </p>
      </div>

      {/* SUBTLE BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/60 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
