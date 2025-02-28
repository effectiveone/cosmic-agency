import { useState, useEffect } from "react";

export default function AdvancedUfoShip({ className }) {
  const [hover, setHover] = useState(false);
  const [beamActive, setBeamActive] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);

  useEffect(() => {
    // Efekt pulsowania świateł
    const lightInterval = setInterval(() => {
      setLightsOn((prev) => !prev);
    }, 3000);

    return () => clearInterval(lightInterval);
  }, []);

  const activateBeam = () => {
    setBeamActive(true);
    setTimeout(() => setBeamActive(false), 3000);
  };

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={activateBeam}
    >
      {/* Definicje gradientów i filtrów */}
      <defs>
        <radialGradient
          id="mainBodyGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="70%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>

        <radialGradient
          id="topDomeGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="30%"
          fy="30%"
        >
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="60%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>

        <radialGradient
          id="bottomGradient"
          cx="50%"
          cy="0%"
          r="100%"
          fx="50%"
          fy="0%"
        >
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>

        <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
        </linearGradient>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Tło kosmosu z gwiazdami */}
      {hover && (
        <g>
          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 400}
              cy={Math.random() * 300}
              r={Math.random() * 1.5}
              fill="white"
              opacity={Math.random() * 0.8 + 0.2}
            >
              <animate
                attributeName="opacity"
                values={`${Math.random() * 0.5 + 0.3};${Math.random() + 0.5};${Math.random() * 0.5 + 0.3}`}
                dur={`${Math.random() * 3 + 2}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}

      {/* Efekt promienia traktora */}
      {beamActive && (
        <g>
          <path
            d="M200 140 L170 300 L230 300 Z"
            fill="url(#beamGradient)"
            opacity="0.8"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0;0.8;0.6;0.8;0.6;0.8;0"
              dur="3s"
              repeatCount="1"
            />
          </path>

          {/* Małe cząsteczki w promieniu */}
          {Array.from({ length: 15 }).map((_, i) => (
            <circle
              key={i}
              cx={190 + Math.random() * 20}
              cy={140 + Math.random() * 140}
              r={Math.random() * 2 + 1}
              fill="white"
              opacity={Math.random() * 0.7 + 0.3}
            >
              <animate
                attributeName="cy"
                values={`${140 + Math.random() * 50};${260 + Math.random() * 40}`}
                dur={`${Math.random() * 2 + 1}s`}
                repeatCount="3"
              />
              <animate
                attributeName="opacity"
                values="0.8;0.3;0"
                dur={`${Math.random() * 2 + 1}s`}
                repeatCount="3"
              />
            </circle>
          ))}
        </g>
      )}

      {/* Efekt mgły energetycznej pod statkiem */}
      <ellipse
        cx="200"
        cy="140"
        rx="145"
        ry="20"
        fill="#93c5fd"
        opacity="0.15"
        filter="url(#softGlow)"
      >
        <animate
          attributeName="opacity"
          values="0.15;0.25;0.15"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="ry"
          values="20;22;20"
          dur="6s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Główny korpus statku - dolna część */}
      <ellipse
        cx="200"
        cy="120"
        rx="150"
        ry="40"
        fill="url(#mainBodyGradient)"
        stroke="#cbd5e1"
        strokeWidth="1"
      />

      {/* Dolna część z panelami i detalami */}
      <path
        d="M90 120 C90 120, 130 160, 200 160 C270 160, 310 120, 310 120"
        fill="url(#bottomGradient)"
        stroke="#cbd5e1"
        strokeWidth="0.8"
      />

      {/* Panele technologiczne na dolnej części */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x={110 + i * 25}
          y={125 + (i % 2) * 10}
          width="20"
          height="10"
          rx="2"
          fill="#1e293b"
          stroke="#cbd5e1"
          strokeWidth="0.3"
        />
      ))}

      {/* Światła na obwodzie głównego korpusu */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 16;
        const x = 200 + 145 * Math.cos(angle);
        const y = 120 + 38 * Math.sin(angle);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill={
              lightsOn
                ? i % 3 === 0
                  ? "#f87171"
                  : i % 3 === 1
                    ? "#4ade80"
                    : "#fbbf24"
                : "#334155"
            }
            filter="url(#softGlow)"
          >
            <animate
              attributeName="opacity"
              values={`${Math.random() * 0.3 + 0.7};1;${Math.random() * 0.3 + 0.7}`}
              dur={`${Math.random() + 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}

      {/* Kopuła na górze */}
      <ellipse
        cx="200"
        cy="90"
        rx="50"
        ry="30"
        fill="url(#topDomeGradient)"
        stroke="#cbd5e1"
        strokeWidth="0.8"
      />

      {/* Efekt świetlny w kopule */}
      <ellipse
        cx="200"
        cy="85"
        rx="40"
        ry="22"
        fill="#bfdbfe"
        opacity="0.2"
        filter="url(#softGlow)"
      >
        <animate
          attributeName="opacity"
          values="0.2;0.4;0.2"
          dur="3s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Napis "ACURG TURBO" w dwóch liniach */}
      <g transform="translate(160, 100)">
        <rect
          x="0"
          y="0"
          width="80"
          height="40"
          rx="5"
          fill="#0f172a"
          stroke="#cbd5e1"
          strokeWidth="0.5"
          opacity="0.8"
        />

        <text
          x="40"
          y="18"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="14"
          fill="#f8fafc"
          textAnchor="middle"
          letterSpacing="1"
        >
          ACURG
        </text>

        <text
          x="40"
          y="35"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="14"
          fill="#f8fafc"
          textAnchor="middle"
          letterSpacing="1"
        >
          TURBO
        </text>

        <rect x="5" y="22" width="70" height="1" fill="#64748b" />
      </g>

      {/* Szczegóły technologiczne na kopule */}
      <circle
        cx="200"
        cy="70"
        r="5"
        fill="#0f172a"
        stroke="#cbd5e1"
        strokeWidth="0.5"
      />

      <circle cx="200" cy="70" r="2" fill="#3b82f6" filter="url(#softGlow)">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Anteny i urządzenia komunikacyjne */}
      <line
        x1="180"
        y1="75"
        x2="175"
        y2="60"
        stroke="#cbd5e1"
        strokeWidth="0.8"
      />

      <circle cx="175" cy="60" r="2" fill="#f87171" filter="url(#softGlow)">
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </circle>

      <line
        x1="220"
        y1="75"
        x2="225"
        y2="60"
        stroke="#cbd5e1"
        strokeWidth="0.8"
      />

      <circle cx="225" cy="60" r="2" fill="#f87171" filter="url(#softGlow)">
        <animate
          attributeName="opacity"
          values="1;0.7;1"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Detale technologiczne na głównym korpusie */}
      <g>
        {/* Panele technologiczne */}
        <rect
          x="130"
          y="105"
          width="25"
          height="15"
          rx="2"
          fill="#1e293b"
          stroke="#cbd5e1"
          strokeWidth="0.3"
        />
        <rect
          x="245"
          y="105"
          width="25"
          height="15"
          rx="2"
          fill="#1e293b"
          stroke="#cbd5e1"
          strokeWidth="0.3"
        />
        <rect
          x="170"
          y="115"
          width="60"
          height="10"
          rx="2"
          fill="#1e293b"
          stroke="#cbd5e1"
          strokeWidth="0.3"
        />

        {/* Światła kontrolne */}
        <circle cx="135" cy="110" r="1.5" fill="#4ade80">
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="140" cy="110" r="1.5" fill="#f87171">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="145" cy="110" r="1.5" fill="#fbbf24">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="250" cy="110" r="1.5" fill="#4ade80">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="255" cy="110" r="1.5" fill="#f87171">
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="260" cy="110" r="1.5" fill="#fbbf24">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Wskaźniki i pasma energetyczne */}
      <path
        d="M110 120 C110 120, 140 130, 170 130 C200 130, 230 130, 260 130 C290 130, 290 120, 290 120"
        stroke="#3b82f6"
        strokeWidth="0.8"
        strokeDasharray="5 2"
        opacity="0.7"
        fill="none"
        filter="url(#softGlow)"
      >
        <animate
          attributeName="opacity"
          values="0.5;0.9;0.5"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      {/* Efekt wibracji przy najechaniu kursorem */}
      {hover && (
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 1,1; 0,0; -1,-1; 0,0"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </g>
      )}

      {/* Napęd - światła podspodnie */}
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <circle
            cx={125 + i * 30}
            cy="150"
            r="5"
            fill="#3b82f6"
            opacity="0.6"
            filter="url(#softGlow)"
          >
            <animate
              attributeName="opacity"
              values="0.6;0.9;0.6"
              dur={`${1 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </circle>

          {/* Strumień energii */}
          {hover && (
            <path
              d={`M${125 + i * 30} 155 L${125 + i * 30 - 3} 165 L${125 + i * 30 + 3} 165 Z`}
              fill="#60a5fa"
              opacity="0.5"
              filter="url(#softGlow)"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur={`${0.8 + i * 0.1}s`}
                repeatCount="indefinite"
              />
            </path>
          )}
        </g>
      ))}
    </svg>
  );
}
