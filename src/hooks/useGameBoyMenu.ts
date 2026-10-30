import { useState, useEffect, useCallback, useRef } from 'react';
import type { DPadDirection, ActionButton, RegisterButtonHandler } from '../types/gameboy';

export function useGameBoyMenu(
  links: Array<{ url: string }>,
  playSound: (type: 'menu' | 'select' | 'startup') => void,
  onButtonPress: RegisterButtonHandler,
  openLink: (url: string) => void
) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const openedRef = useRef(false);

  const openCurrent = useCallback(() => {
    if (openedRef.current) return;
    const item = links[selectedIndex];
    if (!item) return;
    openedRef.current = true;
    playSound('select');
    openLink(item.url);
    setTimeout(() => {
      openedRef.current = false;
    }, 300);
  }, [links, selectedIndex, playSound, openLink]);

  const handleNavigation = useCallback((direction: DPadDirection) => {
    switch (direction) {
      case 'up':
        setSelectedIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : links.length - 1;
          playSound('menu');
          return newIndex;
        });
        break;
      case 'down':
        setSelectedIndex(prev => {
          const newIndex = prev < links.length - 1 ? prev + 1 : 0;
          playSound('menu');
          return newIndex;
        });
        break;
      case 'left':
      case 'right':
        playSound('menu');
        break;
    }
  }, [links.length, playSound]);

  const handleAction = useCallback((button: ActionButton) => {
    switch (button) {
      case 'a':
      case 'start':
        openCurrent();
        break;
      case 'b':
        setSelectedIndex(prev => {
          if (prev === 0) {
            playSound('menu');
            return prev;
          }
          playSound('menu');
          return 0;
        });
        break;
      case 'select':
        setSelectedIndex(prev => {
          const next = prev + 1 >= links.length ? 0 : prev + 1;
          playSound('menu');
          return next;
        });
        break;
    }
  }, [links.length, playSound, openCurrent]);

  useEffect(() => {
    onButtonPress('navigation', handleNavigation);
    onButtonPress('action', handleAction);
  }, [handleNavigation, handleAction, onButtonPress]);

  return {
    selectedIndex,
    setSelectedIndex,
    openCurrent,
  };
}
