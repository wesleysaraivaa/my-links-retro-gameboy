import React from 'react';
import type { DPadDirection } from '../types/gameboy';
import { DPAD_CONFIG, CSS_CLASSES } from '../constants/gameboy';

interface DPadButtonProps {
  direction: DPadDirection;
  onClick: () => void;
  onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerLeave: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerCancel: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

const DPadButton = ({
  direction,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
}: DPadButtonProps) => {
  const config = DPAD_CONFIG.directions[direction];

  return (
    <button
      id={config.id}
      className={config.className}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
      aria-label={`Direção ${direction}`}
      type="button"
    >
      <div className={CSS_CLASSES.dpadIcon}>
        {config.label}
      </div>
    </button>
  );
};

export default DPadButton;
