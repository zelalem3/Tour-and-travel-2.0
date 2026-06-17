/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   themes: [
    {
      mytheme: {
        "primary": "#0ea5e9",   // sky blue (travel vibe)
        "secondary": "#22c55e", // green
      },
    },
  ],
  plugins: [],
};