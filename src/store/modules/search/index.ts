import { SearchState } from './state';
import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

export const state: SearchState = {
  result: undefined,
  filters: {
    reported: true,
    related: false,
    favorites: false,
    text: '',
    municipal: false,
    intermunicipal: false,
    phases: {
      idea: false,
      preliminaryAnalysis: false,
      specification: false,
      development: false,
      implementation: false,
      operating: false
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
