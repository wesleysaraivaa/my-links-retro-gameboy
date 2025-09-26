import { useState, useEffect } from 'react';
import { CONSOLE_DIMENSIONS, CSS_CLASSES, LOADING_MESSAGES, DEFAULT_CONSOLE_NAME, DEFAULT_CONSOLE_TYPE } from '../constants/gameboy';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const loadingMessages = LOADING_MESSAGES as unknown as string[];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 3;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 750);

    return () => clearInterval(messageInterval);
  }, [loadingMessages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-400 flex items-center justify-center p-4">
      <div className={CSS_CLASSES.consoleContainer} style={{ width: CONSOLE_DIMENSIONS.width, minHeight: CONSOLE_DIMENSIONS.minHeight }}>
        <div className={CSS_CLASSES.consoleBody}>
          <div className={CSS_CLASSES.screenSection}>
            <div className={CSS_CLASSES.screenBezel}>
              <div className={CSS_CLASSES.screen}>
                <div className="w-full h-full min-h-[180px] bg-gb-green text-gb-dark-green font-gameboy text-xs leading-tight p-2 relative overflow-hidden flex items-center justify-center">
                  <div className="text-center w-full">
                    <div className="mb-5">
                      <div className="text-sm mb-1">{DEFAULT_CONSOLE_NAME}</div>
                      <div className="text-base font-bold">Meus {DEFAULT_CONSOLE_TYPE}</div>
                    </div>
                    
                    <div className="text-xs mb-3 min-h-[10px]">
                      {loadingMessages[currentMessage]}
                    </div>
                    
                    <div className="w-20 h-1.5 border border-gb-dark-green mx-auto mb-2 bg-gb-dark-green/20">
                      <div 
                        className="h-full bg-gb-dark-green transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-sm">
                      {progress}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;