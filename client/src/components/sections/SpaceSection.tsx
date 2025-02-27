import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RocketSVG from "../RocketSVG";
import useParallax from "@/hooks/useParallax";

// Register plugins
gsap.registerPlugin(ScrollTrigger);

export default function SpaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { createParallaxEffect } = useParallax();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Register necessary plugins
      gsap.registerPlugin(ScrollTrigger);
      
      // Position the rocket at the top initially
      gsap.set(".rocket-space", {
        top: "0%",
        left: "50%",
        xPercent: -50,
        rotation: 0 // Initial rotation
      });
      
      // Define the slalom path points
      const slalomPath = [
        {x: 0, y: 0},     // Start at top center
        {x: 200, y: -50},  // Move right
        {x: -200, y: -100}, // Move left
        {x: 150, y: -150},  // Move right again
        {x: -150, y: -200}, // Move left again
        {x: 0, y: -250}     // End at bottom center
      ];
      
      // Create the slalom animation for the rocket
      gsap.to(".rocket-space", {
        keyframes: {
          x: slalomPath.map(point => point.x),
          y: slalomPath.map(point => point.y),
          rotation: [0, 30, -30, 30, -30, 0], // Rotate as it moves left/right
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          markers: false,
        },
        ease: "power1.inOut",
        duration: 5,
      });

      // Position clouds strategically for slalom
      const clouds = gsap.utils.toArray(".problem-cloud");
      const maxClouds = Math.min(clouds.length, 5);
      
      // Calculate positions alternating left and right with increasing depth
      for (let i = 0; i < maxClouds; i++) {
        const cloud = clouds[i];
        if (!cloud) continue;
        
        // Alternate clouds left and right with increasing y position (depth)
        const side = i % 2 === 0 ? -1 : 1;
        const offsetX = side * 150; // Left or right placement
        const offsetY = (i + 1) * 20 + "%"; // Increasing depth down the page
        
        // Position the cloud
        gsap.set(cloud, {
          x: offsetX,
          top: offsetY,
        });
        
        // Add subtle floating animation
        gsap.to(cloud, {
          x: offsetX + (side * 20), // Subtle horizontal movement
          y: "+=15",
          duration: 2 + (i * 0.5), // Different durations for varied movement
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
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
      {/* Problem clouds - positioned for slalom */}
      {problems.map((problem, index) => (
        <div
          key={index}
          className={`problem-cloud absolute px-6 py-4 rounded-[100%] flex items-center justify-center text-center font-semibold shadow-lg`}
          style={{
            width: `${Math.max(180, problem.length * 10)}px`,
            height: `${Math.max(120, problem.length * 5)}px`,
            backgroundColor: `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`,
            // Positioning handled by GSAP
            zIndex: 10,
            border: '2px solid rgba(100, 150, 255, 0.5)', // Add a subtle border
            boxShadow: '0 0 20px rgba(100, 150, 255, 0.3)' // Add a glow effect
          }}
        >
          <span className="text-blue-900 font-bold">{problem}</span>
        </div>
      ))}

      {/* Flying rocket - positioned at top by GSAP in useEffect */}
      <div className="rocket-space absolute z-50">
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
