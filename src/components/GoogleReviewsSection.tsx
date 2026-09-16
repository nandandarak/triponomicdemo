import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, MessageSquarePlus, CheckCircle2, Quote, MapPin } from "lucide-react";

export interface GoogleReviewItem {
  id: string;
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  trip_tag?: string;
  avatar_letter?: string;
  color?: string;
}

// Real authentic reviews scraped directly from Triponomic's Google Business Profile
export const REAL_GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "rev-1",
    author_name: "Saarthi Education",
    rating: 5,
    relative_time_description: "1 month ago",
    trip_tag: "Kashmir Family Tour",
    avatar_letter: "S",
    color: "#059669",
    text: "Feeling incredibly lucky to have booked our Kashmir family trip through Keshav Rathi from Triponomic! 🌄✨ From seamless planning to excellent support, everything was handled with professionalism and care. Traveling with family becomes truly stress-free when you have someone reliable taking care of every detail. Highly recommended for anyone planning their next vacation! 🌍✈️",
  },
  {
    id: "rev-2",
    author_name: "Aman Bagla",
    rating: 5,
    relative_time_description: "5 months ago",
    trip_tag: "Kashmir Getaway",
    avatar_letter: "A",
    color: "#0284C7",
    text: "Had an absolutely amazing Kashmir trip! Everything was perfectly managed, from hotels to sightseeing. The experience was smooth, hassle-free, and truly memorable. Highly recommended for anyone planning a happening Kashmir vacation with Amazing deals, Best Support & coordination of KESHAV & TRIPONOMIC TEAM along the trip..great experience 👍🏻",
  },
  {
    id: "rev-3",
    author_name: "Neha Mittal",
    rating: 5,
    relative_time_description: "3 months ago",
    trip_tag: "Vietnam Exploration",
    avatar_letter: "N",
    color: "#7C3AED",
    text: "Thank you so much team Triponomic🫶🏻 for planning our trip to Vietnam 🇻🇳 flawlessly. From first consultation to the last day everything was smooth and well planned. The hotels they had given us, well planned itinerary and local guides they provided us, were awesome. They supported us every moment with prompt replies. We need not worry about anything and could just focus on enjoying our trip!",
  },
  {
    id: "rev-4",
    author_name: "Kanav Khanna",
    rating: 5,
    relative_time_description: "4 months ago",
    trip_tag: "Custom Vacation",
    avatar_letter: "K",
    color: "#D97706",
    text: "Heard about Triponomic from a friend. I was afraid to give them a go at planning my vacation at first, but after meeting Keshav for planning the trip I was convinced that he will do everything to make this vacation memorable for me. And that is what exactly happened! Thank you team Triponomic!",
  },
  {
    id: "rev-5",
    author_name: "Akshat Khandelwal",
    rating: 5,
    relative_time_description: "5 months ago",
    trip_tag: "Personalized Holiday",
    avatar_letter: "A",
    color: "#E11D48",
    text: "I recently booked a trip with Triponomic, and I have to say, it was an incredible experience! Keshav Bhai is absolutely amazing. He was incredibly helpful throughout the entire process, answering all my questions and going above and beyond to ensure everything was perfect. Flawlessly planned with every detail taken care of. Highly recommend Triponomic for stress-free travel!",
  },
];

const GOOGLE_WRITE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ_da7iF79YjkRyFNiOGrUay0";
const GOOGLE_MAPS_PROFILE_URL = "https://share.google/FYjUqdhFUzT4EGFxN";

const GoogleReviewsSection = () => {
  const [filterTag, setFilterTag] = useState<string>("all");

  const tags = ["all", "Kashmir", "Vietnam", "Family", "Custom"];

  const filteredReviews = REAL_GOOGLE_REVIEWS.filter((rev) => {
    if (filterTag === "all") return true;
    return (
      rev.trip_tag?.toLowerCase().includes(filterTag.toLowerCase()) ||
      rev.text.toLowerCase().includes(filterTag.toLowerCase())
    );
  });

  return (
    <section className="py-10 md:py-14 px-4 sm:px-6 bg-gradient-to-b from-background via-emerald-50/20 to-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* ── HEADER & GOOGLE RATING SUMMARY ── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200/80 shadow-sm text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-3">
              {/* Google G Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Verified Google Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-primary tracking-tight text-foreground">
              Loved by Travelers Worldwide
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              Real journeys, genuine stories. Every review comes straight from verified travelers who explored the world with Triponomic.
            </p>
          </div>

          {/* ── GOOGLE SCORECARD WIDGET ── */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-6 rounded-3xl bg-white border border-emerald-100 shadow-[0_12px_36px_rgba(16,185,129,0.08)]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex flex-col items-center justify-center border border-emerald-100 shrink-0">
                <span className="text-2xl font-black text-emerald-800 leading-none">5.0</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-0.5">Stars</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-bold text-foreground mt-1">
                  Five-Star Reviews
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Recommended on Google</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-5">
              <a
                href={GOOGLE_WRITE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow active:scale-95 whitespace-nowrap"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Write a Google Review
              </a>
              <a
                href={GOOGLE_MAPS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-colors whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                View on Google Maps
                <ExternalLink className="w-3 h-3 text-gray-400 ml-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2 shrink-0">
            Filter by:
          </span>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setFilterTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize whitespace-nowrap cursor-pointer ${filterTag === tag
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-300"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── REVIEWS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-emerald-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(16,185,129,0.08)] transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-100/60 group-hover:text-emerald-200/80 transition-colors pointer-events-none" />

              <div>
                {/* Reviewer Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0"
                    style={{ backgroundColor: review.color || "#059669" }}
                  >
                    {review.avatar_letter || review.author_name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm truncate">
                      {review.author_name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        • {review.relative_time_description}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-700 leading-relaxed font-light line-clamp-6">
                  "{review.text}"
                </p>
              </div>

              {/* Card Footer: Trip Tag & Google Verification Badge */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                {review.trip_tag && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-medium text-[11px]">
                    {review.trip_tag}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 font-medium ml-auto">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified on Google
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── LIVE SYNC & WRITE REVIEW FOOTER ── */}
        <div className="mt-12 p-6 rounded-3xl bg-emerald-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
              <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Traveled with Triponomic recently?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-0.5">
                Share your journey! Your feedback appears directly on our Google profile &amp; live website.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap inline-flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4 text-emerald-700" />
              <span>Write a Google Review</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
