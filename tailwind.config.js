module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "noteify-primary": "#2A4365", // Deep Blue
        "noteify-secondary": "#6B46C1", // Vibrant Purple
        "noteify-accent": "#D69E2E", // Warm Gold
        "noteify-bg-dark": "#1A202C", // Rich Dark Blue
        "noteify-bg-light": "#EDF2F7", // Soft Cream
        "noteify-highlight": "#F6AD55", // Warm Orange Accent
        "noteify-text-dark": "#2D3748",
        "noteify-text-light": "#E2E8F0",
      },
      animation: {
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "float-fast": "floatFast 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "fade-slide-up": "fadeSlideUp 1.2s ease-out",
        "orbit-complex": "orbitComplex 25s linear infinite",
        "scale-bounce": "scaleBounce 1.5s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 rgba(214, 158, 46, 0.4)" },
          "50%": { transform: "scale(1.03)", boxShadow: "0 0 15px rgba(214, 158, 46, 0.7)" },
        },
        fadeSlideUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        orbitComplex: {
          "0%": { transform: "rotate(0deg) translateX(0) rotate(0deg)" },
          "25%": { transform: "rotate(90deg) translateX(20px) rotate(-90deg)" },
          "50%": { transform: "rotate(180deg) translateX(0) rotate(-180deg)" },
          "75%": { transform: "rotate(270deg) translateX(-20px) rotate(-270deg)" },
          "100%": { transform: "rotate(360deg) translateX(0) rotate(-360deg)" },
        },
        scaleBounce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
};