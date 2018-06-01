import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import List from "./views/List.vue";

Vue.use(Router);

export const routes: RouteConfig[] = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/list",
    name: "list",
    component: List
  }
];

export default new Router({
  routes,
  mode: "history"
});
