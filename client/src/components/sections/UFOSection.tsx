import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import RocketSVG from "../RocketSVG";
import UFOSVG from "../UFOSVG";
import useSoundEffects from "@/hooks/useSoundEffects";

export default function UFOSection() {
  const sectionRef = useRef(null);
  const ufoRef = useRef(null);
  const beamRef = useRef(null);
  const rocketRef = useRef(null);
  const problemsRef = useRef(null);

  // Only use existing sound effects
  const { playUFO } = useSoundEffects();

  const [showSolutions, setShowSolutions] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(0);

  const problems = [
    "Deadline Pressure",
    "Resource Limitations",
    "Technical Debt",
    "Scope Creep",
    "Integration Issues",
  ];

  const solutions = [
    "Expert Time Management",
    "Strategic Resource Allocation",
    "Code Quality Assurance",
    "Scope Control Measures",
    "Seamless System Integration",
  ];

  useEffect(() => {
    let problemInterval;

    if (showSolutions) {
      problemInterval = setInterval(() => {
        setCurrentProblem((prev) => (prev + 1) % problems.length);
      }, 2000);
    }

    return () => clearInterval(problemInterval);
  }, [showSolutions, problems.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create particles for the UFO trail
      const createParticles = () => {
        if (!ufoRef.current) return;

        const particle = document.createElement("div");
        particle.className = "ufo-particle";
        sectionRef.current.appendChild(particle);

        const ufoRect = ufoRef.current.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();

        const x =
          ufoRect.left - sectionRect.left + Math.random() * ufoRect.width * 0.6;
        const y = ufoRect.top - sectionRect.top + ufoRect.height * 0.8;

        gsap.set(particle, {
          x,
          y,
          scale: Math.random() * 0.4 + 0.2,
          opacity: Math.random() * 0.6 + 0.4,
        });

        gsap.to(particle, {
          y: "+=50",
          opacity: 0,
          duration: 1 + Math.random(),
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          },
        });
      };

      let particleInterval;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Start animation earlier
          end: "bottom top",
          scrub: 1, // Smoother scrubbing
          onEnter: () => {
            playUFO();
            // Start creating particles
            particleInterval = setInterval(createParticles, 100);
          },
          onLeave: () => {
            clearInterval(particleInterval);
          },
          onEnterBack: () => {
            particleInterval = setInterval(createParticles, 100);
          },
          onLeaveBack: () => {
            clearInterval(particleInterval);
          },
        },
      });

      // Modify UFO entrance to fly at rocket height from left to right
      tl.fromTo(
        ufoRef.current,
        {
          x: "-20%", // Start from left side
          y: "64px", // Position at rocket's height (matching top: 64 value)
          rotation: 5,
        },
        {
          x: "120%", // End on right side
          y: "64px", // Maintain rocket's height
          rotation: -5,
          duration: 2,
          ease: "power2.inOut",
        },
      )
        .to(ufoRef.current, {
          rotation: 5,
          duration: 0.8,
          ease: "power1.inOut",
        })
        .to(ufoRef.current, {
          rotation: 0,
          duration: 0.8,
          ease: "power1.inOut",
          x: "50%", // Center for beam
        })
        // Expand beam with glow effect
        .fromTo(
          beamRef.current,
          {
            scaleY: 0,
            opacity: 0,
          },
          {
            scaleY: 1,
            opacity: 0.8,
            duration: 1.5,
            ease: "power2.out",
          },
        )
        // Highlight problems one by one
        .to(".problem", {
          opacity: 1,
          scale: 1.1,
          stagger: 0.4,
          duration: 0.5,
          color: "#ff6b6b",
        })
        // Lift the rocket
        .to(rocketRef.current, {
          y: "-=200",
          scale: 0.8,
          rotate: 15,
          duration: 2,
          ease: "power3.inOut",
          onComplete: () => setShowSolutions(true),
        })
        // UFO rotates slightly and leaves
        .to(ufoRef.current, {
          rotation: 10,
          duration: 0.8,
        })
        .to(beamRef.current, {
          opacity: 0,
          duration: 1,
        })
        .to(
          ufoRef.current,
          {
            x: "120%",
            y: "-=200",
            rotation: -10,
            duration: 3,
            ease: "power2.in",
          },
          "+=1",
        )
        .add(() => {
          clearInterval(particleInterval);
        });

      // Add a small hover animation to the UFO
      gsap.to(ufoRef.current, {
        y: "+=10",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [playUFO]); // Only depend on existing sound effects

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-indigo-900 to-black py-16"
    >
      {/* Stars background */}
      <div className="stars-container absolute inset-0">
        {Array(100)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className="star absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + "px",
                height: Math.random() * 3 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.8 + 0.2,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
              }}
            />
          ))}
      </div>

      {/* Problems cloud */}
      <div
        ref={problemsRef}
        className="problems-cloud relative mx-auto mb-32 mt-16 max-w-3xl"
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-white">
          Project Challenges
        </h2>
        <div className="problem-items flex flex-wrap justify-center gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="problem transform rounded-lg bg-gray-800 bg-opacity-60 p-4 text-lg text-gray-200 opacity-0 shadow-lg transition-all duration-300"
            >
              {problem}
            </div>
          ))}
        </div>
      </div>

      {/* UFO and beam */}
      <div className="relative mx-auto h-96 w-full">
        <div ref={ufoRef} className="ufo absolute left-0 top-0 w-48 transform">
          <UFOSVG className="h-auto w-full" />
        </div>

        <div
          ref={beamRef}
          className="beam absolute left-1/2 top-24 h-64 w-40 -translate-x-1/2 transform origin-top rounded-b-full bg-gradient-to-b from-blue-500 to-transparent opacity-0"
          style={{ filter: "blur(5px)" }}
        />

        <div
          ref={rocketRef}
          className="rocket absolute left-1/2 top-64 w-24 -translate-x-1/2 transform"
        >
          <RocketSVG className="h-auto w-full" />
        </div>
      </div>

      {/* Solutions section */}
      {showSolutions && (
        <div className="solutions-section mt-16 text-center">
          <h2 className="mb-8 text-3xl font-bold text-blue-300">
            Alien Solutions Deployed
          </h2>

          <div className="solution-display mx-auto max-w-2xl rounded-xl bg-indigo-900 bg-opacity-50 p-6 shadow-lg">
            <div className="problem-solution-pair mb-4 flex items-center justify-between">
              <div className="problem-box rounded-lg bg-red-900 bg-opacity-70 p-3 text-lg text-white">
                {problems[currentProblem]}
              </div>

              <div className="transform-arrow text-2xl text-blue-300">→</div>

              <div className="solution-box rounded-lg bg-green-800 bg-opacity-70 p-3 text-lg text-white">
                {solutions[currentProblem]}
              </div>
            </div>

            <div className="progress-bar mx-auto mt-4 h-2 w-full rounded-full bg-gray-700">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width: `${((currentProblem + 1) * 100) / problems.length}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* CSS for particles and animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.8;
          }
        }

        .ufo-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(157, 220, 255, 1) 0%,
            rgba(78, 168, 222, 0) 70%
          );
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
