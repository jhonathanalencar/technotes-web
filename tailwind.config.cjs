/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'home-background': "url('./src/assets/home-background.jpg')",
      },
    },
  },
  plugins: [],
};
