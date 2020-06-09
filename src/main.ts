import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import { VueMaskDirective } from 'v-mask';

import App from './App.vue';
import { router } from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

Vue.directive('mask', VueMaskDirective);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
