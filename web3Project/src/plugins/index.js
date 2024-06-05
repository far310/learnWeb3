/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
// web3 wagmi 导入
import { VueQueryPlugin } from '@tanstack/vue-query';
import { WagmiPlugin } from '@wagmi/vue';
import { config } from '@/config/webModal';

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(WagmiPlugin, { config })
    .use(VueQueryPlugin, {})
}
