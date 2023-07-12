/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
    },
    colors: {
      'purple-heart': {
        '50': '#fcf5ff',
        '100': '#f8e7ff',
        '200': '#f1d4ff',
        '300': '#e7b2ff',
        '400': '#d881ff',
        '500': '#c950fc',
        '600': '#b82eef',
        '700': '#961bc4',
        '800': '#871dac',
        '900': '#6e198a',
        '950': '#4e0467',
      }
    },
  },
  plugins: [],
}