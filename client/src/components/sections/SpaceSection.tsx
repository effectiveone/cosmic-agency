
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RocketSVG from "../RocketSVG";
import useParallax from "@/hooks/useParallax";

// Register plugins
gsap.registerPlugin(ScrollTrigger);

export default function SpaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { createParallaxEffect } = useParallax();
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0, rotation: 0 });
  
  // Czyszczenie i tworzenie odniesień do chmur
  const setCloudRef = (element: HTMLDivElement | null, index: number) => {
    cloudRefs.current[index] = element;
  };

  useEffect(() => {
    // Ustawienie początkowej pozycji rakiety (góra, środek)
    gsap.set(".rocket-space", {
      top: "5%",
      left: "50%", 
      xPercent: -50,
      rotation: 0
    });

    // Interwał sprawdzający pozycje chmur i aktualizujący pozycję rakiety
    const checkCollisionInterval = setInterval(() => {
      if (!rocketRef.current) return;
      
      const rocketRect = rocketRef.current.getBoundingClientRect();
      const rocketCenterX = rocketRect.left + rocketRect.width / 2;
      const rocketCenterY = rocketRect.top + rocketRect.height / 2;
      
      // Sprawdzenie, które chmury są w pobliżu rakiety
      const nearbyClouds = cloudRefs.current
        .filter(cloud => cloud !== null)
        .map(cloud => cloud!.getBoundingClientRect())
        .filter(rect => {
          // Sprawdzanie, czy chmura jest blisko rakiety (w polu widzenia)
          const cloudIsAhead = rect.top > rocketRect.top - 300 && rect.top < rocketRect.bottom + 100;
          return cloudIsAhead;
        });
      
      // Jeśli nie ma chmur w pobliżu, wróć do środka
      if (nearbyClouds.length === 0) {
        gsap.to(".rocket-space", {
          x: 0,
          rotation: 0,
          duration: 0.5,
          ease: "power1.out"
        });
        return;
      }
      
      // Znajdź najbliższą chmurę z przodu
      const closestCloud = nearbyClouds.reduce((prev, curr) => 
        (curr.top < prev.top) ? curr : prev
      );
      
      // Oblicz, w którą stronę skręcić, aby ominąć chmurę
      const cloudCenterX = closestCloud.left + closestCloud.width / 2;
      const distanceX = cloudCenterX - rocketCenterX;
      
      // Skręć w przeciwną stronę niż znajduje się chmura
      const targetX = distanceX > 0 ? -100 : 100;
      const targetRotation = distanceX > 0 ? -15 : 15;
      
      // Animuj rakietę, aby ominęła chmurę
      gsap.to(".rocket-space", {
        x: targetX,
        rotation: targetRotation,
        duration: 0.8,
        ease: "power1.inOut"
      });
      
    }, 500); // Sprawdzaj co 500ms
    
    // Animacja posuwania się rakiety w dół
    gsap.to(".rocket-space", {
      y: "+=2000", // Przesuń rakietę w dół o 2000px
      duration: 15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });
    
    // Animacja chmur - delikatne unoszenie się
    cloudRefs.current.forEach((cloud, index) => {
      if (!cloud) return;
      
      // Dodaj lekki ruch chmur
      gsap.to(cloud, {
        x: `${(index % 2 === 0 ? '+=' : '-=')}20`,
        y: "+=10",
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => {
      clearInterval(checkCollisionInterval);
    };
  }, []);

  const problems = [
    "Cross-Browser Compatibility",
    "Mobile Responsiveness", 
    "Performance Issues",
    "Security Vulnerabilities",
    "Accessibility Problems",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[150vh] bg-gradient-to-b from-blue-900 to-black flex items-center justify-center overflow-hidden"
    >
      {/* Problem clouds - rozmieszczone naprzemiennie po lewej i prawej stronie */}
      {problems.map((problem, index) => (
        <div
          key={index}
          ref={(el) => setCloudRef(el, index)}
          className="problem-cloud absolute px-6 py-4 rounded-[100%] flex items-center justify-center text-center font-semibold shadow-lg"
          style={{
            width: `${Math.max(180, problem.length * 10)}px`,
            height: `${Math.max(120, problem.length * 5)}px`,
            backgroundColor: `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`,
            left: index % 2 === 0 ? '20%' : '60%',
            top: `${15 + index * 15}%`,
            zIndex: 10,
            border: '2px solid rgba(100, 150, 255, 0.5)',
            boxShadow: '0 0 20px rgba(100, 150, 255, 0.3)'
          }}
        >
          <span className="text-blue-900 font-bold">{problem}</span>
        </div>
      ))}

      {/* Flying rocket - starts at top */}
      <div ref={rocketRef} className="rocket-space absolute z-50">
        <RocketSVG className="w-40 h-auto" />
      </div>

      {/* Background stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="star absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}
    </section>
  );
}
