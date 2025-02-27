
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import RocketSVG from '../RocketSVG';
import useParallax from '@/hooks/useParallax';

// Register plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function StratosphereSection({ longerSection = false, biggerClouds = false }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
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

      // Set the rocket at the top of the screen initially
      gsap.set('.rocket', {
        top: 0,
        left: '50%',
        xPercent: -50,
        yPercent: -50
      });

      // Dynamic rocket animation - follow the SVG path
      if (pathRef.current) {
        gsap.to('.rocket', {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        });
      }
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
      
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <path
          ref={pathRef}
          d="M50,0 C150,150 -50,300 150,450 C-50,600 150,750 50,900"
          fill="none"
          stroke="red"
          strokeWidth="3"
          strokeDasharray="5,5"
          className="path-guide"
        />
      </svg>
      
      <div className="rocket absolute" style={{ zIndex: 10 }}>
        <RocketSVG className="w-48 h-auto" style={{ transform: 'rotate(90deg)' }} />
      </div>
    </section>
  );
}
