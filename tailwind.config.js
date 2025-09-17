/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'neo': ['Arial Black', 'Arial', 'sans-serif'],
      },
      colors: {
        'neo-black': '#000000',
        'neo-white': '#FFFFFF',
        'neo-yellow': '#FACC15',
        'neo-blue': '#2563EB',
        'neo-pink': '#EC4899',
        'neo-green': '#4ADE80',
        'neo-gray': '#F3F4F6',
      },
      boxShadow: {
        'neo': '8px 8px 0 0 #000000',
        'neo-lg': '12px 12px 0 0 #000000',
        'neo-hover': '16px 16px 0 0 #000000',
      },
      borderWidth: {
        'neo': '4px',
      },
      transform: {
        'neo-hover': 'translate(-4px, -4px)',
      },
    },
  },
  plugins: [],
}