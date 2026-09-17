import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Users,
  Calendar,
  Clock,
  Coins,
  Plane,
  Hotel,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  MessageSquare,
  Smartphone,
  Car,
  Compass,
  Heart,
  Plus,
  Minus,
  X,
  Search,
  Flame,
  Globe,
  User,
  Phone,
  Loader2,
  Utensils,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Tag,
  Gift,
  Award,
  HeartHandshake,
} from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { StarBorder } from "@/components/animations/StarBorder";
import { Magnet } from "@/components/animations/Magnet";
import { TrueFocus } from "@/components/animations/TrueFocus";
import ItineraryTimeline, { TimelineDay } from "./ItineraryTimeline";
import EnquiryModal from "./EnquiryModal";
import { addEnquiry } from "@/services/enquiryStore";

// High-res local asset imports
import kashmirImg from "@/assets/kashmir.jpg";
import ladakhImg from "@/assets/ladakh.jpg";
import spitiImg from "@/assets/spiti.jpg";
import meghalayaImg from "@/assets/meghalaya.jpg";
import himachalImg from "@/assets/himachal.jpg";
import sikkimImg from "@/assets/sikkim.jpg";
import uttarakhandImg from "@/assets/uttarakhand.jpg";
import rajasthanImg from "@/assets/rajasthan.jpg";
import andamanImg from "@/assets/andaman.jpg";
import vietnamImg from "@/assets/vietnam.jpg";
import thailandImg from "@/assets/thailand.jpg";
import maldivesImg from "@/assets/maldives.jpg";
import franceImg from "@/assets/france.jpg";
import newzealandImg from "@/assets/newzealand.jpg";
import switzerlandImg from "@/assets/switzerland.jpg";

import honeymoonVibeImg from "@/assets/category_honeymoon.jpg";
import familyVibeImg from "@/assets/category_family.jpg";
import friendsVibeImg from "@/assets/category_friends.jpg";
import soloVibeImg from "@/assets/category_solo.jpg";


export interface DestinationConfig {
  id: string;
  name: string;
  region: "Domestic" | "International";
  image: string;
  tagline: string;
  curatedTag: string;
  trending?: boolean;
  sampleDays: TimelineDay[];
}

