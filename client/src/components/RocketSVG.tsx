import { useState, useEffect } from "react";

export default function RocketSVG({
  className,
  isFlipped: propIsFlipped,
}: RocketSVGProps) {
  const [isFlipped, setIsFlipped] = useState(propIsFlipped);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Uaktualnianie stanu, jeśli propIsFlipped zmienia się
  useEffect(() => {
    setIsFlipped(propIsFlipped);
  }, [propIsFlipped]);

  return (
    <svg
      viewBox="0 0 100 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s",
      }}
      onClick={handleFlip}
    >
      <path
        d="M50 0L20 150H80L50 0Z"
        fill="#f43f5e"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <path
        d="M20 150L10 180L50 160L90 180L80 150H20Z"
        fill="#3b82f6"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <circle cx="50" cy="80" r="15" fill="#ffffff" />
    </svg>
  );
}
