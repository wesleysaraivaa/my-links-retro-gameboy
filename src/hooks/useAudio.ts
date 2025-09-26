import { useCallback, useRef } from "react";
import type { SoundType } from "../types/gameboy";

// Instâncias compartilhadas para evitar múltiplos players simultâneos
let sharedAudioContext: AudioContext | null = null;
let sharedBackgroundAudio: HTMLAudioElement | null = null;

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!sharedAudioContext) {
      sharedAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    audioContextRef.current = sharedAudioContext;
    return sharedAudioContext;
  }, []);

  // Simula efeitos sonoros usando Web Audio API
  const playBeep = useCallback(
    (
      frequency: number,
      duration: number,
      type: OscillatorType = "triangle"
    ) => {
      const audioContext = initAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    },
    [initAudioContext]
  );

  const playSound = useCallback(
    (soundType: SoundType) => {
      try {
        switch (soundType) {
          case "menu":
            playBeep(600, 0.07, "triangle");
            break;
          case "select":
            playBeep(700, 0.07, "triangle");
            setTimeout(() => playBeep(900, 0.07, "triangle"), 80);
            break;
          case "startup":
            playBeep(440, 0.12, "triangle"); // A
            setTimeout(() => playBeep(554, 0.12, "triangle"), 180); // C#
            setTimeout(() => playBeep(659, 0.15, "triangle"), 360); // E
            break;
        }
      } catch (error) {
        console.warn("Audio não suportado ou bloqueado pelo navegador:", error);
      }
    },
    [playBeep]
  );

  // --- Música de fundo ---
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);

  const playBackgroundMusic = useCallback(() => {
    if (!sharedBackgroundAudio) {
      const audio = new Audio("/sounds/sakura-lofi-ambient-lofi-music-340018.mp3");
      audio.loop = true;
      audio.volume = 0.1; // volume suave
      sharedBackgroundAudio = audio;
    }
    backgroundAudioRef.current = sharedBackgroundAudio;

    const tryPlay = () => {
      return sharedBackgroundAudio!.play();
    };

    const setupUserGestureResume = () => {
      const resume = () => {
        tryPlay().finally(() => {
          window.removeEventListener('click', resume);
          window.removeEventListener('keydown', resume);
        });
      };
      window.addEventListener('click', resume, { once: true });
      window.addEventListener('keydown', resume, { once: true });
    };

    tryPlay().catch(() => {
      setupUserGestureResume();
    });
  }, []);

  const stopBackgroundMusic = useCallback(() => {
    if (sharedBackgroundAudio) {
      sharedBackgroundAudio.pause();
      sharedBackgroundAudio.currentTime = 0;
    }
  }, []);

  const muteBackgroundMusic = useCallback(() => {
    if (sharedBackgroundAudio) {
      sharedBackgroundAudio.muted = true;
    }
  }, []);

  const unmuteBackgroundMusic = useCallback(() => {
    if (sharedBackgroundAudio) {
      sharedBackgroundAudio.muted = false;
    }
  }, []);

  const isBackgroundMusicMuted = useCallback(() => {
    return !!sharedBackgroundAudio?.muted;
  }, []);

  return { playSound, playBackgroundMusic, stopBackgroundMusic, muteBackgroundMusic, unmuteBackgroundMusic, isBackgroundMusicMuted };
};
