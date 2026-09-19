import { CSS_CLASSES, DPAD_CONFIG } from '../constants/gameboy';
import GameBoyButton from './GameBoyButton';
import DPadButton from './DPadButton';
import type { GameBoyConsoleProps, DPadDirection } from '../types/gameboy';
import { useGameBoyControls } from '../hooks/useGameBoyControls';
import { useGameBoyKeyboard } from '../hooks/useGameBoyKeyboard';

const GameBoyConsole = ({ 
  children, 
  onDPadPress, 
  onActionButton,
  enableKeyboard = true 
}: GameBoyConsoleProps) => {
  // Hook para gerenciar controles e animações
  const { createDPadHandlers, createActionButtonHandlers } = useGameBoyControls({
    onDPadPress,
    onActionButton,
  });

  // Hook para suporte a teclado
  useGameBoyKeyboard({
    onDPadPress,
    onActionButton,
    enabled: enableKeyboard,
  });

  return (
    <div 
      className={CSS_CLASSES.consoleContainer}
      role="application"
      aria-label="Console Game Boy - Controles de navegação e ação"
    >
      {/* Corpo principal do console - gradiente cinza para simular plástico do Game Boy */}
      <div className={CSS_CLASSES.consoleBody}>
        
        {/* Conteúdo da tela - renderizado diretamente */}
        {children}

        {/* Botões SELECT e START - Centralizados abaixo da tela */}
        <div className={CSS_CLASSES.selectStartSection}>
          <div className={CSS_CLASSES.selectStartContainer}>
            <GameBoyButton
              button="select"
              {...createActionButtonHandlers('select')}
            />
            <GameBoyButton
              button="start"
              {...createActionButtonHandlers('start')}
            />
          </div>
        </div>

        {/* Seção dos controles - D-Pad à esquerda, botões A/B à direita */}
        <div className={CSS_CLASSES.controlsSection}>
          
          {/* D-Pad (Direcional Pad) - Controle direcional em cruz */}
          <div className={CSS_CLASSES.dpadContainer}>
            <div className={CSS_CLASSES.dpadStructure}>
              
              {/* Renderiza botões do D-Pad usando componente modular */}
              {(Object.keys(DPAD_CONFIG.directions) as DPadDirection[]).map((direction) => (
                <DPadButton
                  key={direction}
                  direction={direction}
                  {...createDPadHandlers(direction)}
                />
              ))}
              
              {/* Estrutura visual do D-Pad - Barras verticais e horizontais que formam a cruz */}
              <div className={CSS_CLASSES.dpadVertical} />
              <div className={CSS_CLASSES.dpadHorizontal} />
              <div className={CSS_CLASSES.dpadCenter} />
            </div>
          </div>
          {/* Botões de ação A e B - Botões circulares rosa característicos do Game Boy */}
          <div className={CSS_CLASSES.actionButtonsContainer}>
            
            {/* Botão B - Posicionado acima do botão A (como no Game Boy original) */}
            <GameBoyButton
              button="b"
              {...createActionButtonHandlers('b')}
            />
            
            {/* Botão A - Botão principal de ação (como no Game Boy original) */}
            <GameBoyButton
              button="a"
              {...createActionButtonHandlers('a')}
            />
          </div>
        </div>

        {/* Alto-falante - Linhas horizontais características do Game Boy */}
        <div className={CSS_CLASSES.speakerContainer}>
          <div className={CSS_CLASSES.speakerLines}>
            <div className={CSS_CLASSES.speakerLine}></div>
            <div className={CSS_CLASSES.speakerLine}></div>
            <div className={CSS_CLASSES.speakerLine}></div>
            <div className={CSS_CLASSES.speakerLine}></div>
            <div className={CSS_CLASSES.speakerLine}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoyConsole; 