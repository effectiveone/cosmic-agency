
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useParallax from '@/hooks/useParallax';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

export default function CloudsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { createParallaxEffect } = useParallax();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cloud parallax effect with different speeds for depth perception
      const clouds = gsap.utils.toArray('.cloud');
      clouds.forEach((cloud, i) => {
        createParallaxEffect(cloud as HTMLElement, {
          y: (i % 3) * 50 - 25, // Different vertical movements
          x: ((i % 5) - 2) * 20, // Different horizontal movements
          duration: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Generate multiple clouds with different sizes, positions, and opacities
  const generateClouds = (count: number) => {
    const clouds = [];
    for (let i = 0; i < count; i++) {
      const width = 30 + Math.random() * 50; // 30-80% width
      const height = 10 + Math.random() * 15; // 10-25% height
      const left = Math.random() * 90; // 0-90% left position
      const top = (i * 100 / count) + Math.random() * 10 - 5; // Distribute evenly with some randomness
      const opacity = 0.4 + Math.random() * 0.6; // 0.4-1.0 opacity
      const blur = Math.random() > 0.7 ? `blur(${Math.random() * 3}px)` : ''; // Some clouds are blurry
      
      clouds.push(
        <div 
          key={i}
          className="cloud absolute rounded-[100%] bg-white"
          style={{
            width: `${width}vw`,
            height: `${height}vh`,
            left: `${left}vw`,
            top: `${top}%`,
            opacity: opacity,
            filter: blur,
            zIndex: Math.floor(opacity * 10),
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
          }}
        />
      );
    }
    return clouds;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[130vh] bg-gradient-to-b from-blue-500 to-blue-900 flex-none overflow-hidden"
    >
      {generateClouds(25)}
      
      {/* Larger foreground clouds for more depth */}
      <div className="cloud absolute w-[80vw] h-[25vh] bg-white/75 rounded-[100%] left-[10vw] top-[20vh] z-20" />
      <div className="cloud absolute w-[70vw] h-[20vh] bg-white/80 rounded-[100%] right-[5vw] top-[50vh] z-20" />
      <div className="cloud absolute w-[85vw] h-[30vh] bg-white/70 rounded-[100%] left-[5vw] bottom-[15vh] z-20" />
    </section>
  );
}
