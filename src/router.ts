import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Home from './views/Home.vue';
import Search from './views/Search.vue';
import List from './views/List.vue';
import Details from './views/Details.vue';

Vue.use(Router);

export const routes: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/details/:id', component: Details },
  { path: '/search', component: Search }
];

export default new Router({
  routes,
  mode: 'history'
});
