import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import RocketSVG from '../RocketSVG';
import useSoundEffects from '@/hooks/useSoundEffects';

const renderSmallClouds = () => {
  return (
    <div className="absolute bottom-[10vh] left-0 w-full h-[10vh]">
      {/* Placeholder for small clouds */}
      <div className="w-16 h-16 bg-white rounded-full opacity-50 absolute left-1/4"></div>
      <div className="w-24 h-24 bg-white rounded-full opacity-50 absolute right-1/4"></div>
    </div>
  );
};


export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { playLaunch } = useSoundEffects();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Countdown animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          onEnter: () => playLaunch(),
        },
      });

      tl.from('.countdown', {
        opacity: 0,
        scale: 2,
        duration: 1,
      })
      .to('.countdown', {
        opacity: 0,
        y: -50,
        duration: 0.5,
      })
      .from('.rocket', {
        y: 100,
        opacity: 0,
        duration: 1,
      })
      .to('.rocket', {
        y: -200,
        duration: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex-none w-screen h-screen bg-gradient-to-b from-blue-900 to-black overflow-hidden"
    >
      {/* Ground */}
      <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-green-800 to-green-600 z-10" />

      {/* Small clouds near the ground */}
      {renderSmallClouds()}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="countdown text-8xl font-bold text-white">3...2...1...</div>
      </div>
      <div className="rocket absolute bottom-[15vh] left-1/2 transform -translate-x-1/2 z-20">
        <RocketSVG className="w-32 h-auto" />
      </div>
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-orange-500/30 to-transparent" />
    </section>
  );
}