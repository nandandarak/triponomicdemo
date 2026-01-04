import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Floating3DElements = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Different parallax speeds for each element
  const planeX = useTransform(smoothMouseX, [0, window.innerWidth], [-30, 30]);
  const planeY = useTransform(smoothMouseY, [0, window.innerHeight], [-15, 15]);

  const boatX = useTransform(smoothMouseX, [0, window.innerWidth], [20, -20]);
  const boatY = useTransform(smoothMouseY, [0, window.innerHeight], [5, -5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 3D Propeller Plane */}
      <motion.div
        className="absolute top-[15%] right-[10%] z-20 pointer-events-none"
        style={{ x: planeX, y: planeY }}
      >
        <motion.svg
          width="80"
          height="40"
          viewBox="0 0 80 40"
          fill="none"
          className="drop-shadow-2xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Plane body */}
          <ellipse cx="35" cy="20" rx="28" ry="8" fill="#638C7D" opacity="0.9" />
          {/* Tail */}
          <path d="M60 20 L75 10 L75 30 Z" fill="#638C7D" opacity="0.85" />
          {/* Wing */}
          <ellipse cx="30" cy="20" rx="8" ry="18" fill="#4A7066" opacity="0.9" />
          {/* Cockpit */}
          <ellipse cx="18" cy="18" rx="6" ry="4" fill="#88B5A5" opacity="0.7" />
          {/* Propeller */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
            style={{ originX: "7px", originY: "20px" }}
          >
            <rect x="4" y="14" width="6" height="2" fill="#344E41" rx="1" />
            <rect x="4" y="24" width="6" height="2" fill="#344E41" rx="1" />
          </motion.g>
        </motion.svg>
      </motion.div>

      {/* 3D Classic Boat */}
      <motion.div
        className="absolute bottom-[8%] left-[8%] z-20 pointer-events-none"
        style={{ x: boatX, y: boatY }}
      >
        <motion.svg
          width="100"
          height="50"
          viewBox="0 0 100 50"
          fill="none"
          className="drop-shadow-2xl"
          animate={{
            y: [0, 8, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Water reflection */}
          <ellipse cx="50" cy="48" rx="45" ry="4" fill="#638C7D" opacity="0.2" />
          {/* Boat hull */}
          <path
            d="M10 35 Q5 35 8 40 L92 40 Q95 35 90 35 L90 30 Q85 25 75 25 L25 25 Q15 25 10 30 Z"
            fill="#8B7355"
            opacity="0.9"
          />
          {/* Boat deck */}
          <rect x="15" y="22" width="70" height="8" rx="3" fill="#A08060" opacity="0.85" />
          {/* Cabin */}
          <rect x="35" y="12" width="25" height="12" rx="2" fill="#D4C4B0" opacity="0.9" />
          {/* Cabin window */}
          <rect x="42" y="15" width="10" height="6" rx="1" fill="#638C7D" opacity="0.6" />
          {/* Mast */}
          <rect x="47" y="2" width="3" height="12" fill="#5C4A37" />
          {/* Flag */}
          <motion.path
            d="M50 2 L65 6 L50 10 Z"
            fill="#D4AF37"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.svg>
      </motion.div>

      {/* Additional floating cloud elements for depth */}
      <motion.div
        className="absolute top-[25%] left-[5%] z-10 pointer-events-none opacity-30"
        animate={{
          x: [0, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-24 h-8 bg-white/40 rounded-full blur-md" />
      </motion.div>
    </>
  );
};

export default Floating3DElements;
