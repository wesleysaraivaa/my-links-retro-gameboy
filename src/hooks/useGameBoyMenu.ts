import { useState, useEffect, useCallback, useRef } from 'react';
import type { DPadDirection, ActionButton, RegisterButtonHandler } from '../types/gameboy';

type OpenMode = 'external' | 'internal';

export function useGameBoyMenu(
  links: Array<{ url: string; internal?: boolean }>,
  playSound: (type: 'menu' | 'select' | 'startup') => void,
  onButtonPress: RegisterButtonHandler,
  openLink: (url: string) => void,
  onSelectInternal?: (index: number) => void,
  onBack?: () => void
) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const openedRef = useRef(false);

  const openCurrent = useCallback(() => {
    if (openedRef.current) return;
    const item = links[selectedIndex];
    if (!item) return;
    const mode: OpenMode = item.internal ? 'internal' : 'external';
    openedRef.current = true;
    playSound('select');
    if (mode === 'internal') {
      if (onSelectInternal) onSelectInternal(selectedIndex);
    } else {
      openLink(item.url);
    }
    setTimeout(() => {
      openedRef.current = false;
    }, 300);
  }, [links, selectedIndex, playSound, onSelectInternal, openLink]);

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
        if (onBack) {
          onBack();
          playSound('menu');
          return;
        }
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
  }, [links.length, playSound, openCurrent, onBack]);

  useEffect(() => {
    onButtonPress('navigation', handleNavigation);
    onButtonPress('action', handleAction);
  }, [handleNavigation, handleAction, onButtonPress]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleNavigation('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleNavigation('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleNavigation('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNavigation('right');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleAction('a');
          break;
        case 'Escape':
          e.preventDefault();
          handleAction('b');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigation, handleAction]);

  return {
    selectedIndex,
    setSelectedIndex,
    openCurrent,
  };
}