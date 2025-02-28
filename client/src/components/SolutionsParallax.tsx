import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ParallaxProvider } from "react-scroll-parallax";

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

const RotatingCircle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const rotationTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    rotationTween.current = gsap.to(containerRef.current, {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });

    return () => rotationTween.current?.kill();
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
    rotationTween.current?.pause(); // Zatrzymuje animację
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    rotationTween.current?.play(); // Wznawia animację
  };

  return (
    <div className="relative w-64 h-64">
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {solutions.map((solution, index) => {
          const angle = (index / solutions.length) * 360;
          return (
            <div
              key={index}
              className="absolute w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 shadow-lg text-white cursor-pointer"
              style={{
                transform: `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {hoverIndex === index ? (
                <div className="absolute w-48 p-4 bg-blue-900 text-white rounded-xl shadow-lg text-center">
                  <h3 className="text-lg font-semibold">{solution.title}</h3>
                  <p className="text-sm">{solution.desc}</p>
                </div>
              ) : (
                <span className="text-2xl">{solution.icon}</span>
              )}
            </div>
          );
        })}
      </div>
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
