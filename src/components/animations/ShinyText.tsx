import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block relative ${className}`}
      style={{ animationDuration }}
    >
      {/* Base text — always visible in the className color */}
      {text}
      {/* Shine overlay — absolutely positioned, clips only the shine sweep */}
      {!disabled && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-clip-text animate-shine pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(120deg, transparent 40%, rgba(255, 255, 255, 0.75) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animationDuration: animationDuration,
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default ShinyText;
