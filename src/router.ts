import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Home from "./views/Home.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Search from "./views/Search.vue";

Vue.use(Router);

export const routes: RouteConfig[] = [
  { path: "/", component: Home },
  { path: "/details", component: HelloWorld },
  { path: "/search", component: Search }
];

export default new Router({
  routes,
  mode: "history"
});
