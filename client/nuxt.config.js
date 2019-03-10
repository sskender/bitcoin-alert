module.exports = {
  head: {
    title: 'Quotes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Bitcoind Alert - best place to keep your coins in check',
      }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css' }
    ]
  },
  css: [
    '@/assets/main.css'
  ],
  modules: [
    '@nuxtjs/vuetify'
  ]
}