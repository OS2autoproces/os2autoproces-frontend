import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);
// Vue.use(Vuelidate);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
