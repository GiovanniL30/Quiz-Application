/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#B82222',
        lightGreen: '#3F8A54',
        darkerGreen: '#1A6930',
        whitish: '#DADADA',
        blackish: '#242424',
      },
    },
  },
  plugins: [],
}
