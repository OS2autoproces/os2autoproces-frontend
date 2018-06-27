import { RouteConfig } from 'vue-router';
import Home from './views/Home.vue';
import Search from './views/Search.vue';
import Details from './views/Details.vue';
import ReportProcess from './views/ReportProcess.vue';

export const routes: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/details/:id', component: Details, props: true },
  { path: '/details/new/:phase', component: Details, props: true },
  { path: '/search', component: Search },
  { path: '/report', component: ReportProcess },
  { path: '/logged-in', redirect: '/search' },
  { path: '/logged-out', redirect: '/' }
  // TODO: Route for login/logout errors
];
