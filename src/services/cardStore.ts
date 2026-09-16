import { useState, useEffect } from "react";

// Domestic assets
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

// International assets
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

export interface DestinationCard {
  id: string;
  type: "domestic" | "international";
  name: string;
  image: string;
  category: string;
  vibe: string;
  duration: string;
  investment: string;
  startingPrice?: string;
  bestTime: string;
  bestSeason?: string;
  featured?: boolean;
  updatedAt?: number;
}

const STORAGE_KEY = "triponomic_cards_v1";

export const INITIAL_DOMESTIC_CARDS: DestinationCard[] = [
  {
    id: "dom-ladakh",
    type: "domestic",
    name: "Leh Ladakh",
    image: ladakhImg,
    category: "Mountains",
    vibe: "High passes, starlit deserts & monasteries",
    duration: "6–8 Days",
    investment: "From ₹35,000*",
    bestTime: "Jun – Sep",
    featured: true,
  },
  {
    id: "dom-spiti",
    type: "domestic",
    name: "Spiti",
    image: spitiImg,
    category: "Mountains",
    vibe: "Rugged canyons, fossil villages & moon lake",
    duration: "6–8 Days",
    investment: "From ₹25,000*",
    bestTime: "Jun – Sep",
    featured: true,
  },
  {
    id: "dom-kashmir",
    type: "domestic",
    name: "Kashmir",
    image: kashmirImg,
    category: "Mountains",
    vibe: "Shikara sunsets, Gulmarg snow & pine meadows",
    duration: "5–7 Days",
    investment: "From ₹24,999*",
    bestTime: "Mar – Oct",
    featured: true,
  },
  {
    id: "dom-meghalaya",
    type: "domestic",
    name: "Meghalaya",
    image: meghalayaImg,
    category: "Northeast",
    vibe: "Living root bridges, cloud valleys & transparent rivers",
    duration: "5–7 Days",
    investment: "From ₹30,000*",
    bestTime: "Oct – May",
    featured: true,
  },
  {
    id: "dom-himachal",
    type: "domestic",
    name: "Himachal",
    image: himachalImg,
    category: "Mountains",
    vibe: "Cedar forests, colonial hamlets & riverside cafes",
    duration: "5–7 Days",
    investment: "From ₹17,000*",
    bestTime: "Mar – Jun, Sep – Dec",
  },
  {
    id: "dom-sikkim",
    type: "domestic",
    name: "Sikkim",
    image: sikkimImg,
    category: "Northeast",
    vibe: "Kanchenjunga vistas, orchid sanctuaries & glacial lakes",
    duration: "5–7 Days",
    investment: "From ₹25,000*",
    bestTime: "Mar – May, Oct – Dec",
  },
  {
    id: "dom-arunachal",
    type: "domestic",
    name: "Arunachal Pradesh",
    image: arunachalImg,
    category: "Northeast",
    vibe: "Tawang monastery, snow peaks & tribal heritage",
    duration: "6–8 Days",
    investment: "From ₹30,000*",
    bestTime: "Oct – Apr",
  },
  {
    id: "dom-uttarakhand",
    type: "domestic",
    name: "Uttarakhand",
    image: uttarakhandImg,
    category: "Mountains",
    vibe: "Ganga riverside aartis, yoga retreats & alpine meadows",
    duration: "5–7 Days",
    investment: "From ₹20,000*",
    bestTime: "Mar – Jun, Sep – Nov",
  },
  {
    id: "dom-rajasthan",
    type: "domestic",
    name: "Rajasthan",
    image: rajasthanImg,
    category: "Heritage",
    vibe: "Palaces of Jaipur & Udaipur, sand dunes of Jaisalmer",
    duration: "5–7 Days",
    investment: "From ₹25,000*",
    bestTime: "Oct – Mar",
    featured: true,
  },
  {
    id: "dom-andaman",
    type: "domestic",
    name: "Andaman",
    image: andamanImg,
    category: "Coastal",
    vibe: "Turquoise lagoons, Radhanagar sunsets & scuba reefs",
    duration: "5–7 Days",
    investment: "From ₹35,000*",
    bestTime: "Oct – May",
    featured: true,
  },
  {
    id: "dom-kerala",
    type: "domestic",
    name: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    category: "Coastal",
    vibe: "Backwater houseboats, spice plantations & Ayurvedic wellness",
    duration: "4–6 Days",
    investment: "From ₹22,999*",
    bestTime: "Sep – Mar",
    featured: true,
  },
  {
    id: "dom-goa",
    type: "domestic",
    name: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    category: "Coastal",
    vibe: "Portuguese villas, sunset beach shacks & luxury resorts",
    duration: "4–5 Days",
    investment: "From ₹20,000*",
    bestTime: "Nov – Feb",
  },
];

