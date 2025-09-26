

import { useCallback } from 'react';
import type { DPadDirection, ActionButton } from '../types/gameboy';
import { ANIMATION_CONFIG } from '../constants/gameboy';

interface UseGameBoyControlsProps {
  onDPadPress: (direction: DPadDirection) => void;
  onActionButton: (button: ActionButton) => void;
}

export const useGameBoyControls = ({ onDPadPress, onActionButton }: UseGameBoyControlsProps) => {
  
  // Handler genérico para animação de botões
  const handleButtonAnimation = useCallback((event: React.MouseEvent<HTMLButtonElement>, animationClass: string) => {
    const target = event.currentTarget;
    target.classList.add(animationClass);
  }, []);

  const handleButtonAnimationEnd = useCallback((event: React.MouseEvent<HTMLButtonElement>, animationClass: string) => {
    const target = event.currentTarget;
    target.classList.remove(animationClass);
  }, []);

  // Handlers específicos para D-Pad
  const handleDPadPress = useCallback((direction: DPadDirection) => {
    onDPadPress(direction);
  }, [onDPadPress]);

  // Handlers específicos para botões de ação
  const handleActionButtonPress = useCallback((button: ActionButton) => {
    onActionButton(button);
  }, [onActionButton]);

  // Handlers para eventos de mouse dos botões D-Pad
  const createDPadHandlers = useCallback((direction: DPadDirection) => ({
    onClick: () => handleDPadPress(direction),
    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => 
      handleButtonAnimation(e, ANIMATION_CONFIG.buttonPress),
    onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => 
      handleButtonAnimationEnd(e, ANIMATION_CONFIG.buttonPress),
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => 
      handleButtonAnimationEnd(e, ANIMATION_CONFIG.buttonPress),
  }), [handleDPadPress, handleButtonAnimation, handleButtonAnimationEnd]);

  // Handlers para eventos de mouse dos botões A/B
  const createActionButtonHandlers = useCallback((button: ActionButton) => ({
    onClick: () => handleActionButtonPress(button),
    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
      const animationClass = button === 'a' || button === 'b' 
        ? ANIMATION_CONFIG.buttonPressed 
        : ANIMATION_CONFIG.pillPressed;
      handleButtonAnimation(e, animationClass);
    },
    onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => {
      const animationClass = button === 'a' || button === 'b' 
        ? ANIMATION_CONFIG.buttonPressed 
        : ANIMATION_CONFIG.pillPressed;
      handleButtonAnimationEnd(e, animationClass);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      const animationClass = button === 'a' || button === 'b' 
        ? ANIMATION_CONFIG.buttonPressed 
        : ANIMATION_CONFIG.pillPressed;
      handleButtonAnimationEnd(e, animationClass);
    },
  }), [handleActionButtonPress, handleButtonAnimation, handleButtonAnimationEnd]);

  return {
    createDPadHandlers,
    createActionButtonHandlers,
  };
};
