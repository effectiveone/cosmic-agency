import { useEffect, useRef } from "react";
import gsap from "gsap";
import RocketSVG from "../RocketSVG";
import SpaceStationSVG from "../SpaceStationSVG";
import useSoundEffects from "@/hooks/useSoundEffects";

export default function DockingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stationRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const dockingPortRef = useRef<HTMLDivElement>(null);
  const { playDocking } = useSoundEffects();

  useEffect(() => {
    // Preloading animations before scroll
    gsap.set(".docking-port", {
      opacity: 0.8,
      scale: 0.9,
    });

    gsap.set(".station-pulse", {
      scale: 1,
      opacity: 0.7,
    });

    gsap.set(".rocket-thruster", {
      opacity: 0.6,
      scale: 0.8,
    });

    // Ambient animations that run continuously
    const ambientAnimations = gsap.context(() => {
      // Station core pulsing
      gsap.to(".station-core", {
        boxShadow: "0 0 35px rgba(100, 200, 255, 0.9)",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

      // Docking port beacon
      gsap.to(".docking-port", {
        opacity: 1,
        scale: 1.05,
        boxShadow: "0 0 25px rgba(255, 200, 100, 0.9)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });

      // Station lights blinking
      gsap.utils.toArray(".station-light").forEach((light: any, i) => {
        gsap.to(light, {
          opacity: 0.2,
          duration: 0.5 + Math.random() * 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // Subtle station rotation
      gsap.to(".space-station", {
        rotation: 2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Rocket thruster pulsing
      gsap.to(".rocket-thruster", {
        opacity: 0.9,
        scale: 1.1,
        boxShadow: "0 0 20px rgba(255, 150, 50, 0.8)",
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "sine.inOut",
      });

      // Guidance beams pulsing
      gsap.to(".guidance-beam", {
        opacity: 0.9,
        width: "120%",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });

      // Station pulse wave
      gsap.to(".station-pulse", {
        scale: 1.2,
        opacity: 0,
        duration: 2.5,
        repeat: -1,
        ease: "sine.out",
      });
    });

    // Scrolling docking sequence
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          onEnter: () => {
            playDocking();
            // Create docking thrusters when animation starts
            gsap.to(".docking-thrusters", {
              opacity: 0.8,
              duration: 0.5,
              stagger: 0.2,
            });
          },
          onLeaveBack: () => {
            gsap.to(".docking-thrusters", {
              opacity: 0,
              duration: 0.3,
            });
          },
        },
      });

      // Enhanced docking sequence
      tl.to(".rocket", {
        rotation: 0,
        duration: 2,
        ease: "power2.inOut",
        onStart: () => {
          gsap.to(".approach-indicator", {
            opacity: 1,
            duration: 0.5,
          });
        },
      })
        .to(".rocket", {
          x: "+=80",
          y: "-=20",
          duration: 2,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(".approach-indicator", {
              opacity: 0,
              duration: 0.3,
            });
            gsap.to(".alignment-indicator", {
              opacity: 1,
              duration: 0.5,
            });
          },
        })
        .to(".rocket", {
          rotation: 90,
          x: "+=50",
          y: "+=10",
          duration: 2,
          ease: "power2.inOut",
        })
        .to(".rocket-thruster", {
          opacity: 0.9,
          scale: 1.2,
          boxShadow: "0 0 30px rgba(255, 100, 0, 0.9)",
          duration: 1,
          onComplete: () => {
            gsap.to(".alignment-indicator", {
              opacity: 0,
              duration: 0.3,
            });
            gsap.to(".final-approach", {
              opacity: 1,
              duration: 0.5,
            });
          },
        })
        .to(".rocket", {
          x: "+=120",
          duration: 3,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(".docking-port", {
              boxShadow: "0 0 40px rgba(100, 255, 100, 0.9)",
              borderColor: "rgba(100, 255, 100, 0.9)",
              duration: 0.5,
            });
            gsap.to(".final-approach", {
              opacity: 0,
              duration: 0.3,
            });
          },
        })
        .to(".rocket-thruster", {
          opacity: 0.2,
          scale: 0.6,
          boxShadow: "0 0 10px rgba(255, 100, 0, 0.4)",
          duration: 1,
        })
        .to(".success-message", {
          opacity: 1,
          y: -20,
          scale: 1.1,
          duration: 1,
          onComplete: () => {
            // Success animations
            gsap.to(".connection-beam", {
              opacity: 0.9,
              width: "100%",
              duration: 0.8,
            });
            gsap.to(".status-indicator", {
              backgroundColor: "rgba(100, 255, 100, 0.9)",
              boxShadow: "0 0 15px rgba(100, 255, 100, 0.9)",
              duration: 0.3,
              stagger: 0.1,
            });
          },
        })
        .to(".system-status", {
          opacity: 1,
          y: -15,
          duration: 1,
        });
    }, sectionRef);

    return () => {
      ctx.revert();
      ambientAnimations.revert();
    };
  }, [playDocking]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center overflow-hidden"
    >
      {/* Stars background */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor:
              i % 8 === 0 ? "#8CDFFF" : i % 5 === 0 ? "#FFF9C4" : "white",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            boxShadow: i % 10 === 0 ? "0 0 4px white" : "none",
          }}
        />
      ))}

      {/* Enhanced space station */}
      <div
        ref={stationRef}
        className="space-station absolute right-1/4 top-1/2 transform -translate-y-1/2"
      >
        {/* Pulse effect around station */}
        <div
          className="station-pulse absolute w-full h-full rounded-full border-2 border-blue-400 opacity-70"
          style={{
            width: "110%",
            height: "110%",
            top: "-5%",
            left: "-5%",
          }}
        />

        {/* Main station body */}
        <div className="relative">
          <SpaceStationSVG className="w-96 h-auto relative z-10" />

          {/* Enhanced central core */}
          <div
            className="station-core absolute w-16 h-16 bg-blue-500 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundImage:
                "radial-gradient(circle, rgba(100,200,255,1) 0%, rgba(0,50,200,1) 100%)",
              boxShadow: "0 0 25px rgba(100, 200, 255, 0.8)",
              zIndex: 8,
            }}
          />

          {/* Status lights */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 2 * Math.PI;
            const radius = 120;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={`light-${i}`}
                className="station-light absolute w-2 h-2 bg-blue-300 rounded-full"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  boxShadow: "0 0 5px rgba(100, 200, 255, 0.8)",
                  zIndex: 11,
                }}
              />
            );
          })}

          {/* Docking port */}
          <div
            ref={dockingPortRef}
            className="docking-port absolute w-16 h-8 bg-gray-800 rounded-lg flex items-center justify-center"
            style={{
              top: "50%",
              left: "5%",
              transform: "translate(-50%, -50%)",
              border: "2px solid rgba(255, 200, 100, 0.8)",
              boxShadow: "0 0 15px rgba(255, 200, 100, 0.6)",
              zIndex: 12,
            }}
          >
            <div className="w-8 h-3 bg-gray-600 rounded-full" />
          </div>

          {/* Guidance beams */}
          <div
            className="guidance-beam absolute h-1 bg-yellow-500 opacity-60"
            style={{
              top: "calc(50% - 12px)",
              left: "-80px",
              width: "80px",
              boxShadow: "0 0 8px rgba(255, 200, 100, 0.6)",
              zIndex: 7,
            }}
          />
          <div
            className="guidance-beam absolute h-1 bg-yellow-500 opacity-60"
            style={{
              top: "calc(50% + 12px)",
              left: "-80px",
              width: "80px",
              boxShadow: "0 0 8px rgba(255, 200, 100, 0.6)",
              zIndex: 7,
            }}
          />

          {/* System status indicators */}
          <div className="absolute bottom-0 right-0 flex space-x-2 z-20">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`status-${i}`}
                className="status-indicator w-3 h-3 rounded-full bg-yellow-500"
                style={{
                  boxShadow: "0 0 5px rgba(255, 200, 100, 0.6)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced rocket */}
      <div
        ref={rocketRef}
        className="rocket absolute left-1/4 top-1/2 transform -translate-y-1/2 -rotate-90"
      >
        <RocketSVG className="w-32 h-auto z-10" />

        {/* Rocket thruster effect */}
        <div
          className="rocket-thruster absolute"
          style={{
            width: "20px",
            height: "30px",
            bottom: "-15px",
            left: "50%",
            transform: "translateX(-50%) rotate(180deg)",
            background:
              "linear-gradient(to bottom, rgba(255,100,0,0.9) 0%, rgba(255,200,0,0.4) 70%, transparent 100%)",
            borderRadius: "0 0 50% 50%",
            boxShadow: "0 0 15px rgba(255, 100, 0, 0.7)",
            zIndex: 5,
          }}
        />

        {/* Docking thrusters */}
        <div
          className="docking-thrusters absolute w-2 h-4 opacity-0"
          style={{
            top: "10px",
            left: "-5px",
            background:
              "linear-gradient(to bottom, rgba(200,200,255,0.9) 0%, rgba(100,100,255,0.3) 100%)",
            boxShadow: "0 0 8px rgba(100, 100, 255, 0.6)",
            borderRadius: "50%",
            transform: "rotate(-90deg)",
            zIndex: 6,
          }}
        />
        <div
          className="docking-thrusters absolute w-2 h-4 opacity-0"
          style={{
            bottom: "10px",
            left: "-5px",
            background:
              "linear-gradient(to bottom, rgba(200,200,255,0.9) 0%, rgba(100,100,255,0.3) 100%)",
            boxShadow: "0 0 8px rgba(100, 100, 255, 0.6)",
            borderRadius: "50%",
            transform: "rotate(-90deg)",
            zIndex: 6,
          }}
        />
      </div>

      {/* Connection beam (appears when docked) */}
      <div
        className="connection-beam absolute h-2 bg-green-500 opacity-0"
        style={{
          top: "50%",
          left: "25%",
          width: "0%",
          boxShadow: "0 0 10px rgba(100, 255, 100, 0.7)",
          zIndex: 4,
        }}
      />

      {/* Docking status indicators */}
      <div
        className="approach-indicator absolute text-yellow-400 text-lg font-semibold opacity-0"
        style={{
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          textShadow: "0 0 10px rgba(255, 200, 0, 0.7)",
        }}
      >
        APPROACH INITIATED
      </div>

      <div
        className="alignment-indicator absolute text-blue-400 text-lg font-semibold opacity-0"
        style={{
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          textShadow: "0 0 10px rgba(100, 150, 255, 0.7)",
        }}
      >
        ALIGNMENT IN PROGRESS
      </div>

      <div
        className="final-approach absolute text-orange-400 text-lg font-semibold opacity-0"
        style={{
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          textShadow: "0 0 10px rgba(255, 150, 0, 0.7)",
        }}
      >
        FINAL APPROACH - DOCKING IMMINENT
      </div>

      {/* Success message with enhanced styling */}
      <div
        className="success-message absolute bottom-1/3 left-1/2 transform -translate-x-1/2 opacity-0 text-green-400 text-3xl font-bold"
        style={{
          textShadow: "0 0 15px rgba(100, 255, 100, 0.8)",
          letterSpacing: "0.1em",
        }}
      >
        DOCKING SUCCESSFUL
      </div>

      {/* System status message */}
      <div
        className="system-status absolute bottom-1/4 left-1/2 transform -translate-x-1/2 opacity-0 text-blue-300 text-xl"
        style={{
          textShadow: "0 0 8px rgba(100, 200, 255, 0.6)",
          fontFamily: "monospace",
        }}
      >
        SYSTEMS OPERATIONAL • POWER TRANSFER INITIATED • CONNECTION SECURE
      </div>
    </section>
  );
}
