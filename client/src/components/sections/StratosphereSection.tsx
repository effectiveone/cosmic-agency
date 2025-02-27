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
          y: (i + 1) * 100,
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
      className="relative flex-none w-screen h-screen bg-gradient-to-b from-blue-500 to-blue-900"
    >
      <div className="cloud absolute w-32 h-24 bg-white/30 rounded-full left-1/4 top-1/4" />
      <div className="cloud absolute w-48 h-32 bg-white/40 rounded-full right-1/3 top-1/2" />
      <div className="cloud absolute w-40 h-28 bg-white/20 rounded-full left-1/3 bottom-1/4" />
      <div className="rocket absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <RocketSVG className="w-32 h-auto" />
      </div>
    </section>
  );
}
