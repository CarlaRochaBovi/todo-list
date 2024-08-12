/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Montserrat",
      },

    },
    screens: {
      'lg': '1100px',
      'md': '820px',
      'sm': '620px'
    }
  },
  plugins: [],
}