export const INITIAL_INTERNATIONAL_CARDS: DestinationCard[] = [
  {
    id: "int-vietnam",
    type: "international",
    name: "Vietnam",
    image: vietnamImg,
    category: "Southeast Asia",
    vibe: "Ha Long Bay emerald crags, ancient lantern streets & street food",
    duration: "5–7 Days",
    investment: "From ₹46,999*",
    bestTime: "Nov – Apr",
    featured: true,
  },
  {
    id: "int-bali",
    type: "international",
    name: "Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    category: "Southeast Asia",
    vibe: "Private pool villas, jungle waterfalls & sunset beach clubs",
    duration: "5–7 Days",
    investment: "From ₹48,999*",
    bestTime: "Apr – Oct",
    featured: true,
  },
  {
    id: "int-japan",
    type: "international",
    name: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
    category: "East Asia",
    vibe: "Bullet trains, neon Tokyo, ancient Kyoto temples & hot spring onsens",
    duration: "7–10 Days",
    investment: "From ₹1,29,999*",
    bestTime: "Mar – May, Sep – Nov",
    featured: true,
  },
  {
    id: "int-switzerland",
    type: "international",
    name: "Switzerland",
    image: switzerlandImg,
    category: "Europe & Alps",
    vibe: "First-class Glacier Express, Matterhorn summits & lakeside chalets",
    duration: "7–10 Days",
    investment: "From ₹1,39,999*",
    bestTime: "Jun – Aug, Dec – Mar",
    featured: true,
  },
  {
    id: "int-kenya",
    type: "international",
    name: "Kenya",
    image: kenyaImg,
    category: "Africa & Safaris",
    vibe: "Great Wildebeest Migration, luxury savannah tented camps & Maasai sunsets",
    duration: "6–8 Days",
    investment: "From ₹1,50,000*",
    bestTime: "Jul – Oct",
  },
  {
    id: "int-thailand",
    type: "international",
    name: "Thailand",
    image: thailandImg,
    category: "Southeast Asia",
    vibe: "Phi Phi Island speedboats, rooftop Bangkok sky bars & golden temples",
    duration: "5–7 Days",
    investment: "From ₹39,999*",
    bestTime: "Nov – Apr",
  },
  {
    id: "int-egypt",
    type: "international",
    name: "Egypt",
    image: egyptImg,
    category: "Middle East & Egypt",
    vibe: "Giza pyramids at sunset, luxury Nile cruises & Valley of the Kings",
    duration: "6–8 Days",
    investment: "From ₹90,000*",
    bestTime: "Oct – Apr",
  },
  {
    id: "int-srilanka",
    type: "international",
    name: "Sri Lanka",
    image: srilankaImg,
    category: "Indian Ocean",
    vibe: "Nine Arches railway bridge, colonial tea country & leopard safaris",
    duration: "5–7 Days",
    investment: "From ₹42,000*",
    bestTime: "Dec – Apr",
  },
  {
    id: "int-philippines",
    type: "international",
    name: "Philippines",
    image: philippinesImg,
    category: "Southeast Asia",
    vibe: "El Nido hidden lagoons, white sand sandbars & limestone coves",
    duration: "6–8 Days",
    investment: "From ₹75,000*",
    bestTime: "Dec – May",
  },
  {
    id: "int-kazakhstan",
    type: "international",
    name: "Kazakhstan",
    image: kazakhstanImg,
    category: "Central Asia",
    vibe: "Tian Shan alpine lakes, Charyn canyon vistas & modern futuristic skyline",
    duration: "6–8 Days",
    investment: "From ₹65,000*",
    bestTime: "May – Sep",
  },
  {
    id: "int-maldives",
    type: "international",
    name: "Maldives",
    image: maldivesImg,
    category: "Indian Ocean",
    vibe: "Private overwater infinity bungalows, seaplane transfers & manta reefs",
    duration: "4–6 Days",
    investment: "From ₹89,999*",
    bestTime: "Nov – Apr",
    featured: true,
  },
  {
    id: "int-turkey",
    type: "international",
    name: "Turkey",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=900&q=80",
    category: "Europe & Mediterranean",
    vibe: "Cappadocia hot air balloons, Bosphorus yachts & Roman ruins",
    duration: "7–10 Days",
    investment: "From ₹95,000*",
    bestTime: "Apr – May, Sep – Nov",
  },
  {
    id: "int-southafrica",
    type: "international",
    name: "South Africa",
    image: southafricaImg,
    category: "Africa & Safaris",
    vibe: "Cape Town penguins, Table Mountain cableway & Big 5 Kruger lodges",
    duration: "8–12 Days",
    investment: "From ₹1,40,000*",
    bestTime: "May – Oct",
  },
  {
    id: "int-france",
    type: "international",
    name: "France",
    image: franceImg,
    category: "Europe & Alps",
    vibe: "Parisian bistros, Eiffel views, French Riviera yachts & lavender fields",
    duration: "7–10 Days",
    investment: "From ₹1,49,999*",
    bestTime: "Apr – Jun, Sep – Nov",
  },
  {
    id: "int-newzealand",
    type: "international",
    name: "New Zealand",
    image: newzealandImg,
    category: "Oceania & Islands",
    vibe: "Milford Sound fjords, Queenstown bungee peaks & geothermal geysers",
    duration: "10–14 Days",
    investment: "From ₹1,99,999*",
    bestTime: "Dec – Feb",
    featured: true,
  },
  {
    id: "int-spain",
    type: "international",
    name: "Spain",
    image: spainImg,
    category: "Europe & Mediterranean",
    vibe: "Sagrada Família, tapas rooftop crawls & Mediterranean sunsets",
    duration: "7–10 Days",
    investment: "From ₹1,25,000*",
    bestTime: "Apr – Jun, Sep – Oct",
  },
  {
    id: "int-australia",
    type: "international",
    name: "Australia",
    image: australiaImg,
    category: "Oceania & Islands",
    vibe: "Sydney Opera Harbor, Great Barrier Reef catamaran & wildlife sanctuaries",
    duration: "10–14 Days",
    investment: "From ₹1,85,000*",
    bestTime: "Sep – Nov, Mar – May",
  },
  {
    id: "int-malaysia",
    type: "international",
    name: "Malaysia",
    image: malaysiaImg,
    category: "Southeast Asia",
    vibe: "Petronas Twin Towers, Langkawi cable car & rainforest wildlife",
    duration: "5–7 Days",
    investment: "From ₹45,000*",
    bestTime: "Mar – Oct",
  },
  {
    id: "int-mauritius",
    type: "international",
    name: "Mauritius",
    image: mauritiusImg,
    category: "Indian Ocean",
    vibe: "Underwater waterfall helicopter flyover, coral lagoons & catamaran cruises",
    duration: "6–8 Days",
    investment: "From ₹95,000*",
    bestTime: "May – Dec",
  },
  {
    id: "int-southkorea",
    type: "international",
    name: "South Korea",
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=900&q=80",
    category: "East Asia",
    vibe: "Seoul K-culture & palaces, Han river picnics & Jeju volcanic beaches",
    duration: "6–8 Days",
    investment: "From ₹1,10,000*",
    bestTime: "Mar – May, Sep – Nov",
  },
];

