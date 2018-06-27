import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import { routes } from './routes';
import store from './store/store';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#ee8a3c',
    secondary: '#3d5386',
    error: '#b71c1c',
    background: '#fff'
  }
});

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
