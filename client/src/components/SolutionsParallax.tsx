
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ParallaxProvider, useParallax } from 'react-scroll-parallax';

const SolutionCard = ({ solution, index }) => {
  const parallax = useParallax<HTMLDivElement>({
    translateY: [0, 30],
    rotate: [0, index % 2 === 0 ? 5 : -5],
    scale: [1, 1.05],
    easing: 'easeInQuad',
  });

  return (
    <div 
      ref={parallax.ref}
      className="solution-card bg-blue-900/80 backdrop-blur-md text-white p-5 rounded-xl border border-blue-500/50 shadow-lg flex items-center gap-4 w-80 transform hover:scale-105 transition-transform"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
        <span className="text-2xl">{solution.icon}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-blue-300">{solution.title}</h3>
        <p className="text-sm text-blue-100/80">{solution.desc}</p>
      </div>
    </div>
  );
};

const SolutionsParallax = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Solutions for the spacecraft abduction situation
  const solutions = [
    { icon: "🛰️", title: "Distress Signal", desc: "Send emergency beacon to nearby spacecraft." },
    { icon: "🔄", title: "Reroute Power", desc: "Override tractor beam interference." },
    { icon: "🔋", title: "Energy Shield", desc: "Activate defensive measures against scanning." },
    { icon: "🚀", title: "Escape Thrusters", desc: "Engage emergency propulsion system." }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate solution cards appearing
      gsap.from('.solution-card', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <ParallaxProvider>
      <div ref={containerRef} className="flex flex-wrap justify-center gap-6 max-w-4xl">
        {solutions.map((solution, index) => (
          <SolutionCard key={index} solution={solution} index={index} />
        ))}
      </div>
    </ParallaxProvider>
  );
};

export default SolutionsParallax;
