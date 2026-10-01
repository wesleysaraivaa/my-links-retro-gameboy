import { useCallback } from 'react';
import type { DPadDirection, ActionButton } from '../types/gameboy';
import { ANIMATION_CONFIG } from '../constants/gameboy';

type AnyButtonEvent =
  | React.MouseEvent<HTMLButtonElement>
  | React.TouchEvent<HTMLButtonElement>;

interface UseGameBoyControlsProps {
  onDPadPress: (direction: DPadDirection) => void;
  onActionButton: (button: ActionButton) => void;
}

export const useGameBoyControls = ({ onDPadPress, onActionButton }: UseGameBoyControlsProps) => {

  const handleButtonAnimation = useCallback((event: AnyButtonEvent, animationClass: string) => {
    const target = event.currentTarget;
    target.classList.add(animationClass);
  }, []);

  const handleButtonAnimationEnd = useCallback((event: AnyButtonEvent, animationClass: string) => {
    const target = event.currentTarget;
    target.classList.remove(animationClass);
  }, []);

  const handleDPadPress = useCallback((direction: DPadDirection) => {
    onDPadPress(direction);
  }, [onDPadPress]);

  const handleActionButtonPress = useCallback((button: ActionButton) => {
    onActionButton(button);
  }, [onActionButton]);

  const preventTouchDefault = useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }, []);

  const createDPadHandlers = useCallback((direction: DPadDirection) => {
    const press = () => handleDPadPress(direction);
    const animStart = (e: AnyButtonEvent) =>
      handleButtonAnimation(e, ANIMATION_CONFIG.buttonPress);
    const animEnd = (e: AnyButtonEvent) =>
      handleButtonAnimationEnd(e, ANIMATION_CONFIG.buttonPress);

    return {
      onClick: press,
      onMouseDown: animStart,
      onMouseUp: animEnd,
      onMouseLeave: animEnd,
      onTouchStart: (e: React.TouchEvent<HTMLButtonElement>) => {
        preventTouchDefault(e);
        animStart(e);
        press();
      },
      onTouchEnd: (e: React.TouchEvent<HTMLButtonElement>) => {
        preventTouchDefault(e);
        animEnd(e);
      },
      onTouchCancel: (e: React.TouchEvent<HTMLButtonElement>) => {
        preventTouchDefault(e);
        animEnd(e);
      },
    };
  }, [handleDPadPress, handleButtonAnimation, handleButtonAnimationEnd, preventTouchDefault]);

  const createActionButtonHandlers = useCallback((button: ActionButton) => {
    const press = () => handleActionButtonPress(button);
    const animationClass = button === 'a' || button === 'b'
      ? ANIMATION_CONFIG.buttonPressed
      : ANIMATION_CONFIG.pillPressed;
    const animStart = (e: AnyButtonEvent) =>
      handleButtonAnimation(e, animationClass);
    const animEnd = (e: AnyButtonEvent) =>
      handleButtonAnimationEnd(e, animationClass);

    return {
      onClick: press,
      onMouseDown: animStart,
      onMouseUp: animEnd,
      onMouseLeave: animEnd,
      onTouchStart: (e: React.TouchEvent<HTMLButtonElement>) => {
        preventTouchDefault(e);
        animStart(e);
        press();
      },
      onTouchEnd: (e: React.TouchEvent<HTMLButtonElement>) => {
        preventTouchDefault(e);
        animEnd(e);
      },
      onTouchCancel: (e: React.TouchEvent<HTMLButtonElement>) => {
        preventTouchDefault(e);
        animEnd(e);
      },
    };
  }, [handleActionButtonPress, handleButtonAnimation, handleButtonAnimationEnd, preventTouchDefault]);

  return {
    createDPadHandlers,
    createActionButtonHandlers,
  };
};
