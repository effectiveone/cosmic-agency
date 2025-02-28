import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ParallaxProvider } from "react-scroll-parallax";

const solutions = [
  {
    icon: "🔍",
    title: "Analysis",
    desc: "Problem identification and debugging.",
  },
  {
    icon: "⚡",
    title: "Optimization",
    desc: "Performance improvement and error elimination.",
  },
  {
    icon: "✅",
    title: "Testing",
    desc: "Compatibility, security and UX testing.",
  },
  {
    icon: "🚀",
    title: "Deployment",
    desc: "Long-term maintenance and monitoring.",
  },
];

const RotatingCircle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stationRef = useRef<HTMLDivElement>(null);
  const orbitalLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const rotationTween = useRef<gsap.core.Tween | null>(null);

  // Helper function to set refs for orbital lines
  const setOrbitalLineRef = (el: HTMLDivElement | null, index: number) => {
    orbitalLinesRef.current[index] = el;
  };

  useEffect(() => {
    // Main rotation animation
    rotationTween.current = gsap.to(containerRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
    });

    // Central core pulsating animation
    gsap.to(".station-core", {
      scale: 1.1,
      opacity: 0.9,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Counter-rotation for orbital lines
    orbitalLinesRef.current.forEach((line, index) => {
      if (line) {
        gsap.to(line, {
          rotate: -360,
          duration: 30 + index * 5,
          repeat: -1,
          ease: "linear",
        });
      }
    });

    // Blinking lights animation
    gsap.utils.toArray(".station-light").forEach((light: any, index) => {
      gsap.to(light, {
        opacity: 0.2,
        duration: 0.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
        ease: "sine.inOut",
      });
    });

    return () => {
      rotationTween.current?.kill();
      gsap.killTweensOf(".station-core");
      gsap.killTweensOf(".station-light");
      orbitalLinesRef.current.forEach((line) => {
        if (line) gsap.killTweensOf(line);
      });
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
    rotationTween.current?.pause(); // Pause animation
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    rotationTween.current?.play(); // Resume animation
  };

  // Colors for the orbital lines
  const orbitColors = [
    "rgba(0, 255, 255, 0.6)", // Cyan
    "rgba(255, 0, 255, 0.6)", // Magenta
    "rgba(255, 255, 0, 0.6)", // Yellow
    "rgba(0, 255, 0, 0.6)", // Green
  ];

  return (
    <div className="relative w-96 h-96">
      {/* Space station background elements */}
      <div ref={stationRef} className="absolute inset-0 z-0">
        {/* Orbital rings/lines */}
        {orbitColors.map((color, index) => (
          <div
            key={`orbit-${index}`}
            ref={(el) => setOrbitalLineRef(el, index)}
            className="absolute rounded-full border-2"
            style={{
              width: `${280 + index * 40}px`,
              height: `${280 + index * 40}px`,
              borderColor: color,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${index * 15}deg)`,
              boxShadow: `0 0 10px ${color}`,
              opacity: 0.7,
            }}
          />
        ))}

        {/* Central core */}
        <div
          className="station-core absolute w-24 h-24 bg-blue-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            boxShadow: "0 0 30px rgba(0, 100, 255, 0.8)",
            backgroundImage:
              "radial-gradient(circle, rgba(100,200,255,1) 0%, rgba(0,50,200,1) 100%)",
          }}
        />

        {/* Connection beams to solution circles */}
        {solutions.map((_, index) => {
          const angle = (index / solutions.length) * 2 * Math.PI;
          const x1 = Math.cos(angle) * 20;
          const y1 = Math.sin(angle) * 20;
          const x2 = Math.cos(angle) * 100;
          const y2 = Math.sin(angle) * 100;

          return (
            <div
              key={`beam-${index}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
              style={{
                width: "80px",
                height: "2px",
                background: `linear-gradient(to right, rgba(100,200,255,1), rgba(100,200,255,0.2))`,
                transformOrigin: "left center",
                transform: `rotate(${(index / solutions.length) * 360}deg)`,
                boxShadow: "0 0 8px rgba(100,200,255,0.8)",
              }}
            />
          );
        })}

        {/* Small lights around the station */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 2 * Math.PI;
          const distance = 140;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;

          return (
            <div
              key={`light-${i}`}
              className="station-light absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 8px rgba(255, 255, 100, 0.8)",
              }}
            />
          );
        })}
      </div>

      {/* Modified rotating solution elements */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center z-20"
      >
        {solutions.map((solution, index) => {
          const angle = (index / solutions.length) * 360;
          return (
            <div
              key={index}
              className="absolute flex items-center justify-center rounded-full shadow-lg cursor-pointer z-30 transition-all duration-300"
              style={{
                width: hoverIndex === index ? "18rem" : "4rem",
                height: hoverIndex === index ? "18rem" : "4rem",
                background:
                  hoverIndex === index
                    ? "linear-gradient(135deg, rgba(30,64,175,0.95) 0%, rgba(37,99,235,0.9) 100%)"
                    : "linear-gradient(135deg, rgba(37,99,235,1) 0%, rgba(59,130,246,1) 100%)",
                transform: `rotate(${angle}deg) translate(${
                  hoverIndex === index ? "0" : "120px"
                }) ${
                  // Keep the expanded card always upright regardless of its position
                  hoverIndex === index
                    ? `rotate(-${angle}deg)`
                    : `rotate(-${angle}deg)`
                }`,
                boxShadow: "0 0 15px rgba(37,99,235,0.7)",
                border: "2px solid rgba(147,197,253,0.6)",
                // Add this to fix position when expanded
                left: hoverIndex === index ? "50%" : "unset",
                top: hoverIndex === index ? "50%" : "unset",
                margin: hoverIndex === index ? "-9rem 0 0 -9rem" : "0",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {hoverIndex === index ? (
                <div className="p-4 text-white rounded-xl text-center">
                  <div className="text-4xl mb-2">{solution.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-lg">{solution.desc}</p>
                </div>
              ) : (
                <span className="text-2xl text-white">{solution.icon}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional decorative elements */}
      {/* Background "stars" */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            backgroundColor:
              i % 3 === 0 ? "#8CDFFF" : i % 5 === 0 ? "#FFF9C4" : "white",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            boxShadow: i % 6 === 0 ? "0 0 3px white" : "none",
          }}
        />
      ))}
    </div>
  );
};

const SolutionsParallax = () => {
  return (
    <ParallaxProvider>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <RotatingCircle />
      </div>
    </ParallaxProvider>
  );
};

export default SolutionsParallax;
