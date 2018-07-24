import 'babel-polyfill';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import { router } from '@/router';
import store from '@/store/store';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#ee8a3c',
    secondary: '#3d5386',
    error: '#b71c1c',
    background: '#fff'
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

