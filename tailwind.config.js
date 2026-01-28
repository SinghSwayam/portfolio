/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: ['class', '[data-theme="dark"]'], // Optional explicit support
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",

        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--color-secondary)",

        "card-bg": "var(--card-bg)",
        "card-border": "var(--card-border)",
        "accent": "var(--accent)",
        "accent-purple": "#915EFF",
        "accent-blue": "#00d8ff",
      },
    },
  },
  plugins: [],
};