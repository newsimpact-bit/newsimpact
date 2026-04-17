/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SavoirFaire-inspired palette
        'sf': {
          // Charcoal (primary)
          'dark': '#222222',
          'dark-lighter': '#333333',

          // Whites & Grays (backgrounds)
          'white': '#ffffff',
          'light': '#f8f8f8',
          'gray': '#ededed',
          'gray-medium': '#d4d4d4',
          'gray-dark': '#999999',

          // Accents
          'orange': '#FA5D29',      // Primary CTA
          'blue': '#49B3FC',        // Secondary
          'purple': '#A084DC',
          'green': '#2ED9B8',
          'yellow': '#FFD93D',
        }
      },
      fontFamily: {
        'sans': ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['24px', '32px'],
        '2xl': ['32px', '40px'],
        '3xl': ['48px', '56px'],
      },
      spacing: {
        'gutter': '20px',
        'pad-inner': '52px',
      },
      backgroundColor: {
        'default': '#f8f8f8',
      },
      borderColor: {
        'default': '#ededed',
      }
    },
  },
  plugins: [],
}
