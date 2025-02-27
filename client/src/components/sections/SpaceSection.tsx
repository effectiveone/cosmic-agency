
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import RocketSVG from '../RocketSVG';
import useParallax from '@/hooks/useParallax';

export default function SpaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { createParallaxEffect } = useParallax();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rocket animation path (zigzag to avoid clouds)
      gsap.to('.rocket', {
        motionPath: {
          path: [
            {x: 0, y: 0},
            {x: 200, y: -50},
            {x: -200, y: -100},
            {x: 150, y: -150},
            {x: -150, y: -200},
            {x: 0, y: -250}
          ],
          curviness: 1.5
        },
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Rotate rocket based on direction
      gsap.to('.rocket', {
        rotation: 15,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Problem clouds subtle movement
      const clouds = gsap.utils.toArray('.problem-cloud');
      clouds.forEach((cloud, i) => {
        gsap.to(cloud, {
          x: (i % 2 === 0) ? "+=20" : "-=20",
          y: (i % 3 === 0) ? "+=15" : "-=15",
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const problems = [
    "Cross-Browser Compatibility",
    "Mobile Responsiveness",
    "Page Load Speed",
    "SEO Optimization",
    "Accessibility",
    "Browser Caching",
    "JavaScript Errors",
    "Security Vulnerabilities",
    "CSS Specificity",
    "Browser Rendering"
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[150vh] bg-gradient-to-b from-blue-900 to-black flex items-center justify-center overflow-hidden"
    >
      {/* Problem clouds */}
      {problems.map((problem, index) => (
        <div 
          key={index}
          className={`problem-cloud absolute px-6 py-4 rounded-[100%] flex items-center justify-center text-center font-semibold shadow-lg`}
          style={{
            width: `${Math.max(180, problem.length * 10)}px`,
            height: `${Math.max(120, problem.length * 5)}px`,
            backgroundColor: `rgba(255, 255, 255, ${0.6 + Math.random() * 0.3})`,
            left: `${(index % 3) * 30 + 15}%`,
            top: `${(index % 4) * 22 + 10}%`,
            zIndex: 10,
          }}
        >
          <span className="text-blue-900">{problem}</span>
        </div>
      ))}
      
      {/* Flying rocket */}
      <div className="rocket absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <RocketSVG className="w-40 h-auto" />
      </div>
      
      {/* Background stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="star absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}
    </section>
  );
}