export const getAllCards = (): DestinationCard[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const combined = [...INITIAL_DOMESTIC_CARDS, ...INITIAL_INTERNATIONAL_CARDS].map((c) => ({
        ...c,
        startingPrice: c.startingPrice || c.investment,
        bestSeason: c.bestSeason || c.bestTime,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
      return combined;
    }
    const parsed = JSON.parse(raw) as DestinationCard[];
    return parsed.map((c) => ({
      ...c,
      startingPrice: c.startingPrice || c.investment,
      bestSeason: c.bestSeason || c.bestTime,
    }));
  } catch (err) {
    console.error("Error reading cards store", err);
    return [...INITIAL_DOMESTIC_CARDS, ...INITIAL_INTERNATIONAL_CARDS].map((c) => ({
      ...c,
      startingPrice: c.startingPrice || c.investment,
      bestSeason: c.bestSeason || c.bestTime,
    }));
  }
};

export const getDomesticCards = (): DestinationCard[] => {
  return getAllCards().filter((c) => c.type === "domestic");
};

export const getInternationalCards = (): DestinationCard[] => {
  return getAllCards().filter((c) => c.type === "international");
};

export const saveCards = (cards: DestinationCard[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    window.dispatchEvent(new CustomEvent("triponomic_cards_updated"));
  } catch (err) {
    console.error("Error saving cards", err);
  }
};

export const addCard = (
  card: Omit<DestinationCard, "id" | "updatedAt"> & { id?: string }
): DestinationCard => {
  const all = getAllCards();
  const newCard: DestinationCard = {
    id: card.id || `card-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    updatedAt: Date.now(),
    ...card,
    investment: card.investment || card.startingPrice || "₹24,999*",
    startingPrice: card.startingPrice || card.investment || "₹24,999*",
    bestTime: card.bestTime || card.bestSeason || "All Year",
    bestSeason: card.bestSeason || card.bestTime || "All Year",
  };
  saveCards([newCard, ...all]);
  return newCard;
};

export const updateCard = (id: string, updates: Partial<DestinationCard>): DestinationCard | null => {
  const all = getAllCards();
  let updatedCard: DestinationCard | null = null;
  const updatedList = all.map((c) => {
    if (c.id === id) {
      updatedCard = {
        ...c,
        ...updates,
        investment: updates.investment || updates.startingPrice || c.investment,
        startingPrice: updates.startingPrice || updates.investment || c.startingPrice || c.investment,
        bestTime: updates.bestTime || updates.bestSeason || c.bestTime,
        bestSeason: updates.bestSeason || updates.bestTime || c.bestSeason || c.bestTime,
        updatedAt: Date.now(),
      };
      return updatedCard;
    }
    return c;
  });
  saveCards(updatedList);
  return updatedCard;
};

export const deleteCard = (id: string): void => {
  const all = getAllCards();
  const updated = all.filter((c) => c.id !== id);
  saveCards(updated);
};

export const saveDestinationCard = (
  cardData: Omit<DestinationCard, "id"> | DestinationCard
): DestinationCard => {
  const normalized = {
    ...cardData,
    investment: cardData.investment || cardData.startingPrice || "₹24,999*",
    startingPrice: cardData.startingPrice || cardData.investment || "₹24,999*",
    bestTime: cardData.bestTime || cardData.bestSeason || "All Year",
    bestSeason: cardData.bestSeason || cardData.bestTime || "All Year",
  };
  if ("id" in cardData && cardData.id) {
    return updateCard(cardData.id, normalized) || addCard(normalized);
  }
  return addCard(normalized);
};

export const deleteDestinationCard = (id: string): void => {
  deleteCard(id);
};

export const resetCardsToDefault = (): void => {
  const combined = [...INITIAL_DOMESTIC_CARDS, ...INITIAL_INTERNATIONAL_CARDS].map((c) => ({
    ...c,
    startingPrice: c.startingPrice || c.investment,
    bestSeason: c.bestSeason || c.bestTime,
  }));
  saveCards(combined);
};

// React Hook for dynamic, reactive card consumption across the app
export const useDestinationCards = () => {
  const [cards, setCards] = useState<DestinationCard[]>(() => getAllCards());

  useEffect(() => {
    const handleUpdate = () => {
      setCards(getAllCards());
    };

    window.addEventListener("triponomic_cards_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("triponomic_cards_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const domesticCards = cards.filter((c) => c.type === "domestic");
  const internationalCards = cards.filter((c) => c.type === "international");

  return {
    allCards: cards,
    domesticCards,
    internationalCards,
    addCard,
    updateCard,
    deleteCard,
    saveDestinationCard,
    deleteDestinationCard,
    resetCardsToDefault,
  };
};
