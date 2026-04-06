/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: ['class', '[data-theme="dark"]'],

  safelist: [
    {
    pattern: /^bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900)$/,
    pattern: /^text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900)$/,
    },
    "text-white",
    "text-black",
    "bg-white",
    "bg-black",
    "bg-white",
    "bg-blue-600",
    "bg-cyan-400",
    "bg-emerald-500",
    "bg-sky-400",
    "bg-yellow-400",
    "bg-orange-400",
    "bg-purple-400",
    "bg-gray-400",
    "bg-green-600",
  ],

  theme: {
    extend: {
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        "nb-bg": "var(--nb-bg)",
        "nb-surface": "var(--nb-surface)",
        "nb-surface-2": "var(--nb-surface-2)",
        "nb-border": "var(--nb-border)",
        "nb-border-muted": "var(--nb-border-muted)",
        "nb-accent": "var(--nb-accent)",
        "nb-accent-2": "var(--nb-accent-2)",
        "nb-accent-3": "var(--nb-accent-3)",
        "nb-text": "var(--nb-text)",
        "nb-muted": "var(--nb-muted)",

        primary: "var(--nb-bg)",
        secondary: "var(--nb-muted)",
        tertiary: "var(--nb-surface)",

        "text-primary": "var(--nb-text)",
        "text-secondary": "var(--nb-muted)",
      },
    },
  },
  plugins: [],
};