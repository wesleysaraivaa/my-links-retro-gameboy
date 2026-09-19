import { useEffect, useCallback } from 'react';
import type { DPadDirection, ActionButton } from '../types/gameboy';
import { KEYBOARD_MAPPING } from '../types/gameboy';

interface UseGameBoyKeyboardProps {
  onDPadPress: (direction: DPadDirection) => void;
  onActionButton: (button: ActionButton) => void;
  enabled?: boolean;
}

export const useGameBoyKeyboard = ({ 
  onDPadPress, 
  onActionButton, 
  enabled = true 
}: UseGameBoyKeyboardProps) => {
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    const key = event.code as keyof typeof KEYBOARD_MAPPING;
    const mappedAction = KEYBOARD_MAPPING[key];
    
    if (!mappedAction) return;
    
    // Previne comportamento padrão do navegador
    event.preventDefault();
    
    // Determina se é D-Pad ou botão de ação
    if (['up', 'down', 'left', 'right'].includes(mappedAction)) {
      onDPadPress(mappedAction as DPadDirection);
    } else {
      onActionButton(mappedAction as ActionButton);
    }
  }, [onDPadPress, onActionButton, enabled]);

  useEffect(() => {
    if (!enabled) return;
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);

  return {
    isEnabled: enabled,
  };
};
