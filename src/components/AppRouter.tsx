import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import GameBoyScreenContent from './GameBoyScreenContent';
import BootScreen from './BootScreen';
import Error404 from './Error404';
import { useAudio } from '../hooks/useAudio';
import GameBoyConsole from './GameBoyConsole';
import GameBoyScreen from './GameBoyScreen';
import { DEFAULT_CONSOLE_NAME, DEFAULT_CONSOLE_TYPE } from '../constants/gameboy';
import type { DPadDirection, ActionButton, RegisterButtonHandler } from '../types/gameboy';

const AppRouter = () => {
  const [bootState, setBootState] = useState<'boot' | 'transitioning' | 'ready'>('boot');
  const { playSound, playBackgroundMusic } = useAudio();

  const navigationRef = useRef<((direction: DPadDirection) => void) | null>(null);
  const actionRef = useRef<((button: ActionButton) => void) | null>(null);

  const handleBootStart = useCallback(() => {
    playSound('startup');
    playBackgroundMusic();
    setBootState('transitioning');
    setTimeout(() => {
      setBootState('ready');
    }, 260);
  }, [playSound, playBackgroundMusic]);

  useEffect(() => {
    if (bootState !== 'boot') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleBootStart();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [bootState, handleBootStart]);

  const handleButtonPress: RegisterButtonHandler = (type, callback) => {
    if (type === 'navigation') {
      navigationRef.current = callback as (direction: DPadDirection) => void;
    } else if (type === 'action') {
      actionRef.current = callback as (button: ActionButton) => void;
    }
  };

  const handleDPadPress = (direction: DPadDirection) => {
    if (navigationRef.current) {
      navigationRef.current(direction);
    }
  };

  const handleActionButton = (button: ActionButton) => {
    if (actionRef.current) {
      actionRef.current(button);
    }
  };

  if (bootState === 'boot' || bootState === 'transitioning') {
    return <BootScreen onStart={handleBootStart} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-200 flex items-center justify-center p-4 transition-opacity duration-200">
        <Routes>
          <Route 
            path="/" 
            element={
              <GameBoyConsole onDPadPress={handleDPadPress} onActionButton={handleActionButton}>
                <GameBoyScreen consoleName={DEFAULT_CONSOLE_NAME} consoleType={DEFAULT_CONSOLE_TYPE}>
                  <GameBoyScreenContent onButtonPress={handleButtonPress} />
                </GameBoyScreen>
              </GameBoyConsole>
            } 
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
