import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgMain: "#f4f1ea",
        bgAccent: "#d8e6d6",
        surface: "#fffdf8",
        surfaceSoft: "#f4f7f2",
        textMain: "#22201c",
        textMuted: "#5a564d",
        line: "#ddd4c8",
        brand: "#2f5d43",
        brandSoft: "#5b896f",
        danger: "#a74231",
      },
      borderRadius: {
        panel: "14px",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "Segoe UI", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      boxShadow: {
        panel: "0 8px 30px rgb(34 32 28 / 7%)",
        button: "0 8px 20px rgb(47 93 67 / 28%)",
      },
    },
  },
  plugins: [],
}

export default config
