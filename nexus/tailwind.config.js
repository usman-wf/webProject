/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "scrollbar-thumb": "#888",
        "scrollbar-track": "#f1f1f1",
      },
      scrollbar: {
        thin: "8px",
        thick: "16px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    // colors: {
    //   // primary: "#0F172A",
    //   // primary_bg: "#6B7280",
    //   primary_2: "#e6f85e",
    // },
  },
  plugins: [require("tailwind-scrollbar")],
};
