import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "Crafting Your Unforgettable Journey",
  manualMode = false,
  blurAmount = 4,
  borderColor = "#404762",
  glowColor = "rgba(64, 71, 98, 0.4)",
  animationDuration = 0.2,
  pauseBetweenAnimations = 0.5,
  className = "",
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex gap-2 sm:gap-3 justify-center items-center flex-wrap ${className}`}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="relative cursor-pointer select-none text-base sm:text-lg md:text-xl font-bold transition-all duration-300"
            style={{
              filter: manualMode
                ? isActive
                  ? "blur(0px)"
                  : `blur(${blurAmount}px)`
                : isActive
                ? "blur(0px)"
                : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.4,
              color: isActive ? "#404762" : "#64748B",
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none rounded-lg border-2"
        animate={{
          x: focusRect.x - 6,
          y: focusRect.y - 2,
          width: focusRect.width + 12,
          height: focusRect.height + 4,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
          ease: "easeInOut",
        }}
        style={{
          borderColor: borderColor,
          boxShadow: `0 0 16px ${glowColor}`,
        }}
      >
        <span
          className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2"
          style={{ borderColor: borderColor }}
        />
        <span
          className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2"
          style={{ borderColor: borderColor }}
        />
        <span
          className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2"
          style={{ borderColor: borderColor }}
        />
        <span
          className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2"
          style={{ borderColor: borderColor }}
        />
      </motion.div>
    </div>
  );
};

export default TrueFocus;
