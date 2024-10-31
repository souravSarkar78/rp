export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  app: {
    head: {
      title: 'Writers Hub',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  tailwindcss: {
    config: {
      darkMode: 'class'
    }
  },

  compatibilityDate: '2024-10-31'
})