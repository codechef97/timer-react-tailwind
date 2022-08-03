/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes:{
        gradient:{
          '0%': "background-position 0% 50%",
          '50%': "background-positin 100% 50%",
          '100%' : "background-position 0% 50%"
        }
      },
      animation:{
        'grad-effect' : "gradient 5s ease infinite"
      }
    },
  },
  plugins: [],
}
