import colors from 'vuetify/es5/util/colors'

export default {
  ssr:false,
  mode:'spa',
  server : {
    host:'127.0.0.1',
    port : 3001, //default 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Desa Sumbung',
    title: 'Welcome',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/persistedState.js', mode: 'client'},
    { src: '~/plugins/axiosintercept.js', mode: 'client'},
    {src: '~/plugins/fontawesome.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // prefix: 'http://apisurat.neraproject.icu',
    prefix: 'http://localhost:4001',
    proxy : true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    threeShake :true,
    theme: {
      dark: false,
      themes: {
        dark: {
          cream: "#F2ECBE",
          primary: colors.blue.darken2,
          accent: colors.grey.lighten3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  routes:[
    {
    path: 'users/:id',
    component : '~/pages/homeAdmin.vue'
    }
  ]
}
