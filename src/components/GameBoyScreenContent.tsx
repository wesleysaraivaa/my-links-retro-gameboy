import { useState, useCallback } from "react";
import {
  Github,
  Linkedin,
  Coffee,
  Instagram,
  Code,
  Mail,
  Music,
  User,
} from "lucide-react";
import { useAudio } from "../hooks/useAudio";
import { useGameBoyMenu } from "../hooks/useGameBoyMenu";
import type { RegisterButtonHandler } from "../types/gameboy";
import { SCREEN_LINKS_BASE } from "../constants/gameboy";
import GameBoyHeader from "./GameBoyHeader";
import GameBoyMenu from "./GameBoyMenu";
import BlinkingCursor from "./BlinkingCursor";
import ProfileScreen from "./ProfileScreen";

interface GameBoyScreenContentProps {
  onButtonPress: RegisterButtonHandler;
}

type ActiveScreen = 'menu' | 'profile';

const SCREEN_PROFILE_INDEX = 0;

const GameBoyScreenContent = ({ onButtonPress }: GameBoyScreenContentProps) => {
  const {
    playSound,
    muteBackgroundMusic,
    unmuteBackgroundMusic,
    isBackgroundMusicMuted,
  } = useAudio();
  const [isMuted, setIsMuted] = useState(isBackgroundMusicMuted());
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('menu');
  const [screenKey, setScreenKey] = useState(0);

  const links = [
    { icon: User, label: 'PROFILE', url: '', internal: true },
    { icon: Github, ...SCREEN_LINKS_BASE[0] },
    { icon: Linkedin, ...SCREEN_LINKS_BASE[1] },
    { icon: Coffee, ...SCREEN_LINKS_BASE[2] },
    { icon: Instagram, ...SCREEN_LINKS_BASE[3] },
    { icon: Code, ...SCREEN_LINKS_BASE[4] },
    { icon: Music, ...SCREEN_LINKS_BASE[5] },
    { icon: Mail, ...SCREEN_LINKS_BASE[6] },
  ];

  const handleLinkClick = useCallback((url: string) => {
    try {
      if (!url || url === '#') {
        console.warn('Link inválido ou em construção');
        return;
      }
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.warn('Falha ao abrir link. Verifique se o popup está bloqueado.');
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erro ao abrir link:', error);
    }
  }, []);

  const handleSelectInternal = useCallback((index: number) => {
    if (index === SCREEN_PROFILE_INDEX) {
      setActiveScreen('profile');
      setScreenKey(prev => prev + 1);
    }
  }, []);

  const handleBackToMenu = useCallback(() => {
    if (activeScreen === 'menu') return;
    setActiveScreen('menu');
  }, [activeScreen]);

  const { selectedIndex, setSelectedIndex } = useGameBoyMenu(
    links,
    playSound,
    onButtonPress,
    handleLinkClick,
    handleSelectInternal,
    activeScreen === 'profile' ? handleBackToMenu : undefined
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
        {activeScreen === 'menu' && (
          <div key={`menu-${screenKey}`} className="w-full h-full">
            <GameBoyMenu
              links={links}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              playSound={playSound}
              onLinkClick={(url) => {
                if (selectedIndex === SCREEN_PROFILE_INDEX) {
                  handleSelectInternal(SCREEN_PROFILE_INDEX);
                  return;
                }
                handleLinkClick(url);
              }}
            />
          </div>
        )}
        {activeScreen === 'profile' && (
          <ProfileScreen key={`profile-${screenKey}`} onBack={handleBackToMenu} />
        )}
      </div>
      {activeScreen === 'menu' && <BlinkingCursor />}
    </div>
  );
};

export default GameBoyScreenContent;
