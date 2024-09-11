/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
const { nextui } = require("@nextui-org/react");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        550: "500",
      },
      fontFamily: {
        goto: ["GoTo Sans", "sans-serif"],
        pandore: ["Pandore", "sans-serif"],
        daviton: ["Daviton", "sans-serif"],
        raneg: ["Raneg"],
        homizio: ["Homizio"],
        opensauce: ["Open Sauce One"],
        bauhaus: ["Bauhaus"],
        murmure: ["Murmure"],
        soria: ["Soria"],
        magilio: ["Magilio"],
      },
      screens: {
        xs: "280px", // Contoh konfigurasi custom
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(60%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [daisyui, nextui(), require("@tailwindcss/forms")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
