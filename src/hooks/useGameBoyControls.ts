import { useCallback } from 'react';
import type { DPadDirection, ActionButton } from '../types/gameboy';
import { ANIMATION_CONFIG } from '../constants/gameboy';

type ButtonEvent =
  | React.PointerEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLButtonElement>;

interface UseGameBoyControlsProps {
  onDPadPress: (direction: DPadDirection) => void;
  onActionButton: (button: ActionButton) => void;
}

export const useGameBoyControls = ({ onDPadPress, onActionButton }: UseGameBoyControlsProps) => {

  // classList não aceita string com espaços, então cada classe é aplicada individualmente
  const toggleAnimationClass = useCallback(
    (element: HTMLElement, classNames: string, add: boolean) => {
      classNames
        .split(' ')
        .filter(Boolean)
        .forEach((className) => element.classList.toggle(className, add));
    },
    []
  );

  const createDPadHandlers = useCallback((direction: DPadDirection) => {
    const animStart = (e: ButtonEvent) =>
      toggleAnimationClass(e.currentTarget, ANIMATION_CONFIG.buttonPress, true);
    const animEnd = (e: ButtonEvent) =>
      toggleAnimationClass(e.currentTarget, ANIMATION_CONFIG.buttonPress, false);

    return {
      onClick: () => onDPadPress(direction),
      onPointerDown: animStart,
      onPointerUp: animEnd,
      onPointerLeave: animEnd,
      onPointerCancel: animEnd,
    };
  }, [onDPadPress, toggleAnimationClass]);

  const createActionButtonHandlers = useCallback((button: ActionButton) => {
    const animationClass = button === 'a' || button === 'b'
      ? ANIMATION_CONFIG.buttonPressed
      : ANIMATION_CONFIG.pillPressed;

    const animStart = (e: ButtonEvent) =>
      toggleAnimationClass(e.currentTarget, animationClass, true);
    const animEnd = (e: ButtonEvent) =>
      toggleAnimationClass(e.currentTarget, animationClass, false);

    return {
      onClick: () => onActionButton(button),
      onPointerDown: animStart,
      onPointerUp: animEnd,
      onPointerLeave: animEnd,
      onPointerCancel: animEnd,
    };
  }, [onActionButton, toggleAnimationClass]);

  return {
    createDPadHandlers,
    createActionButtonHandlers,
  };
};
