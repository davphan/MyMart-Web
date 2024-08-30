import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./libs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#65558F',
        'on_primary': '#FFFFFF',
        'primary_card': '#EADDFF',
        'on_primary_card': '#000000',
        'secondary': '#625B71',
        'on_secondary': '#363044',
      },
    },
  },
  plugins: [],
};
export default config;
