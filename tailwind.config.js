/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#007bff',
        'brand-navy': '#003366',
        'brand-light': '#f8f9fa',
        'brand-dark': '#343a40', // Used in body
        'cars-blue-light': '#60a5fa', // Example accent
        'cars-blue-dark': '#1e3a8a', // Example accent
        'cars-gray-nav': '#1f2937', // Navbar bg
        'cars-gray-section': '#374151', // Section bg
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'slide-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        }
      }
    },
  },
  plugins: [],
}
