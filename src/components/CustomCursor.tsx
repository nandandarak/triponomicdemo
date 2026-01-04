import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Trail {
  id: number;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [trailId, setTrailId] = useState(0);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Add trail dot
      setTrailId(prev => prev + 1);
      setTrails(prev => [...prev, { id: trailId, x: e.clientX, y: e.clientY }].slice(-8));
    };

    const hideOnLeave = () => setIsVisible(false);
    const showOnEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    document.body.addEventListener("mouseleave", hideOnLeave);
    document.body.addEventListener("mouseenter", showOnEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.body.removeEventListener("mouseleave", hideOnLeave);
      document.body.removeEventListener("mouseenter", showOnEnter);
    };
  }, [trailId]);

  // Remove old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(1));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Trail dots */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute w-2 h-2 rounded-full bg-[#638C7D]/50"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
          }}
        />
      ))}
      
      {/* Main cursor */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-[#638C7D] border-2 border-white shadow-lg"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
    </div>
  );
};

export default CustomCursor;
