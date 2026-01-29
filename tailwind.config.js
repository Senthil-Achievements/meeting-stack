/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0E1A",
          secondary: "#1A1F2E",
          elevated: "#242936",
          hover: "#2D3344",
        },
        accent: {
          primary: "#FFB84D",
          hover: "#FFA733",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
        semantic: {
          success: "#10B981",
          error: "#EF4444",
          warning: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
    },
  },
  plugins: [],
};
