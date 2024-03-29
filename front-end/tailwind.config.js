/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    darkmode: false,
    theme: {
        extend: {
            colors: {
                'orange-dark': '#DE8A02',
                'orange-light': '#F29602',
                'dark-blue': '#14213D',
            },
        },
    },
    plugins: [],
}
