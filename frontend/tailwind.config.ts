import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./modules/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cyber: {
          cyan: "#13f7ff",
          blue: "#287dff",
          green: "#31ff9c",
          amber: "#ffd166",
          red: "#ff3b6b",
          violet: "#9d7dff",
          panel: "rgba(7, 15, 30, 0.72)",
        },
      },
      boxShadow: {
        glow: "0 0 24px rgba(19, 247, 255, 0.28)",
        "glow-blue": "0 0 40px rgba(40, 125, 255, 0.36)",
        "glow-red": "0 0 34px rgba(255, 59, 107, 0.36)",
      },
      backgroundImage: {
        "city-grid":
          "linear-gradient(rgba(19,247,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(19,247,255,0.08) 1px, transparent 1px)",
        "hud-radial":
          "radial-gradient(circle at 30% 20%, rgba(19,247,255,0.18), transparent 28%), radial-gradient(circle at 80% 10%, rgba(49,255,156,0.13), transparent 24%), radial-gradient(circle at 60% 80%, rgba(40,125,255,0.16), transparent 28%)",
      },
      keyframes: {
        pulseRoute: {
          "0%": { strokeDashoffset: "160", opacity: "0.35" },
          "50%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "0.35" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "pulse-route": "pulseRoute 3s linear infinite",
        scan: "scan 5s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
