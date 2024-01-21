/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: ({theme}) => ({
        bronzeBorder: `linear-gradient(
          30deg,
          #591D11 0,
          #7B3929 22%, 
          #D08568 45%,
          #F7DED5 50%,
          #D08568 55%,
          #7B3929 78%,
          #591D11 100%
          )`,
        silverBorder: `linear-gradient(
            30deg,
            #a6a6a6 0,
            #e0e0e0 22%, 
            #f5f5f5 45%,
            #f5f5f5 50%,
            #f5f5f5 55%,
            #e0e0e0 78%,
            #a6a6a6 100%
          )`,
        goldBorder: `linear-gradient(
          30deg,
          #462523 0,
          #cb9b51 22%, 
          #f6e27a 45%,
          #f6f2c0 50%,
          #f6e27a 55%,
          #cb9b51 78%,
          #462523 100%
          );`,
        mythicBorder: `linear-gradient(
          30deg,
          #2DEFF0 0,
          #707BCF 22%, 
          #899CD6 45%,
          #B8CBD0 50%,
          #899CD6 55%,
          #707BCF 78%,
          #2DEFF0 100%
          );`,
      }),
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

