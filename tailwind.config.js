/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        erp: {
          dark: '#0a0e17',
          card: '#111827',
          cardLight: '#1f2937',
          border: 'rgba(255, 255, 255, 0.08)',
          blue: '#3b82f6',
          purple: '#a855f7',
          emerald: '#10b981',
          amber: '#f59e0b',
          cyan: '#06b6d4',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
