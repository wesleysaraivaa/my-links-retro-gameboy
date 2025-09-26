import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const Error404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-400 flex items-center justify-center p-4">
      <div className="w-[320px] min-h-[480px] h-auto relative drop-shadow-gameboy flex flex-col items-center sm:w-[360px] sm:min-h-[520px]">
        <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-[20px_20px_40px_20px] relative border-[3px] border-gray-300 shadow-gameboy-inset flex flex-col items-center justify-center pb-8">
          
          {/* Tela do Game Boy */}
          <div className="text-center w-4/5 mt-6 sm:mt-10">
            <div className="bg-gradient-to-br from-gray-300 to-gray-500 p-[3px] sm:p-[5px] rounded-lg sm:rounded-xl border-2 border-gray-500 shadow-screen-bezel">
              <div className="w-full h-full min-h-[140px] sm:min-h-[180px] bg-gb-green border-2 border-gray-800 rounded-sm relative overflow-hidden shadow-screen">
                
                {/* Conteúdo da tela de erro */}
                <div className="w-full h-full text-gb-dark-green font-gameboy text-xs leading-tight p-2 relative overflow-hidden flex flex-col items-center justify-center">
                  
                  {/* Cabeçalho */}
                  <div className="text-center mb-4">
                    <div className="text-lg font-bold mb-1">ERROR 404</div>
                    <div className="text-sm">GAME OVER</div>
                  </div>
                  
                  {/* Ícone de erro */}
                  <div className="text-4xl mb-4">💀</div>
                  
                  {/* Mensagem de erro */}
                  <div className="text-center mb-6">
                    <div className="text-sm mb-2">PÁGINA NÃO</div>
                    <div className="text-sm mb-2">ENCONTRADA</div>
                    <div className="text-xs text-gb-dark-green/70">
                      O link que você procura
                    </div>
                    <div className="text-xs text-gb-dark-green/70">
                      não existe mais
                    </div>
                  </div>
                  
                  {/* Botões de ação */}
                  <div className="flex flex-col gap-2 w-full max-w-[200px]">
                    <button
                      onClick={handleGoHome}
                      className="px-3 py-1.5 bg-gb-dark-green text-gb-green text-xs font-bold rounded-sm border border-gb-dark-green hover:bg-gb-green hover:text-gb-dark-green transition-all duration-200 flex items-center justify-center gap-1"
                    >
                      <Home size={12} />
                      VOLTAR AO INÍCIO
                    </button>
                    
                    <button
                      onClick={handleGoBack}
                      className="px-3 py-1.5 bg-transparent text-gb-dark-green text-xs font-bold rounded-sm border border-gb-dark-green hover:bg-gb-dark-green hover:text-gb-green transition-all duration-200 flex items-center justify-center gap-1"
                    >
                      <ArrowLeft size={12} />
                      PÁGINA ANTERIOR
                    </button>
                  </div>
                  
                  {/* Cursor piscando */}
                  <div className="absolute bottom-1 right-1 text-[6px]">
                    <span className="animate-blink">█</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Identificação do console */}
          <div className="mt-3 text-center">
            <div className="font-gameboy text-sm text-gray-700 mb-0.5">Wesley</div>
            <div className="font-gameboy text-xs text-gray-600 font-bold tracking-wide">Error 404</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