export const TRAIL_DESTINATIONS: DestinationConfig[] = [
  // ── DOMESTIC DESTINATIONS ──
  {
    id: "kashmir",
    name: "Kashmir",
    region: "Domestic",
    image: kashmirImg,
    tagline: "Shikaras, pine valleys & Dal Lake houseboats",
    curatedTag: "Alpine Snow & Lakes",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Arrival in Srinagar & Sunset Shikara", desc: "Private airport pickup, check-in to luxury Dal Lake houseboat, sunset shikara ride.", location: "Srinagar", tags: ["Houseboat", "Shikara", "Private Car"] },
      { day: "Day 2", title: "Gulmarg Meadow of Flowers & Gondola", desc: "Phase 1 & Phase 2 cable car ride to Apharwat Peak, snow activities and cafe.", location: "Gulmarg", tags: ["Gondola", "Snow", "5★ Resort"] },
      { day: "Day 3", title: "Pahalgam Valley & Lidder Riverbank", desc: "Drive along saffron fields, river rafting at Lidder, check-in to pine resort.", location: "Pahalgam", tags: ["River", "Valleys", "Pine Woods"] },
      { day: "Day 4", title: "Betaab Valley & Aru Valley Excursion", desc: "Visit Bollywood valleys, pony trails, scenic Himalayan viewpoint cafe.", location: "Pahalgam", tags: ["Betaab Valley", "Sightseeing"] },
      { day: "Day 5", title: "Departure with Sweet Memories", desc: "Mughal gardens stroll, Kashmiri dry fruit shopping, private airport drop.", location: "Srinagar", tags: ["Airport Drop", "Return Flight"] },
    ],
  },
  {
    id: "ladakh",
    name: "Leh Ladakh",
    region: "Domestic",
    image: ladakhImg,
    tagline: "High-altitude passes, Pangong lake & ancient gompas",
    curatedTag: "High Desert & Passes",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Arrival & Altitude Acclimatization in Leh", desc: "Rest day to adjust to altitude, evening stroll in vibrant Leh market.", location: "Leh", tags: ["Acclimatization", "Leh Hotel"] },
      { day: "Day 2", title: "Sham Valley, Magnetic Hill & Sangam", desc: "Indus-Zanskar confluence, Hall of Fame, Gurudwara Pathar Sahib.", location: "Sham Valley", tags: ["4x4 SUV", "Monasteries"] },
      { day: "Day 3", title: "Crossing Khardung La to Nubra Valley", desc: "World's highest motorable pass crossing, Hunder sand dunes camel safari.", location: "Nubra Valley", tags: ["Khardung La", "Desert Dunes"] },
      { day: "Day 4", title: "Nubra to Pangong Tso Lake", desc: "Off-beat river route to shimmering blue high-altitude Pangong lake.", location: "Pangong", tags: ["Lake Camp", "Stargazing"] },
      { day: "Day 5", title: "Pangong Sunrise to Leh & Departure", desc: "Chang La pass crossing, Thiksey monastery, farewell flight back.", location: "Leh", tags: ["Sunrise", "Return Flight"] },
    ],
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    region: "Domestic",
    image: spitiImg,
    tagline: "Middle land moonscapes, Key monastery & Chandratal",
    curatedTag: "Remote Mountain Trail",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Drive from Manali over Atal Tunnel to Kaza", desc: "Scenic mountain pass crossing into the cold desert landscape.", location: "Kaza", tags: ["Atal Tunnel", "4x4 Drive"] },
      { day: "Day 2", title: "Key Monastery & Kibber Wildlife Sanctuary", desc: "Ancient 1000-year gompa, world's highest post office at Hikkim.", location: "Key", tags: ["Monastery", "High Altitude"] },
      { day: "Day 3", title: "Chicham Bridge & Langza Fossil Village", desc: "Asia's highest suspension bridge and searching marine fossils.", location: "Chicham", tags: ["Chicham Bridge", "Fossils"] },
      { day: "Day 4", title: "Chandratal Lake of the Moon Camping", desc: "Turquoise glacial lake hike and luxury Swiss tent stargazing.", location: "Chandratal", tags: ["Moon Lake", "Stargazing"] },
      { day: "Day 5", title: "Return Scenic Drive to Manali & Drop", desc: "Rohtang Pass views, cedar forest descent, private drop.", location: "Manali", tags: ["Drop", "Cedar Woods"] },
    ],
  },
  {
    id: "kerala",
    name: "Kerala",
    region: "Domestic",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    tagline: "Misty Munnar tea gardens, Alleppey houseboats & Ayurveda",
    curatedTag: "Backwaters & Wellness",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Cochin to Munnar Misty Tea Valleys", desc: "Cheeyappara waterfalls stop, check-in to tea estate luxury resort.", location: "Munnar", tags: ["Tea Plantations", "Waterfalls"] },
      { day: "Day 2", title: "Eravikulam National Park & Tea Museum", desc: "Spotting endangered Nilgiri Tahr, tea tasting, spice plantation walk.", location: "Munnar", tags: ["Tea Museum", "Nature"] },
      { day: "Day 3", title: "Alleppey Luxury Backwaters Houseboat", desc: "Private thatched houseboat cruise through tranquil canals with onboard chef.", location: "Alleppey", tags: ["Houseboat", "Canals"] },
      { day: "Day 4", title: "Marari Beach & Ayurvedic Wellness", desc: "Coconut groves, relaxing Ayurvedic full-body massage by the sea.", location: "Marari", tags: ["Beach Resort", "Ayurveda"] },
      { day: "Day 5", title: "Fort Kochi Heritage & Departure", desc: "Chinese fishing nets, Jew Town antiques, private airport transfer.", location: "Cochin", tags: ["Fort Kochi", "Airport Drop"] },
    ],
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    region: "Domestic",
    image: rajasthanImg,
    tagline: "Palaces of Jaipur, Udaipur lake sunsets & desert luxury",
    curatedTag: "Royal Palaces & Forts",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Arrival in Pink City Jaipur", desc: "Check-in to heritage haveli, evening visit to Nahargarh sunset fort.", location: "Jaipur", tags: ["Heritage Haveli", "Sunset Fort"] },
      { day: "Day 2", title: "Amber Fort & City Palace Royal Tour", desc: "Elephant pathway, Sheesh Mahal mirror palace, Hawa Mahal photography.", location: "Jaipur", tags: ["Amber Fort", "City Palace"] },
      { day: "Day 3", title: "Drive to City of Lakes Udaipur", desc: "Check-in to lakefront boutique hotel, sunset boat cruise on Lake Pichola.", location: "Udaipur", tags: ["Lake Pichola", "Boat Cruise"] },
      { day: "Day 4", title: "Saheliyon Ki Bari & Vintage Car Museum", desc: "Royal garden fountains, Jagdish Temple, romantic rooftop dining.", location: "Udaipur", tags: ["Royal Gardens", "Rooftop Dining"] },
      { day: "Day 5", title: "Souvenir Shopping & Airport Departure", desc: "Jaipur blue pottery, bandhani dupattas, private airport transfer.", location: "Udaipur", tags: ["Shopping", "Airport Drop"] },
    ],
  },
  {
    id: "andaman",
    name: "Andaman Islands",
    region: "Domestic",
    image: andamanImg,
    tagline: "Radhanagar turquoise waters, scuba reefs & catamarans",
    curatedTag: "Tropical Island Paradise",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Arrival in Port Blair & Cellular Jail Sound Show", desc: "Airport reception, check-in, historic freedom trail sound show.", location: "Port Blair", tags: ["Port Blair", "Cellular Jail"] },
      { day: "Day 2", title: "Private Catamaran Cruise to Havelock Island", desc: "High-speed cruise across sapphire waters to Radhanagar Beach sunset.", location: "Havelock", tags: ["Catamaran", "Radhanagar Beach"] },
      { day: "Day 3", title: "Elephant Beach Scuba Diving & Snorkeling", desc: "Speedboat excursion to live coral reefs with certified dive master.", location: "Havelock", tags: ["Scuba", "Coral Reef"] },
      { day: "Day 4", title: "Neil Island Natural Bridge & Laxmanpur Beach", desc: "Natural coral rock formations, tranquil beaches, seafood dinner.", location: "Neil Island", tags: ["Natural Bridge", "Seafood"] },
      { day: "Day 5", title: "Return Ferry to Port Blair & Flight Home", desc: "Morning souvenir shopping and private transfer to airport.", location: "Port Blair", tags: ["Return Ferry", "Airport Drop"] },
    ],
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    region: "Domestic",
    image: meghalayaImg,
    tagline: "Living root bridges, Dawki crystal waters & waterfalls",
    curatedTag: "Cloud Forests & Waterfalls",
    sampleDays: [
      { day: "Day 1", title: "Guwahati to Shillong Scotland of the East", desc: "Umiam Lake viewpoint, check-in to pine resort, police bazar walk.", location: "Shillong", tags: ["Umiam Lake", "Pine Resort"] },
      { day: "Day 2", title: "Cherrapunjee Waterfalls & Mawsmai Cave", desc: "Nohkalikai Falls, limestone caves, scenic canyon viewpoints.", location: "Cherrapunjee", tags: ["Waterfalls", "Caves"] },
      { day: "Day 3", title: "Double Decker Living Root Bridges Trek", desc: "Guided descent to the UNESCO bio-engineering root wonders in Nongriat.", location: "Nongriat", tags: ["Root Bridges", "Trek"] },
      { day: "Day 4", title: "Dawki Crystal Clear Umngot River Boat Ride", desc: "Boat riding over crystal water appearing to float on air.", location: "Dawki", tags: ["Dawki", "Crystal Water"] },
      { day: "Day 5", title: "Mawlynnong Cleanest Village to Guwahati Drop", desc: "Asia's cleanest village walk, private transfer to Guwahati airport.", location: "Guwahati", tags: ["Clean Village", "Airport Drop"] },
    ],
  },
  {
    id: "himachal",
    name: "Himachal (Manali & Kasol)",
    region: "Domestic",
    image: himachalImg,
    tagline: "Solang adventures, apple orchards & Parvati valley",
    curatedTag: "Cedar Valleys & Cafes",
    sampleDays: [
      { day: "Day 1", title: "Chandigarh to Manali Beas Valley Drive", desc: "Riverside scenic drive, check-in to luxury apple orchard resort.", location: "Manali", tags: ["Orchard Resort", "Beas River"] },
      { day: "Day 2", title: "Solang Valley Adventure & Atal Tunnel", desc: "Paragliding, quad biking, scenic drive to Sissu waterfall.", location: "Solang", tags: ["Adventure", "Sissu Falls"] },
      { day: "Day 3", title: "Old Manali Cafes & Hadimba Forest Temple", desc: "Ancient deodar woods, Israeli-Italian riverside cafes.", location: "Old Manali", tags: ["Hadimba", "Riverside Cafe"] },
      { day: "Day 4", title: "Kasol & Manikaran Hot Springs Excursion", desc: "Parvati Valley stroll, natural sulphur hot baths, riverbank chill.", location: "Kasol", tags: ["Parvati Valley", "Hot Springs"] },
      { day: "Day 5", title: "Return Drive to Chandigarh & Drop", desc: "Kullu shawl factory visit, private drop for return flight/train.", location: "Chandigarh", tags: ["Kullu Shawls", "Drop"] },
    ],
  },

  // ── INTERNATIONAL DESTINATIONS ──
  {
    id: "bali",
    name: "Bali",
    region: "International",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    tagline: "Private pool villas, Nusa Penida cliffs & beach clubs",
    curatedTag: "Tropical Luxury Villas",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Arrival in Denpasar & Ubud Jungle Check-in", desc: "Private flower welcome, check-in to private pool rainforest villa in Ubud.", location: "Ubud", tags: ["Pool Villa", "Chauffeur"] },
      { day: "Day 2", title: "Tegalalang Rice Terraces & Bali Swing", desc: "Coffee plantation tour, iconic jungle swing, traditional Balinese massage.", location: "Ubud", tags: ["Rice Terraces", "Spa"] },
      { day: "Day 3", title: "Nusa Penida Island Speedboat Day Tour", desc: "Kelingking T-Rex cliff, Angel's Billabong, crystal bay swimming.", location: "Nusa Penida", tags: ["Speedboat", "Beaches"] },
      { day: "Day 4", title: "Seminyak Beach Club & Uluwatu Clifftop Sunset", desc: "Relaxing beach day, cliff edge sunset temple with traditional fire dance.", location: "Seminyak", tags: ["Beach Club", "Uluwatu Temple"] },
      { day: "Day 5", title: "Floating Breakfast & Departure", desc: "Signature floating breakfast in your private pool, airport drop.", location: "Denpasar", tags: ["Floating Breakfast", "Flight Drop"] },
    ],
  },
  {
    id: "vietnam",
    name: "Vietnam",
    region: "International",
    image: vietnamImg,
    tagline: "Halong bay luxury cruise, Hoi An lanterns & Golden Bridge",
    curatedTag: "Karst Bays & Heritage",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Hanoi French Quarter & Train Street Cafe", desc: "Private airport pickup, cyclo tour around Hoan Kiem Lake, evening street food.", location: "Hanoi", tags: ["French Quarter", "Train Street"] },
      { day: "Day 2", title: "Halong Bay 5-Star Luxury Overnight Cruise", desc: "Kayak into emerald karst caves, squid fishing, 5-course onboard dinner.", location: "Halong Bay", tags: ["5★ Cruise", "Kayaking"] },
      { day: "Day 3", title: "Flight to Da Nang & Lantern Town of Hoi An", desc: "Silk tailoring workshops, lantern-lit boat ride along Thu Bon River.", location: "Hoi An", tags: ["Lantern Boats", "Heritage"] },
      { day: "Day 4", title: "Ba Na Hills & Golden Giant Hands Bridge", desc: "Cable car ride over cloud forests, European village, sky bridge walk.", location: "Da Nang", tags: ["Golden Bridge", "Theme Park"] },
      { day: "Day 5", title: "Souvenir Shopping & Farewell Flight", desc: "Coffee tasting, local markets, private airport drop.", location: "Da Nang", tags: ["Shopping", "Return Flight"] },
    ],
  },
  {
    id: "switzerland",
    name: "Switzerland",
    region: "International",
    image: switzerlandImg,
    tagline: "Glacier trains, Lauterbrunnen waterfalls & Jungfrau summit",
    curatedTag: "Alpine Glaciers & Lakes",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Arrival in Zurich & Scenic Train to Lucerne", desc: "1st Class Swiss Travel Pass activation, Lake Lucerne boat cruise.", location: "Lucerne", tags: ["Swiss Pass", "Lake Cruise"] },
      { day: "Day 2", title: "Mount Titlis Rotating Cable Car & Glacier Cave", desc: "Ice flyer chairlift, snow cliff walk at 10,000 feet, fondue lunch.", location: "Engelberg", tags: ["Mount Titlis", "Glacier"] },
      { day: "Day 3", title: "Interlaken & Lauterbrunnen 72 Waterfalls", desc: "Fairy-tale alpine valley walk, Grindelwald First cliff walkway.", location: "Interlaken", tags: ["Lauterbrunnen", "Waterfalls"] },
      { day: "Day 4", title: "Jungfraujoch — Top of Europe Cogwheel Train", desc: "Ice Palace, Sphinx Observatory, panoramic glacier views.", location: "Jungfrau", tags: ["Top of Europe", "Cogwheel Train"] },
      { day: "Day 5", title: "Zurich Old Town & International Flight", desc: "Bahnhofstrasse shopping, Swiss chocolate tasting, airport train.", location: "Zurich", tags: ["Chocolates", "Airport"] },
    ],
  },
  {
    id: "japan",
    name: "Japan",
    region: "International",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
    tagline: "Shinkansen bullet trains, Mount Fuji onsens & Kyoto bamboo",
    curatedTag: "Zen Temples & Neon",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Tokyo Arrival & Shinjuku Neon Exploration", desc: "Shinkansen bullet train pass activation, Shibuya Crossing, izakaya dining.", location: "Tokyo", tags: ["Shinjuku", "Shibuya Crossing"] },
      { day: "Day 2", title: "Mount Fuji Panoramic View & Hakone Onsen", desc: "Lake Ashi pirate ship cruise, Owakudani volcanic valley, ryokan hot spring.", location: "Hakone", tags: ["Mount Fuji", "Onsen Ryokan"] },
      { day: "Day 3", title: "Bullet Train to Ancient Kyoto", desc: "Fushimi Inari 10,000 torii gates, Arashiyama bamboo grove stroll.", location: "Kyoto", tags: ["Bullet Train", "Bamboo Forest"] },
      { day: "Day 4", title: "Golden Pavilion & Osaka Dotonbori Street Eats", desc: "Kinkaku-ji temple, neon food streets of Osaka, takoyaki tasting.", location: "Osaka", tags: ["Golden Pavilion", "Street Food"] },
      { day: "Day 5", title: "Ginza Luxury Shopping & Departure", desc: "Tokyo department stores, matcha ceremony, Narita express drop.", location: "Tokyo", tags: ["Matcha", "Airport Express"] },
    ],
  },
  {
    id: "maldives",
    name: "Maldives",
    region: "International",
    image: maldivesImg,
    tagline: "Overwater private villas, seaplane rides & coral lagoons",
    curatedTag: "Ultra-Luxury Atolls",
    trending: true,
    sampleDays: [
      { day: "Day 1", title: "Speedboat/Seaplane to Private Island Resort", desc: "Check-in to overwater villa with glass floor and direct lagoon access.", location: "Male Atoll", tags: ["Seaplane", "Overwater Villa"] },
      { day: "Day 2", title: "Reef Snorkeling & Dolphin Sunset Cruise", desc: "Manta ray and sea turtle guided reef safari, champagne sunset cruise.", location: "Atoll Reef", tags: ["Manta Rays", "Dolphin Cruise"] },
      { day: "Day 3", title: "Underwater Spa & Candlelit Sandbank Dinner", desc: "Holistic spa massage over coral views, private sandbank 4-course dinner.", location: "Private Island", tags: ["Underwater Spa", "Sandbank"] },
      { day: "Day 4", title: "Water Sports & Sunset Yoga by the Ocean", desc: "Kayaking, seabob, infinity pool cocktails, oceanfront sunset yoga.", location: "Lagoon", tags: ["Water Sports", "Infinity Pool"] },
      { day: "Day 5", title: "Scenic Seaplane Transfer to Male & Flight", desc: "Farewell island breakfast, seaplane transfer to Velana airport.", location: "Male", tags: ["Seaplane", "Airport Drop"] },
    ],
  },
  {
    id: "thailand",
    name: "Thailand (Phuket & Krabi)",
    region: "International",
    image: thailandImg,
    tagline: "Phi Phi speedboat tours, sunset beach clubs & Thai spa",
    curatedTag: "Island Hopping & Clubs",
    sampleDays: [
      { day: "Day 1", title: "Arrival in Phuket & Patong Beach Club", desc: "Private airport pickup, beachfront resort check-in, sunset dinner.", location: "Phuket", tags: ["Beachfront Resort", "Private Transfer"] },
      { day: "Day 2", title: "Phi Phi Islands & Maya Bay Speedboat", desc: "Snorkeling at Maya Bay lagoon, Monkey Beach, Viking cave sightseeing.", location: "Phi Phi", tags: ["Speedboat", "Maya Bay"] },
      { day: "Day 3", title: "Speedboat to Krabi Railay Peninsula", desc: "Limestone karsts, Phra Nang beach cave, cliffside cocktail lounge.", location: "Krabi", tags: ["Railay Beach", "Limestone Karsts"] },
      { day: "Day 4", title: "Four Islands Sunset Cruise & Bioluminescence", desc: "Chicken Island, Tup Island sandbar walk, night swim with glowing plankton.", location: "Krabi", tags: ["Four Islands", "Bioluminescence"] },
      { day: "Day 5", title: "Thai Massage & Airport Departure", desc: "Traditional aroma Thai spa session, souvenir shopping, airport transfer.", location: "Phuket", tags: ["Thai Spa", "Return Flight"] },
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    region: "International",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    tagline: "Burj Khalifa vistas, 4x4 red dune safari & marina yachts",
    curatedTag: "Skyline & Desert Glamour",
    sampleDays: [
      { day: "Day 1", title: "Arrival & Dubai Marina Luxury Yacht Cruise", desc: "Chauffeur transfer, check-in to 5★ hotel, private marina yacht tour.", location: "Dubai Marina", tags: ["Private Yacht", "5★ Hotel"] },
      { day: "Day 2", title: "Burj Khalifa At The Top & Dubai Mall", desc: "124th floor observatory deck, Dubai fountain show, gold souk visit.", location: "Downtown", tags: ["Burj Khalifa", "Fountains"] },
      { day: "Day 3", title: "Red Dune Desert Safari & Bedouin BBQ", desc: "4x4 dune bashing, quad biking, camel ride, fire show & dinner.", location: "Desert Dunes", tags: ["Dune Bashing", "BBQ Dinner"] },
      { day: "Day 4", title: "Museum of the Future & Palm Jumeirah", desc: "Architectural wonder tour, Monorail to Atlantis The Palm, beach club.", location: "Palm Jumeirah", tags: ["Museum of Future", "Atlantis"] },
      { day: "Day 5", title: "Duty Free Shopping & Private Airport Drop", desc: "Luxury perfume shopping, return chauffeur to Dubai International.", location: "DXB Airport", tags: ["Duty Free", "Airport Drop"] },
    ],
  },
  {
    id: "france",
    name: "France (Paris & Riviera)",
    region: "International",
    image: franceImg,
    tagline: "Eiffel tower summit, Seine sunset cruise & French Riviera",
    curatedTag: "Paris Romance & Riviera",
    sampleDays: [
      { day: "Day 1", title: "Arrival in Paris & Seine River Sunset Cruise", desc: "Private transfer to boutique Champs-Élysées hotel, illuminated cruise.", location: "Paris", tags: ["Seine Cruise", "Champs-Élysées"] },
      { day: "Day 2", title: "Eiffel Tower Summit & Louvre Masterpieces", desc: "Skip-the-line Eiffel Tower lift, Mona Lisa guided highlights, cafe macarons.", location: "Paris", tags: ["Eiffel Tower", "Louvre"] },
      { day: "Day 3", title: "High-Speed TGV Train to Nice French Riviera", desc: "Promenade des Anglais seaside stroll, Mediterranean seafood dinner.", location: "Nice", tags: ["TGV Train", "French Riviera"] },
      { day: "Day 4", title: "Monaco & Monte Carlo Glamour Tour", desc: "Prince's Palace, Formula 1 circuit drive, Casino de Monte-Carlo.", location: "Monaco", tags: ["Monaco", "Monte Carlo"] },
      { day: "Day 5", title: "Perfume Workshop at Grasse & Flight Home", desc: "Custom fragrance making workshop, transfer to Nice airport.", location: "Nice", tags: ["Custom Perfume", "Airport Drop"] },
    ],
  },
  {
    id: "newzealand",
    name: "New Zealand",
    region: "International",
    image: newzealandImg,
    tagline: "Milford Sound fjords, Queenstown peaks & Hobbiton",
    curatedTag: "Scenic Fjords & Glaciers",
    sampleDays: [
      { day: "Day 1", title: "Arrival in Auckland City of Sails", desc: "Sky Tower viewing deck, luxury harbour dinner cruise, self-drive 4x4 pickup.", location: "Auckland", tags: ["Sky Tower", "Harbour Cruise"] },
      { day: "Day 2", title: "Hobbiton Movie Set & Waitomo Glowworm Caves", desc: "The Shire tour with Green Dragon Inn ale, boat under glowworm ceilings.", location: "Matamata", tags: ["Hobbiton", "Glowworm Caves"] },
      { day: "Day 3", title: "Fly to Queenstown Adventure Capital", desc: "Bob's Peak skyline gondola, Lake Wakatipu cruise on TSS Earnslaw.", location: "Queenstown", tags: ["Queenstown", "Skyline Gondola"] },
      { day: "Day 4", title: "Milford Sound Glass-Roof Coach & Fjord Cruise", desc: "Stirling Falls waterfall shower, fur seals, glacier-carved peaks.", location: "Milford Sound", tags: ["Milford Sound", "Fjord Cruise"] },
      { day: "Day 5", title: "Central Otago Wine Tasting & Departure", desc: "Pinot Noir vineyard cellar tour, farewell flight back.", location: "Queenstown", tags: ["Vineyards", "Flight Home"] },
    ],
  },
];

