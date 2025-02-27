
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  x?: number;
  y?: number;
  rotation?: number;
  duration?: number;
}

export default function useParallax() {
  const createParallaxEffect = (
    element: HTMLElement,
    options: ParallaxOptions = {}
  ) => {
    const { x = 0, y = 0, rotation = 0, duration = 1 } = options;

    return gsap.to(element, {
      x,
      y,
      rotation,
      duration,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  };

  return { createParallaxEffect };
}
