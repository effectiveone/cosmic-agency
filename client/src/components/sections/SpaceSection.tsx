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
      // Register ScrollTrigger plugin if it's imported
      if (gsap.ScrollTrigger) gsap.registerPlugin(gsap.ScrollTrigger);

      // Dynamic slalom rocket animation based on scroll and path
      if (pathRef.current) {
        gsap.to(".rocket-space", {
          motionPath: {
            path: pathRef.current,
            autoRotate: true, // Automatically rotate the rocket based on the path
            align: "center",
            alignOrigin: [0.5, 0.5], // Center the rocket on the path
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            markers: false,
          },
          ease: "power1.inOut",
        });
      }

      // Reduce number of problem clouds to 5 max
      const clouds = gsap.utils.toArray(".problem-cloud");
      const maxClouds = Math.min(clouds.length, 5);

      // Position clouds more strategically for slalom
      for (let i = 0; i < maxClouds; i++) {
        const cloud = clouds[i];
        if (!cloud) continue;

        // Alternating left and right
        const xPos = i % 2 === 0 ? -150 : 150;
        const yOffset = i * 20 + "%";

        gsap.set(cloud, {
          x: xPos,
          top: yOffset,
        });

        // Subtle movement for the clouds to simulate slalom
        gsap.to(cloud, {
          x: xPos + (i % 2 === 0 ? 30 : -30),
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Animate clouds moving in a slalom motion
        gsap.to(cloud, {
          x: `+=${i % 2 === 0 ? 80 : -80}`,
          y: `+=${i % 2 === 0 ? 10 : -10}`,
          repeat: -1,
          yoyo: true,
          duration: 3,
          ease: "power1.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const problems = [
    "Cross-Browser Compatibility",
    "Mobile Responsiveness",
    "Page Load Speed",
    "SEO Optimization",
    "Accessibility",
    "Browser Caching",
    "JavaScript Errors",
    "Security Vulnerabilities",
    "CSS Specificity",
    "Browser Rendering",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[150vh] bg-gradient-to-b from-blue-900 to-black flex items-center justify-center overflow-hidden"
    >
      {/* Problem clouds - show only first 5 */}
      {problems.slice(0, 5).map((problem, index) => (
        <div
          key={index}
          className={`problem-cloud absolute px-6 py-4 rounded-[100%] flex items-center justify-center text-center font-semibold shadow-lg`}
          style={{
            width: `${Math.max(180, problem.length * 10)}px`,
            height: `${Math.max(120, problem.length * 5)}px`,
            backgroundColor: `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`,
            // Positioning handled by GSAP
            zIndex: 10,
          }}
        >
          <span className="text-blue-900">{problem}</span>
        </div>
      ))}

      {/* SVG Path for rocket animation */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <path
          ref={pathRef}
          d="M0,50 C150,150 300,150 450,50 C600, -50 750, 150 900, 50"
          fill="none"
          stroke="red"
          strokeWidth="3"
          strokeDasharray="5,5"
          className="path-guide"
        />
      </svg>

      {/* Flying rocket */}
      <div className="rocket-space absolute left-[50px] top-[100px] z-50">
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