export interface TrailBuilderProps {
  initialDestination?: string;
  initialVibe?: "Couple" | "Family" | "Friends" | "Solo";
  initialStep?: 1 | 2 | 3 | 4;
  className?: string;
  onClose?: () => void;
}

export const InteractiveTrailBuilder: React.FC<TrailBuilderProps> = ({
  initialDestination,
  initialVibe,
  initialStep = 1,
  className = "",
  onClose,
}) => {
  // Step State (1: Destination & Departure -> 2: Vibe & Travelers -> 3: Stays & Upgrades -> 4: Review & Proposal)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(
    initialStep > 4 ? 4 : (initialStep as 1 | 2 | 3 | 4)
  );
  // Track highest step the user has legitimately unlocked
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(initialStep || 1);
  // Inline validation error message
  const [stepError, setStepError] = useState<string>("");

  const builderTopRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef<number>(currentStep);

  // Smooth scroll to top of builder container ONLY when the step actually changes (not on initial mount)
  useEffect(() => {
    if (prevStepRef.current === currentStep) {
      return;
    }
    prevStepRef.current = currentStep;

    // Small timeout ensures the DOM has updated and dimensions are calculated
    const timer = setTimeout(() => {
      if (builderTopRef.current) {
        const yOffset = -90; // offset for fixed navbar
        const y = builderTopRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [currentStep]);


  // Destination selection & search
  const [destinationInput, setDestinationInput] = useState<string>(() => {
    if (initialDestination) return initialDestination;
    // When coming via vibe-only (e.g. from Travel Your Way cards), start empty
    return "";
  });
  const [selectedDestId, setSelectedDestId] = useState<string>(() => {
    if (initialDestination) {
      const match = TRAIL_DESTINATIONS.find(
        (d) => d.name.toLowerCase() === initialDestination.toLowerCase()
      );
      if (match) return match.id;
    }
    return "";
  });
  const [customRegion, setCustomRegion] = useState<"Domestic" | "International">("Domestic");

  // Vibe & Travelers
  const [travelVibe, setTravelVibe] = useState<"Couple" | "Family" | "Friends" | "Solo">(
    initialVibe || "Couple"
  );
  const [adults, setAdults] = useState(() => {
    if (initialVibe === "Solo") return 1;
    if (initialVibe === "Friends") return 3;
    if (initialVibe === "Family") return 3;
    return 2; // Couple default
  });
  const [children, setChildren] = useState(0);
  const [durationDays, setDurationDays] = useState(2);

  // Stay Tier & Budget & Inclusions
  const [hotelTier, setHotelTier] = useState<"Comfort" | "Premium" | "Luxury" | "UltraLuxury">("Luxury");
  const [budgetRange, setBudgetRange] = useState<string>("");
  const [includeFlights, setIncludeFlights] = useState(true);
  const [includeGourmetMeals, setIncludeGourmetMeals] = useState(true);
  const [includePrivateChauffeur, setIncludePrivateChauffeur] = useState(true);
  const [includeInsuranceEsim, setIncludeInsuranceEsim] = useState(true);

  // Timeline preview toggle in sidebar/accordion
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Customer Contact Info (ONLY gathered on Step 4)
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Modal for fallback consultation
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Match against preset catalog
  const matchedPreset = useMemo(() => {
    const query = destinationInput.trim().toLowerCase();
    if (!query) return null;
    return (
      TRAIL_DESTINATIONS.find((d) => d.name.toLowerCase() === query) ||
      TRAIL_DESTINATIONS.find((d) => d.id === selectedDestId) ||
      null
    );
  }, [destinationInput, selectedDestId]);

  const isCustomDestination = !matchedPreset && destinationInput.trim().length > 0;

  const resolveDestinationImage = (name: string, isDomestic: boolean) => {
    const lower = name.toLowerCase();
    if (lower.includes("ladakh") || lower.includes("leh")) return ladakhImg;
    if (lower.includes("kashmir") || lower.includes("srinagar") || lower.includes("gulmarg")) return kashmirImg;
    if (lower.includes("spiti")) return spitiImg;
    if (lower.includes("meghalaya") || lower.includes("shillong")) return meghalayaImg;
    if (lower.includes("himachal") || lower.includes("manali") || lower.includes("shimla")) return himachalImg;
    if (lower.includes("sikkim") || lower.includes("gangtok")) return sikkimImg;
    if (lower.includes("uttarakhand") || lower.includes("rishikesh") || lower.includes("kedarnath")) return uttarakhandImg;
    if (lower.includes("rajasthan") || lower.includes("jaipur") || lower.includes("udaipur")) return rajasthanImg;
    if (lower.includes("andaman") || lower.includes("havelock")) return andamanImg;
    if (lower.includes("vietnam") || lower.includes("hanoi") || lower.includes("da nang")) return vietnamImg;
    if (lower.includes("thailand") || lower.includes("phuket") || lower.includes("krabi") || lower.includes("bangkok")) return thailandImg;
    if (lower.includes("maldives")) return maldivesImg;
    if (lower.includes("france") || lower.includes("paris") || lower.includes("nice")) return franceImg;
    if (lower.includes("switzerland") || lower.includes("swiss") || lower.includes("zurich") || lower.includes("interlaken")) return switzerlandImg;
    if (lower.includes("japan") || lower.includes("tokyo") || lower.includes("kyoto")) return "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80";
    if (lower.includes("bali")) return "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80";
    if (lower.includes("dubai")) return "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80";
    if (lower.includes("new zealand") || lower.includes("zealand")) return newzealandImg;
    return isDomestic ? kashmirImg : switzerlandImg;
  };

  // Active Destination Config (Preset or Dynamically generated)
  const currentDest: DestinationConfig = useMemo(() => {
    if (matchedPreset) return matchedPreset;

    const trimmed = destinationInput.trim() || "Custom Destination";
    const isDomestic = customRegion === "Domestic";

    return {
      id: "custom-" + trimmed.toLowerCase().replace(/\s+/g, "-"),
      name: trimmed,
      region: isDomestic ? "Domestic" : "International",
      image: resolveDestinationImage(trimmed, isDomestic),
      tagline: `Curated personalized journeys to picturesque ${trimmed}`,
      curatedTag: "Custom Route",
      sampleDays: [
        {
          day: "Day 1",
          title: `Arrival in ${trimmed} & Private Chauffeur Check-in`,
          desc: `VIP airport pickup, check-in to handpicked luxury resort, welcome refreshments and leisure stroll.`,
          location: trimmed,
          tags: ["Private Transfer", "VIP Check-in", "Welcome Drink"],
        },
        {
          day: "Day 2",
          title: `Iconic Highlights & Private Guided Tour of ${trimmed}`,
          desc: `Dedicated private chauffeur and expert guide for top landmarks, scenic overlooks, and local culture.`,
          location: trimmed,
          tags: ["Private Chauffeur", "Sightseeing", "Guided Tour"],
        },
        {
          day: "Day 3",
          title: `Scenic Excursion & Signature Experiences`,
          desc: `Full-day excursion into nature, hidden gems, and authentic regional culinary specialties.`,
          location: trimmed,
          tags: ["Scenic Excursion", "Photography", "Local Taste"],
        },
        {
          day: "Day 4",
          title: `Curated Leisure & Sunset Gourmet Dining`,
          desc: `Relaxed spa wellness morning, artisanal boutique shopping, and an intimate candlelit dinner.`,
          location: trimmed,
          tags: ["Artisanal Market", "Gourmet Dinner", "Sunset View"],
        },
        {
          day: "Day 5",
          title: `Farewell & Private Airport Drop`,
          desc: `Signature breakfast, photography memories, and private chauffeur transfer for your flight home.`,
          location: trimmed,
          tags: ["Breakfast", "Airport Drop", "Return Flight"],
        },
      ],
    };
  }, [matchedPreset, destinationInput, customRegion]);

  const handleDestinationInputChange = (val: string) => {
    setDestinationInput(val);
    setStepError("");
    const match = TRAIL_DESTINATIONS.find(
      (d) => d.name.toLowerCase() === val.trim().toLowerCase()
    );
    if (match) {
      setSelectedDestId(match.id);
      setCustomRegion(match.region);
    } else {
      setSelectedDestId("");
    }
  };

  /** Validate current step requirements and advance to the target step if valid */
  const validateAndGoTo = (target: 1 | 2 | 3 | 4) => {
    setStepError("");
    // Going backwards is always allowed
    if (target <= currentStep) {
      setCurrentStep(target);
      return;
    }
    // Step 1 → 2: destination must be filled (required)
    if (currentStep === 1) {
      if (!destinationInput.trim()) {
        setStepError("Please enter or select a destination before continuing.");
        return;
      }
    }
    // Step 2 → 3: all fields are optional (vibe, travelers, children, duration all have defaults)
    // Step 3 → 4: hotel tier always has a default selection
    // Advance and unlock
    setCurrentStep(target);
    setMaxUnlockedStep((prev) => Math.max(prev, target));
  };

  const whatsappUrl = useMemo(() => {
    const vibeLabel =
      travelVibe === "Solo" ? "Solo" :
      travelVibe === "Friends" ? "Squad" :
      travelVibe === "Couple" ? "Couple" : "Family";

    const finalDestName = destinationInput.trim() || currentDest.name;
    const activeBudget = budgetRange.trim() || "Quote On Request";

    const rawMessage =
      `Hi Triponomic! I customized a trail on your website:\n\n` +
      `👤 Name: ${customerName || "Traveler"}\n` +
      `📞 Contact: ${customerPhone || "N/A"}\n` +
      `📍 Destination: ${finalDestName}\n` +
      `👥 Travelers: ${adults} Adults${children > 0 ? `, ${children} Children` : ""} (${vibeLabel})\n` +
      `⏱ Duration: ${durationDays} Days\n` +
      `💰 Budget Range: ${activeBudget}\n` +
      `🏨 Stays: ${
        hotelTier === "Comfort"
          ? "Comfort (Clean & Convenient Stays)"
          : hotelTier === "Premium"
          ? "Premium (Handpicked Boutique Retreats)"
          : hotelTier === "UltraLuxury"
          ? "Ultra Luxury (Private Pool Villas & Suites)"
          : "Luxury (Premier Resorts & Suites)"
      }` +
      (travelMonth ? `\n🗓 Travel Month / Dates: ${travelMonth}` : "") +
      (specialRequests ? `\n📝 Special Preferences: ${specialRequests}` : "") +
      `\n\nPlease share the day-by-day customized itinerary proposal and confirm available partner tariffs for my travel dates.`;

    return `https://wa.me/919611922632?text=${encodeURIComponent(rawMessage)}`;
  }, [
    customerName,
    customerPhone,
    destinationInput,
    currentDest,
    adults,
    children,
    travelVibe,
    durationDays,
    hotelTier,
    budgetRange,
    includeFlights,
    includePrivateChauffeur,
    includeGourmetMeals,
    travelMonth,
    specialRequests,
  ]);

  // Google Form Submission Endpoint
  const FORM_ACTION_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfqfDU_lEAq_Kv2PVFSZa3lk_vvvE4kBG4dRnp0gWt7XLnFvg/formResponse";

  const handleSendEnquiry = async () => {
    let hasError = false;
    if (!customerName.trim()) {
      setNameError(true);
      hasError = true;
    }
    const phoneDigits = customerPhone.replace(/\D/g, "");
    const isValidPhone = phoneDigits.length === 10 || (phoneDigits.length === 12 && phoneDigits.startsWith("91"));
    if (!isValidPhone) {
      setPhoneError(true);
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);
    const formData = new FormData();
    const activeBudget = budgetRange.trim() || "Quote On Request";

    // ── Core contact fields ──
    formData.append("entry.2005620554", customerName.trim());                   // Name
    formData.append("entry.1166974658", customerPhone.trim());                  // Phone
    formData.append("entry.1045781291", "trail-enquiry@triponomic.com");        // Email (internal tag)
    formData.append("entry.1203831394", activeBudget);                          // Budget (CONNECTED TO GOOGLE FORM)

    // ── Destination ──
    const finalDestination = destinationInput.trim() || currentDest.name;
    formData.append("entry.396208505", finalDestination);

    // ── Travel details (new fields) ──
    formData.append("entry.1398589529", travelVibe);                            // Vibe
    formData.append("entry.1956066145", String(adults));                        // Adults
    formData.append("entry.1493152567", String(children));                      // Children
    formData.append("entry.957913206",  String(durationDays));                  // Duration (days)
    formData.append("entry.1822182309",                                         // Hotel Tier
      hotelTier === "Comfort"     ? "Comfort"     :
      hotelTier === "Premium"     ? "Premium"     :
      hotelTier === "UltraLuxury" ? "Ultra Luxury": "Luxury"
    );
    formData.append("entry.967988687",  includeFlights ? "Yes" : "No");        // Flights
    formData.append("entry.1099955133", travelMonth || "");                     // Travel Month
    formData.append("entry.1012744002", specialRequests || "");                 // Special Requests

    try {
      await fetch(FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
    } catch (err) {
      console.error("Form submit error", err);
    }

    // Capture in local admin enquiries store
    addEnquiry({
      name: customerName.trim(),
      phone: customerPhone.trim(),
      destination: finalDestination,
      source: "Journey Crafter",
      travelers: `${adults} Adults${children > 0 ? `, ${children} Children` : ""} (${travelVibe})`,
      duration: `${durationDays} Days`,
      hotelTier:
        hotelTier === "Comfort"
          ? "Comfort"
          : hotelTier === "Premium"
          ? "Premium"
          : hotelTier === "UltraLuxury"
          ? "Ultra Luxury"
          : "Luxury",
      budget: activeBudget,
      notes: specialRequests.trim() || undefined,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleExportToWhatsApp = (e: React.MouseEvent) => {
    let hasError = false;
    if (!customerName.trim()) {
      setNameError(true);
      hasError = true;
    }
    const phoneDigits = customerPhone.replace(/\D/g, "");
    const isValidPhone = phoneDigits.length === 10 || (phoneDigits.length === 12 && phoneDigits.startsWith("91"));
    if (!isValidPhone) {
      setPhoneError(true);
      hasError = true;
    }

    if (hasError) {
      e.preventDefault();
      return;
    }

    // Submit enquiry to Google Form / Google Sheet
    handleSendEnquiry();

    // Open WhatsApp link in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const stepTitles = [
    { num: 1, label: "Destination & Route", subtitle: "Where to travel" },
    { num: 2, label: "Vibe & Travelers", subtitle: "Travel style & pacing" },
    { num: 3, label: "Stays & Inclusions", subtitle: "Budget to luxury stays" },
    { num: 4, label: "Custom Quotation", subtitle: "WhatsApp & custom quote" },
  ];

  return (
    <div
      ref={builderTopRef}
      className={`w-full rounded-3xl bg-white shadow-[0_25px_70px_rgba(32,38,58,0.08)] border border-gray-100 overflow-hidden ${className}`}
    >
      {/* ── TOP HEADER BANNER (THEMED IN BRAND COLOR #404762) ── */}
      <div className="bg-gradient-to-r from-[#171C2B] via-[#2A324A] to-[#404762] p-6 sm:p-8 text-white relative overflow-hidden border-b border-[#525B7C]/40">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-[#5F6B95]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-[#404762]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#BAC7F5] text-[11px] font-bold tracking-widest uppercase mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <ShinyText text="TRIPONOMIC CUSTOM TRIP STUDIO" speed={4} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Design Your Personalized Itinerary
            </h2>
            <p className="text-white/75 text-xs sm:text-sm mt-1 max-w-xl font-light">
              Customize departure city, destination highlights, stay preferences, and day-by-day pacing. Our master curators will lock direct partner tariffs.
            </p>
          </div>

          {/* Close button if rendered in modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ── INTERACTIVE STEP NAVIGATION (REACTBITS STYLE TABS) ── */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {stepTitles.map((st) => {
              const isActive = currentStep === st.num;
              const isPast = currentStep > st.num;
              return (
                <button
                  key={st.num}
                  type="button"
                  onClick={() => {
                    // Only allow navigating to steps already unlocked
                    if (st.num <= maxUnlockedStep) {
                      setStepError("");
                      setCurrentStep(st.num as any);
                    }
                  }}
                  title={st.num > maxUnlockedStep ? "Complete the current step first" : st.label}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all relative overflow-hidden ${
                    isActive
                      ? "bg-white/15 border-2 border-white/40 shadow-lg shadow-black/20"
                      : isPast
                        ? "bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
                        : st.num <= maxUnlockedStep
                          ? "bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
                          : "bg-white/5 border border-white/5 opacity-40 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 transition-transform ${isActive
                      ? "bg-[#404762] text-white shadow ring-2 ring-white/50 scale-105"
                      : isPast
                        ? "bg-emerald-500/80 text-white"
                        : "bg-white/10 text-white/70"
                      }`}
                  >
                    {isPast ? <Check className="w-4 h-4" /> : st.num}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-bold truncate ${isActive ? "text-white" : "text-white/80"
                        }`}
                    >
                      {st.label}
                    </p>
                    <p className="text-[10px] text-white/50 truncate hidden sm:block">
                      {st.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN STUDIO WORKSPACE (FULL WIDTH STUDIO CANVAS) ── */}
      <div className="p-3 sm:p-4 bg-[#F8F9FD] pb-2 sm:pb-3">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm">
          <AnimatePresence mode="wait">
            {/* ════ STEP 1: DESTINATION & DEPARTURE HUB ════ */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* HEADER BANNER WITH REACTBITS TRUEFOCUS & SHINYTEXT */}
                <div className="text-center max-w-2xl mx-auto pt-1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#404762]/10 border border-[#404762]/20 text-[#404762] text-xs font-extrabold uppercase tracking-widest mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <ShinyText text="INTERACTIVE ROUTE DESIGNER" speed={3} className="font-bold text-[#404762]" />
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                    <TrueFocus
                      sentence="Where Will Your Next Journey Begin?"
                      manualMode={false}
                      blurAmount={3}
                      borderColor="#404762"
                      glowColor="rgba(64, 71, 98, 0.35)"
                      animationDuration={0.2}
                      pauseBetweenAnimations={0.4}
                    />
                  </h2>
                </div>

                {/* FUTURISTIC SEARCH BAR WRAPPED IN REACTBITS STARBORDER */}
                <div className="max-w-3xl mx-auto">
                  <StarBorder
                    as="div"
                    color="#404762"
                    speed="4.5s"
                    className="w-full shadow-lg shadow-[#404762]/10"
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (destinationInput.trim()) {
                          setCurrentStep(2);
                        }
                      }}
                      className="relative flex items-center bg-white rounded-[22px] px-4 sm:px-5 py-2.5 sm:py-3 transition-all border border-gray-100"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#404762]/10 flex items-center justify-center text-[#404762] mr-3 shrink-0">
                        <Compass className="w-5 h-5 animate-pulse" />
                      </div>
                      <input
                        type="text"
                        value={destinationInput}
                        onChange={(e) => handleDestinationInputChange(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (destinationInput.trim()) {
                              setCurrentStep(2);
                            }
                          }
                        }}
                        placeholder="Type your destination (e.g. Kashmir, Switzerland, Ladakh, Bali, Amalfi, Japan)..."
                        className="w-full bg-transparent text-gray-900 text-sm sm:text-base font-bold outline-none placeholder:text-gray-400 placeholder:font-normal"
                      />
                      {destinationInput && (
                        <button
                          type="button"
                          onClick={() => handleDestinationInputChange("")}
                          className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition shrink-0 cursor-pointer"
                          title="Clear input"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </form>
                  </StarBorder>
                </div>





                {/* BOTTOM ACTION WRAPPED IN REACTBITS MAGNET */}
                <div className="flex flex-col items-end pt-3.5 border-t border-gray-100 max-w-5xl mx-auto gap-2">
                  {stepError && (
                    <p className="text-xs text-red-500 font-semibold animate-shake text-right">
                      ⚠ {stepError}
                    </p>
                  )}
                  <Magnet magnetStrength={0.25} padding={12}>
                    <button
                      type="button"
                      onClick={() => validateAndGoTo(2)}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#404762] hover:bg-[#4E5779] text-white text-xs font-extrabold tracking-widest uppercase transition-all shadow-lg hover:shadow-xl shadow-[#404762]/25 cursor-pointer"
                    >
                      Step 2: Who's Traveling?
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Magnet>
                </div>
              </motion.div>
            )}

            {/* ════ STEP 2: VIBE & TRAVELERS ════ */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* TRAVEL VIBE WITH SPOTLIGHT EFFECT */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-[#404762] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#404762]/10 flex items-center justify-center text-[#404762]">
                      <Heart className="w-3.5 h-3.5" />
                    </span>
                    1. What Style & Vibe Defines This Journey?
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      {
                        id: "Couple",
                        label: "Couple / Honeymoon",
                        image: honeymoonVibeImg,
                        tag: "Romance & Seclusion",
                        desc: "Intimate candlelit dinners, scenic suites, private sunset viewpoints.",
                      },
                      {
                        id: "Family",
                        label: "Family Escape",
                        image: familyVibeImg,
                        tag: "All Ages Welcome",
                        desc: "Relaxed pacing, connecting suites, kid-friendly experiential activities.",
                      },
                      {
                        id: "Friends",
                        label: "Squad Adventure",
                        image: friendsVibeImg,
                        tag: "Epic Memories",
                        desc: "Action-packed excursions, private villas, scenic road trips & beach clubs.",
                      },
                      {
                        id: "Solo",
                        label: "Solo Explorer",
                        image: soloVibeImg,
                        tag: "Mindful Pacing",
                        desc: "Off-beat mountain trails, soul retreats, 24/7 verified luxury concierge.",
                      },
                    ].map((v) => {
                      const isSelected = travelVibe === v.id;
                      return (
                        <SpotlightCard
                          key={v.id}
                          spotlightColor="rgba(64, 71, 98, 0.2)"
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-3.5 items-center ${isSelected
                            ? "border-[#404762] bg-[#404762]/8 shadow-md ring-2 ring-[#404762]/20"
                            : "border-gray-200/80 hover:border-[#404762]/40 hover:bg-gray-50 bg-white"
                            }`}
                          onClick={() => {
                            const vibe = v.id as "Couple" | "Family" | "Friends" | "Solo";
                            setTravelVibe(vibe);
                            if (vibe === "Solo") setAdults(1);
                            else if (vibe === "Couple") setAdults(2);
                            else if (vibe === "Friends" || vibe === "Family") setAdults(3);
                          }}
                        >
                          <img
                            src={v.image}
                            alt={v.label}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-extrabold text-gray-900 truncate">
                                {v.label}
                              </h4>
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-[#404762] shrink-0" />
                              )}
                            </div>
                            <span className="inline-block text-[10px] font-bold text-[#404762] bg-[#404762]/10 px-2 py-0.5 rounded mt-0.5">
                              {v.tag}
                            </span>
                            <p className="text-[11px] text-gray-600 mt-1 leading-snug line-clamp-2">
                              {v.desc}
                            </p>
                          </div>
                        </SpotlightCard>
                      );
                    })}
                  </div>
                </div>

                {/* TRAVELERS COMPOSITION COUNTER */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-[#404762] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#404762]/10 flex items-center justify-center text-[#404762]">
                      <Users className="w-3.5 h-3.5" />
                    </span>
                    2. Travelers Composition
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                    {/* Adults */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                      <div>
                        <p className="text-sm font-extrabold text-gray-900">Adults</p>
                        <p className="text-[11px] text-gray-500">Age 12+ years</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdults((a) => Math.max(1, a - 1))}
                          className="w-8 h-8 rounded-xl bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 shadow-sm transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-base font-extrabold text-[#404762] w-5 text-center">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults((a) => a + 1)}
                          className="w-8 h-8 rounded-xl bg-[#404762] text-white flex items-center justify-center font-bold hover:bg-[#4E5779] shadow-sm transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                      <div>
                        <p className="text-sm font-extrabold text-gray-900">Children</p>
                        <p className="text-[11px] text-gray-500">Age 2-11 years</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildren((c) => Math.max(0, c - 1))}
                          className="w-8 h-8 rounded-xl bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 shadow-sm transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-base font-extrabold text-[#404762] w-5 text-center">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildren((c) => c + 1)}
                          className="w-8 h-8 rounded-xl bg-[#404762] text-white flex items-center justify-center font-bold hover:bg-[#4E5779] shadow-sm transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DURATION PACING */}
                {/* DURATION & PACING SLIDER (1 - 20 DAYS) */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-[#404762] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#404762]/10 flex items-center justify-center text-[#404762]">
                      <Clock className="w-3.5 h-3.5" />
                    </span>
                    3. Duration & Pacing
                  </label>

                  <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div>
                        <p className="text-xs font-extrabold text-gray-900">
                          Preferred Trip Length
                        </p>
                        <p className="text-[11px] text-gray-500 font-light mt-0.5">
                          Slide like a volume control from 1 to 20 days
                        </p>
                      </div>

                      {/* Dynamic Days Counter Badge */}
                      <div className="flex items-baseline gap-1.5 px-4 py-1.5 rounded-2xl bg-[#404762]/10 border border-[#404762]/20 shadow-xs">
                        <span className="text-2xl font-black text-[#404762] leading-none">
                          {durationDays}
                        </span>
                        <span className="text-xs font-extrabold text-[#404762] uppercase tracking-wider">
                          {durationDays === 1 ? "Day" : "Days"}
                        </span>
                        <span className="text-[11px] font-bold text-gray-500 ml-1 hidden sm:inline">
                          • {durationDays <= 3 ? "Weekend Getaway" : durationDays <= 6 ? "Quick Escape" : durationDays <= 9 ? "Classic Journey" : durationDays <= 14 ? "Deep Immersion" : "Grand Expedition"}
                        </span>
                      </div>
                    </div>

                    {/* Custom Volume Slider Track */}
                    <div className="relative py-2">
                      <input
                        type="range"
                        min={1}
                        max={20}
                        step={1}
                        value={durationDays}
                        onChange={(e) => setDurationDays(Number(e.target.value))}
                        className="w-full h-3.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#404762] transition-all hover:brightness-105"
                        style={{
                          background: `linear-gradient(to right, #404762 0%, #404762 ${((durationDays - 1) / 19) * 100}%, #E5E7EB ${((durationDays - 1) / 19) * 100}%, #E5E7EB 100%)`
                        }}
                      />
                    </div>

                    {/* Slider Scale Indicators (1 to 20) */}
                    <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 mt-2 px-1 select-none">
                      <span className={durationDays === 1 ? "text-[#404762] font-black" : ""}>1 Day</span>
                      <span className={durationDays === 5 ? "text-[#404762] font-black" : ""}>5 Days</span>
                      <span className={durationDays === 10 ? "text-[#404762] font-black" : ""}>10 Days</span>
                      <span className={durationDays === 15 ? "text-[#404762] font-black" : ""}>15 Days</span>
                      <span className={durationDays === 20 ? "text-[#404762] font-black" : ""}>20 Days</span>
                    </div>
                  </div>
                </div>

                {/* STEP 2 ACTIONS */}
                <div className="flex flex-col pt-3.5 border-t border-gray-100 gap-2">
                  {stepError && (
                    <p className="text-xs text-red-500 font-semibold text-right animate-shake">
                      ⚠ {stepError}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => validateAndGoTo(1)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Destination
                    </button>

                    <button
                      type="button"
                      onClick={() => validateAndGoTo(3)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#404762] hover:bg-[#4E5779] text-white text-xs font-bold tracking-widest transition-all shadow-md hover:shadow-lg shadow-[#404762]/20 hover:scale-[1.01]"
                    >
                      STEP 3: STAYS & INCLUSIONS
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════ STEP 3: STAYS & CUSTOM INCLUSIONS ════ */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* STAY TIER */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-[#404762] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#404762]/10 flex items-center justify-center text-[#404762]">
                      <Hotel className="w-3.5 h-3.5" />
                    </span>
                    1. Preferred Hospitality & Stay Tier
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* COMFORT */}
                    <SpotlightCard
                      spotlightColor="rgba(64, 71, 98, 0.22)"
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${hotelTier === "Comfort"
                        ? "border-[#404762] bg-[#404762]/8 shadow-md ring-2 ring-[#404762]/20"
                        : "border-gray-200/80 hover:border-[#404762]/40 bg-white"
                        }`}
                      onClick={() => setHotelTier("Comfort")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-[10px] uppercase tracking-wider">
                          Clean & Convenient
                        </span>
                        {hotelTier === "Comfort" && (
                          <CheckCircle2 className="w-5 h-5 text-[#404762]" />
                        )}
                      </div>
                      <h4 className="text-base font-extrabold text-gray-900">
                        Comfort
                      </h4>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                        Clean, well-maintained hotels and guesthouses in central locations with all essential amenities.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ Verified Cleanliness
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ Central Locations
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ Essential Amenities
                        </span>
                      </div>
                    </SpotlightCard>

                    {/* PREMIUM */}
                    <SpotlightCard
                      spotlightColor="rgba(64, 71, 98, 0.22)"
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${hotelTier === "Premium"
                        ? "border-[#404762] bg-[#404762]/8 shadow-md ring-2 ring-[#404762]/20"
                        : "border-gray-200/80 hover:border-[#404762]/40 bg-white"
                        }`}
                      onClick={() => setHotelTier("Premium")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#404762]/10 text-[#404762] font-extrabold text-[10px] uppercase tracking-wider">
                          Enhanced Style & Views
                        </span>
                        {hotelTier === "Premium" && (
                          <CheckCircle2 className="w-5 h-5 text-[#404762]" />
                        )}
                      </div>
                      <h4 className="text-base font-extrabold text-gray-900">
                        Premium
                      </h4>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                        Handpicked boutique hotels and scenic retreats offering superior rooms, great views, and warm hospitality.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ Scenic View Rooms
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ Delicious Breakfast
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ Dedicated Host
                        </span>
                      </div>
                    </SpotlightCard>

                    {/* LUXURY */}
                    <SpotlightCard
                      spotlightColor="rgba(64, 71, 98, 0.22)"
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${hotelTier === "Luxury"
                        ? "border-[#404762] bg-[#404762]/8 shadow-md ring-2 ring-[#404762]/20"
                        : "border-gray-200/80 hover:border-[#404762]/40 bg-white"
                        }`}
                      onClick={() => setHotelTier("Luxury")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase tracking-wider">
                          Top-Tier Hospitality
                        </span>
                        {hotelTier === "Luxury" && (
                          <CheckCircle2 className="w-5 h-5 text-[#404762]" />
                        )}
                      </div>
                      <h4 className="text-base font-extrabold text-gray-900">
                        Luxury
                      </h4>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                        Premier resorts and luxury properties featuring spacious rooms, gourmet dining, and excellent service.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ Premium Room Category
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ Daily Gourmet Dining
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ Spa & Resort Access
                        </span>
                      </div>
                    </SpotlightCard>

                    {/* ULTRA LUXURY */}
                    <SpotlightCard
                      spotlightColor="rgba(64, 71, 98, 0.22)"
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${hotelTier === "UltraLuxury"
                        ? "border-[#404762] bg-[#404762]/8 shadow-md ring-2 ring-[#404762]/20"
                        : "border-gray-200/80 hover:border-[#404762]/40 bg-white"
                        }`}
                      onClick={() => setHotelTier("UltraLuxury")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-[10px] uppercase tracking-wider">
                          Exclusive & Private
                        </span>
                        {hotelTier === "UltraLuxury" && (
                          <CheckCircle2 className="w-5 h-5 text-[#404762]" />
                        )}
                      </div>
                      <h4 className="text-base font-extrabold text-gray-900">
                        Ultra Luxury
                      </h4>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                        Exclusive private pool villas and signature suites with personalized service and complete privacy.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ Private Pool / Villa
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ 24/7 Dedicated Butler
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md font-semibold text-[#404762]">
                          ✓ VIP Private Transfers
                        </span>
                      </div>
                    </SpotlightCard>
                  </div>
                </div>

                {/* TARGET BUDGET INPUT */}
                <div className="pt-2">
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-[#404762] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#404762]/10 flex items-center justify-center text-[#404762]">
                      <Coins className="w-3.5 h-3.5" />
                    </span>
                    2. Target Budget / Expected Spending
                  </label>

                  <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-2">
                    <div className="relative">
                      <Coins className="w-4 h-4 text-[#404762] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        placeholder="Enter your target budget (e.g. ₹35,000 / person, ₹1.5 Lakh total, or Flexible)"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#404762] focus:ring-2 focus:ring-[#404762]/20 bg-white text-sm font-medium text-gray-900 outline-none transition shadow-sm"
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium pl-1">
                      💡 Enter your per-person or total estimated budget, or leave empty if flexible.
                    </p>
                  </div>
                </div>



                {/* STEP 3 ACTIONS */}
                <div className="flex items-center justify-between pt-3.5 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => validateAndGoTo(2)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Travelers
                  </button>

                  <button
                    type="button"
                    onClick={() => validateAndGoTo(4)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#404762] hover:bg-[#4E5779] text-white text-xs font-bold tracking-widest transition-all shadow-md hover:shadow-lg shadow-[#404762]/20 hover:scale-[1.01]"
                  >
                    STEP 4: CUSTOM QUOTATION
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ════ STEP 4: CUSTOM QUOTATION & EXPORT (NO FORM FEELING) ════ */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {isSubmitted ? (
                  <div className="p-8 text-center rounded-3xl bg-gradient-to-b from-[#404762]/10 to-white border border-[#404762]/30 shadow-lg space-y-5">
                    <div className="w-16 h-16 rounded-full bg-[#404762]/15 text-[#404762] mx-auto flex items-center justify-center shadow-inner ring-8 ring-[#404762]/10">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div>
                      <span className="px-3.5 py-1 rounded-full bg-[#404762]/15 text-[#404762] text-[11px] font-bold uppercase tracking-widest border border-[#404762]/25">
                        Request Received
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
                        Thank you, {customerName}! 🎉
                      </h3>
                      <p className="text-sm text-gray-600 max-w-lg mx-auto mt-2 leading-relaxed">
                        Your trip details for{" "}
                        <strong className="text-[#404762]">{currentDest.name}</strong> have been
                        received by our travel team. We will contact you on{" "}
                        <strong className="text-[#404762]">{customerPhone}</strong>{" "}
                        with your customized day-by-day plan and pricing.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold tracking-wider transition-all shadow-md hover:scale-105"
                      >
                        <MessageSquare className="w-4 h-4" />
                        CHAT WITH TRIP CURATOR ON WHATSAPP
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setCurrentStep(1);
                        }}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold tracking-wider transition"
                      >
                        PLAN ANOTHER DESTINATION
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* QUOTATION HEADER */}
                    <SpotlightCard
                      spotlightColor="rgba(64, 71, 98, 0.2)"
                      className="p-5 rounded-2xl bg-gradient-to-r from-[#1E2536] via-[#2E364E] to-[#404762] text-white shadow-md border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-white">
                            Get Your Custom Itinerary & Quote
                          </h3>
                          <p className="text-xs text-white/75">
                            Personalized route and best pricing with no hidden charges.
                          </p>
                        </div>
                      </div>
                    </SpotlightCard>

                    {/* CONCIERGE RECEPTION CARD */}
                    <div className="p-6 rounded-3xl bg-gray-50/70 border border-gray-200 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-[#404762] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={customerName}
                              onChange={(e) => {
                                setCustomerName(e.target.value);
                                if (nameError) setNameError(false);
                              }}
                              placeholder="e.g. Rahul Sharma"
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white text-sm font-medium text-gray-900 outline-none transition shadow-sm ${nameError
                                ? "border-red-500 ring-2 ring-red-200"
                                : "border-gray-300 focus:border-[#404762]"
                                }`}
                            />
                          </div>
                          {nameError && (
                            <p className="text-[11px] text-red-600 mt-1 font-medium">
                              Please enter your full name
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Mobile / WhatsApp Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-[#404762] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="tel"
                              value={customerPhone}
                              onChange={(e) => {
                                const val = e.target.value;
                                const digitsOnly = val.replace(/\D/g, "");
                                if (digitsOnly.length <= 10 || (digitsOnly.startsWith("91") && digitsOnly.length <= 12)) {
                                  setCustomerPhone(val);
                                  if (phoneError) setPhoneError(false);
                                }
                              }}
                              placeholder="10-digit mobile number (e.g. 9876543210)"
                              maxLength={15}
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white text-sm font-medium text-gray-900 outline-none transition shadow-sm ${phoneError
                                ? "border-red-500 ring-2 ring-red-200"
                                : "border-gray-300 focus:border-[#404762]"
                                }`}
                            />
                          </div>
                          {phoneError && (
                            <p className="text-[11px] text-red-600 mt-1 font-bold animate-shake flex items-center gap-1">
                              ⚠ Mobile number must be strictly 10 digits
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Travel Dates or Month (Optional)
                          </label>
                          <div className="relative">
                            <Calendar className="w-4 h-4 text-[#404762] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={travelMonth}
                              onChange={(e) => setTravelMonth(e.target.value)}
                              placeholder="e.g. Next month, Diwali holidays, Oct 15-22"
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#404762] bg-white text-xs font-medium text-gray-900 outline-none transition"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Special Requests / Preferences (Optional)
                          </label>
                          <input
                            type="text"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder="e.g. Honeymoon setup, mountain view room, veg meals"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#404762] bg-white text-xs font-medium text-gray-900 outline-none transition"
                          />
                        </div>
                      </div>
                    </div>

                    {/* TWO PRIMARY ACTIONS */}
                    <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl order-2 sm:order-1"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Stays
                      </button>

                      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
                        <button
                          type="button"
                          onClick={handleExportToWhatsApp}
                          disabled={isSubmitting}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold tracking-wider transition-all shadow-md hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{isSubmitting ? "Submitting..." : "EXPORT TO WHATSAPP"}</span>
                        </button>

                        <button
                          id="trail-quote-submit-btn"
                          type="button"
                          onClick={handleSendEnquiry}
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#404762] hover:bg-[#4E5779] text-white text-xs font-extrabold tracking-widest transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 cursor-pointer shadow-[#404762]/25"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              REQUESTING...
                            </>
                          ) : (
                            <>
                              REQUEST CUSTOM QUOTE
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Embedded Enquiry Modal fallback */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        destination={`${currentDest.name} Custom Trail (${durationDays}D)`}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>
  );
};

export default InteractiveTrailBuilder;
