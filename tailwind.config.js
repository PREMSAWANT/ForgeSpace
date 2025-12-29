/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Black & White Theme
        black: {
          DEFAULT: '#000000',
          pure: '#000000',
        },
        white: {
          DEFAULT: '#FFFFFF',
          pure: '#FFFFFF',
        },
        grey: {
          dark: '#0F0F0F',      // background depth
          charcoal: '#1A1A1A',  // cards, panels
          mid: '#2A2A2A',       // borders, dividers
          soft: '#E5E5E5',      // secondary text
          muted: '#9CA3AF',     // labels, hints
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // Consistent spacing system: 4px, 8px, 16px, 24px, 32px, 48px
        '1': '4px',
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.4)',
      },
      transitionProperty: {
        'opacity': 'opacity',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
}
