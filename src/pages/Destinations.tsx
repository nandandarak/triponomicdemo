import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  SlidersHorizontal,
  Search,
  ArrowRight,
  Plane,
  Heart,
  Clock,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DestinationDetailModal, { DestinationDetail } from "@/components/DestinationDetailModal";
import TiltedCard from "@/components/animations/TiltedCard";
import BlurText from "@/components/animations/BlurText";
import ShinyText from "@/components/animations/ShinyText";

// Destination Images
import kashmirImg from "@/assets/kashmir.jpg";
import ladakhImg from "@/assets/ladakh.jpg";
import spitiImg from "@/assets/spiti.jpg";
import meghalayaImg from "@/assets/meghalaya.jpg";
import himachalImg from "@/assets/himachal.jpg";
import sikkimImg from "@/assets/sikkim.jpg";
import arunachalImg from "@/assets/arunachal.jpg";
import uttarakhandImg from "@/assets/uttarakhand.jpg";
import rajasthanImg from "@/assets/rajasthan.jpg";
import andamanImg from "@/assets/andaman.jpg";
import vietnamImg from "@/assets/vietnam.jpg";
import kenyaImg from "@/assets/kenya.jpg";
import thailandImg from "@/assets/thailand.jpg";
import egyptImg from "@/assets/egypt.jpg";
import srilankaImg from "@/assets/srilanka.jpg";
import philippinesImg from "@/assets/philippines.jpg";
import kazakhstanImg from "@/assets/kazakhstan.jpg";
import maldivesImg from "@/assets/maldives.jpg";
import southafricaImg from "@/assets/southafrica.jpg";
import franceImg from "@/assets/france.jpg";
import newzealandImg from "@/assets/newzealand.jpg";
import spainImg from "@/assets/spain.jpg";
import switzerlandImg from "@/assets/switzerland.jpg";
import australiaImg from "@/assets/australia.jpg";
import malaysiaImg from "@/assets/malaysia.jpg";
import mauritiusImg from "@/assets/mauritius.jpg";

