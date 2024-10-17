import { User, UserRole, AuthModule } from '@/store/modules/auth';
import Vue from 'vue';
import Router, { Route, RouteConfig } from 'vue-router';
import Details from './views/Details.vue';
import Home from './views/Home.vue';
import ManageTechnologies from './views/ManageTechnologies.vue';
import ManageSystems from './views/ManageSystems.vue';
import ReportProcess from './views/ReportProcess.vue';
import Search from './views/Search.vue';
import Discovery from './views/Discovery.vue';
import Profile from './views/Profile.vue';
import Dashboard from './views/Dashboard.vue';
import Organisation from './views/Organisation.vue';
import { mapSearchQueryToObject, mapQueryObjToFilters, isIE } from '@/services/url-service';
import { isEmpty } from 'lodash';
import { getInitialState } from '@/store/modules/searchFunctions';

Vue.use(Router);

function validateAuth(isValid: (user: User | undefined | null) => boolean) {
  return async (to: Route, from: Route, next: any) => {
    if (isValid(AuthModule.user)) {
      next();
    } else {
      await AuthModule.loadUser();

      if (isValid(AuthModule.user)) {
        next();
      } else {
        window.location.href = `${window.autoProcessConfiguration.apiUrl}/saml/login`;
      }
    }
  };
}

function validateAuthPlusCheckProfile(isValid: (user: User | undefined | null) => boolean) {
  return async (to: Route, from: Route, next: any) => {
    if (isValid(AuthModule.user)) {
      if (
        AuthModule.user?.name == null ||
        AuthModule.user?.name === '' ||
        AuthModule.user?.email == null ||
        AuthModule.user?.email === ''
      ) {
        router.push('/profile');
      } else {
        router.push('/dashboard');
      }
    } else {
      await AuthModule.loadUser();

      if (isValid(AuthModule.user)) {
        if (
          AuthModule.user?.name == null ||
          AuthModule.user?.name === '' ||
          AuthModule.user?.email == null ||
          AuthModule.user?.email === ''
        ) {
          router.push('/profile');
        } else {
          router.push('/dashboard');
        }
      } else {
        window.location.href = `${window.autoProcessConfiguration.apiUrl}/saml/login`;
      }
    }
  };
}

function isLoggedInPlusCheckProfile() {
  return validateAuthPlusCheckProfile(user => !!user);
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
    path: '/manage-systems',
    component: ManageSystems,
    beforeEnter: hasRole(UserRole.administrator)
  },
  {
    path: '/profile',
    component: Profile,
    beforeEnter: isLoggedIn()
  },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: isLoggedIn()
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
    path: '/organisation/:cvr',
    component: Organisation,
    props: route => ({ cvr: route.params.cvr }),
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
  {
    path: '/logged-in',
    component: Home,

    // this will redirect to to either login (if user is not logged in), search (if user profile is completed) or profile (if user profile is not completed), so that the component is set to Home does not matter
    beforeEnter: isLoggedInPlusCheckProfile()
  },
  { path: '/logged-out', redirect: '/' }
];

export const router = new Router({
  routes,
  mode: 'history',
  parseQuery: (query: string) => {
    return mapSearchQueryToObject(query);
  }
});
