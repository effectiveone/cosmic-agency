interface UFOSVGProps {
  className?: string;
}

export default function UFOSVG({ className }: UFOSVGProps) {
  return (
    <svg 
      viewBox="0 0 200 100" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="100"
        cy="30"
        rx="60"
        ry="20"
        fill="#60a5fa"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <path
        d="M40 30C40 30 100 40 160 30C160 30 140 70 100 70C60 70 40 30 40 30Z"
        fill="#3b82f6"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <circle cx="100" cy="50" r="10" fill="#ffffff" />
    </svg>
  );
}
