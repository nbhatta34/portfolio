import type { Config } from 'tailwindcss'

export default <Config>{
  content: [],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#171717',
        primary: '#ffffff',
        accent: '#3b82f6',
        'accent-purple': '#a855f7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
