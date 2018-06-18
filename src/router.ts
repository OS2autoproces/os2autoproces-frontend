import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Home from './views/Home.vue';
import Search from './views/Search.vue';
import Details from './views/Details.vue';
import ReportProcess from './views/ReportProcess.vue';

Vue.use(Router);

export const routes: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/details/:id', component: Details, props: true },
  { path: '/search', component: Search },
  { path: '/report', component: ReportProcess }
];

export default new Router({
  routes,
  mode: 'history'
});
