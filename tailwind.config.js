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
        // Exact colors from your main site
        'neo-pure-black': '#000000',
        'neo-pure-white': '#FFFFFF',
        'neo-electric-blue': '#2563EB',
        'neo-cyber-yellow': '#FACC15',
        'neo-hot-pink': '#EC4899',
        'neo-neon-green': '#4ADE80',
        'neo-gray': '#F3F4F6',
        
        // CSS variable compatibility
        'background': '#FFFFFF',
        'foreground': '#000000',
        'primary': '#2563EB',
      },
      boxShadow: {
        'neo': '8px 8px 0 0 #000000',
        'neo-lg': '12px 12px 0 0 #000000',
        'neo-hover': '16px 16px 0 0 #000000',
      },
      borderWidth: {
        'neo': '4px',
      },
    },
  },
  plugins: [],
}