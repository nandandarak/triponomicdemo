import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  padding?: number;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  onClick?: () => void;
}

const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };

export const Magnet: React.FC<MagnetProps> = ({
  children,
  className = "",
  padding = 60,
  magnetStrength = 0.3,
  wrapperClassName = "inline-block",
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    x.set(distX * magnetStrength);
    y.set(distY * magnetStrength);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={wrapperClassName}
    >
      <motion.div
        style={{ x, y }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Magnet;
