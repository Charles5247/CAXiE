/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea", // Primary brand color
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        typewriter: "typewriter 3s steps(20) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(10, 4, 20, 0.78) 0%, rgba(40, 10, 65, 0.85) 22%, rgba(15, 6, 28, 0.9) 55%, rgba(0, 0, 0, 0.95) 100%)",
        "section-gradient": "linear-gradient(180deg, #0f0a1a 0%, #1a0f2e 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(109, 40, 217, 0.05) 100%)",
        "lay-gradient": "linear-gradient(rgba(15, 10, 26, 0.57))",
      },
      boxShadow: {
        brand: "0 4px 24px rgba(147, 51, 234, 0.3)",
        "brand-lg": "0 8px 40px rgba(147, 51, 234, 0.4)",
        card: "0 2px 16px rgba(0,0,0,0.3)",
        "card-hover": "0 8px 40px rgba(147, 51, 234, 0.2)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
