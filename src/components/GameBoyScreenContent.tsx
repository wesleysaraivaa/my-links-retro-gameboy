import { useState, useCallback } from "react";
import {
  Github,
  Linkedin,
  Coffee,
  Instagram,
  Music,
  Mail,
  Code,
} from "lucide-react";
import { useAudio } from "../hooks/useAudio";
import { useGameBoyMenu } from "../hooks/useGameBoyMenu";
import type { RegisterButtonHandler } from "../types/gameboy";
import { SCREEN_LINKS_BASE } from "../constants/gameboy";
import GameBoyHeader from "./GameBoyHeader";
import GameBoyMenu from "./GameBoyMenu";
import BlinkingCursor from "./BlinkingCursor";

interface GameBoyScreenContentProps {
  onButtonPress: RegisterButtonHandler;
}

const GameBoyScreenContent = ({ onButtonPress }: GameBoyScreenContentProps) => {
  const {
    playSound,
    muteBackgroundMusic,
    unmuteBackgroundMusic,
    isBackgroundMusicMuted,
  } = useAudio();
  const [isMuted, setIsMuted] = useState(isBackgroundMusicMuted());

  const links = [
    { icon: Github, ...SCREEN_LINKS_BASE[0] },
    { icon: Linkedin, ...SCREEN_LINKS_BASE[1] },
    { icon: Coffee, ...SCREEN_LINKS_BASE[2] },
    { icon: Instagram, ...SCREEN_LINKS_BASE[3] },
    { icon: Music, ...SCREEN_LINKS_BASE[4] },
    { icon: Mail, ...SCREEN_LINKS_BASE[5] },
    { icon: Code, ...SCREEN_LINKS_BASE[6] },
  ];

  const handleLinkClick = useCallback((url: string) => {
    try {
      if (!url || url === '#') {
        console.warn('Link inválido ou em construção');
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Erro ao abrir link:', error);
    }
  }, []);

  const { selectedIndex, setSelectedIndex } = useGameBoyMenu(
    links,
    playSound,
    onButtonPress,
    handleLinkClick
  );

  const handleToggleMusic = () => {
    if (isMuted) {
      unmuteBackgroundMusic();
    } else {
      muteBackgroundMusic();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full h-full text-gb-dark-green font-gameboy text-xs leading-tight p-2 relative overflow-hidden">
      <GameBoyHeader
        isMusicPlaying={!isMuted}
        onToggleMusic={handleToggleMusic}
      />
      <div className="h-[calc(100%-40px)] relative">
        <GameBoyMenu
          links={links}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          playSound={playSound}
          onLinkClick={handleLinkClick}
        />
      </div>
      <BlinkingCursor />
    </div>
  );
};

export default GameBoyScreenContent;
