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
          start: "top top",
          end: "+=100%",
          scrub: true,
          onEnter: () => playUFO(),
        },
      });

      // UFO scanning animation - celowanie dokładnie w rakietę
      tl.from(".ufo", {
        x: "100%",
        duration: 2,
      })
        .add(() => {
          // Pobierz pozycję rakiety i UFO
          const rocketElement = document.querySelector(".rocket");
          const ufoElement = document.querySelector(".ufo");
          
          if (rocketElement && ufoElement) {
            const rocketRect = rocketElement.getBoundingClientRect();
            const ufoRect = ufoElement.getBoundingClientRect();
            
            // Oblicz przesunięcie potrzebne, aby UFO było nad rakietą
            const offsetX = (rocketRect.left + rocketRect.width / 2) - (ufoRect.left + ufoRect.width / 2);
            
            // Zastosuj przesunięcie do UFO
            gsap.to(".ufo", {
              x: `+=${offsetX}`,
              duration: 1,
            });
          }
        })
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
            x: "-100%",
            y: "-=150",
            duration: 2,
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
