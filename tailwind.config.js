/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],

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
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        "bh-bg":     "var(--bh-bg)",
        "bh-fg":     "var(--bh-fg)",
        "bh-red":    "var(--bh-red)",
        "bh-blue":   "var(--bh-blue)",
        "bh-yellow": "var(--bh-yellow)",
        "bh-muted":  "var(--bh-muted)",
        "bh-border": "var(--bh-border)",

        // Keep alias names so any stray Tailwind refs don't crash
        primary:   "var(--bh-bg)",
        secondary: "var(--bh-muted)",
        tertiary:  "var(--bh-muted)",

        "text-primary":   "var(--bh-fg)",
        "text-secondary": "var(--bh-fg)",
      },
    },
  },
  plugins: [],
};