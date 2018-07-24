import store from '@/store/store';
import Vue from 'vue';
import Router, { Route, RouteConfig } from 'vue-router';
import Details from './views/Details.vue';
import Home from './views/Home.vue';
import ReportProcess from './views/ReportProcess.vue';
import Search from './views/Search.vue';

Vue.use(Router);

async function requireAuth(to: Route, from: Route, next: any) {
  function proceed() {
    if (store.state.auth.user) {
      next();
    } else {
      window.location.href = `${window.autoProcessConfiguration.apiUrl}/saml/login`;
    }
  }

  if (!store.state.auth.user) {
    await store.dispatch('auth/loadUser');

    store.watch(
      state => state.auth,
      user => {
        if (user) {
          proceed();
        } else {
          // todo: handle network error
          proceed();
        }
      }
    );
    proceed();
  } else {
    proceed();
  }
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/search',
    component: Search,
    beforeEnter: requireAuth
  },
  {
    path: '/details/:id',
    component: Details,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/details/new/:phase',
    component: Details,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/report',
    component: ReportProcess,
    beforeEnter: requireAuth
  },
  { path: '/logged-in', redirect: '/search' },
  { path: '/logged-out', redirect: '/' }
];

export const router = new Router({
  routes,
  mode: 'history'
});
