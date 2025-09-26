import React from 'react';
import type { DPadDirection } from '../types/gameboy';
import { DPAD_CONFIG, CSS_CLASSES } from '../constants/gameboy';

interface DPadButtonProps {
  direction: DPadDirection;
  onClick: () => void;
  onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DPadButton = ({
  direction,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
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
