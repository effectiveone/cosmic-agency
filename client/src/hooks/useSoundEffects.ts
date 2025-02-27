import { useRef } from 'react';
import { Howl } from 'howler';

export default function useSoundEffects() {
  const ambientSound = useRef(new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-space-ambient-2144.mp3'],
    loop: true,
    volume: 0.3,
  }));

  const launchSound = useRef(new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-fast-rocket-whoosh-1714.mp3'],
    volume: 0.5,
  }));

  const ufoSound = useRef(new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-scan-889.mp3'],
    volume: 0.4,
  }));

  const dockingSound = useRef(new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-machine-lock-and-unlock-2860.mp3'],
    volume: 0.4,
  }));

  const playAmbient = () => ambientSound.current.play();
  const playLaunch = () => launchSound.current.play();
  const playUFO = () => ufoSound.current.play();
  const playDocking = () => dockingSound.current.play();

  return {
    playAmbient,
    playLaunch,
    playUFO,
    playDocking,
  };
}
