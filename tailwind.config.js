/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      display: ['brandon-grotesque', 'sans-serif'],
      body: ['freight-sans-pro', 'sans-serif'],
      blog: ['freight-text-pro', 'serif'],
    },
    extend: {
      colors: {
        'navy-blue': '#233044',
        'cornflower-blue': '#545977',
        waterloo: '#777C9B',
      },
    },
  },
  plugins: [],
};
