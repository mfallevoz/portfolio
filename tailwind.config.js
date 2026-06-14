/** @type {import('tailwindcss').Config} */
module.exports = {
  // On scanne le HTML, le JS et les fichiers de langue pour capter
  // toutes les classes, y compris celles injectées dynamiquement en JS.
  content: ['./index.html', './script.js', './lang/*.js'],
  theme: { extend: {} },
  plugins: [],
};
