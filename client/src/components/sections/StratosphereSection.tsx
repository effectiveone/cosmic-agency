
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import RocketSVG from '../RocketSVG';
import useParallax from '@/hooks/useParallax';

export default function StratosphereSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { createParallaxEffect } = useParallax();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cloud parallax effect
      const clouds = gsap.utils.toArray('.cloud');
      clouds.forEach((cloud, i) => {
        createParallaxEffect(cloud as HTMLElement, {
          y: (i + 1) * 50,
          x: (i % 2 === 0) ? 20 : -20,
          duration: 1,
        });
      });

      // Rocket shake animation
      gsap.to('.rocket', {
        x: 2,
        y: 2,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-gradient-to-b from-blue-500 to-blue-900 flex items-center justify-center overflow-hidden"
    >
      {/* Large clouds that cover most of the screen */}
      <div className="cloud absolute w-[120vw] h-64 bg-white/70 rounded-[100%] left-[-10vw] top-[-5vh]" />
      <div className="cloud absolute w-[140vw] h-72 bg-white/80 rounded-[100%] left-[-20vw] bottom-[-10vh]" />
      
      {/* Medium clouds in the middle */}
      <div className="cloud absolute w-96 h-64 bg-white/60 rounded-full left-[-10%] top-1/3" />
      <div className="cloud absolute w-96 h-60 bg-white/60 rounded-full right-[-10%] top-1/2" />
      <div className="cloud absolute w-96 h-56 bg-white/50 rounded-full left-1/4 bottom-1/4" />
      <div className="cloud absolute w-96 h-48 bg-white/50 rounded-full right-1/4 top-1/4" />
      
      {/* Smaller clouds for texture */}
      <div className="cloud absolute w-48 h-32 bg-white/40 rounded-full left-1/3 top-1/4" />
      <div className="cloud absolute w-64 h-40 bg-white/40 rounded-full right-1/3 top-1/2" />
      <div className="cloud absolute w-56 h-36 bg-white/30 rounded-full left-1/2 bottom-1/3" />
      
      <div className="rocket absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <RocketSVG className="w-32 h-auto" />
      </div>
    </section>
  );
}
