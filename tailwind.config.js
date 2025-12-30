/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strict Black & White Theme - Enterprise Grade
        black: {
          DEFAULT: '#000000',     // Pure Black - Primary background
          pure: '#000000',
        },
        white: {
          DEFAULT: '#FFFFFF',     // Pure White - Primary text and surfaces
          pure: '#FFFFFF',
        },
        grey: {
          charcoal: '#0F0F0F',   // Deep Charcoal - App background depth
          dark: '#1A1A1A',       // Dark Surface - Cards, panels, modals
          border: '#2A2A2A',     // Border Grey - Borders, dividers, outlines
          muted: '#9CA3AF',      // Muted Grey - Secondary text, labels, hints
          soft: '#E5E5E5',       // Soft Grey - Subtle highlights, icons, inactive text
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
