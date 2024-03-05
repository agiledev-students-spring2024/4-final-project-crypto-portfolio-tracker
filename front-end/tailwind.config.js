/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkmode: false,
  theme: {
    extend: {
      colors: {
        primary:'#14213D',
        'orange-dark':'#DE8A02',
        'orange-light':'#F29602',
      },
    },
  },
  plugins: [],
}

