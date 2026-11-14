/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'gameboy': ['Press Start 2P', 'monospace'],
      },
      colors: {
        'gb-green': '#9bbc0f',
        'gb-dark-green': '#0f380f',
        'gb-gray': '#8b0051',
        'gb-pink': '#d63384',
        'gb-dark-pink': '#b02a5b',
      },
      animation: {
        'blink': 'blink 1s infinite',
        'button-press': 'button-press 0.1s ease',
        'cursor-pulse': 'cursor-pulse 0.9s ease-in-out infinite',
        'screen-slide-in': 'screen-slide-in 260ms steps(6, end) both',
        'screen-fade-out': 'screen-fade-out 140ms steps(3, end) both',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'button-press': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'cursor-pulse': {
          '0%, 100%': { opacity: '1', letterSpacing: '0.08em' },
          '50%': { opacity: '0.95', letterSpacing: '0.11em' },
        },
        'screen-slide-in': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'screen-fade-out': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-12%)', opacity: '0' },
        },
      },
      boxShadow: {
        // Corpo do console: bevel iluminado por cima, sombra embaixo e espessura do plástico
        'gameboy-body':
          'inset 0 3px 0 rgba(255, 255, 255, 0.95), inset 0 -5px 10px rgba(0, 0, 0, 0.18), inset 5px 0 12px rgba(0, 0, 0, 0.05), inset -5px 0 12px rgba(0, 0, 0, 0.05), 0 1px 0 #cdd0d5, 0 3px 0 #babec5, 0 6px 0 #a3a7af, 0 10px 18px rgba(0, 0, 0, 0.45), 0 26px 40px rgba(0, 0, 0, 0.35)',
        // Moldura da tela rebaixada no plástico
        'screen-bezel-deep':
          'inset 0 4px 9px rgba(0, 0, 0, 0.5), inset 0 -2px 3px rgba(255, 255, 255, 0.22), 0 1px 0 rgba(255, 255, 255, 0.9)',
        // Tela afundada com profundidade interna
        'screen-deep':
          'inset 0 3px 7px rgba(0, 0, 0, 0.55), inset 0 0 18px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.14)',
        // Cruz direcional extrudada
        'dpad-deep':
          'inset 0 2px 0 rgba(255, 255, 255, 0.2), inset 0 -3px 4px rgba(0, 0, 0, 0.55), 0 1px 0 #4a4e54, 0 3px 0 #33373c, 0 6px 10px rgba(0, 0, 0, 0.5)',
        // Botões A/B: brilho superior, sombra inferior e espessura
        'button-deep':
          'inset 0 -4px 7px rgba(0, 0, 0, 0.32), inset 0 3px 5px rgba(255, 255, 255, 0.5), 0 2px 0 #932552, 0 6px 12px rgba(0, 0, 0, 0.5)',
        'button-deep-pressed':
          'inset 0 3px 7px rgba(0, 0, 0, 0.45), inset 0 -2px 3px rgba(255, 255, 255, 0.25), 0 1px 0 #932552, 0 2px 4px rgba(0, 0, 0, 0.45)',
        // Botões SELECT/START
        'pill-deep':
          'inset 0 2px 3px rgba(255, 255, 255, 0.25), inset 0 -2px 3px rgba(0, 0, 0, 0.55), 0 1px 0 #2c2f33, 0 3px 5px rgba(0, 0, 0, 0.5)',
        'pill-deep-pressed':
          'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 0 #2c2f33, 0 1px 2px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
