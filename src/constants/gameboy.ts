import type { DPadConfig, ActionButtonsConfig } from "../types/gameboy";

// Dimensões do console
export const CONSOLE_DIMENSIONS = {
  width: "360px",
  minHeight: "520px",
  screenMinHeight: "180px",
} as const;

// Configuração do D-Pad
export const DPAD_CONFIG: DPadConfig = {
  directions: {
    up: {
      id: "dpad-up",
      label: "▲",
      position: { top: "0", left: "50%" },
      className:
        "absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-transparent border-none cursor-pointer flex items-center justify-center transition-all duration-100 z-10 select-none active:scale-95 touch-manipulation",
    },
    down: {
      id: "dpad-down",
      label: "▼",
      position: { bottom: "0", left: "50%" },
      className:
        "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-transparent border-none cursor-pointer flex items-center justify-center transition-all duration-100 z-10 select-none active:scale-95 touch-manipulation",
    },
    left: {
      id: "dpad-left",
      label: "◄",
      position: { left: "0", top: "50%" },
      className:
        "absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-transparent border-none cursor-pointer flex items-center justify-center transition-all duration-100 z-10 select-none active:scale-95 touch-manipulation",
    },
    right: {
      id: "dpad-right",
      label: "►",
      position: { right: "0", top: "50%" },
      className:
        "absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-transparent border-none cursor-pointer flex items-center justify-center transition-all duration-100 z-10 select-none active:scale-95 touch-manipulation",
    },
  },
};

// Configuração dos botões de ação
export const ACTION_BUTTONS_CONFIG: ActionButtonsConfig = {
  a: {
    id: "button-a",
    label: "A",
    position: {},
    className:
      "w-9 h-9 sm:w-10 sm:h-10 rounded-full border-[3px] border-gb-gray bg-gradient-to-br from-gb-pink to-gb-dark-pink shadow-button cursor-pointer transition-all duration-100 select-none active:scale-95 touch-manipulation",
  },
  b: {
    id: "button-b",
    label: "B",
    position: {},
    className:
      "w-9 h-9 sm:w-10 sm:h-10 rounded-full border-[3px] border-gb-gray bg-gradient-to-br from-gb-pink to-gb-dark-pink shadow-button cursor-pointer transition-all duration-100 select-none active:scale-95 touch-manipulation",
  },
  select: {
    id: "button-select",
    label: "SELECT",
    position: {},
    className:
      "w-8 h-2.5 sm:w-9 sm:h-3 bg-gradient-to-br from-gray-600 to-gray-700 rounded-sm border border-gray-800 shadow-pill cursor-pointer transition-all duration-100 select-none active:scale-95 touch-manipulation",
  },
  start: {
    id: "button-start",
    label: "START",
    position: {},
    className:
      "w-8 h-2.5 sm:w-9 sm:h-3 bg-gradient-to-br from-gray-600 to-gray-700 rounded-sm border border-gray-800 shadow-pill cursor-pointer transition-all duration-100 select-none active:scale-95 touch-manipulation",
  },
};

// Classes CSS reutilizáveis
export const CSS_CLASSES = {
  // Container principal
  consoleContainer:
    "w-[320px] min-h-[480px] h-auto relative drop-shadow-gameboy flex flex-col items-center sm:w-[360px] sm:min-h-[520px]",

  // Corpo do console
  consoleBody:
    "w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-[20px_20px_40px_20px] relative border-[3px] border-gray-300 shadow-gameboy-inset flex flex-col items-center justify-start pb-8",

  // Tela
  screenSection: "text-center w-4/5 mt-6 sm:mt-10",
  screenBezel:
    "bg-gradient-to-br from-gray-300 to-gray-500 p-[3px] sm:p-[5px] rounded-lg sm:rounded-xl border-2 border-gray-500 shadow-screen-bezel",
  screen:
    "w-full h-full min-h-[140px] sm:min-h-[180px] bg-gb-green border-2 border-gray-800 rounded-sm relative overflow-hidden shadow-screen",

  // Controles
  controlsSection: "flex justify-between px-4 sm:px-8 w-full mt-4 sm:mt-8",
  dpadContainer: "relative",
  dpadStructure: "w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] relative",
  actionButtonsContainer: "flex flex-col gap-2 sm:gap-3 items-center",

  // Botões Select/Start
  selectStartSection: "absolute bottom-20 left-1/2 transform -translate-x-1/2",
  selectStartContainer: "flex gap-5 items-center",

  // Alto-falante
  speakerContainer: "w-10 h-[30px] mt-6 self-end",
  speakerLines: "flex flex-col gap-0.5 h-full justify-center",
  speakerLine:
    "h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-sm",

  // Estrutura do D-Pad
  dpadVertical:
    "absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-[64px] sm:w-7 sm:h-[72px] bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm border-2 border-black shadow-dpad pointer-events-none",
  dpadHorizontal:
    "absolute top-1/2 left-0 transform -translate-y-1/2 w-[64px] h-6 sm:w-[72px] sm:h-7 bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm border-2 border-black shadow-dpad pointer-events-none",
  dpadCenter:
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-gray-700 rounded-sm pointer-events-none",

  // Texto dos botões
  buttonLabel:
    "font-gameboy text-xs text-gray-500 font-bold pointer-events-none",
  buttonLabelSmall: "font-gameboy text-[6px] text-gray-500 pointer-events-none",
  dpadIcon: "text-sm sm:text-base text-gray-600 font-bold drop-shadow-sm",

  // Identificação
  consoleName: "font-gameboy text-md text-gray-600 mb-0.5",
  consoleType: "font-gameboy text-sm text-gray-500 font-bold tracking-wide",
} as const;

// Configurações de animação
export const ANIMATION_CONFIG = {
  buttonPress: "animate-button-press",
  buttonPressed: "translate-y-px shadow-button-pressed",
  pillPressed: "translate-y-px shadow-pill-pressed",
} as const;

// Número de linhas do alto-falante
export const SPEAKER_LINES_COUNT = 6;

// Links base (label e URL) exibidos no menu da tela
export const SCREEN_LINKS_BASE = [
  { label: "GITHUB", url: "https://github.com/wesleysaraivaa" },
  { label: "LINKEDIN", url: "https://www.linkedin.com/in/wesleysaraivaa/" },
  { label: "PORTFOLIO", url: "https://portifolio2026-steel.vercel.app/" },
  { label: "INSTAGRAM", url: "https://www.instagram.com/uniwersotech/" },
  {
    label: "PLAYLIST",
    url: "https://open.spotify.com/playlist/6I4XrDFJHCo7hgZ0He6uHi?si=c883001fcfee417e",
  },
  { label: "CONTATO", url: "https://wa.me/5588997130026" },
  { label: "BLOG TECH", url: "/" },
] as const;

// Textos padrão
export const HEADER_TITLE = "Hello, World!";
export const MENU_TITLE = "ESPECIALISTA TECH";
export const DEFAULT_CONSOLE_NAME = "Wesley";
export const DEFAULT_CONSOLE_TYPE = "Links";

// Mensagens de loading (tela opcional)
export const LOADING_MESSAGES = [
  "Inicializando sistema...",
  "Carregando ROM...",
  "Verificando memória...",
  "Lendo cartucho...",
  "Preparando interface...",
];
