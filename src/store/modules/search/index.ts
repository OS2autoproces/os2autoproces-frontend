import { SearchState } from '@/store/modules/search/state';
import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from '@/store/modules/search/actions';
import { getters } from '@/store/modules/search/getters';
import { mutations } from '@/store/modules/search/mutations';

const namespaced = true;

export const state: SearchState = {
  result: undefined,
  filters: {
    page: 0,
    size: 5,
    type: null,
    reporterId: null,
    usersId: null,
    bookmarkedId: null,
    text: '',
    created: '',
    lastChanged: '',
    municipality: false,
    public: false,
    klaProcess: false,
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
