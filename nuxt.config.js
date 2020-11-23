import axios from "axios";
export default {
  mode: 'universal',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Агенство «Единый Подрядчик» — строительство, ремонт и обслуживание зданий в Санкт-Петербурге.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  build: {
    extractCSS: true,
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { src: '@/static/style', lang: 'css'},
    { src: '@/static/_Auth', lang: 'scss'}
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/jwt.js' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/nuxt-fontawesome
    [
      'nuxt-fontawesome', {
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
      }
    ]
  ],
  // generate: {
  //     routes: function () {
  //       return axios.get('http://kvm3.krakhimov-it.m960m.vps.myjino.ru:49416/auth/getUsersId')
  //       .then((res) => {
  //         return res.data.map((user) => {
  //             return {
  //                 route: '/users/' + user.id,
  //                 payload: user
  //             }
  //         })
  //       })
  //     }
  // },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},


}
