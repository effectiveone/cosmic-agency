
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
      className="relative w-full h-[150vh] bg-gradient-to-b from-blue-500 to-blue-900 flex items-center justify-center overflow-hidden"
    >
      {/* Massive clouds that cover most of the screen */}
      <div className="cloud absolute w-[150vw] h-[40vh] bg-white/90 rounded-[100%] left-[-25vw] top-[-10vh]" />
      <div className="cloud absolute w-[180vw] h-[50vh] bg-white/95 rounded-[100%] left-[-40vw] bottom-[-15vh]" />
      
      {/* Large clouds in the middle */}
      <div className="cloud absolute w-[120vw] h-[30vh] bg-white/80 rounded-[100%] left-[-10vw] top-[20vh]" />
      <div className="cloud absolute w-[130vw] h-[35vh] bg-white/85 rounded-[100%] right-[-15vw] top-[60vh]" />
      
      {/* Medium clouds */}
      <div className="cloud absolute w-[80vw] h-[25vh] bg-white/70 rounded-full left-[-5vw] top-[40vh]" />
      <div className="cloud absolute w-[90vw] h-[28vh] bg-white/75 rounded-full right-[-8vw] top-[80vh]" />
      <div className="cloud absolute w-[70vw] h-[20vh] bg-white/65 rounded-full left-[15vw] bottom-[30vh]" />
      
      {/* Smaller clouds for texture */}
      <div className="cloud absolute w-[50vw] h-[15vh] bg-white/60 rounded-full left-[20vw] top-[35vh]" />
      <div className="cloud absolute w-[60vw] h-[18vh] bg-white/55 rounded-full right-[25vw] top-[75vh]" />
      <div className="cloud absolute w-[45vw] h-[12vh] bg-white/50 rounded-full left-[30vw] bottom-[45vh]" />
      
      <div className="rocket absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <RocketSVG className="w-48 h-auto" />
      </div>
    </section>
  );
}
