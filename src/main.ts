import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import { VueMaskDirective } from 'v-mask';

// @ts-ignore
import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import 'tiptap-vuetify/dist/main.css';

import App from './App.vue';
import { router } from '@/router';
import store from '@/store/store';

Vue.config.productionTip = false;

Vue.directive('mask', VueMaskDirective);

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'md'
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
