
import React from 'react';
import type { ActionButton } from '../types/gameboy';
import { ACTION_BUTTONS_CONFIG, CSS_CLASSES } from '../constants/gameboy';

interface GameBoyButtonProps {
  button: ActionButton;
  onClick: () => void;
  onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  showLabel?: boolean;
}

const GameBoyButton = ({
  button,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  className,
  showLabel = true,
}: GameBoyButtonProps) => {
  const config = ACTION_BUTTONS_CONFIG[button];
  const isPillButton = button === 'select' || button === 'start';
  
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        id={config.id}
        className={className || config.className}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        aria-label={`Botão ${config.label}`}
        type="button"
      />
      {showLabel && (
        <span 
          className={isPillButton ? CSS_CLASSES.buttonLabelSmall : CSS_CLASSES.buttonLabel}
          aria-hidden="true"
        >
          {config.label}
        </span>
      )}
    </div>
  );
};

export default GameBoyButton;
