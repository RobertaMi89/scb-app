/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",'./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'tablet': '600px', 
        'tablet-md': '900px', 
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}

