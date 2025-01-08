/** @type {import('tailwindcss').Config} */

export default {
  important: true,
  content: ["./src/**/*.{js,jsx}"],
  plugins: [require("daisyui")],

  themeConfig: [],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },
      colors: {
        "primary-red": "#FF3E1D",
        "primary-yellow": "#ffb112",
        "primary-blue": "#03c3ec",
        "primary-light": "#21284165",
      },
    },
  },

  daisyui: {
    themes: [
      {
        light: {
          dark: "",
          primary: "#212841",
          secondary: "#71DD37",
          "base-100": "#F4F5FB",
        },
      },
    ],
  },
};
