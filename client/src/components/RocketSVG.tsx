import { useState, useEffect } from "react";

export default function UltraAdvancedRocketSVG({
  className,
  isFlipped: propIsFlipped,
}) {
  const [isFlipped, setIsFlipped] = useState(propIsFlipped);
  const [thrusterActive, setThrusterActive] = useState(false);
  const [hoverState, setHoverState] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setThrusterActive(true);
    setTimeout(() => setThrusterActive(false), 2000);
  };

  useEffect(() => {
    setIsFlipped(propIsFlipped);
  }, [propIsFlipped]);

  return (
    <svg
      viewBox="0 0 120 240"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onClick={handleFlip}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      {/* Definicje gradientów */}
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d1415f" />
          <stop offset="50%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#d1415f" />
        </linearGradient>

        <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Efekty silników rakietowych */}
      {thrusterActive && (
        <g>
          <path
            d={
              isFlipped
                ? "M60 15L45 -25L60 -40L75 -25L60 15Z"
                : "M60 225L45 265L60 280L75 265L60 225Z"
            }
            fill="#f97316"
            opacity="0.8"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0.8;0.9;0.7;0.9;0.8"
              dur="0.2s"
              repeatCount="10"
            />
            <animate
              attributeName="d"
              values={
                isFlipped
                  ? "M60 15L45 -25L60 -40L75 -25L60 15Z;M60 15L42 -30L60 -45L78 -30L60 15Z;M60 15L45 -25L60 -40L75 -25L60 15Z"
                  : "M60 225L45 265L60 280L75 265L60 225Z;M60 225L42 270L60 285L78 270L60 225Z;M60 225L45 265L60 280L75 265L60 225Z"
              }
              dur="0.5s"
              repeatCount="4"
            />
          </path>

          <path
            d={
              isFlipped
                ? "M50 15L40 -20L50 -30L60 -20L50 15Z"
                : "M50 225L40 265L50 275L60 265L50 225Z"
            }
            fill="#fbbf24"
            opacity="0.9"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0.9;1;0.8;1;0.9"
              dur="0.15s"
              repeatCount="13"
            />
          </path>

          <path
            d={
              isFlipped
                ? "M70 15L80 -20L70 -30L60 -20L70 15Z"
                : "M70 225L80 265L70 275L60 265L70 225Z"
            }
            fill="#fbbf24"
            opacity="0.9"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0.9;1;0.8;1;0.9"
              dur="0.15s"
              repeatCount="13"
            />
          </path>

          {/* Małe cząsteczki */}
          <circle cx="60" cy={isFlipped ? -5 : 245} r="1" fill="#fef3c7">
            <animate
              attributeName="cy"
              values={isFlipped ? "-5;-15;-25" : "245;255;265"}
              dur="0.5s"
              repeatCount="4"
            />
            <animate
              attributeName="opacity"
              values="1;0.5;0"
              dur="0.5s"
              repeatCount="4"
            />
          </circle>

          <circle cx="55" cy={isFlipped ? -8 : 248} r="0.8" fill="#fef3c7">
            <animate
              attributeName="cy"
              values={isFlipped ? "-8;-18;-28" : "248;258;268"}
              dur="0.6s"
              repeatCount="3"
            />
            <animate
              attributeName="opacity"
              values="1;0.5;0"
              dur="0.6s"
              repeatCount="3"
            />
          </circle>

          <circle cx="65" cy={isFlipped ? -6 : 246} r="0.8" fill="#fef3c7">
            <animate
              attributeName="cy"
              values={isFlipped ? "-6;-16;-26" : "246;256;266"}
              dur="0.7s"
              repeatCount="3"
            />
            <animate
              attributeName="opacity"
              values="1;0.5;0"
              dur="0.7s"
              repeatCount="3"
            />
          </circle>
        </g>
      )}

      {/* Cień pod rakietą */}
      <ellipse
        cx="60"
        cy="230"
        rx="30"
        ry="4"
        fill="black"
        opacity="0.2"
        style={{
          display: isFlipped ? "none" : "block",
        }}
      />

      {/* Korpus rakiety */}
      <path
        d="M60 10C52 10 48 15 45 25L35 190H85L75 25C72 15 68 10 60 10Z"
        fill="url(#bodyGradient)"
        stroke="#ffffff"
        strokeWidth="1"
      />

      {/* Metalowe łączenia na korpusie */}
      <path
        d="M35 120H85"
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeDasharray="2 1"
      />

      <path
        d="M37 150H83"
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeDasharray="2 1"
      />

      <path
        d="M42 80H78"
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeDasharray="2 1"
      />

      {/* Napis "PROJECT" */}
      <g transform="translate(48, 110) rotate(-90)">
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="8"
          fill="white"
          letterSpacing="0.5"
        >
          PROJECT
        </text>
      </g>

      {/* Stożek czołowy z detalami */}
      <path
        d="M60 10L45 28H75L60 10Z"
        fill="#dc2626"
        stroke="#ffffff"
        strokeWidth="1"
      />

      <path
        d="M53 20L49 28M67 20L71 28"
        stroke="#ffffff"
        strokeWidth="0.5"
        opacity="0.7"
      />

      {/* Antena na szczycie */}
      <line x1="60" y1="10" x2="60" y2="5" stroke="#ffffff" strokeWidth="0.5" />
      <circle cx="60" cy="4" r="1" fill="#fbbf24" filter="url(#glow)">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Stabilizatory z detalami */}
      <path
        d="M35 190L15 220L25 225L40 200L35 190Z"
        fill="url(#finGradient)"
        stroke="#ffffff"
        strokeWidth="1"
      />

      <path
        d="M85 190L105 220L95 225L80 200L85 190Z"
        fill="url(#finGradient)"
        stroke="#ffffff"
        strokeWidth="1"
      />

      <path
        d="M20 218L23 220M95 220L100 218"
        stroke="#ffffff"
        strokeWidth="0.5"
        opacity="0.8"
      />

      <path
        d="M20 222L38 202M100 222L82 202"
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeDasharray="1 1"
        opacity="0.7"
      />

      {/* Dodatkowe małe stabilizatory */}
      <path
        d="M45 190L38 205L45 210L50 195L45 190Z"
        fill="#4f46e5"
        stroke="#ffffff"
        strokeWidth="0.5"
      />

      <path
        d="M75 190L82 205L75 210L70 195L75 190Z"
        fill="#4f46e5"
        stroke="#ffffff"
        strokeWidth="0.5"
      />

      {/* Dolna część rakiety */}
      <path
        d="M35 190H85L80 225H40L35 190Z"
        fill="#6366f1"
        stroke="#ffffff"
        strokeWidth="1"
      />

      <path
        d="M38 200H82M38 210H82"
        stroke="#ffffff"
        strokeWidth="0.5"
        opacity="0.7"
      />

      {/* Silniki z detalami */}
      <path
        d="M45 225L40 235L50 230L45 225Z"
        fill="#1e40af"
        stroke="#ffffff"
        strokeWidth="0.5"
      />

      <path
        d="M60 225L55 235L65 235L60 225Z"
        fill="#1e40af"
        stroke="#ffffff"
        strokeWidth="0.5"
      />

      <path
        d="M75 225L80 235L70 230L75 225Z"
        fill="#1e40af"
        stroke="#ffffff"
        strokeWidth="0.5"
      />

      <circle
        cx="45"
        cy="228"
        r="1"
        fill="#fbbf24"
        opacity={thrusterActive ? 1 : 0.4}
      >
        <animate
          attributeName="opacity"
          values="0.4;0.8;0.4"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="60"
        cy="228"
        r="1"
        fill="#fbbf24"
        opacity={thrusterActive ? 1 : 0.4}
      >
        <animate
          attributeName="opacity"
          values="0.8;0.4;0.8"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="75"
        cy="228"
        r="1"
        fill="#fbbf24"
        opacity={thrusterActive ? 1 : 0.4}
      >
        <animate
          attributeName="opacity"
          values="0.4;0.8;0.4"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Okno/iluminator z detalami */}
      <circle
        cx="60"
        cy="60"
        r="15"
        fill="url(#windowGradient)"
        stroke="#ffffff"
        strokeWidth="1.5"
      />
      <circle cx="60" cy="60" r="12" fill="#0369a1" opacity="0.5" />
      <circle cx="60" cy="60" r="10" fill="#0ea5e9" />
      <circle cx="60" cy="60" r="7" fill="#e0f2fe" opacity="0.8" />

      {/* Refleksy na oknie */}
      <path
        d="M55 55L57 53L59 55"
        stroke="#ffffff"
        strokeWidth="0.5"
        opacity="0.8"
      />

      <path d="M64 65L67 68" stroke="#ffffff" strokeWidth="0.5" opacity="0.8" />

      {/* Panele kontrolne i detale */}
      <rect x="55" y="87" width="10" height="4" rx="1" fill="#ffffff" />
      <rect x="55" y="93" width="10" height="4" rx="1" fill="#ffffff" />

      <rect x="51" y="87.5" width="2" height="3" rx="0.5" fill="#fbbf24">
        <animate
          attributeName="opacity"
          values="1;0.7;1"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </rect>

      <rect x="51" y="93.5" width="2" height="3" rx="0.5" fill="#4ade80">
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Detale techniczne na korpusie */}
      <rect
        x="52"
        y="130"
        width="16"
        height="8"
        rx="1"
        fill="#374151"
        stroke="#ffffff"
        strokeWidth="0.3"
      />
      <line
        x1="55"
        y1="132"
        x2="65"
        y2="132"
        stroke="#ffffff"
        strokeWidth="0.3"
      />
      <line
        x1="55"
        y1="134"
        x2="62"
        y2="134"
        stroke="#ffffff"
        strokeWidth="0.3"
      />
      <line
        x1="55"
        y1="136"
        x2="65"
        y2="136"
        stroke="#ffffff"
        strokeWidth="0.3"
      />

      <rect
        x="54"
        y="142"
        width="12"
        height="5"
        rx="0.5"
        fill="#374151"
        stroke="#ffffff"
        strokeWidth="0.3"
      />
      <circle cx="57" cy="144.5" r="1" fill="#fbbf24">
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="60" cy="144.5" r="1" fill="#4ade80">
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="63" cy="144.5" r="1" fill="#f43f5e">
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Panele boczne z detalami */}
      <path
        d="M35 90L30 110L35 130V90Z"
        fill="#6366f1"
        stroke="#ffffff"
        strokeWidth="0.5"
      />

      <path
        d="M85 90L90 110L85 130V90Z"
        fill="#6366f1"
        stroke="#ffffff"
        strokeWidth="0.5"
      />

      <path
        d="M32 95L33 105M32 115L33 125"
        stroke="#ffffff"
        strokeWidth="0.3"
        opacity="0.8"
      />

      <path
        d="M88 95L87 105M88 115L87 125"
        stroke="#ffffff"
        strokeWidth="0.3"
        opacity="0.8"
      />

      {/* Światła sygnalizacyjne na korpusie */}
      <circle cx="60" cy="38" r="2" fill="#fbbf24" filter="url(#glow)">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="60" cy="170" r="2" fill="#4ade80" filter="url(#glow)">
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="45" cy="160" r="1" fill="#f43f5e" filter="url(#glow)">
        <animate
          attributeName="opacity"
          values="1;0.6;1"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="75" cy="160" r="1" fill="#f43f5e" filter="url(#glow)">
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Efekt podświetlenia przy hover */}
      {hoverState && (
        <g>
          <path
            d="M60 10C52 10 48 15 45 25L35 190H85L75 25C72 15 68 10 60 10Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            opacity="0.5"
            filter="url(#glow)"
          />

          <circle
            cx="60"
            cy="60"
            r="16"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            opacity="0.5"
            filter="url(#glow)"
          />
        </g>
      )}
    </svg>
  );
}
