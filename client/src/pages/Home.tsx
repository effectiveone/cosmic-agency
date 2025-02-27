import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/sections/HeroSection';
import StratosphereSection from '@/components/sections/StratosphereSection';
import SpaceSection from '@/components/sections/SpaceSection';
import UFOSection from '@/components/sections/UFOSection';
import DockingSection from '@/components/sections/DockingSection';
import CTASection from '@/components/sections/CTASection';
import useSoundEffects from '@/hooks/useSoundEffects';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playAmbient } = useSoundEffects();

  useEffect(() => {
    // Start ambient space sound
    playAmbient();

    // Set up smooth scrolling
    const sections = gsap.utils.toArray<HTMLElement>('section');
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => `+=${containerRef.current?.offsetWidth || 0}`,
      },
    });
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="h-screen overflow-x-hidden bg-background text-foreground"
    >
      <div className="flex h-screen">
        <HeroSection />
        <StratosphereSection />
        <SpaceSection />
        <UFOSection />
        <DockingSection />
        <CTASection />
      </div>
    </div>
  );
}
