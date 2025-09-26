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
      },
      boxShadow: {
        'gameboy': '0 20px 40px rgba(0, 0, 0, 0.3)',
        'gameboy-inset': 'inset 0 2px 4px rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)',
        'screen-bezel': 'inset 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 -1px 2px rgba(255, 255, 255, 0.2)',
        'screen': 'inset 0 0 20px rgba(0, 0, 0, 0.3)',
        'dpad': 'inset 0 2px 4px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3)',
        'button': 'inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 3px 6px rgba(0, 0, 0, 0.3)',
        'button-pressed': 'inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 1px 3px rgba(0, 0, 0, 0.3)',
        'pill': 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.3)',
        'pill-pressed': 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 0px 1px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
