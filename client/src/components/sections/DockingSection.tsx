import { useEffect, useRef } from "react";
import gsap from "gsap";
import RocketSVG from "../RocketSVG";
import SpaceStationSVG from "../SpaceStationSVG";
import useSoundEffects from "@/hooks/useSoundEffects";

export default function DockingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { playDocking } = useSoundEffects();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          onEnter: () => playDocking(),
        },
      });

      // Docking sequence
      tl.to(".rocket", {
        rotation: 180,
        duration: 2,
      })
        .to(".rocket", {
          x: "-=50",
          y: "-=30",
          duration: 1,
        })
        .to(".success-message", {
          opacity: 1,
          y: -20,
          duration: 1,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black flex items-center justify-center"
    >
      <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2">
        <SpaceStationSVG className="w-96 h-auto" />
      </div>

      <div className="rocket absolute left-1/4 top-1/2 transform -translate-y-1/2">
        <RocketSVG className="w-32 h-auto" />
      </div>

      <div className="success-message absolute bottom-1/4 left-1/2 transform -translate-x-1/2 opacity-0 text-white text-2xl font-bold">
        Docking Successful!
      </div>
    </section>
  );
}
