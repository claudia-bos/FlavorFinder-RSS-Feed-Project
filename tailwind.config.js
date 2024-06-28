/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#a5a58d',
        hoverGreen: '#283618',
        headerGreen: '#777677',
        backGroundColor: '#bdbbb5',
        heartColor: '#ae2012',
        heartHover: '#f07167',
        loginContainer: '#f1faee',
        textColor: '#edf2f4',
        box: '#4a4a47',
        button:'#aacc00',
        hoverb: '#80b918'
      },
      fontFamily: {
        'garamond': ['"EB Garamond"', 'serif'],
        'comic-sans': ['"Comic Sans MS"', 'cursive'],
        'brush-script': ['"Brush Script MT"', 'cursive'],
      },
      backgroundImage: {
        'landscape': "url('/food.jpg')",
      },
    },
  },
  plugins: [],
}

