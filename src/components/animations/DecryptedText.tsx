import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover" | "mount" | "all";
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><,./-=",
  className = "",
  encryptedClassName = "text-[#A5B4FC] opacity-70",
  parentClassName = "inline-block",
  animateOn = "mount",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
    : characters.split("");

  const shuffleText = (originalText: string, currentRevealed: Set<number>) => {
    return originalText
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (currentRevealed.has(i)) return originalText[i];
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      })
      .join("");
  };

  const triggerAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsScrambling(true);

    let iteration = 0;
    const currentRevealed = new Set<number>();
    const totalChars = text.length;

    intervalRef.current = setInterval(() => {
      iteration++;

      if (sequential) {
        let nextIndex = 0;
        if (revealDirection === "start") {
          nextIndex = currentRevealed.size;
        } else if (revealDirection === "end") {
          nextIndex = totalChars - 1 - currentRevealed.size;
        } else {
          const middle = Math.floor(totalChars / 2);
          const offset = Math.floor(currentRevealed.size / 2);
          nextIndex = currentRevealed.size % 2 === 0 ? middle + offset : middle - offset;
        }

        if (nextIndex >= 0 && nextIndex < totalChars) {
          currentRevealed.add(nextIndex);
        }
      } else {
        if (iteration >= maxIterations) {
          for (let i = 0; i < totalChars; i++) currentRevealed.add(i);
        }
      }

      setRevealedIndices(new Set(currentRevealed));
      setDisplayText(shuffleText(text, currentRevealed));

      if (currentRevealed.size >= totalChars || iteration > totalChars * 2 + maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
        setDisplayText(text);
      }
    }, speed);
  };

  useEffect(() => {
    triggerAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (animateOn === "hover" || animateOn === "all") {
      setIsHovering(true);
      triggerAnimation();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <motion.span
      className={parentClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealed = revealedIndices.has(index) || !isScrambling;
          return (
            <span
              key={index}
              className={isRevealed ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
};

export default DecryptedText;
