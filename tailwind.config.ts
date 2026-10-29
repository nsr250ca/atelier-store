import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Color System - Luxury neutrals with editorial accent
      colors: {
        // Core neutrals - warm grays for sophistication
        neutral: {
          25: '#fafafa',
          50: '#f5f5f5',
          100: '#ececec',
          200: '#d9d9d9',
          300: '#bdbdbd',
          400: '#9e9e9e',
          500: '#757575',
          600: '#5c5c5c',
          700: '#484848',
          800: '#3a3a3a',
          900: '#262626',
          950: '#141414',
        },
        // Editorial black/white
        ink: '#0a0a0a',
        paper: '#fafafa',
        cream: '#fdfcf7',
        // Signature accent - deep emerald (luxury, not bright)
        accent: {
          50: '#f0f7f4',
          100: '#dceadf',
          200: '#bcd5c2',
          300: '#8ebc9a',
          400: '#5d9e70',
          500: '#3d824f',
          600: '#2f683f',
          700: '#265032',
          800: '#20402a',
          900: '#1d3525',
          950: '#0d1c13',
        },
        // Gold accent for highlights
        gold: {
          50: '#fdf8f0',
          100: '#faf0e0',
          200: '#f3dbc1',
          300: '#eac088',
          400: '#e1a155',
          500: '#d8862f',
          600: '#c46d1f',
          700: '#9d531c',
          800: '#7d441d',
          900: '#66391d',
          950: '#381d0e',
        },
        // Semantic colors
        success: {
          light: '#2e7d32',
          DEFAULT: '#1b5e20',
          dark: '#0d3b12',
        },
        warning: {
          light: '#f57f17',
          DEFAULT: '#e65100',
          dark: '#bf360c',
        },
        error: {
          light: '#c62828',
          DEFAULT: '#b71c1c',
          dark: '#7f1111',
        },
      },

      // Typography - Editorial serif for headlines, clean sans for UI
      fontFamily: {
        // Editorial serif for headlines (Gucci-style elegance)
        display: ['var(--font-display)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        // Clean sans for body/UI (modern, readable)
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Monospace for technical
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monospace'],
      },
      fontSize: {
        // Fluid type scale using clamp for responsive headlines
        'display-xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '400' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '400' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '0', fontWeight: '400' }],
        'headline-lg': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.25', letterSpacing: '0', fontWeight: '500' }],
        'headline-md': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '500' }],
        'headline-sm': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.35', letterSpacing: '0', fontWeight: '500' }],
        'title-lg': '1.125rem',
        'title-md': '1rem',
        'title-sm': '0.875rem',
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],
        'body-md': ['1rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'overline': ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },

      // Spacing - Generous, editorial whitespace scale
      spacing: {
        '0': '0',
        'px': '1px',
        '0.5': '0.125rem',  // 2px
        '1': '0.25rem',     // 4px
        '1.5': '0.375rem',  // 6px
        '2': '0.5rem',      // 8px
        '2.5': '0.625rem',  // 10px
        '3': '0.75rem',     // 12px
        '3.5': '0.875rem',  // 14px
        '4': '1rem',        // 16px
        '5': '1.25rem',     // 20px
        '6': '1.5rem',      // 24px
        '7': '1.75rem',     // 28px
        '8': '2rem',        // 32px
        '9': '2.25rem',     // 36px
        '10': '2.5rem',     // 40px
        '11': '2.75rem',    // 44px
        '12': '3rem',       // 48px
        '14': '3.5rem',     // 56px
        '16': '4rem',       // 64px
        '20': '5rem',       // 80px
        '24': '6rem',       // 96px
        '28': '7rem',       // 112px
        '32': '8rem',       // 128px
        '36': '9rem',       // 144px
        '40': '10rem',      // 160px
        '48': '12rem',      // 192px
        '56': '14rem',      // 224px
        '64': '16rem',      // 256px
      },

      // Container widths - editorial max-widths
      maxWidth: {
        'container-xs': '20rem',   // 320px
        'container-sm': '24rem',   // 384px
        'container-md': '28rem',   // 448px
        'container-lg': '32rem',   // 512px
        'container-xl': '36rem',   // 576px
        'container-2xl': '42rem',  // 672px
        'container-3xl': '48rem',  // 768px
        'container-4xl': '56rem',  // 896px
        'container-5xl': '64rem',  // 1024px
        'container-6xl': '72rem',  // 1152px
        'container-7xl': '80rem',  // 1280px
        'container-full': '100%',
        // Editorial content widths
        'prose-sm': '36rem',       // 576px - narrow reading
        'prose-md': '42rem',       // 672px
        'prose-lg': '48rem',       // 768px
        'prose-xl': '56rem',       // 896px
        'prose-2xl': '64rem',      // 1024px
      },

      // Border radius - subtle, refined
      borderRadius: {
        'none': '0',
        'hairline': '1px',
        'xs': '0.125rem',   // 2px
        'sm': '0.25rem',    // 4px
        'DEFAULT': '0.375rem', // 6px
        'md': '0.5rem',     // 8px
        'lg': '0.75rem',    // 12px
        'xl': '1rem',       // 16px
        '2xl': '1.5rem',    // 24px
        'full': '9999px',
      },

      // Border widths - hairline elegance
      borderWidth: {
        '0': '0',
        'hairline': '1px',
        'DEFAULT': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },

      // Shadows - subtle, layered depth
      boxShadow: {
        'none': 'none',
        'hairline': '0 1px 0 0 rgb(0 0 0 / 0.04)',
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.03), 0 1px 1px -1px rgb(0 0 0 / 0.03)',
        'sm': '0 2px 4px -1px rgb(0 0 0 / 0.04), 0 1px 2px -2px rgb(0 0 0 / 0.03)',
        'DEFAULT': '0 4px 8px -2px rgb(0 0 0 / 0.05), 0 2px 4px -3px rgb(0 0 0 / 0.04)',
        'md': '0 12px 24px -4px rgb(0 0 0 / 0.06), 0 4px 8px -4px rgb(0 0 0 / 0.04)',
        'lg': '0 20px 40px -8px rgb(0 0 0 / 0.08), 0 8px 16px -6px rgb(0 0 0 / 0.05)',
        'xl': '0 32px 64px -12px rgb(0 0 0 / 0.1), 0 12px 24px -8px rgb(0 0 0 / 0.06)',
        '2xl': '0 48px 96px -16px rgb(0 0 0 / 0.12), 0 16px 32px -10px rgb(0 0 0 / 0.07)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.03)',
        'inner-lg': 'inset 0 8px 16px -4px rgb(0 0 0 / 0.05)',
        // Editorial elevation shadows
        'elevate-1': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.03)',
        'elevate-2': '0 4px 12px -2px rgb(0 0 0 / 0.05), 0 2px 6px -2px rgb(0 0 0 / 0.03)',
        'elevate-3': '0 12px 28px -4px rgb(0 0 0 / 0.06), 0 4px 12px -3px rgb(0 0 0 / 0.04)',
        'elevate-4': '0 24px 48px -8px rgb(0 0 0 / 0.08), 0 8px 20px -6px rgb(0 0 0 / 0.05)',
      },

      // Transitions - refined, purposeful
      transitionDuration: {
        '0': '0ms',
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        // Editorial spring curves
        'spring-gentle': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring-snappy': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'expo-in': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      },

      // Z-index - layered hierarchy
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'dropdown': '100',
        'sticky': '200',
        'overlay': '300',
        'modal': '400',
        'popover': '500',
        'tooltip': '600',
        'toast': '700',
      },

      // Opacity - refined steps
      opacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '85': '0.85',
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      },

      // Scale - subtle transforms
      scale: {
        '90': '0.9',
        '95': '0.95',
        '98': '0.98',
        '100': '1',
        '102': '1.02',
        '105': '1.05',
        '110': '1.1',
      },

      // Letter spacing - editorial tracking
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
        'widest': '0.04em',
        'overline': '0.1em',
        'caps': '0.08em',
      },

      // Line height - refined reading
      lineHeight: {
        'none': '1',
        'tight': '1.1',
        'snug': '1.25',
        'normal': '1.5',
        'relaxed': '1.65',
        'loose': '1.8',
        'editorial': '1.75',
      },

      // Screen breakpoints - editorial responsive
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
        '3xl': '1680px',
        '4xl': '1920px',
        // Tall screens
        'tall': { 'raw': '(min-height: 800px)' },
        // Print
        'print': { 'raw': 'print' },
      },

      // Animation - refined motion
      animation: {
        'none': 'none',
        'spin': 'spin 1s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        // Editorial animations
        'fade-in': 'fadeIn 0.4s cubic-bezier(0, 0, 0.2, 1) forwards',
        'fade-out': 'fadeOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-left': 'slideLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-right': 'slideRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-out': 'scaleOut 0.2s cubic-bezier(0.4, 0, 1, 1) forwards',
        'reveal': 'reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(1.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-1.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(1.5rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-1.5rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.96)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(2rem)', clipPath: 'inset(100% 0 0 0)' },
          '100%': { opacity: '1', transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      // Background image - gradients and patterns
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Editorial gradients
        'gradient-ink': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
        'gradient-paper': 'linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)',
        'gradient-cream': 'linear-gradient(180deg, #fdfcf7 0%, #f5f2ea 100%)',
        'gradient-accent': 'linear-gradient(135deg, #1d3525 0%, #265032 50%, #3d824f 100%)',
        'gradient-gold': 'linear-gradient(135deg, #381d0e 0%, #9d531c 50%, #eac088 100%)',
        'gradient-subtle': 'linear-gradient(180deg, transparent 0%, rgb(0 0 0 / 0.03) 100%)',
        // Noise texture
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },

      // Background size
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '300%': '300%',
        '400%': '400%',
      },

      // Blur - for glassmorphism
      backdropBlur: {
        'none': '0',
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },

      // Ring - focus states
      ringWidth: {
        '0': '0px',
        '1': '1px',
        '2': '2px',
        'DEFAULT': '2px',
        '4': '4px',
        '8': '8px',
      },
      ringOffsetWidth: {
        '0': '0px',
        '1': '1px',
        '2': '2px',
        'DEFAULT': '2px',
        '4': '4px',
        '8': '8px',
      },

      // Content - for pseudo-elements
      content: {
        'empty': "''",
        'chevron': '"›"',
        'chevron-double': '"»"',
      },
    },
  },
  plugins: [],
}

export default config