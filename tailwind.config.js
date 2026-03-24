/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          50:  "#f5f0eb",
          100: "#e8ddd3",
          200: "#d0bba8",
          300: "#b5957c",
          400: "#9e7459",
          500: "#8a5e42",
          600: "#704b34",
          700: "#58392a",
          800: "#3d2820",
          900: "#231614",
        },
        parchment: {
          50:  "#fdfaf5",
          100: "#faf3e8",
          200: "#f4e5cc",
          300: "#edd3aa",
          400: "#e4bc83",
          500: "#d9a45e",
        },
        slate: {
          night: "#1a1a2e",
          deep: "#16213e",
          mid:  "#0f3460",
        }
      },
      boxShadow: {
        paper: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)",
        "paper-hover": "0 4px 12px rgba(0,0,0,0.12), 0 16px 40px rgba(0,0,0,0.1)",
        lift: "0 20px 60px rgba(0,0,0,0.15)",
      },
      animation: {
        "fade-in":    "fadeIn 0.3s ease-out",
        "slide-up":   "slideUp 0.35s cubic-bezier(0.16,1,0.3,1)",
        "scale-in":   "scaleIn 0.2s ease-out",
        "float":      "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        scaleIn: { from: { opacity: 0, transform: "scale(0.95)" }, to: { opacity: 1, transform: "scale(1)" } },
        float:   { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-6px)" } },
      },
    },
  },
  plugins: [],
};
