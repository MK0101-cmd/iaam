/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Points of You AI Studio Design System
      colors: {
        // Primary Brand Colors
        primary: {
          50: 'rgb(254 247 237)',
          100: 'rgb(253 237 211)',
          200: 'rgb(251 217 166)',
          300: 'rgb(247 193 116)',
          400: 'rgb(242 160 63)',
          500: 'rgb(237 128 23)',
          600: 'rgb(222 102 13)',
          700: 'rgb(184 77 14)',
          800: 'rgb(147 61 18)',
          900: 'rgb(120 51 18)',
        },
        
        // Secondary Colors
        secondary: {
          50: 'rgb(248 246 240)',
          100: 'rgb(240 235 224)',
          200: 'rgb(229 220 200)',
          300: 'rgb(215 201 168)',
          400: 'rgb(199 176 136)',
          500: 'rgb(181 153 104)',
          600: 'rgb(160 131 84)',
          700: 'rgb(133 106 68)',
          800: 'rgb(109 85 55)',
          900: 'rgb(90 69 46)',
        },
        
        // Accent Colors
        sage: {
          50: '#f6f8f6',
          100: '#e8f0e8',
          200: '#d1e2d1',
          300: '#a8c8a8',
          400: '#7aa87a',
          500: '#5a8a5a',
          600: '#467046',
          700: '#3a5a3a',
          800: '#304830',
          900: '#283c28',
        },
        
        ocean: {
          50: '#f0f8ff',
          100: '#e0f2ff',
          200: '#b8e4ff',
          300: '#7dd0ff',
          400: '#3ab9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        
        sunset: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        
        // Semantic Colors
        semantic: {
          success: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          warning: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          error: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
          },
          info: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          }
        },
        
        // Background Colors
        background: {
          primary: 'rgb(254 252 248)',
          secondary: 'rgb(248 246 240)',
          elevated: 'rgb(255 255 255)',
        }
      },
      
      // Typography
      fontFamily: {
        display: ['Kalam', 'Bradley Hand', 'Brush Script MT', 'cursive'],
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      
      // Custom shadows
      boxShadow: {
        'warm-sm': '0 1px 2px 0 rgb(237 128 23 / 0.1)',
        'warm-md': '0 4px 6px -1px rgb(237 128 23 / 0.1), 0 2px 4px -2px rgb(237 128 23 / 0.1)',
        'warm-lg': '0 10px 15px -3px rgb(237 128 23 / 0.1), 0 4px 6px -4px rgb(237 128 23 / 0.1)',
        'book-page': '0 8px 32px rgba(0,0,0,0.15)',
        'book-spine': '-2px 0 8px rgba(0,0,0,0.3)',
        'book-inner': 'inset 0 1px 0 rgba(255,255,255,0.8)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      
      // Custom animations
      animation: {
        'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      // Custom keyframes
      keyframes: {
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-2px)' }
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      // Custom border radius
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      
      // Custom z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Custom backdrop blur
      backdropBlur: {
        'xs': '2px',
      },
      
      // Custom grid template columns
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      
      // Custom aspect ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '5/4': '5 / 4',
      },
      
      // Custom transitions
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      // Custom line heights
      lineHeight: {
        '12': '3rem',
        '16': '4rem',
      }
    },
  },
  plugins: [
    // Custom plugin for POY-specific utilities
    function({ addUtilities, addComponents, theme }) {
      // Add custom utilities
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
        '.transform-style-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none'
          }
        }
      });
      
      // Add custom components
      addComponents({
        '.btn-poy': {
          '@apply inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed': {},
          '@apply bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:-translate-y-0.5 focus:ring-primary-500 active:translate-y-0': {},
        },
        '.card-poy': {
          '@apply bg-white rounded-2xl border border-neutral-200 shadow-sm transition-all duration-200': {},
        },
        '.card-poy-interactive': {
          '@apply hover:shadow-md hover:-translate-y-0.5 cursor-pointer': {},
        },
        '.card-poy-book': {
          '@apply bg-gradient-to-br from-secondary-50 to-secondary-100 border border-secondary-200 shadow-book-page relative overflow-hidden': {},
        },
        '.glass-poy': {
          '@apply bg-white/80 backdrop-blur-md border border-white/20': {},
        },
        '.nav-item-poy': {
          '@apply flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer': {},
        },
        '.nav-item-poy-active': {
          '@apply bg-primary-100 text-primary-800 shadow-sm border-l-4 border-primary-500': {},
        },
        '.nav-item-poy-inactive': {
          '@apply text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900': {},
        }
      });
    }
  ],
}