const DESTINATIONS: DestinationDetail[] = [
  {
    name: "Kashmir",
    category: "Domestic",
    region: "North India",
    image: kashmirImg,
    tagline: "Heaven on Earth with Shikara Sunsets",
    bestTimeToVisit: "April – October & Winter Snow (Dec-Feb)",
    duration: "6 Days / 5 Nights",
    highlightExperiences: [
      "Private luxury houseboat stay on Dal Lake with evening shikara cruise",
      "Gondola cable car ride in Gulmarg reaching Apharwat Peak",
      "Pony trek through pristine valleys in Pahalgam & Betaab Valley",
      "Saffron farm walk & traditional Kashmiri Wazwan culinary lunch",
    ],
    sampleItinerary: [
      { day: "Day 1", title: "Arrival in Srinagar & Dal Lake Shikara", desc: "Private chauffeur pickup, check-in to luxury houseboat, evening sunset shikara ride." },
      { day: "Day 2", title: "Srinagar to Gulmarg Meadow of Flowers", desc: "Drive through pine valleys, check-in, Phase 1 & 2 Gondola ride, snow activities." },
      { day: "Day 3", title: "Pahalgam Valley of Shepherds", desc: "Visit saffron fields, river rafting at Lidder River, check-in to riverside resort." },
      { day: "Day 4", title: "Aru Valley & Betaab Valley", desc: "Private excursion to Aru & Chandanwari, scenic photo stops and cafe exploration." },
      { day: "Day 5", title: "Mughal Gardens & Old Srinagar Heritage", desc: "Shalimar Bagh, Nishat Bagh, Hazratbal shrine and handicraft shopping." },
      { day: "Day 6", title: "Departure", desc: "Private airport drop with sweet memories of paradise." },
    ],
    inclusions: ["5-Star & Heritage Stays", "Private Dedicated Chauffeur", "Daily Buffet Breakfast & Dinner", "Shikara & Gondola Tickets", "24/7 Trip Concierge"],
  },
  {
    name: "Leh Ladakh",
    category: "Domestic",
    region: "Himalayas",
    image: ladakhImg,
    tagline: "High Passes, Starlit Deserts & Turquoise Lakes",
    bestTimeToVisit: "May – September",
    duration: "7 Days / 6 Nights",
    highlightExperiences: [
      "Crossing Khardung La — one of the highest motorable passes",
      "Double-humped camel safari among the dunes of Nubra Valley",
      "Color-changing waters of Pangong Tso Lake at sunrise",
      "Centuries-old Thiksey Monastery morning chanting ceremony",
    ],
    sampleItinerary: [
      { day: "Day 1", title: "Arrival & Acclimatization in Leh", desc: "Rest day to adjust to altitude, evening stroll in Leh Market." },
      { day: "Day 2", title: "Sham Valley & Magnetic Hill", desc: "Confluence of Indus & Zanskar rivers, Gurudwara Pathar Sahib, Hall of Fame." },
      { day: "Day 3", title: "Leh to Nubra Valley via Khardung La", desc: "Panoramic mountain pass crossing, Diskit Monastery, Hunder sand dunes." },
      { day: "Day 4", title: "Nubra to Pangong Tso via Shyok River", desc: "Off-beat river road, arrive at the breathtaking blue Pangong lake glamping camp." },
      { day: "Day 5", title: "Pangong Sunrise to Leh via Chang La", desc: "Golden morning light photography, return drive to Leh hotel." },
      { day: "Day 6", title: "Monasteries & Shey Palace", desc: "Thiksey and Hemis monasteries, traditional Ladakhi lunch." },
      { day: "Day 7", title: "Departure", desc: "Flight back with dramatic aerial views of the Himalayas." },
    ],
    inclusions: ["Luxury Swiss Tents & 4-Star Boutique Hotels", "Private 4x4 Vehicle", "Oxygen Kit & First Aid", "Inner Line Permits", "Daily Meals"],
  },
  {
    name: "Vietnam",
    category: "International",
    region: "Southeast Asia",
    image: vietnamImg,
    tagline: "Emerald Bays, Lantern-Lit Towns & French Flair",
    bestTimeToVisit: "October – April",
    duration: "8 Days / 7 Nights",
    highlightExperiences: [
      "Overnight 5-Star cruise among limestone karsts in Halong Bay",
      "Golden Hand Bridge walk in Ba Na Hills, Da Nang",
      "Night market and custom silk tailoring in romantic Hoi An",
      "Old Quarter street food tour by vintage Vespa in Hanoi",
    ],
    sampleItinerary: [
      { day: "Day 1-2", title: "Hanoi Capital & French Quarter", desc: "Hoan Kiem Lake, train street coffee, evening water puppet show." },
      { day: "Day 3", title: "Hanoi to Halong Bay Luxury Cruise", desc: "Kayak into hidden caves, squid fishing at night, 5-star onboard dinner." },
      { day: "Day 4-5", title: "Flight to Da Nang & Hoi An Ancient Town", desc: "Ba Na Hills cable car, lantern boat ride on Thu Bon River." },
      { day: "Day 6-7", title: "Ho Chi Minh City & Mekong Delta", desc: "Cu Chi Tunnels, sampan boat ride along floating coconut orchards." },
      { day: "Day 8", title: "Departure", desc: "Private airport transfer and departure." },
    ],
    inclusions: ["5-Star Luxury Cruise Suite", "Internal Flights Included", "Private English Guides", "VIP Fast-Track Visa Support", "Daily Gourmet Meals"],
  },
  {
    name: "Switzerland",
    category: "International",
    region: "Europe",
    image: switzerlandImg,
    tagline: "Glacier Trains, Alpine Peaks & Fairy-Tale Lakes",
    bestTimeToVisit: "May – October (Greenery) or Dec – March (Skiing)",
    duration: "8 Days / 7 Nights",
    highlightExperiences: [
      "First-Class panoramic Swiss Rail Pass through scenic mountain valleys",
      "Mount Titlis rotating cable car & Ice Flyer chairlift",
      "Private boat cruise on Lake Lucerne with view of Mt. Pilatus",
      "Interlaken Jungfraujoch — Top of Europe train adventure",
    ],
    sampleItinerary: [
      { day: "Day 1-2", title: "Zurich & Lucerne Charm", desc: "Chapel Bridge, Lion Monument, luxury lake cruise, Mt. Rigi excursion." },
      { day: "Day 3-5", title: "Interlaken & Jungfrau Glacier Region", desc: "Lauterbrunnen 72 waterfalls, Grindelwald First cliff walk, Top of Europe." },
      { day: "Day 6-7", title: "Zermatt & The Iconic Matterhorn", desc: "Car-free alpine village, Gornergrat cogwheel train with Matterhorn reflection." },
      { day: "Day 8", title: "Departure via Geneva or Zurich", desc: "Scenic final train journey and international flight." },
    ],
    inclusions: ["1st-Class Swiss Travel Pass", "Central 4★ & 5★ Boutique Alpine Hotels", "Mountain Peak Excursion Tickets", "Schengen Visa Concierge"],
  },
  {
    name: "Bali",
    category: "International",
    region: "Southeast Asia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    tagline: "Private Pool Villas, Jungle Swings & Ocean Sunsets",
    bestTimeToVisit: "April – October",
    duration: "7 Days / 6 Nights",
    highlightExperiences: [
      "Private pool luxury villa in Ubud surrounded by rainforest",
      "Sunrise trek to Mount Batur with breakfast above the clouds",
      "Nusa Penida island speedboat tour & Kelingking Beach cliffs",
      "Sunset seafood candlelit dinner on Jimbaran Bay beach",
    ],
    sampleItinerary: [
      { day: "Day 1-3", title: "Ubud Spiritual Heart & Jungle Bliss", desc: "Tegalalang rice terraces, Bali swing, sacred monkey forest, spa massage." },
      { day: "Day 4", title: "Nusa Penida Island Day Tour", desc: "Broken Beach, Angel's Billabong, crystal bay snorkeling." },
      { day: "Day 5-6", title: "Seminyak & Uluwatu Clifftop Temple", desc: "Beach club day, Kecak fire dance at cliff edge during sunset." },
      { day: "Day 7", title: "Souvenir Shopping & Departure", desc: "Floating breakfast at villa, private airport transfer." },
    ],
    inclusions: ["Private Luxury Pool Villa", "Chauffeur Driven Private Car", "Fast Boat to Nusa Penida", "Daily Breakfasts & Floating Meal", "eSIM"],
  },
  {
    name: "Spiti Valley",
    category: "Domestic",
    region: "Himalayas",
    image: spitiImg,
    tagline: "The Middle Land: Rugged Canyons & High Monasteries",
    bestTimeToVisit: "June – September",
    duration: "8 Days / 7 Nights",
    highlightExperiences: [
      "World's highest post office at Hikkim — mail a postcard to loved ones",
      "Key Monastery perched dramatically atop a conical hill",
      "Camping beside the crescent-shaped Chandratal Lake",
      "Fossil hunting in the ancient Jurassic village of Langza",
    ],
    sampleItinerary: [
      { day: "Day 1-2", title: "Shimla to Kalpa & Sangla Valley", desc: "Kinnaur highway drive, apple orchards, views of Kinner Kailash." },
      { day: "Day 3-5", title: "Tabo, Kaza & High Villages", desc: "Tabo 1000-year monastery, Dhankar fort, Hikkim, Komic, Langza." },
      { day: "Day 6", title: "Kaza to Chandratal Moon Lake", desc: "Crossing Kunzum Pass, evening starlit camping near Chandratal." },
      { day: "Day 7-8", title: "Manali Crossing & Departure", desc: "Drive through Atal Tunnel to Manali, relaxing evening and departure." },
    ],
    inclusions: ["Dedicated 4x4 SUV", "Experienced Mountain Driver-Guide", "Boutique Homestays & Deluxe Camps", "All Meals", "Permits"],
  },
  {
    name: "Kenya",
    category: "International",
    region: "Africa",
    image: kenyaImg,
    tagline: "The Great Migration & Untamed Savannah Luxury",
    bestTimeToVisit: "July – October (Migration) & Jan – Feb",
    duration: "7 Days / 6 Nights",
    highlightExperiences: [
      "Private 4x4 game drives spotting the Big Five in Maasai Mara",
      "Hot air balloon safari over the savannah with champagne breakfast",
      "Visit traditional Maasai tribal villages for cultural immersion",
      "Lake Naivasha boat safari alongside hippos and African fish eagles",
    ],
    sampleItinerary: [
      { day: "Day 1", title: "Nairobi to Lake Naivasha", desc: "Great Rift Valley viewpoint, boat ride and Crescent Island walk." },
      { day: "Day 2-4", title: "Maasai Mara National Reserve", desc: "Full-day game drives tracking lions, leopards, cheetahs, and elephants." },
      { day: "Day 5", title: "Lake Nakuru National Park", desc: "Flamingo spotting, rhino sanctuary visit, luxury lodge stay." },
      { day: "Day 6-7", title: "Nairobi Giraffe Centre & Departure", desc: "Hand-feed endangered Rothschild giraffes before flight home." },
    ],
    inclusions: ["Luxury Safari Tented Lodges", "Custom 4x4 Pop-Up Land Cruiser", "All National Park Entrance Fees", "Professional Safari Naturalist Guide"],
  },
  {
    name: "Meghalaya",
    category: "Domestic",
    region: "Northeast India",
    image: meghalayaImg,
    tagline: "Abode of Clouds & Living Root Bridges",
    bestTimeToVisit: "September – May",
    duration: "6 Days / 5 Nights",
    highlightExperiences: [
      "Trek to the ancient Double Decker Living Root Bridge in Nongriat",
      "Crystal-clear boat ride on the Umngot River in Dawki",
      "Nohkalikai Falls — tallest plunge waterfall in India",
      "Asia's cleanest village walk in Mawlynnong",
    ],
    sampleItinerary: [
      { day: "Day 1", title: "Guwahati to Shillong", desc: "Umiam Lake stop, cafe culture exploration in Scotland of the East." },
      { day: "Day 2-3", title: "Cherrapunji (Sohra) Waterfalls & Caves", desc: "Seven Sisters Falls, Mawsmai Cave, living root bridge trek." },
      { day: "Day 4", title: "Dawki River & Mawlynnong", desc: "Transparent glass-like river boating, border viewpoint to Bangladesh." },
      { day: "Day 5-6", title: "Laitlum Canyons & Departure", desc: "Breathtaking canyon views, Guwahati Kamakhya Temple and flight." },
    ],
    inclusions: ["Luxury Heritage Resort Stays", "Private Chauffeur Vehicle", "Boating & Trek Guides", "Daily Breakfasts & Dinners"],
  },
];

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Domestic" | "International">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalDest, setActiveModalDest] = useState<DestinationDetail | null>(null);

  const filtered = DESTINATIONS.filter((d) => {
    const matchesCategory = selectedCategory === "All" || d.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-gradient-to-b from-[#12231A] via-[#1A2E23] to-[#12231A] text-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80"
            alt="Mountainscape"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-4">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              Handcrafted Travel Catalog
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-5">
              <BlurText text="Explore Curated Destinations" animateBy="words" className="text-white" />
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
              From snow-kissed Himalayan passes to sun-drenched tropical lagoons — discover our most sought-after custom-tailored journeys.
            </p>

            {/* Quick Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="w-5 h-5 text-white/50 absolute left-5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by destination (e.g. Kashmir, Vietnam, Bali, Switzerland)..."
                className="w-full pl-13 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/45 text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/60 hover:text-white px-2 py-1 bg-white/15 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTER CONTROLS */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700 mr-1 shrink-0" />
            {(["All", "Domestic", "International"] as const).map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-600 hover:text-gray-900 bg-gray-100"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="destFilterPill"
                      className="absolute inset-0 bg-emerald-700 rounded-full shadow-md -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat === "Domestic" ? "India (Domestic)" : cat === "International" ? "Global (International)" : "All Routes"}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-500 font-semibold">
            Showing <span className="text-emerald-700 font-bold">{filtered.length}</span> curated journeys
          </p>
        </div>
      </div>

      {/* DESTINATION CARDS GRID */}
      <section className="py-16 px-6 bg-[#FDFCF9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <TiltedCard
                  maxAngle={8}
                  scale={1.02}
                  className="h-full rounded-[28px] overflow-hidden bg-white border border-gray-100 shadow-[0_6px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.12)] hover:border-emerald-200/80 transition-all duration-300 cursor-pointer flex flex-col"
                  onClick={() => setActiveModalDest(dest)}
                >
                  {/* Photo */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Category pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-emerald-300 border border-white/20 text-[10px] uppercase tracking-widest font-extrabold shadow-sm">
                        {dest.category}
                      </span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold border border-white/15">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {dest.duration}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {dest.name}
                      </h3>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        {dest.region}
                      </span>
                    </div>

                    <p className="text-xs text-emerald-700 font-semibold italic mb-3">
                      {dest.tagline}
                    </p>

                    {/* Top highlights */}
                    <div className="space-y-1.5 mb-5 flex-1">
                      {dest.highlightExperiences.slice(0, 2).map((exp, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                          <Sparkles className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{exp}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 tracking-wider">
                        VIEW FULL ITINERARY
                      </span>
                      <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </TiltedCard>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <Compass className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-lg font-bold text-gray-700">No destinations match your query</p>
              <p className="text-xs text-gray-500 mt-1">Try another keyword or reset the filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Detail Modal */}
      <DestinationDetailModal
        destination={activeModalDest}
        isOpen={!!activeModalDest}
        onClose={() => setActiveModalDest(null)}
      />

      <Footer />
    </div>
  );
};

export default Destinations;
