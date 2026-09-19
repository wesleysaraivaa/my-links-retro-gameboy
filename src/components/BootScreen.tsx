import { useEffect, useState } from 'react';
import { CONSOLE_DIMENSIONS, CSS_CLASSES, DEFAULT_CONSOLE_NAME, DEFAULT_CONSOLE_TYPE } from '../constants/gameboy';

interface BootScreenProps {
  onStart: () => void;
}

const BootScreen = ({ onStart }: BootScreenProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showPressStart, setShowPressStart] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLogo(true), 150);
    const t2 = setTimeout(() => setShowPressStart(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExiting]);

  const handleStart = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onStart();
    }, 280);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-gray-200 to-gray-400 flex items-center justify-center p-4 transition-opacity duration-200 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleStart}
      role="button"
      tabIndex={0}
      aria-label="Tela de inicialização do Game Boy. Pressione Enter, Espaço, A ou clique para continuar."
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStart();
        }
      }}
    >
      <div
        className={CSS_CLASSES.consoleContainer}
        style={{
          width: CONSOLE_DIMENSIONS.width,
          minHeight: CONSOLE_DIMENSIONS.minHeight,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={CSS_CLASSES.consoleBody}>
          <div className={CSS_CLASSES.screenSection}>
            <div className={CSS_CLASSES.screenBezel}>
              <div className={CSS_CLASSES.screen}>
                <div className="w-full h-full min-h-[180px] bg-gb-green text-gb-dark-green font-gameboy leading-none p-2 relative overflow-hidden flex flex-col items-center justify-between select-none">
                  <div className="w-full flex items-start justify-between">
                    <span className="text-[6px] opacity-70">NINTENDO</span>
                    <span className="text-[6px] opacity-70">GB-01</span>
                  </div>

                  <div
                    className={`flex flex-col items-center justify-center flex-1 w-full transition-all duration-300 ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  >
                    <div className="tracking-[0.25em] text-2xl sm:text-3xl font-bold mb-1">
                      {DEFAULT_CONSOLE_NAME}
                    </div>
                    <div className="tracking-[0.3em] text-[8px] sm:text-[10px] opacity-80 mb-8">
                      {DEFAULT_CONSOLE_TYPE.toUpperCase()} SYSTEM
                    </div>

                    <div
                      className={`transition-all duration-500 ${showPressStart ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStart();
                        }}
                        className="text-xs sm:text-sm tracking-[0.2em] font-bold flex items-center gap-2 focus:outline-none bg-transparent border-none p-0 cursor-pointer text-gb-dark-green"
                        aria-label="Pressionar Start para iniciar"
                      >
                        <span className="animate-blink">►</span>
                        <span className="animate-blink">PRESS START</span>
                        <span className="animate-blink">◄</span>
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex items-end justify-between text-[6px] opacity-60">
                    <span>© 2026</span>
                    <span>V1.0</span>
                  </div>

                  <div className="absolute bottom-1 right-1 text-[6px]">
                    <span className="animate-blink">█</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center">
            <div className={CSS_CLASSES.consoleName}>{DEFAULT_CONSOLE_NAME}</div>
            <div className={CSS_CLASSES.consoleType}>{DEFAULT_CONSOLE_TYPE}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
