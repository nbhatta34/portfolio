// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      Outfit: [400, 500, 600, 700],
    },
    display: 'swap'
  },

  build: {
    transpile: ['gsap']
  },

  css: ['~/assets/css/tailwind.css']
})
