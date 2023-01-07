/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow:{
        '3xl':"0px 1px 81px 10px rgba(0,0,0,0.6)",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
