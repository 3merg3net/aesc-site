/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        aesc: {
          bg: "#0A0F13",
          panel: "#12171D",
          text: "#E7ECEF",
          sub: "#9BA7B4",
          blue: "#1253FF",
          gold: "#E4C476"
        }
      },
      borderRadius: { xl2: "1rem" },
      boxShadow: {
        soft: "0 1px 0 rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.02)"
      }
    }
  },
  plugins: []
};




