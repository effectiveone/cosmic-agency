interface SpaceStationSVGProps {
  className?: string;
}

export default function SpaceStationSVG({ className }: SpaceStationSVGProps) {
  return (
    <svg 
      viewBox="0 0 400 200" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="150"
        y="80"
        width="100"
        height="40"
        fill="#3b82f6"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <circle cx="200" cy="100" r="60" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
      <rect x="50" y="90" width="100" height="20" fill="#60a5fa" stroke="#ffffff" strokeWidth="2" />
      <rect x="250" y="90" width="100" height="20" fill="#60a5fa" stroke="#ffffff" strokeWidth="2" />
      <rect x="180" y="20" width="40" height="160" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}
