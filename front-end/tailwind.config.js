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
                'orange-gradient': 'rgba(253,126,29,1)',
                'orange-gradient-end': 'rgba(252,185,69,1)',
            },
        },
    },
    plugins: [],
}
