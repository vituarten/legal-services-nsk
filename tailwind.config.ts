import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        orbit: {
          "0%": {
            transform: "rotate(0deg) translateX(120px) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateX(120px) rotate(-360deg)",
          },
        },
        // ДОБАВЛЕНО: Медленный пульс для фона
        "pulse-slow": {
          "0%, 100%": {
            opacity: "0.2",
          },
          "50%": {
            opacity: "0.3",
          },
        },
        // ДОБАВЛЕНО: Медленный пинг для точек
        "ping-slow": {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
        // ДОБАВЛЕНО: Фоновая пульсация для сетки
        "grid-pulse": {
          "0%, 100%": {
            opacity: "0.1",
          },
          "50%": {
            opacity: "0.15",
          },
        },
        // ДОБАВЛЕНО: Плавное появление
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        // ДОБАВЛЕНО: Плавное появление слева
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        // ДОБАВЛЕНО: Плавное появление справа
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        // ДОБАВЛЕНО: Увеличение масштаба
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 8s linear infinite",
        orbit: "orbit 10s linear infinite",
        // ДОБАВЛЕНО: Новые анимации
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "grid-pulse": "grid-pulse 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "fade-in-left": "fade-in-left 0.8s ease-out",
        "fade-in-right": "fade-in-right 0.8s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
      },
      // ДОБАВЛЕНО: Кастомные задержки анимаций
      animationDelay: {
        "100": "100ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
        "900": "900ms",
        "1000": "1000ms",
        "1100": "1100ms",
        "1200": "1200ms",
        "1300": "1300ms",
        "1400": "1400ms",
        "1500": "1500ms",
      },
      // ДОБАВЛЕНО: Кастомная длительность
      animationDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
        "4000": "4000ms",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // ДОБАВЛЕНО: Плагин для анимационных задержек
    function ({ addUtilities, theme }) {
      const delays = theme("animationDelay", {});
      const newUtilities = {};

      Object.entries(delays).forEach(([key, value]) => {
        newUtilities[`.animation-delay-${key}`] = {
          "animation-delay": value,
        };
      });

      addUtilities(newUtilities);
    },
    // ДОБАВЛЕНО: Плагин для анимационных длительностей
    function ({ addUtilities, theme }) {
      const durations = theme("animationDuration", {});
      const newUtilities = {};

      Object.entries(durations).forEach(([key, value]) => {
        newUtilities[`.animation-duration-${key}`] = {
          "animation-duration": value,
        };
      });

      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
