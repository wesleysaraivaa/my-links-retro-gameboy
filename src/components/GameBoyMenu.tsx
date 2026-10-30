import type { ComponentType } from 'react';
import type { SoundType } from '../types/gameboy';
import { MENU_TITLE } from '../constants/gameboy';

interface GameBoyMenuProps {
  links: Array<{
    icon: ComponentType<{ size?: string | number }>;
    label: string;
    url: string;
  }>;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  playSound: (sound: SoundType) => void;
  onLinkClick?: (url: string) => void;
}

const GameBoyMenu = ({
  links,
  selectedIndex,
  setSelectedIndex,
  playSound,
}: GameBoyMenuProps) => (
  <div
    className="h-[calc(100%-40px)] flex flex-col"
    role="listbox"
    aria-label="Menu de links do Game Boy"
  >
    <div className="text-[10px] sm:text-xs mb-1.5 sm:mb-2 text-center font-bold tracking-[0.15em] uppercase opacity-90">
      ▸ {MENU_TITLE} ◂
    </div>
    <div
      className="flex-1 flex flex-col gap-0 overflow-y-auto scrollbar-none"
      style={{ scrollbarWidth: 'none' }}
    >
      {links.map((link, index) => {
        const Icon = link.icon;
        const isSelected = selectedIndex === index;
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            role="option"
            aria-selected={isSelected ? 'true' : 'false'}
            tabIndex={-1}
            data-index={index}
            className={`group relative flex items-center gap-1 sm:gap-1.5 px-0.5 sm:px-1 py-[3px] sm:py-1 cursor-pointer select-none transition-colors duration-100 outline-none no-underline ${
              isSelected
                ? 'bg-gb-dark-green text-gb-green'
                : 'text-gb-dark-green hover:bg-gb-dark-green/10 active:bg-gb-dark-green/20'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(index);
              playSound('select');
            }}
            onMouseEnter={() => {
              if (selectedIndex !== index) {
                setSelectedIndex(index);
                playSound('menu');
              }
            }}
          >
            <span className="w-3 sm:w-3.5 flex items-center justify-center flex-shrink-0 font-bold text-[10px] sm:text-xs leading-none">
              {isSelected && <span className="animate-blink">▶</span>}
              {!isSelected && <span className="opacity-0">▶</span>}
            </span>
            <span
              className={`w-3.5 sm:w-4 flex items-center justify-center flex-shrink-0 ${
                isSelected ? 'text-gb-green' : 'text-gb-dark-green'
              }`}
              aria-hidden="true"
            >
              <Icon size={12} />
            </span>
            <span
              className={`flex-1 text-left font-bold tracking-[0.08em] uppercase text-[10px] sm:text-[11px] leading-tight ${
                isSelected ? 'animate-cursor-pulse' : ''
              }`}
            >
              {link.label}
            </span>
            <span
              className={`w-2 flex-shrink-0 text-[8px] sm:text-[10px] leading-none ${
                isSelected ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            >
              ◂
            </span>
          </a>
        );
      })}
    </div>
  </div>
);

export default GameBoyMenu;
