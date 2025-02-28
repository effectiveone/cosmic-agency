import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import RocketSVG from "../RocketSVG";
import UFOSVG from "../UFOSVG";
import useSoundEffects from "@/hooks/useSoundEffects";

export default function UFOSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { playUFO } = useSoundEffects();
  const [showSolutions, setShowSolutions] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Rozpocznij animację, gdy górna krawędź sekcji dotrze do dolnej krawędzi ekranu
          end: "bottom top",   // Zakończ animację, gdy dolna krawędź sekcji dotrze do górnej krawędzi ekranu
          scrub: true,
          onEnter: () => playUFO(),
        },
      });

      tl.fromTo(
        ".ufo",
        { x: "120%" }, // Startujemy poza ekranem po prawej stronie
        { x: "50%", duration: 2 }, // Płynny ruch do środka ekranu
      )
        .to(".beam", {
          scaleY: 1,
          opacity: 0.7,
          duration: 1,
        })
        .to(".rocket", {
          y: "-=100",
          duration: 1,
          onComplete: () => setShowSolutions(true),
        })
        .to(
          ".ufo",
          {
            x: "100%", // Odlatuje w prawo
            y: "-=150",
            duration: 5,
          },
          "+=1",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex-none w-screen h-screen bg-black"
    >
      <div className="ufo absolute top-1/4 transform -translate-y-1/2 flex flex-col items-center">
        <UFOSVG className="w-48 h-auto" />
        <div className="beam w-32 h-96 bg-gradient-to-b from-green-500/80 to-transparent origin-top scale-y-0 rounded-b-full" />
      </div>

      <div className="rocket absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <RocketSVG className="w-32 h-auto" />
      </div>

      {showSolutions && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 w-full flex justify-center">
          <div className="rescue-message text-white text-xl font-bold mb-8 text-center">
            Spacecraft abducted! Emergency rescue protocols activated
          </div>
        </div>
      )}
    </section>
  );
}
