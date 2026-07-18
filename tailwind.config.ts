import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFDF8",
        blush: "#FBE9E7",
        peach: "#FFF1E6",
        skyPastel: "#EAF4FF",
        lavender: "#F3EEFF",
        champagne: "#D9B26F",
        terracottaRose: "#DFA5A5",
        jade: "#A8D5D0",
        inkBrown: "#5C4B51",
        warmGray: "#7A6E73",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      backgroundImage: {
        "aurora-1":
          "radial-gradient(circle at 20% 20%, rgba(217,178,111,0.25), transparent 55%), radial-gradient(circle at 80% 30%, rgba(223,165,165,0.25), transparent 55%), radial-gradient(circle at 50% 80%, rgba(168,213,208,0.22), transparent 55%)",
        "paper-grain":
          "linear-gradient(180deg, rgba(255,253,248,0.9), rgba(255,241,230,0.9))",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        driftX: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        petalFall: {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(360deg)", opacity: "0" },
        },
        auroraShift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.08)" },
        },
      },
      animation: {
        floatY: "floatY 6s ease-in-out infinite",
        driftX: "driftX 8s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        petalFall: "petalFall linear infinite",
        auroraShift: "auroraShift 18s ease-in-out infinite",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(92,75,81,0.25)",
        glass: "0 8px 32px rgba(217,178,111,0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
