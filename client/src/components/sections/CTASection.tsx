import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex-none w-screen h-screen bg-gradient-to-b from-black to-blue-900 flex items-center justify-center"
    >
      <div className="cta-content text-center">
        <h2 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Start Your Journey
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Ready to explore the universe of possibilities? Launch your next project with us and reach for the stars.
        </p>
        <Button 
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-xl"
          onClick={() => window.open("https://acurgturbo.agency", "_blank")}
        >
          Launch Project
        </Button>
      </div>
    </section>
  );
}
