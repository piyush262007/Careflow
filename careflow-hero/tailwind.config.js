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
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
        },
        tealBrand: {
          500: '#14B8A6',
          600: '#0D9488',
        },
        purpleBrand: {
          500: '#8B5CF6',
        },
        dark: {
          bg: '#0B1120',
          surface: '#131C31',
          card: '#1B2640',
          border: '#1E293B',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        stat: ['Space Grotesk', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(37, 99, 235, 0.25)',
        'glow-secondary': '0 0 40px rgba(20, 184, 166, 0.25)',
        'apple-sm': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'apple-md': '0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'apple-lg': '0 20px 48px -8px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.06)',
        'apple-dark': '0 20px 48px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
      },
      animation: {
        'float-slow': 'gentleFloat 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
