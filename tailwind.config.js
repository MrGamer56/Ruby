/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        blush: '#FFE5E5',
        velvet: '#8B1538',
        milk: '#FFF8F0',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 10px 40px rgba(139, 21, 56, 0.1)',
      },
      animation: {
        'float-up': 'float-up 12s ease-in-out infinite',
      },
      keyframes: {
        'float-up': {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.3' },
          '50%': { transform: 'translateY(-50vh) translateX(20px) rotate(15deg)', opacity: '0.2' },
          '90%': { opacity: '0.1' },
          '100%': { transform: 'translateY(-100vh) translateX(-30px) rotate(-10deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}