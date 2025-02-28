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
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const rocketTrailRef = useRef<HTMLDivElement>(null);
  const { createParallaxEffect } = useParallax();
  const [rocketPosition, setRocketPosition] = useState({
    x: 0,
    y: 0,
    rotation: 0,
  });
  const [activeCollision, setActiveCollision] = useState<number | null>(null);
  const [rocketSpeed, setRocketSpeed] = useState(0);

  // Czyszczenie i tworzenie odniesień do chmur
  const setCloudRef = (element: HTMLDivElement | null, index: number) => {
    cloudRefs.current[index] = element;
  };

  // Function to create rocket exhaust particles
  const createExhaustParticle = () => {
    if (!rocketRef.current || !rocketTrailRef.current) return;

    const particle = document.createElement("div");
    particle.className = "exhaust-particle";
    rocketTrailRef.current.appendChild(particle);

    // Position behind the rocket
    const rocketRect = rocketRef.current.getBoundingClientRect();
    const sectionRect = sectionRef.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };

    // Calculate position relative to rocket's current position and rotation
    const rocketRotation = rocketPosition.rotation;
    const offsetX = Math.sin((rocketRotation * Math.PI) / 180) * 20;

    gsap.set(particle, {
      x: rocketRect.left - sectionRect.left + rocketRect.width / 2 - offsetX,
      y: rocketRect.top - sectionRect.top + rocketRect.height,
      scale: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.6 + 0.4,
      backgroundColor: Math.random() > 0.3 ? "#ff9500" : "#ff5000",
    });

    // Animate the particle
    gsap.to(particle, {
      y: "+=50",
      x: `${Math.random() * 20 - 10}`,
      opacity: 0,
      scale: 0,
      duration: 0.5 + Math.random() * 0.5,
      onComplete: () => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      },
    });
  };

  // Function to create impact particles when hitting a cloud
  const createImpactParticles = (cloudIndex: number) => {
    if (!cloudRefs.current[cloudIndex]) return;

    const cloudRect = cloudRefs.current[cloudIndex]!.getBoundingClientRect();
    const sectionRect = sectionRef.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "impact-particle";
      sectionRef.current?.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 40 + 20;
      const startX = cloudRect.left - sectionRect.left + cloudRect.width / 2;
      const startY = cloudRect.top - sectionRect.top + cloudRect.height / 2;

      gsap.set(particle, {
        x: startX,
        y: startY,
        scale: Math.random() * 0.3 + 0.1,
        opacity: 0.9,
        backgroundColor: "#ffffff",
      });

      gsap.to(particle, {
        x: startX + Math.cos(angle) * distance,
        y: startY + Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 0.8 + Math.random() * 0.4,
        ease: "power1.out",
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        },
      });
    }
  };

  // Create twinkling star effect
  const createTwinklingStar = () => {
    if (!starsContainerRef.current) return;

    const star = document.createElement("div");
    star.className = "star absolute rounded-full";
    starsContainerRef.current.appendChild(star);

    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 3 + 2;
    const sectionHeight = sectionRef.current?.offsetHeight || 1000;

    gsap.set(star, {
      width: size,
      height: size,
      backgroundColor: Math.random() > 0.8 ? "#e0f7ff" : "#ffffff",
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.7 + 0.3,
      boxShadow:
        Math.random() > 0.9 ? "0 0 3px 1px rgba(255, 255, 255, 0.4)" : "none",
    });

    gsap.to(star, {
      opacity: 0.2,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Remove stars that go out of view
    setTimeout(
      () => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
      },
      duration * 1000 * 5,
    );
  };

  useEffect(() => {
    // Create initial stars
    for (let i = 0; i < 100; i++) {
      createTwinklingStar();
    }

    // Create new stars occasionally
    const newStarInterval = setInterval(() => {
      createTwinklingStar();
    }, 1000);

    // Create rocket exhaust particles
    const exhaustInterval = setInterval(() => {
      if (rocketSpeed > 0.3) {
        // Create multiple particles based on speed
        const particleCount = Math.floor(rocketSpeed * 3);
        for (let i = 0; i < particleCount; i++) {
          setTimeout(() => createExhaustParticle(), i * 30);
        }
      }
    }, 100);

    // Ustawienie początkowej pozycji rakiety (góra, środek)
    gsap.set(".rocket-space", {
      top: "5%",
      left: "50%",
      xPercent: -50,
      rotation: 0,
    });

    // Dynamic perspective effect - move clouds slightly based on scroll position
    if (sectionRef.current) {
      createParallaxEffect(sectionRef.current, ".problem-cloud", {
        speed: 0.05,
        direction: "vertical",
      });
    }

    // Interwał sprawdzający pozycje chmur i aktualizujący pozycję rakiety
    const checkCollisionInterval = setInterval(() => {
      if (!rocketRef.current) return;

      const rocketRect = rocketRef.current.getBoundingClientRect();
      const rocketCenterX = rocketRect.left + rocketRect.width / 2;
      const rocketCenterY = rocketRect.top + rocketRect.height / 2;

      // Sprawdzenie, które chmury są w pobliżu rakiety
      let nearestCloudIndex: number | null = null;
      let nearestDistance = Infinity;

      cloudRefs.current.forEach((cloud, index) => {
        if (!cloud) return;

        const cloudRect = cloud.getBoundingClientRect();
        const cloudCenterX = cloudRect.left + cloudRect.width / 2;
        const cloudCenterY = cloudRect.top + cloudRect.height / 2;

        // Calculate distance between rocket and cloud centers
        const distance = Math.sqrt(
          Math.pow(rocketCenterX - cloudCenterX, 2) +
            Math.pow(rocketCenterY - cloudCenterY, 2),
        );

        // Check if this is the nearest cloud ahead of the rocket
        if (
          distance < nearestDistance &&
          cloudRect.top > rocketRect.top - 200 &&
          cloudRect.top < rocketRect.bottom + 300
        ) {
          nearestDistance = distance;
          nearestCloudIndex = index;
        }

        // Check for collision and create effect
        if (
          rocketCenterX > cloudRect.left &&
          rocketCenterX < cloudRect.right &&
          rocketCenterY > cloudRect.top &&
          rocketCenterY < cloudRect.bottom
        ) {
          if (activeCollision !== index) {
            setActiveCollision(index);
            createImpactParticles(index);

            // Pulse effect on cloud
            gsap.to(cloud, {
              scale: 1.1,
              opacity: 0.8,
              duration: 0.3,
              ease: "power1.inOut",
              yoyo: true,
              repeat: 1,
            });

            // Shake the rocket slightly
            gsap.to(rocketRef.current, {
              x: "+=5",
              y: "+=3",
              duration: 0.1,
              repeat: 3,
              yoyo: true,
            });
          }
        }
      });

      // Reset active collision when no longer colliding
      if (nearestCloudIndex !== activeCollision && activeCollision !== null) {
        setActiveCollision(null);
      }

      // Jeśli nie ma chmur w pobliżu, wróć do środka
      if (nearestCloudIndex === null) {
        gsap.to(".rocket-space", {
          x: 0,
          rotation: 0,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: function () {
            const progress = this.progress();
            setRocketSpeed(progress * 0.5);
          },
        });
        setRocketPosition({ x: 0, y: rocketPosition.y, rotation: 0 });
        return;
      }

      // Get the nearest cloud
      const cloud = cloudRefs.current[nearestCloudIndex];
      if (!cloud) return;

      const cloudRect = cloud.getBoundingClientRect();
      const cloudCenterX = cloudRect.left + cloudRect.width / 2;

      // Calculate how far to move to avoid the cloud
      const distanceX = cloudCenterX - rocketCenterX;
      const avoidanceStrength = Math.min(1, 500 / nearestDistance);

      // Decide which direction to go
      const targetX =
        distanceX > 0 ? -100 * avoidanceStrength : 100 * avoidanceStrength;
      const targetRotation =
        distanceX > 0 ? -20 * avoidanceStrength : 20 * avoidanceStrength;

      // Animuj rakietę, aby ominęła chmurę
      gsap.to(".rocket-space", {
        x: targetX,
        rotation: targetRotation,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: function () {
          const progress = Math.abs(this.progress());
          setRocketSpeed(progress);
        },
      });

      // Update rocket position state
      setRocketPosition({
        x: targetX,
        y: rocketPosition.y,
        rotation: targetRotation,
      });
    }, 200); // Sprawdzaj co 200ms

    // Animacja posuwania się rakiety w dół
    const rocketTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    rocketTimeline.to(".rocket-space", {
      y: "+=2200", // Przesuń rakietę w dół o 2200px
      duration: 15,
      ease: "power1.inOut",
      onUpdate: function () {
        setRocketPosition((prev) => ({
          ...prev,
          y: this.targets()[0].getBoundingClientRect().top,
        }));
      },
    });

    // Animacja chmur - delikatne unoszenie się i obracanie
    cloudRefs.current.forEach((cloud, index) => {
      if (!cloud) return;

      // Dodaj lekki ruch chmur z różnymi parametrami dla każdej
      gsap.to(cloud, {
        x: `${index % 2 === 0 ? "+=" : "-="}${20 + index * 5}`,
        y: "+=15",
        rotation: index % 2 === 0 ? 3 : -3,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Dodaj pulsujący efekt przezroczystości
      gsap.to(cloud, {
        opacity: 0.85,
        duration: 1.5 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });

    return () => {
      clearInterval(checkCollisionInterval);
      clearInterval(exhaustInterval);
      clearInterval(newStarInterval);
    };
  }, [
    createParallaxEffect,
    activeCollision,
    rocketPosition.rotation,
    rocketPosition.y,
  ]);

  const problems = [
    "Dead Deadlines",
    "Cross-Browser Compatibility",
    "Mobile Responsiveness",
    "Performance Issues",
    "Security Vulnerabilities",
    "Accessibility Problems",
    "API Integration",
    "User Authentication",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[200vh] bg-gradient-to-b from-blue-900 via-purple-900 to-black flex items-center justify-center overflow-hidden"
    >
      {/* Background stars container */}
      <div
        ref={starsContainerRef}
        className="stars-container absolute inset-0"
      ></div>

      {/* Rocket trail container */}
      <div
        ref={rocketTrailRef}
        className="rocket-trail-container absolute inset-0 z-10"
      ></div>

      {/* Problem clouds - rozmieszczone naprzemiennie po lewej i prawej stronie */}
      {problems.map((problem, index) => (
        <div
          key={index}
          ref={(el) => setCloudRef(el, index)}
          className={`problem-cloud absolute px-6 py-4 rounded-[100%] flex items-center justify-center text-center font-semibold shadow-lg transition-all duration-300 ${activeCollision === index ? "cloud-hit" : ""}`}
          style={{
            width: `${Math.max(180, problem.length * 10)}px`,
            height: `${Math.max(120, problem.length * 5)}px`,
            backgroundColor: `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`,
            left:
              index % 2 === 0
                ? `${15 + Math.random() * 10}%`
                : `${65 - Math.random() * 10}%`,
            top: `${10 + index * 12}%`,
            zIndex: 10,
            border: "2px solid rgba(100, 150, 255, 0.5)",
            boxShadow: `0 0 20px rgba(100, 150, 255, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.8)`,
            transform: `rotate(${Math.random() * 6 - 3}deg)`,
          }}
        >
          <span className="text-blue-900 font-bold">{problem}</span>
        </div>
      ))}

      {/* Flying rocket */}
      <div ref={rocketRef} className="rocket-space absolute z-50">
        <RocketSVG className="w-40 h-auto" isFlipped />

        {/* Engine flame */}
        <div className="rocket-flame absolute left-1/2 -bottom-8 transform -translate-x-1/2 w-10 h-16">
          <div className="flame-outer absolute inset-0 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-b-full animate-pulse opacity-80"></div>
          <div className="flame-inner absolute inset-1 bg-gradient-to-t from-yellow-300 to-white rounded-b-full animate-pulse opacity-90"></div>
        </div>
      </div>

      {/* Section title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-wider">
          Mission: Problem Navigation
        </h2>
        <p className="text-blue-200 text-lg">
          Guiding your project through challenges
        </p>
      </div>

      {/* CSS for particles and animations */}
      <style jsx>{`
        .problem-cloud {
          transition:
            transform 0.3s ease,
            opacity 0.3s ease;
        }

        .cloud-hit {
          filter: brightness(1.2);
        }

        .rocket-space {
          transition: transform 0.1s ease;
        }

        .rocket-flame {
          perspective: 100px;
        }

        .flame-outer {
          animation: flicker 0.2s infinite alternate;
          transform-origin: center bottom;
        }

        .flame-inner {
          animation: flicker 0.15s 0.1s infinite alternate;
          transform-origin: center bottom;
        }

        .exhaust-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          filter: blur(2px);
          z-index: 5;
        }

        .impact-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          filter: blur(1px);
          z-index: 15;
        }

        @keyframes flicker {
          0% {
            transform: scaleX(0.9) scaleY(0.95);
            opacity: 0.9;
          }
          100% {
            transform: scaleX(1.1) scaleY(1.05);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
