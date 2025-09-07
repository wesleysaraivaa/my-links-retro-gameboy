


// Dimensões do console
export const CONSOLE_DIMENSIONS = {
  width: '360px',
  minHeight: '520px',
  screenMinHeight: '180px',
} as const;


// Classes CSS reutilizáveis
export const CSS_CLASSES = {
  // Container principal
  consoleContainer: 'w-[360px] min-h-[520px] h-auto relative drop-shadow-gameboy flex flex-col items-center',
  
  // Corpo do console
  consoleBody: 'w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-[20px_20px_40px_20px] relative border-[3px] border-gray-300 shadow-gameboy-inset flex flex-col items-center justify-start pb-8',
  
  // Tela
  screenSection: 'text-center w-4/5 mt-10',
  screenBezel: 'bg-gradient-to-br from-gray-300 to-gray-500 p-[5px] rounded-xl border-2 border-gray-500 shadow-screen-bezel',
  screen: 'w-full h-full min-h-[180px] bg-gb-green border-2 border-gray-800 rounded-sm relative overflow-hidden shadow-screen',
  
  // Identificação
  consoleName: 'font-gameboy text-md text-gray-600 mb-0.5',
  consoleType: 'font-gameboy text-sm text-gray-500 font-bold tracking-wide',
} as const;



// Textos padrão
export const DEFAULT_CONSOLE_NAME = 'Wesley';
export const DEFAULT_CONSOLE_TYPE = 'Links';