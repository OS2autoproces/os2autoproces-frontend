import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./registerServiceWorker";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

// TODO: change to autoprocess colors
Vue.use(Vuetify, {
  theme: {
    primary: "#F5AF30",
    secondary: "#3C546C",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
