import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Home from "./views/Home.vue";
import Search from "./views/Search.vue";
import List from "./views/List.vue";
import ProcesForm from './views/ProcesForm.vue';

Vue.use(Router);

export const routes: RouteConfig[] = [
  { path: "/", component: Home },
  { path: "/details", component: ProcesForm },
  { path: "/search", component: Search },
  { path: "/list", component: List }
];

export default new Router({
  routes,
  mode: "history"
});
