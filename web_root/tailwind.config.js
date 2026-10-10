
/** @type {import('tailwindcss').Config} */
module.exports = {
  // dark: variants (used in a few components) follow the theme switch, not the OS setting
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "*.{html,js,css}",
    "Tabs/**/*.{html,js}",
    "Modals/**/*.{html,js}",
    "icons/**/*.{html,js}",
    "!./theme.css",
    "!./background.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

