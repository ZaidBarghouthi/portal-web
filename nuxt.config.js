const axios = require('axios');
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || 'JOSA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'onion-location', content: 'http://josavtlxyxjgeqbo.onion' },
      { hid: 'JOSA', name: 'description', content: process.env.npm_package_description || 'JOSA' },
      { name: 'robots', content:'all' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap' },
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap' },
      { rel:"stylesheet", href:"https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap"},
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css2?family=Markazi+Text:wght@400;700&display=swap' },
    ],
    script: [
      { src:'/js/matomo.js' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3897c0' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/fonts/aleo.css',
    '@/assets/css/fonts/bukra.css',
    '@/assets/css/fonts/naskh.css',
    '@/assets/css/typography.css',
    '@/assets/css/layout.css',
    '@/assets/css/global.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/datetime-filter' },
    { src: '~/plugins/vue2-filters' },
    { src: '~/plugins/string-filters' },
    { src: '~/plugins/i18n' },
    { src: '~/plugins/og-tags' },
    { src: '~/plugins/flash-message.js', mode: 'client' },
    { src: '~/plugins/leaflet', mode: 'client' },
    { src: '~/plugins/copy' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    'tailwindcss-dir'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-fontawesome',
    {
      imports: [
       {
         set: '@fortawesome/free-solid-svg-icons',
         icons: ['fas']
       },
       {
         set:'@fortawesome/free-brands-svg-icons',
         icons: ['fab']
       }
     ]
    }],
    'nuxt-i18n',
    '@nuxtjs/moment',
    '@nuxtjs/redirect-module',
    '@nuxtjs/sitemap',
    'nuxt-healthcheck',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en',
        file: 'en.js',
        name: 'English',
        dir: 'ltr'
      },
      {
        code: 'ar',
        iso: 'ar',
        file: 'ar.js',
        name: 'العربية',
        dir: 'rtl'
      }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    lazy: true,
    langDir: 'lang/',
    detectBrowserLanguage: false,
    baseUrl: 'https://jordanopensource.org',
    seo: true
  },
  moment: {
    defaultLocale: 'en',
    locales: ['ar']
  },
  redirect: [
    { from: '^/opendata', to: 'https://www.mynaparrot.com/en/my-classrooms/rooms?layout=login&roomId=1964&clientId=josa' }
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://josa.ngo',
    i18n: true,
    defaults: {
      lastmod: new Date()
    },
    routes: async () => {
      const articles = await axios.get('https://portal.api.jordanopensource.org/blogs')
      const events = await axios.get('https://portal.api.jordanopensource.org/events')
      const careers = await axios.get('https://portal.api.jordanopensource.org/careers')
      const publications = await axios.get('https://portal.api.jordanopensource.org/publications')
      const programs = await axios.get('https://portal.api.jordanopensource.org/programs')
      const infoPages = await axios.get('https://portal.api.jordanopensource.org/info-pages')

      const articlesRoutes = articles.data.map((article) => `${article.language == 'ar' ? '/ar':''}/blog/${article.id}`)
      const eventsRoutes = events.data.map((event) => `/events/${event.id}`)
      const careersRoutes = careers.data.map((career) => `/careers/${career.id}`)
      const publicationsRoutes = publications.data.map((publication) => `/publications/${publication.id}`)
      const programsRoutes = programs.data.map((program) => `/programs/${program.id}`)
      const infoPagesRoutes = infoPages.data.map((page) => `/info/${page.pageId}`)

      return [ ...articlesRoutes, ...eventsRoutes, ...careersRoutes, ...publicationsRoutes, ...programsRoutes, ...infoPagesRoutes]
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  env: {
    baseUrl: process.env.API_BASE_URL,
  },

  /*
  ** Healthcheck
  */
  healthcheck: {
    path: '/ping',
    contentType: 'application/json',
    healthy: () => {
      return JSON.stringify({ result: 'pong' })
    }
  },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  publicRuntimeConfig: {
    bbbAPIUrl: process.env.BBB_API_URL,
    bbbAPISecret: process.env.BBB_API_SECRET
  }
}
