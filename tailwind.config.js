/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0D0D12',
          deep: '#07070A',
          surface: '#13131A',
          card: '#161622',
          elevated: '#1D1D2C',
        },
        champagne: {
          DEFAULT: '#C9A84C',
          light: '#E2C875',
          soft: '#F4E7BE',
          dark: '#9B7F30',
          glow: 'rgba(201, 168, 76, 0.25)',
        },
        ivory: {
          DEFAULT: '#FAF8F5',
          muted: '#D5D2CC',
        },
        slate: {
          charcoal: '#2A2A35',
          subtle: '#1C1C24',
          muted: '#8E8D9A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
