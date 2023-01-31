/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'tech-background': "url('/src/assets/tech-background.jpg')",
      },
      screens: {
        xsm: { raw: '(min-width: 450px)' },
      },
    },
  },
  plugins: [],
};
