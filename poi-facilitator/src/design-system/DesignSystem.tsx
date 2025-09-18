import React from 'react';

// Points of You AI Studio - Unified Design System
// This file defines the complete design system for consistent UI/UX across all components

// ===== COLOR PALETTE =====
export const colors = {
  // Primary Brand Colors - Points of You inspired
  primary: {
    50: '#fef7ed',   // Lightest cream
    100: '#fdedd3',  // Light cream
    200: '#fbd9a6',  // Warm beige
    300: '#f7c174',  // Soft gold
    400: '#f2a03f',  // Warm amber
    500: '#ed8017',  // Primary orange (POY brand)
    600: '#de660d',  // Deep orange
    700: '#b84d0e',  // Dark orange
    800: '#933d12',  // Darker orange
    900: '#783312',  // Darkest orange
  },
  
  // Secondary Colors - Earthy and warm
  secondary: {
    50: '#f8f6f0',   // Warm white (paper)
    100: '#f0ebe0',  // Light parchment
    200: '#e5dcc8',  // Cream
    300: '#d7c9a8',  // Light tan
    400: '#c7b088',  // Tan
    500: '#b59968',  // Medium brown
    600: '#a08354',  // Brown
    700: '#856a44',  // Dark brown
    800: '#6d5537',  // Darker brown
    900: '#5a452e',  // Darkest brown
  },
  
  // Accent Colors - Natural and calming
  accent: {
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
    }
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
  
  // Neutral Colors - Refined grays
  neutral: {
    50: '#fafafa',   // Almost white
    100: '#f5f5f5',  // Light gray
    200: '#e5e5e5',  // Border gray
    300: '#d4d4d4',  // Medium light gray
    400: '#a3a3a3',  // Medium gray
    500: '#737373',  // Text gray
    600: '#525252',  // Dark text gray
    700: '#404040',  // Darker gray
    800: '#262626',  // Very dark gray
    900: '#171717',  // Almost black
  },
  
  // Background Colors
  background: {
    primary: '#fefcf8',      // Warm white background
    secondary: '#f8f6f0',    // Light parchment
    elevated: '#ffffff',     // Pure white for cards
    overlay: 'rgba(0, 0, 0, 0.6)', // Modal overlay
  }
};

// ===== TYPOGRAPHY =====
export const typography = {
  fontFamily: {
    display: ['Kalam', 'Bradley Hand', 'Brush Script MT', 'cursive'], // Handwritten feel for headers
    body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'], // Clean for body text
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'], // Code and technical text
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  }
};

// ===== SPACING SYSTEM =====
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
};

// ===== BORDER RADIUS =====
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// ===== SHADOWS =====
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
  
  // POY-specific shadows with warm tones
  warm: {
    sm: '0 1px 2px 0 rgb(237 128 23 / 0.1)',
    md: '0 4px 6px -1px rgb(237 128 23 / 0.1), 0 2px 4px -2px rgb(237 128 23 / 0.1)',
    lg: '0 10px 15px -3px rgb(237 128 23 / 0.1), 0 4px 6px -4px rgb(237 128 23 / 0.1)',
  },
  
  // Book-like shadows for journal interfaces
  book: {
    page: '0 8px 32px rgba(0,0,0,0.15)',
    spine: '-2px 0 8px rgba(0,0,0,0.3)',
    inner: 'inset 0 1px 0 rgba(255,255,255,0.8)',
  }
};

// ===== ANIMATION & TRANSITIONS =====
export const animations = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // POY-specific organic easing
    organic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Keyframe animations
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { transform: 'translateY(10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
      '0%': { transform: 'translateY(-10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    // POY-specific animations
    breathe: {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.02)' },
    },
    gentle: {
      '0%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-2px)' },
      '100%': { transform: 'translateY(0px)' },
    }
  }
};

