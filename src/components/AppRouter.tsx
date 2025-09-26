import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import GameBoyScreenContent from './GameBoyScreenContent';
import LoadingScreen from './LoadingScreen';
import Error404 from './Error404';
import { useAudio } from '../hooks/useAudio';
import GameBoyConsole from './GameBoyConsole';
import GameBoyScreen from './GameBoyScreen';
import { DEFAULT_CONSOLE_NAME, DEFAULT_CONSOLE_TYPE } from '../constants/gameboy';
import type { DPadDirection, ActionButton, RegisterButtonHandler } from '../types/gameboy';

const AppRouter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { playSound, playBackgroundMusic } = useAudio();

  // Refs para as funções de controle - agora com tipagem forte
  const navigationRef = useRef<((direction: DPadDirection) => void) | null>(null);
  const actionRef = useRef<((button: ActionButton) => void) | null>(null);

  useEffect(() => {
    // Simula carregamento do Game Boy
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      playSound('startup');
      playBackgroundMusic();
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, [playSound, playBackgroundMusic]);

  // Função para receber callbacks do GameBoyScreen
  const handleButtonPress: RegisterButtonHandler = (type, callback) => {
    if (type === 'navigation') {
      navigationRef.current = callback as (direction: DPadDirection) => void;
    } else if (type === 'action') {
      actionRef.current = callback as (button: ActionButton) => void;
    }
  };

  // Handlers para os botões físicos - agora com tipagem forte
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-200 flex items-center justify-center p-4">
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
