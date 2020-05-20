import 'babel-polyfill';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import { router } from '@/router';
import store from '@/store/store';
import { ThemeOptions } from 'vuetify/types/services/theme';

Vue.config.productionTip = false;

const vuetifyOptions: ThemeOptions = {
  dark: false,
  themes: {
    light: {
      primary: '#ee8a3c',
      secondary: '#3d5386',
      error: '#b71c1c',
      background: '#fff',
      anchor: '#ee8a3c'
    }
  }
};

Vue.use(Vuetify, {
  icons: {
    iconfont: 'md'
  }
});

const vuetify = new Vuetify(vuetifyOptions);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