// ===== COMPONENT STYLES =====
export const components = {
  // Button variants - Comprehensive POY Button Color Schema
  button: {
    base: `
      inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
      border border-transparent
    `,
    
    variants: {
      // === PRIMARY ACTIONS ===
      primary: `
        bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md border-primary-600
        hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:-translate-y-0.5
        focus:ring-primary-500 active:translate-y-0 active:from-primary-700 active:to-primary-800
        disabled:from-neutral-300 disabled:to-neutral-400 disabled:border-neutral-400
      `,
      
      // === SECONDARY ACTIONS ===
      secondary: `
        bg-secondary-100 text-secondary-800 border-secondary-200 shadow-sm
        hover:bg-secondary-200 hover:border-secondary-300 hover:shadow-md hover:-translate-y-0.5
        focus:ring-secondary-500 active:bg-secondary-300 active:border-secondary-400
        disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-200
      `,
      
      // === SUCCESS ACTIONS ===
      success: `
        bg-gradient-to-r from-success-500 to-success-600 text-white shadow-md border-success-600
        hover:from-success-600 hover:to-success-700 hover:shadow-lg hover:-translate-y-0.5
        focus:ring-success-500 active:translate-y-0 active:from-success-700 active:to-success-800
        disabled:from-neutral-300 disabled:to-neutral-400 disabled:border-neutral-400
      `,
      
      // === WARNING ACTIONS ===
      warning: `
        bg-gradient-to-r from-warning-500 to-warning-600 text-white shadow-md border-warning-600
        hover:from-warning-600 hover:to-warning-700 hover:shadow-lg hover:-translate-y-0.5
        focus:ring-warning-500 active:translate-y-0 active:from-warning-700 active:to-warning-800
        disabled:from-neutral-300 disabled:to-neutral-400 disabled:border-neutral-400
      `,
      
      // === DANGER ACTIONS ===
      danger: `
        bg-gradient-to-r from-error-500 to-error-600 text-white shadow-md border-error-600
        hover:from-error-600 hover:to-error-700 hover:shadow-lg hover:-translate-y-0.5
        focus:ring-error-500 active:translate-y-0 active:from-error-700 active:to-error-800
        disabled:from-neutral-300 disabled:to-neutral-400 disabled:border-neutral-400
      `,
      
      // === OUTLINE VARIANTS ===
      outline: `
        bg-transparent border-2 border-primary-500 text-primary-600 shadow-sm
        hover:bg-primary-50 hover:border-primary-600 hover:shadow-md hover:-translate-y-0.5
        focus:ring-primary-500 active:bg-primary-100 active:border-primary-700
        disabled:border-neutral-300 disabled:text-neutral-400 disabled:bg-transparent
      `,
      
      'outline-success': `
        bg-transparent border-2 border-success-500 text-success-600 shadow-sm
        hover:bg-success-50 hover:border-success-600 hover:shadow-md hover:-translate-y-0.5
        focus:ring-success-500 active:bg-success-100 active:border-success-700
        disabled:border-neutral-300 disabled:text-neutral-400 disabled:bg-transparent
      `,
      
      'outline-danger': `
        bg-transparent border-2 border-error-500 text-error-600 shadow-sm
        hover:bg-error-50 hover:border-error-600 hover:shadow-md hover:-translate-y-0.5
        focus:ring-error-500 active:bg-error-100 active:border-error-700
        disabled:border-neutral-300 disabled:text-neutral-400 disabled:bg-transparent
      `,
      
      // === GHOST VARIANTS ===
      ghost: `
        bg-transparent text-neutral-600 border-transparent
        hover:bg-neutral-100 hover:text-neutral-900 hover:shadow-sm
        focus:ring-neutral-500 active:bg-neutral-200
        disabled:text-neutral-400 disabled:bg-transparent
      `,
      
      'ghost-primary': `
        bg-transparent text-primary-600 border-transparent
        hover:bg-primary-50 hover:text-primary-700 hover:shadow-sm
        focus:ring-primary-500 active:bg-primary-100
        disabled:text-neutral-400 disabled:bg-transparent
      `,
      
      'ghost-success': `
        bg-transparent text-success-600 border-transparent
        hover:bg-success-50 hover:text-success-700 hover:shadow-sm
        focus:ring-success-500 active:bg-success-100
        disabled:text-neutral-400 disabled:bg-transparent
      `,
      
      'ghost-danger': `
        bg-transparent text-error-600 border-transparent
        hover:bg-error-50 hover:text-error-700 hover:shadow-sm
        focus:ring-error-500 active:bg-error-100
        disabled:text-neutral-400 disabled:bg-transparent
      `,
      
      // === SOFT VARIANTS ===
      soft: `
        bg-primary-100 text-primary-800 border-primary-200 shadow-sm
        hover:bg-primary-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5
        focus:ring-primary-500 active:bg-primary-300 active:border-primary-400
        disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-200
      `,
      
      'soft-success': `
        bg-success-100 text-success-800 border-success-200 shadow-sm
        hover:bg-success-200 hover:border-success-300 hover:shadow-md hover:-translate-y-0.5
        focus:ring-success-500 active:bg-success-300 active:border-success-400
        disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-200
      `,
      
      'soft-warning': `
        bg-warning-100 text-warning-800 border-warning-200 shadow-sm
        hover:bg-warning-200 hover:border-warning-300 hover:shadow-md hover:-translate-y-0.5
        focus:ring-warning-500 active:bg-warning-300 active:border-warning-400
        disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-200
      `,
      
      'soft-danger': `
        bg-error-100 text-error-800 border-error-200 shadow-sm
        hover:bg-error-200 hover:border-error-300 hover:shadow-md hover:-translate-y-0.5
        focus:ring-error-500 active:bg-error-300 active:border-error-400
        disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-200
      `,
      
      // === SPECIAL POY VARIANTS ===
      warm: `
        bg-gradient-to-r from-sunset-500 to-sunset-600 text-white shadow-md border-sunset-600
        hover:from-sunset-600 hover:to-sunset-700 hover:shadow-lg hover:-translate-y-0.5
        focus:ring-sunset-500 active:translate-y-0 active:from-sunset-700 active:to-sunset-800
        disabled:from-neutral-300 disabled:to-neutral-400 disabled:border-neutral-400
      `,
      
      sage: `
        bg-gradient-to-r from-sage-500 to-sage-600 text-white shadow-md border-sage-600
        hover:from-sage-600 hover:to-sage-700 hover:shadow-lg hover:-translate-y-0.5
        focus:ring-sage-500 active:translate-y-0 active:from-sage-700 active:to-sage-800
        disabled:from-neutral-300 disabled:to-neutral-400 disabled:border-neutral-400
      `,
      
      ocean: `
        bg-gradient-to-r from-ocean-500 to-ocean-600 text-white shadow-md border-ocean-600
        hover:from-ocean-600 hover:to-ocean-700 hover:shadow-lg hover:-translate-y-0.5
        focus:ring-ocean-500 active:translate-y-0 active:from-ocean-700 active:to-ocean-800
        disabled:from-neutral-300 disabled:to-neutral-400 disabled:border-neutral-400
      `,
    },
    
    // === BUTTON STATES ===
    states: {
      active: `
        ring-2 ring-primary-500 ring-offset-2 shadow-lg transform scale-105
      `,
      inactive: `
        opacity-75 hover:opacity-100
      `,
      loading: `
        cursor-wait opacity-75
      `,
      pressed: `
        transform scale-95 shadow-sm
      `,
    },
    
    sizes: {
      xs: 'px-2.5 py-1.5 text-xs min-h-[28px]',
      sm: 'px-3 py-2 text-sm min-h-[32px]',
      md: 'px-4 py-2.5 text-sm min-h-[36px]',
      lg: 'px-6 py-3 text-base min-h-[44px]',
      xl: 'px-8 py-4 text-lg min-h-[52px]',
    }
  },
  
  // Input styles
  input: {
    base: `
      block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2
      text-neutral-900 placeholder-neutral-500 transition-colors duration-200
      focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
      disabled:bg-neutral-50 disabled:text-neutral-500
    `,
    
    error: `
      border-error-300 focus:border-error-500 focus:ring-error-500
    `,
  },
  
  // Card styles
  card: {
    base: `
      bg-background-elevated rounded-2xl border border-neutral-200 shadow-sm
      transition-all duration-200
    `,
    
    interactive: `
      hover:shadow-md hover:-translate-y-0.5 cursor-pointer
    `,
    
    elevated: `
      shadow-lg border-neutral-100
    `,
    
    // POY-specific card styles
    book: `
      bg-gradient-to-br from-secondary-50 to-secondary-100 
      border border-secondary-200 shadow-book-page
      position-relative overflow-hidden
    `,
    
    warm: `
      bg-gradient-to-br from-primary-50 to-primary-100
      border border-primary-200 shadow-warm-md
    `,
  },
  
  // Navigation styles
  nav: {
    item: `
      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
      transition-all duration-200 cursor-pointer
    `,
    
    active: `
      bg-primary-100 text-primary-800 shadow-sm border-l-4 border-primary-500
    `,
    
    inactive: `
      text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900
    `,
  },
  
  // Modal styles
  modal: {
    overlay: `
      fixed inset-0 bg-black/60 backdrop-blur-sm z-50
      flex items-center justify-center p-4
    `,
    
    content: `
      bg-background-elevated rounded-2xl shadow-2xl max-w-md w-full
      max-h-[90vh] overflow-y-auto
    `,
  },
  
  // Badge styles
  badge: {
    base: `
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
    `,
    
    variants: {
      primary: 'bg-primary-100 text-primary-800',
      secondary: 'bg-secondary-100 text-secondary-800',
      success: 'bg-semantic-success-100 text-semantic-success-800',
      warning: 'bg-semantic-warning-100 text-semantic-warning-800',
      error: 'bg-semantic-error-100 text-semantic-error-800',
      info: 'bg-semantic-info-100 text-semantic-info-800',
      neutral: 'bg-neutral-100 text-neutral-800',
    }
  }
};

// ===== LAYOUT GRID =====
export const layout = {
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  grid: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    },
    
    gap: {
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8',
    }
  }
};

// ===== BREAKPOINTS =====
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ===== Z-INDEX SCALE =====
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Export the complete design system
export const designSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  components,
  layout,
  breakpoints,
  zIndex,
};

export default designSystem;
