/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      cursor:{
        'fancy': 'url(/cursor_28.png), auto',
      },
      borderRadius:{
        'fancy':'28px'
      }
    },
  },
  plugins: [],
};
