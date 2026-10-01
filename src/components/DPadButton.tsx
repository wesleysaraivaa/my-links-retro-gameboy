import React from 'react';
import type { DPadDirection } from '../types/gameboy';
import { DPAD_CONFIG, CSS_CLASSES } from '../constants/gameboy';

interface DPadButtonProps {
  direction: DPadDirection;
  onClick: () => void;
  onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLButtonElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLButtonElement>) => void;
  onTouchCancel: (e: React.TouchEvent<HTMLButtonElement>) => void;
}

const DPadButton = ({
  direction,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
}: DPadButtonProps) => {
  const config = DPAD_CONFIG.directions[direction];

  return (
    <button
      id={config.id}
      className={config.className}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
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
