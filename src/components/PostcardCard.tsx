import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Coins, Sun, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface DestinationData {
  duration: string;
  investment: string;
  bestTime: string;
}

interface PostcardCardProps {
  name: string;
  image: string;
  isGateway?: boolean;
  gatewayText?: string;
  onClick: () => void;
  onEnquire: () => void;
  index: number;
  destinationData?: DestinationData;
}

const defaultDestinationData: Record<string, DestinationData> = {
  Mumbai: { duration: "2-3 Days", investment: "₹15,000", bestTime: "Oct - Mar" },
  Pune: { duration: "2-3 Days", investment: "₹12,000", bestTime: "Oct - Feb" },
  Goa: { duration: "4-5 Days", investment: "₹25,000", bestTime: "Nov - Feb" },
  Japan: { duration: "7-10 Days", investment: "₹1,50,000", bestTime: "Mar - May" },
  Bali: { duration: "5-7 Days", investment: "₹75,000", bestTime: "Apr - Oct" },
  "South Korea": {
    duration: "6-8 Days",
    investment: "₹1,20,000",
    bestTime: "Mar - May",
  },
};

const PostcardCard = ({
  name,
  image,
  isGateway = false,
  gatewayText,
  onClick,
  onEnquire,
  index,
  destinationData,
}: PostcardCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const data =
    destinationData ||
    defaultDestinationData[name] || {
      duration: "5-7 Days",
      investment: "₹45,000",
      bestTime: "Oct - Mar",
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index
