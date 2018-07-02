import {SearchState} from './state';
import {RootState} from '@/store/store';
import {Module} from 'vuex';
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';

const namespaced = true;

export const state: SearchState = {
  result: undefined,
  filters: {
    page: 0,
    size: 5,
    reported: true,
    related: false,
    bookmarks: false,
    text: '',
    municipal: false,
    intermunicipal: false,
    sorting: {
      property: 'title',
      descending: false
    },
    phase: {
      IDEA: false,
      PREANALYSIS: false,
      SPECIFICATION: false,
      DEVELOPMENT: false,
      IMPLEMENTATION: false,
      OPERATION: false
    },
    domain: {
      WORK: false,
      ADMINISTRATION: false,
      CHILDREN: false,
      DEMOCRACY: false,
      ENVIRONMENT: false,
      HEALTH: false
    }
  }
};

export const search: Module<SearchState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
