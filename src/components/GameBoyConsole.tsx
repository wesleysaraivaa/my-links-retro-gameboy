
import { CSS_CLASSES,  } from '../constants/gameboy';



const GameBoyConsole = ({ children }: { children: React.ReactNode }) => {

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

    
      </div>
    </div>
  );
};

export default GameBoyConsole; 