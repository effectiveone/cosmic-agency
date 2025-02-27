import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import RocketSVG from '../RocketSVG';
import useParallax from '@/hooks/useParallax';

export default function SpaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { createParallaxEffect } = useParallax();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stars twinkling
      gsap.to('.star', {
        opacity: 0.5,
        duration: 1,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
      });

      // Planet parallax
      const planets = gsap.utils.toArray('.planet');
      planets.forEach((planet, i) => {
        createParallaxEffect(planet as HTMLElement, {
          x: (i + 1) * 50,
          rotation: i * 45,
          duration: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex-none w-screen h-screen bg-black"
    >
      {/* Generate stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="star absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      {/* Planets */}
      <div className="planet absolute w-32 h-32 rounded-full bg-orange-500 left-1/4 top-1/4" />
      <div className="planet absolute w-48 h-48 rounded-full bg-purple-700 right-1/3 top-1/2" />
      <div className="planet absolute w-24 h-24 rounded-full bg-blue-400 left-1/3 bottom-1/4" />
      
      <div className="rocket absolute left-1/2 transform -translate-x-1/2">
        <RocketSVG className="w-32 h-auto" />
      </div>
    </section>
  );
}
