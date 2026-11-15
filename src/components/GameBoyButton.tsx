import React from 'react';
import type { ActionButton } from '../types/gameboy';
import { ACTION_BUTTONS_CONFIG, CSS_CLASSES } from '../constants/gameboy';

interface GameBoyButtonProps {
  button: ActionButton;
  onClick: () => void;
  onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerLeave: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerCancel: (e: React.PointerEvent<HTMLButtonElement>) => void;
  className?: string;
  showLabel?: boolean;
}

const GameBoyButton = ({
  button,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
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
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onPointerCancel={onPointerCancel}
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
