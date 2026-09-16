import React, { useRef, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animateBy?: "words" | "letters";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = "",
  delay = 0.05,
  duration = 0.6,
  animateBy = "words",
  as: Component = "span",
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      transform: "translateY(20px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transform: "translateY(0px)",
      transition: {
        duration: duration,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Component className={`inline-block ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="inline"
      >
        {elements.map((item, index) => {
          if (animateBy === "letters") {
            if (item === " ") {
              return " ";
            }
            return (
              <motion.span
                key={`${item}-${index}`}
                variants={itemVariants}
                className="inline-block"
              >
                {item}
              </motion.span>
            );
          }

          return (
            <React.Fragment key={`${item}-${index}`}>
              <motion.span
                variants={itemVariants}
                className="inline-block"
              >
                {item}
              </motion.span>
              {index < elements.length - 1 ? " " : ""}
            </React.Fragment>
          );
        })}
      </motion.span>
    </Component>
  );
};

export default BlurText;
