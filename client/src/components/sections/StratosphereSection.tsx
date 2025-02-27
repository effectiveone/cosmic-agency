import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RocketSVG from '../RocketSVG';
import useParallax from '@/hooks/useParallax';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

export default function StratosphereSection({ longerSection = false, biggerClouds = false }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { createParallaxEffect } = useParallax();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cloud parallax effect (reduced number of clouds)
      const clouds = gsap.utils.toArray('.cloud');
      clouds.forEach((cloud, i) => {
        createParallaxEffect(cloud as HTMLElement, {
          y: (i + 1) * 70, // Increased vertical spacing
          x: (i % 2 === 0) ? 30 : -30, // Increased horizontal movement
          duration: 1,
        });
      });

      // Simple straight vertical rocket animation
      gsap.to('.rocket', {
        y: 'scroll()',
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: longerSection ? '300vh' : '200vh',
      }}
      className="relative flex-none w-screen bg-gradient-to-b from-black to-blue-900"
    >
      <div className="cloud absolute w-[70vw] h-[10vh] bg-white/60 rounded-full left-[15vw] top-[5vh]" />
      <div className="cloud absolute w-[30vw] h-[8vh] bg-white/50 rounded-full left-[30vw] top-[25vh]" />
      <div className="cloud absolute w-[50vw] h-[15vh] bg-white/45 rounded-full right-[20vw] top-[40vh]" />
      <div className="cloud absolute w-[60vw] h-[18vh] bg-white/55 rounded-full right-[25vw] top-[75vh]" />
      <div className="cloud absolute w-[45vw] h-[12vh] bg-white/50 rounded-full left-[30vw] bottom-[45vh]" />


      <div className="rocket absolute left-1/2 transform -translate-x-1/2">
        <RocketSVG className="w-48 h-auto" style={{ transform: 'rotate(0deg)' }} />
      </div>
    </section>
  );
}