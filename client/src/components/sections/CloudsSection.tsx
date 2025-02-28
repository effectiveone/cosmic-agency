import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useParallax from "@/hooks/useParallax";

// Register plugins
gsap.registerPlugin(ScrollTrigger);

export default function CloudsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const { createParallaxEffect } = useParallax();
  const [lightningActive, setLightningActive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cloud parallax effect with different speeds for depth perception
      const clouds = gsap.utils.toArray(".cloud");
      clouds.forEach((cloud, i) => {
        createParallaxEffect(cloud as HTMLElement, {
          y: (i % 3) * 50 - 25, // Different vertical movements
          x: ((i % 5) - 2) * 20, // Different horizontal movements
          duration: 1,
        });
      });

      // Rocket animation
      if (rocketRef.current) {
        // Initial position (below the viewport)
        gsap.set(rocketRef.current, {
          y: "120vh",
          rotation: 0,
          scale: 1,
        });

        // Rocket launch animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onUpdate: (self) => {
              // Trigger lightning between 30% and 70% of the scroll progress
              const progress = self.progress;
              if (progress > 0.3 && progress < 0.7) {
                // Random chance to trigger lightning
                if (Math.random() < 0.03 && !lightningActive) {
                  setLightningActive(true);
                  setTimeout(() => setLightningActive(false), 200);
                }
              }
            },
          },
        });

        tl.to(rocketRef.current, {
          y: "-20vh",
          duration: 3,
          ease: "power2.in",
        })
          .to(
            rocketRef.current,
            {
              rotation: Math.random() * 6 - 3, // Slight wobble
              ease: "power1.inOut",
              duration: 0.5,
              repeat: 4,
              yoyo: true,
            },
            "<",
          )
          .to(
            rocketRef.current,
            {
              scale: 0.5, // Rocket gets smaller as it flies away
              duration: 1.5,
            },
            "-=1.5",
          );

        // Cloud parting effect when rocket passes through
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 30%",
              scrub: 1,
            },
          })
          .to(".cloud-middle", {
            x: (i, el) => {
              // Clouds in the middle part away based on their position
              const position = el.getBoundingClientRect().left;
              return position < window.innerWidth / 2 ? "-30vw" : "30vw";
            },
            opacity: 0.6,
            duration: 1.5,
            stagger: 0.05,
          });
      }

      // Smoke particles from rocket
      const createSmokeParticles = () => {
        if (!rocketRef.current || !sectionRef.current) return;

        const particlesContainer = document.createElement("div");
        particlesContainer.className = "absolute z-10";
        sectionRef.current.appendChild(particlesContainer);

        const createParticle = () => {
          if (!rocketRef.current) return;

          const rocketPos = rocketRef.current.getBoundingClientRect();
          const particle = document.createElement("div");

          particle.className = "absolute rounded-full bg-white/70";
          particle.style.width = `${5 + Math.random() * 8}px`;
          particle.style.height = particle.style.width;
          particle.style.left = `${rocketPos.left + rocketPos.width / 2 + (Math.random() * 20 - 10)}px`;
          particle.style.top = `${rocketPos.top + rocketPos.height + Math.random() * 5}px`;

          particlesContainer.appendChild(particle);

          gsap.to(particle, {
            y: "+=50",
            x: `${Math.random() * 60 - 30}`,
            opacity: 0,
            scale: 2 + Math.random() * 2,
            duration: 1 + Math.random(),
            ease: "power1.out",
            onComplete: () => {
              particle.remove();
            },
          });
        };

        const particleInterval = setInterval(createParticle, 50);

        // Cleanup
        return () => {
          clearInterval(particleInterval);
          particlesContainer.remove();
        };
      };

      const cleanupSmoke = createSmokeParticles();

      // Cleanup
      return () => {
        if (cleanupSmoke) cleanupSmoke();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Generate lightning bolts
  const generateLightning = () => {
    if (!lightningActive) return null;

    const lightning = [];
    const count = 2 + Math.floor(Math.random() * 3);

    for (let i = 0; i < count; i++) {
      const startX = 10 + Math.random() * 80;
      const segments = 5 + Math.floor(Math.random() * 5);
      let path = `M${startX} 0`;

      let currentY = 0;
      const totalHeight = 100;
      const segmentHeight = totalHeight / segments;

      for (let j = 0; j < segments; j++) {
        const nextY = currentY + segmentHeight;
        const nextX = startX + (Math.random() * 20 - 10);
        path += ` L${nextX} ${nextY}`;
        currentY = nextY;
      }

      lightning.push(
        <svg
          key={i}
          className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none"
          viewBox="0 0 100 100"
        >
          <path
            d={path}
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            opacity={0.8 + Math.random() * 0.2}
          />
        </svg>,
      );
    }

    return lightning;
  };

  // Generate multiple clouds with different sizes, positions, and opacities
  const generateClouds = (count: number) => {
    const clouds = [];
    for (let i = 0; i < count; i++) {
      const width = 30 + Math.random() * 50; // 30-80% width
      const height = 10 + Math.random() * 15; // 10-25% height
      const left = Math.random() * 90; // 0-90% left position
      const top = (i * 100) / count + Math.random() * 10 - 5; // Distribute evenly with some randomness
      const opacity = 0.4 + Math.random() * 0.6; // 0.4-1.0 opacity
      const blur = Math.random() > 0.7 ? `blur(${Math.random() * 3}px)` : ""; // Some clouds are blurry

      // Add 'cloud-middle' class to clouds in the middle section
      const isMiddle = top > 30 && top < 70;
      const cloudClass = `cloud ${isMiddle ? "cloud-middle" : ""}`;

      clouds.push(
        <div
          key={i}
          className={`${cloudClass} absolute rounded-[100%] bg-white`}
          style={{
            width: `${width}vw`,
            height: `${height}vh`,
            left: `${left}vw`,
            top: `${top}%`,
            opacity: opacity,
            filter: blur,
            zIndex: Math.floor(opacity * 10),
            boxShadow: lightningActive
              ? "0 0 30px rgba(255, 255, 255, 0.8)"
              : "0 0 20px rgba(255, 255, 255, 0.3)",
          }}
        />,
      );
    }
    return clouds;
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-[130vh] flex-none overflow-hidden ${
        lightningActive
          ? "bg-blue-700"
          : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-900"
      }`}
    >
      {/* Earth-like ground at the top */}
      <div className="absolute top-0 left-0 w-full h-[10vh] bg-gradient-to-b from-green-700 to-blue-300 z-10" />
      {/* Dense cloud layer near the top to create takeoff effect */}
      <div className="absolute top-[5vh] left-0 w-full h-[30vh] z-15">
        <div className="cloud absolute w-[95vw] h-[20vh] bg-white/90 rounded-[100%] left-[2.5vw] top-[2vh] z-20" />
        <div className="cloud absolute w-[85vw] h-[15vh] bg-white/85 rounded-[100%] left-[7.5vw] top-[10vh] z-19" />
        <div className="cloud absolute w-[90vw] h-[18vh] bg-white/80 rounded-[100%] left-[5vw] top-[15vh] z-18" />
      </div>
      {generateClouds(40)} {/* Increased cloud count */}
      {/* Larger, more scattered foreground clouds for depth */}
      <div className="cloud cloud-middle absolute w-[80vw] h-[25vh] bg-white/75 rounded-[100%] left-[10vw] top-[40vh] z-20" />
      <div className="cloud cloud-middle absolute w-[70vw] h-[20vh] bg-white/80 rounded-[100%] right-[5vw] top-[60vh] z-20" />
      <div className="cloud absolute w-[85vw] h-[30vh] bg-white/70 rounded-[100%] left-[5vw] bottom-[15vh] z-20" />
      {/* Rocket */}
      <div
        ref={rocketRef}
        className="absolute left-1/2 -translate-x-1/2 z-30"
        style={{
          filter: lightningActive
            ? "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
            : "none",
        }}
      >
        <div className="relative w-16 h-64">
          {/* Rocket body */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-40 bg-gradient-to-b from-red-500 to-red-600 rounded-lg" />

          {/* Rocket nose */}
          <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-12 h-20 bg-gradient-to-b from-red-400 to-red-500 rounded-t-full" />

          {/* Windows */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-300 rounded-full border-2 border-gray-200" />
          <div className="absolute bottom-44 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-300 rounded-full border-2 border-gray-200" />

          {/* Fins */}
          <div className="absolute bottom-0 left-0 w-6 h-16 bg-red-600 transform -skew-x-12 origin-bottom-right" />
          <div className="absolute bottom-0 right-0 w-6 h-16 bg-red-600 transform skew-x-12 origin-bottom-left" />

          {/* Flame */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-8 h-24">
            <div className="w-full h-full bg-gradient-to-t from-transparent via-yellow-500 to-orange-500 rounded-b-3xl animate-pulse" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-4 h-3/4 bg-gradient-to-t from-transparent to-white rounded-b-3xl animate-pulse" />
          </div>
        </div>
      </div>
      {/* Lightning effect */}
      {generateLightning()}
      {/* Flash overlay for lightning */}
      {lightningActive && (
        <div className="absolute inset-0 bg-white/20 z-40 pointer-events-none" />
      )}
    </section>
  );
}
