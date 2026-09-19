import React from 'react';
import { CSS_CLASSES } from '../constants/gameboy';

interface GameBoyScreenProps {
  children: React.ReactNode;
  consoleName?: string;
  consoleType?: string;
}

const GameBoyScreen = ({
  children,
  consoleName = 'Wesley',
  consoleType = 'Links',
}: GameBoyScreenProps) => {
  return (
    <div className={CSS_CLASSES.screenSection}>
      {/* Moldura da tela - simula o bezel (moldura) do Game Boy original */}
      <div className={CSS_CLASSES.screenBezel}>
        {/* Tela propriamente dita - fundo verde característico do Game Boy */}
        <div className={CSS_CLASSES.screen}>
          {/* Aqui é renderizado o conteúdo passado como children */}
          {children}
        </div>
      </div>
      
      {/* Identificação do console - nome e tipo */}
      <div className="mt-3 text-center">
        <div className={CSS_CLASSES.consoleName}>{consoleName}</div>
        <div className={CSS_CLASSES.consoleType}>{consoleType}</div>
      </div>
    </div>
  );
};

export default GameBoyScreen;