/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#F2F2F2', 
        secondary: '#B3B3B3',
        dark: '#333333',
        light: '#FFFFFF',
        background: '#121212',
        card_background: '#202020',
        button : '#3479E4', 
        cover_fade: '#121212 10%',
      }
    },
  },
  plugins: [],
}

