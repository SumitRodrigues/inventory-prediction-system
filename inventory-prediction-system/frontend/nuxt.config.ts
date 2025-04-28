// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css','vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  devtools: { enabled: false },
  ssr: false,
  plugins: ['~/plugins/vuetify.js','~/plugins/google-maps.js'],
  postcss: {
    plugins: {
      tailwindcss: {
        viewer: false,
      },
      autoprefixer: {},
    },
  },

  colorMode: {
    preference: 'light'
  },

  modules: ["@nuxt/ui"]
})