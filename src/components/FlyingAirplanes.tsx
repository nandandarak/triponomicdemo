import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlyingPlane {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  size: number;
  delay: number;
}

const FlyingAirplanes = () => {
  const [planes, setPlanes] = useState<FlyingPlane[]>([]);

  useEffect(() => {
    const generatePlane = (): FlyingPlane => {
      const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let startX, startY, endX, endY;

      switch (side) {
        case 0: // From top
          startX = Math.random() * 100;
          startY = -10;
          endX = Math.random() * 100;
          endY = 110;
          break;
        case 1: // From right
          startX = 110;
          startY = Math.random() * 100;
          endX = -10;
          endY = Math.random() * 100;
          break;
        case 2: // From bottom
          startX = Math.random() * 100;
          startY = 110;
          endX = Math.random() * 100;
          endY = -10;
          break;
        default: // From left
          startX = -10;
          startY = Math.random() * 100;
          endX = 110;
          endY = Math.random() * 100;
      }

      return {
        id: Date.now() + Math.random(),
        startX,
        startY,
        endX,
        endY,
        duration: 8 + Math.random() * 12,
        size: 24 + Math.random() * 32,
        delay: 0,
      };
    };

    // Initial planes
    const initialPlanes: FlyingPlane[] = [];
    for (let i = 0; i < 3; i++) {
      initialPlanes.push({ ...generatePlane(), delay: i * 3 });
    }
    setPlanes(initialPlanes);

    // Add new planes periodically
    const interval = setInterval(() => {
      setPlanes(prev => {
        const filtered = prev.filter(p => p.id > Date.now() - 20000);
        if (filtered.length < 5) {
          return [...filtered, generatePlane()];
        }
        return filtered;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getRotation = (startX: number, startY: number, endX: number, endY: number) => {
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
    return angle;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {planes.map((plane) => (
          <motion.div
            key={plane.id}
            className="absolute"
            initial={{
              left: `${plane.startX}%`,
              top: `${plane.startY}%`,
              opacity: 0,
              rotate: getRotation(plane.startX, plane.startY, plane.endX, plane.endY),
            }}
            animate={{
              left: `${plane.endX}%`,
              top: `${plane.endY}%`,
              opacity: [0, 1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: plane.duration,
              delay: plane.delay,
              ease: "linear",
              opacity: {
                times: [0, 0.1, 0.9, 1],
                duration: plane.duration,
              },
            }}
          >
            <svg
              width={plane.size}
              height={plane.size}
              viewBox="0 0 48 48"
              fill="none"
              className="drop-shadow-lg"
            >
              {/* Realistic airplane silhouette */}
              <path
                d="M44 24L36 20V14C36 12.9 35.1 12 34 12H32L24 4L16 12H14C12.9 12 12 12.9 12 14V20L4 24L12 28V34C12 35.1 12.9 36 14 36H16L24 44L32 36H34C35.1 36 36 35.1 36 34V28L44 24Z"
                fill="#638C7D"
                opacity="0.85"
              />
              <path
                d="M24 8L28 12H20L24 8Z"
                fill="#4A7066"
              />
              <path
                d="M24 40L20 36H28L24 40Z"
                fill="#4A7066"
              />
              <ellipse cx="24" cy="24" rx="4" ry="6" fill="#88B5A5" opacity="0.6" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FlyingAirplanes;
