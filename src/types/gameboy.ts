/**
 * Tipos específicos para o Game Boy Console
 * Define as interfaces e tipos utilizados em todo o sistema
 */

// Tipos para direções do D-Pad
export type DPadDirection = 'up' | 'down' | 'left' | 'right';

// Tipos para botões de ação
export type ActionButton = 'a' | 'b' | 'select' | 'start';

// União de todos os tipos de botão
export type GameBoyButton = DPadDirection | ActionButton;

// Tipos de som disponíveis
export type SoundType = 'menu' | 'select' | 'startup';

// Tipos para registro de handlers de botões
export type ButtonPressType = 'navigation' | 'action';
export type NavigationHandler = (direction: DPadDirection) => void;
export type ActionHandler = (button: ActionButton) => void;
export type RegisterButtonHandler = (
  type: ButtonPressType,
  callback: NavigationHandler | ActionHandler
) => void;

// Interface para props do console
export interface GameBoyConsoleProps {
  children: React.ReactNode;
  onDPadPress: (direction: DPadDirection) => void;
  onActionButton: (button: ActionButton) => void;
  enableKeyboard?: boolean;
}

// Interface para configuração de botões
export interface ButtonConfig {
  id: string;
  label: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  className: string;
  icon?: string;
}

// Interface para configuração do D-Pad
export interface DPadConfig {
  directions: {
    [K in DPadDirection]: ButtonConfig;
  };
}

// Tipo para configuração dos botões de ação
export type ActionButtonsConfig = Record<ActionButton, ButtonConfig>;

// Constantes para mapeamento de teclas do teclado
export const KEYBOARD_MAPPING = {
  ArrowUp: 'up' as DPadDirection,
  ArrowDown: 'down' as DPadDirection,
  ArrowLeft: 'left' as DPadDirection,
  ArrowRight: 'right' as DPadDirection,
  KeyA: 'a' as ActionButton,
  KeyB: 'b' as ActionButton,
  KeyS: 'select' as ActionButton,
  Enter: 'start' as ActionButton,
  Space: 'start' as ActionButton,
} as const;

// Tipo para eventos de teclado
export type KeyboardEvent = keyof typeof KEYBOARD_MAPPING;
