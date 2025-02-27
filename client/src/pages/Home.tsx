
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

    // Set up section animations triggered by scrolling
    const sections = gsap.utils.toArray<HTMLElement>('section');
    sections.forEach((section, index) => {
      // Create animations for each section as they come into view
      gsap.fromTo(
        section,
        { 
          opacity: 0,
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            end: "bottom top",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bg-background text-foreground"
    >
      <div className="flex flex-col">
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
