/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'monospace'],
        'elegant': ['Crimson Text', 'Georgia', 'serif'],
      },
      colors: {
        pitch: {
          black: '#000000',
          dark: '#0a0a0a',
          darker: '#050505',
          light: '#1a1a1a',
          border: '#1f1f1f',
          hover: '#2a2a2a',
        },
        elegant: {
          white: '#ffffff',
          cream: '#fafafa',
          silver: '#e5e5e5',
          muted: '#a0a0a0',
          dim: '#707070',
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    }
  },
  plugins: [],
};
