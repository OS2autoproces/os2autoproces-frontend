import { User, UserRole } from '@/store/modules/auth/state';
import store from '@/store/store';
import Vue from 'vue';
import Router, { Route, RouteConfig } from 'vue-router';
import Details from './views/Details.vue';
import Home from './views/Home.vue';
import ManageTechnologies from './views/ManageTechnologies.vue';
import ReportProcess from './views/ReportProcess.vue';
import Search from './views/Search.vue';
import Discovery from './views/Discovery.vue';
import { mapSearchQueryToObject, mapQueryObjToFilters, isIE } from './services/url-service';
import { SearchFilters } from './store/modules/search/state';
import { size, isEmpty } from 'lodash';
import { getInitialState } from './store/modules/search';

Vue.use(Router);

function validateAuth(isValid: (user: User | null) => boolean) {
  return async (to: Route, from: Route, next: any) => {
    if (isValid(store.state.auth.user)) {
      next();
    } else {
      await store.dispatch('auth/loadUser');

      if (isValid(store.state.auth.user)) {
        next();
      } else {
        window.location.href = `${window.autoProcessConfiguration.apiUrl}/saml/login`;
      }
    }
  };
}

function handleDetailsIE() {
  return isIE() ? isLoggedIn() : isLoggedIn();
}

function isLoggedIn() {
  return validateAuth(user => !!user);
}

function hasRole(role: UserRole) {
  return validateAuth(user => !!user && user.roles.includes(role));
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/discovery',
    component: Discovery
  },
  {
    path: '/manage-technologies',
    component: ManageTechnologies,
    beforeEnter: hasRole(UserRole.administrator)
  },
  {
    path: '/search',
    props: ({ query }) => {
      return {
        initialFilters: isEmpty(query) ? undefined : mapQueryObjToFilters(query.filters, getInitialState().filters)
      };
    },
    component: Search,
    beforeEnter: isLoggedIn()
  },
  {
    path: '/details/:id',
    component: isIE() ? Search : Details,
    props: route => ({ isReporting: false, id: Number(route.params.id) }),
    beforeEnter: isLoggedIn()
  },
  {
    path: '/details/new/:type',
    component: Details,
    props: route => ({ isReporting: true, type: route.params.type }),
    beforeEnter: isLoggedIn()
  },
  {
    path: '/report',
    component: ReportProcess,
    beforeEnter: isLoggedIn()
  },
  { path: '/logged-in', redirect: '/search' },
  { path: '/logged-out', redirect: '/' }
];

export const router = new Router({
  routes,
  mode: 'history',
  parseQuery: (query: string) => {
    return mapSearchQueryToObject(query);
  }
});
