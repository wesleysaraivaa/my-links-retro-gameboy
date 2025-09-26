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
  onLinkClick: (url: string) => void;
}

const GameBoyMenu = ({ links, selectedIndex, setSelectedIndex, playSound, onLinkClick }: GameBoyMenuProps) => (
  <div className="h-[calc(100%-40px)] flex flex-col" role="menu" aria-label="Menu de links">
    <div className="text-sm mb-2 text-center font-bold"> {MENU_TITLE}
    </div>
    <div className="flex-1 flex flex-col gap-0.5">
      {links.map((link, index) => {
        const Icon = link.icon;
        const isSelected = selectedIndex === index;
        return (
          <div
            key={index}
            role="menuitem"
            tabIndex={0}
            aria-label={`${link.label} - ${isSelected ? 'selecionado' : 'não selecionado'}`}
            aria-current={isSelected ? 'true' : 'false'}
            className={`px-1 py-0.5 cursor-pointer transition-all duration-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-gb-green ${
              isSelected 
                ? 'bg-gb-dark-green text-gb-green' 
                : 'hover:bg-gb-dark-green/20'
            }`}
            onClick={() => {
              setSelectedIndex(index);
              playSound('select');
              onLinkClick(link.url);
            }}
            onMouseEnter={() => {
              setSelectedIndex(index);
              playSound('menu');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedIndex(index);
                playSound('select');
                onLinkClick(link.url);
              }
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 flex items-center justify-center" aria-hidden="true">
                <Icon size={14} />
              </div>
              <div className="text-xs flex-1 text-left">
                {isSelected ? '► ' : '  '}{link.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default GameBoyMenu; 