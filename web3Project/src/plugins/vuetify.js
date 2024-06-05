/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// test custom import scss
// import '@/styles/main.scss'

// Composables
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    blueprint: md3,
  },
})
