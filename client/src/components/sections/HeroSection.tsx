import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import RocketSVG from "../RocketSVG";
import useSoundEffects from "@/hooks/useSoundEffects";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const rocketRef = useRef(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const { playLaunch } = useSoundEffects();

  // Renderowanie małych chmur
  const renderSmallClouds = () => {
    return (
      <div className="absolute bottom-[10vh] left-0 w-full h-[10vh]">
        <div className="cloud-small w-16 h-16 bg-white rounded-full opacity-50 absolute left-1/4 bottom-2"></div>
        <div className="cloud-small w-24 h-24 bg-white rounded-full opacity-50 absolute right-1/4 bottom-4"></div>
        <div className="cloud-small w-20 h-20 bg-white rounded-full opacity-60 absolute left-1/3 bottom-1"></div>
        <div className="cloud-small w-14 h-14 bg-white rounded-full opacity-40 absolute right-1/3 bottom-3"></div>
      </div>
    );
  };

  // Renderowanie dymu silnika rakiety
  const renderEngineSmoke = () => {
    return (
      <div
        className={`absolute bottom-[14vh] left-1/2 transform -translate-x-1/2 z-10 ${isLaunching ? "opacity-100" : "opacity-0"}`}
      >
        <div className="engine-flame w-10 h-32 bg-gradient-to-t from-orange-600 via-yellow-500 to-transparent rounded-full"></div>
        <div className="engine-smoke-particles flex justify-center">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="smoke-particle absolute rounded-full bg-white opacity-70"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100 - 50}px`,
                bottom: `${Math.random() * 20}px`,
                animationDelay: `${Math.random() * 2}s`,
                animation: "smokeRise 3s infinite",
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  // Renderowanie gwiazd na niebie
  const renderStars = () => {
    return (
      <div className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 4 + 2}s infinite`,
            }}
          ></div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // Dodanie CSS dla animacji
    const style = document.createElement("style");
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
      @keyframes smokeRise {
        0% { transform: translateY(0) scale(1); opacity: 0.7; }
        100% { transform: translateY(-100px) scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sekwencja animacji
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          onEnter: () => {
            playLaunch();
            setIsLaunching(true);
          },
          onLeaveBack: () => setIsLaunching(false),
        },
      });

      // Animacja odliczania
      tl.from(".countdown", {
        opacity: 0,
        scale: 2,
        duration: 1,
      })
        .to(".countdown", {
          opacity: 0,
          y: -50,
          duration: 0.5,
        })

        // Animacja platformy startowej
        .from(".launch-pad", {
          y: 50,
          opacity: 0,
          duration: 0.5,
        })

        // Animacja rakiety
        .from(".rocket", {
          y: 100,
          opacity: 0,
          duration: 0.7,
        })

        // Animacja drżenia przed startem
        .to(".rocket", {
          y: -5,
          x: 2,
          duration: 0.3,
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut",
        })

        // Start rakiety
        .to(
          ".rocket",
          {
            y: -500,
            duration: 2,
            ease: "power2.in",
          },
          "launch",
        )

        // Animacja chmur podczas startu
        .to(
          ".cloud-small",
          {
            x: (i, el) => (el.classList.contains("left") ? -100 : 100),
            opacity: 0,
            duration: 1,
            stagger: 0.1,
          },
          "launch",
        )

        // Animacja blasku przy starcie
        .from(
          ".launch-glow",
          {
            opacity: 0,
            scale: 0,
            duration: 0.4,
          },
          "launch",
        )
        .to(
          ".launch-glow",
          {
            opacity: 0,
            scale: 2,
            duration: 1,
          },
          "launch+=0.4",
        );

      // Animacja drżenia ekranu podczas startu
      if (rocketRef.current) {
        tl.to(
          sectionRef.current,
          {
            x: 5,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            ease: "none",
          },
          "launch",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex-none w-screen h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black overflow-hidden"
    >
      {/* Gwiazdy na niebie */}
      {renderStars()}

      {/* Ziemia/podłoże */}
      <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-green-900 to-green-700 z-10" />

      {/* Platforma startowa */}
      <div className="launch-pad absolute bottom-[19vh] left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gray-800 rounded-lg z-20"></div>
      <div className="launch-pad-poles flex absolute bottom-[15vh] left-1/2 transform -translate-x-1/2 w-32 z-15">
        <div className="w-2 h-16 bg-gray-600 mx-2"></div>
        <div className="w-2 h-16 bg-gray-600 mx-auto"></div>
        <div className="w-2 h-16 bg-gray-600 mx-2"></div>
      </div>

      {/* Małe chmury przy ziemi */}
      {renderSmallClouds()}

      {/* Dym silnika rakiety */}
      {renderEngineSmoke()}

      {/* Odliczanie */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="countdown text-8xl font-bold text-white tracking-wider text-center">
          3...2...1...
          <span className="block text-4xl mt-4 text-yellow-400">LIFTOFF!</span>
        </div>
      </div>

      {/* Rakieta */}
      <div
        ref={rocketRef}
        className="rocket absolute bottom-[21vh] left-1/2 transform -translate-x-1/2 z-30"
      >
        <RocketSVG className="w-32 h-auto" />
      </div>

      {/* Efekt blasku przy starcie */}
      <div className="launch-glow absolute bottom-[15vh] left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-orange-500/40 blur-xl z-5"></div>

      {/* Gradient na dole */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-orange-500/30 to-transparent" />

      {/* Panel kontrolny */}
      <div className="absolute bottom-4 right-4 bg-gray-800/80 p-2 rounded text-green-400 text-xs z-50 font-mono">
        <div>SYSTEM: NOMINAL</div>
        <div>THRUST: {isLaunching ? "100%" : "0%"}</div>
        <div>ALTITUDE: {isLaunching ? "INCREASING" : "0m"}</div>
      </div>
    </section>
  );
}
