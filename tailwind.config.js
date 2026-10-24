/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        grow: "#10B981",
        connect: "#3B82F6",
        experience: "#F59E0B",
        impact: "#EF4444",
      },
    },
  },
  plugins: [],
};