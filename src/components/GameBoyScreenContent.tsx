

import { useState } from "react";
import {
  Github,
  Linkedin,
  Coffee,
  Instagram,
  Code,
  Mail,
  Music,
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
    { icon: Code, ...SCREEN_LINKS_BASE[4] },
    { icon: Music, ...SCREEN_LINKS_BASE[5] },
    { icon: Mail, ...SCREEN_LINKS_BASE[6] },
  ];

  const { selectedIndex, setSelectedIndex } = useGameBoyMenu(
    links,
    playSound,
    onButtonPress
  );

  const handleToggleMusic = () => {
    if (isMuted) {
      unmuteBackgroundMusic();
    } else {
      muteBackgroundMusic();
    }
    setIsMuted(!isMuted);
  };

  const handleLinkClick = (url: string) => {
    try {
      // Verifica se a URL é válida
      if (!url || url === '#') {
        console.warn('Link inválido ou em construção');
        return;
      }
      
      // Abre o link em nova aba
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      
      // Verifica se a janela foi aberta com sucesso
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.warn('Falha ao abrir link. Verifique se o popup está bloqueado.');
        // Fallback: tenta abrir na mesma janela
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erro ao abrir link:', error);
    }
  };
  return (
    <div className="w-full h-full text-gb-dark-green font-gameboy text-xs leading-tight p-2 relative overflow-hidden">
      <GameBoyHeader
        isMusicPlaying={!isMuted}
        onToggleMusic={handleToggleMusic}
      />
      <GameBoyMenu
        links={links}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        playSound={playSound}
        onLinkClick={handleLinkClick}
      />
      <BlinkingCursor />
    </div>
  );
};

export default GameBoyScreenContent;
