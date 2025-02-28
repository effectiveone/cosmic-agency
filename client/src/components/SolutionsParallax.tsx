import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ParallaxProvider, useParallax } from "react-scroll-parallax";

const solutions = [
  {
    icon: "🔍",
    title: "Analiza",
    desc: "Identyfikacja problemów i debugowanie.",
  },
  {
    icon: "⚡",
    title: "Optymalizacja",
    desc: "Poprawa wydajności i eliminacja błędów.",
  },
  {
    icon: "✅",
    title: "Testowanie",
    desc: "Testy kompatybilności, bezpieczeństwa i UX.",
  },
  {
    icon: "🚀",
    title: "Wdrożenie",
    desc: "Długoterminowe utrzymanie i monitoring.",
  },
];

const SolutionCard = ({ solution }) => {
  const parallax = useParallax<HTMLDivElement>({
    translateY: [0, 360],
    rotate: [0, 5],
    scale: [1, 1.05],
    easing: "easeInQuad",
  });

  return (
    <div
      ref={parallax.ref}
      className="absolute bg-blue-900/80 backdrop-blur-md text-white p-5 rounded-xl border border-blue-500/50 shadow-lg flex items-center gap-4 w-80 transform transition-transform"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
        <span className="text-2xl">{solution.icon}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-blue-300">
          {solution.title}
        </h3>
        <p className="text-sm text-blue-100/80">{solution.desc}</p>
      </div>
    </div>
  );
};

const RotatingCircle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);
  const rotationTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    rotationTween.current = gsap.to(containerRef.current, {
      rotate: 360,
      duration: 15,
      repeat: -1,
      ease: "linear",
    });

    return () => rotationTween.current?.kill();
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredSolution(index);
    rotationTween.current?.pause();
  };

  const handleMouseLeave = () => {
    setHoveredSolution(null);
    rotationTween.current?.play();
  };

  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {solutions.map((solution, index) => {
          const angle = (index / solutions.length) * 360;
          return (
            <div
              key={index}
              className="absolute w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 shadow-lg text-white cursor-pointer transition-all"
              style={{
                transform: `rotate(${angle}deg) translate(140px) rotate(-${angle}deg)`,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {hoveredSolution === index ? null : (
                <span className="text-2xl">{solution.icon}</span>
              )}
            </div>
          );
        })}
      </div>
      {hoveredSolution !== null && (
        <SolutionCard solution={solutions[hoveredSolution]} />
      )}
    </div>
  );
};

const SolutionsParallax = () => {
  return (
    <ParallaxProvider>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <RotatingCircle />
      </div>
    </ParallaxProvider>
  );
};

export default SolutionsParallax;
