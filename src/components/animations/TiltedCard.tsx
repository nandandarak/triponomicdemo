import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxAngle?: number;
  scale?: number;
  glareOpacity?: number;
  onClick?: () => void;
}

const springConfig = { damping: 20, stiffness: 300 };

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = "",
  maxAngle = 12,
  scale = 1.03,
  glareOpacity = 0.15,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const cardScale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width;
    const yPct = mouseY / height;

    const xOffset = (xPct - 0.5) * 2;
    const yOffset = (yPct - 0.5) * 2;

    rotateY.set(xOffset * maxAngle);
    rotateX.set(-yOffset * maxAngle);

    setGlarePosition({
      x: xPct * 100,
      y: yPct * 100,
      opacity: glareOpacity,
    });
  };

  const handleMouseEnter = () => {
    cardScale.set(scale);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    cardScale.set(1);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        scale: cardScale,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 will-change-transform ${className}`}
    >
      {children}

      {/* Dynamic Glare Effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)`,
        }}
      />
    </motion.div>
  );
};

export default TiltedCard;
