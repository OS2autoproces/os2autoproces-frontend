import { MutationTree } from 'vuex';
import { SearchState, SearchFilters, SearchResult } from './state';
import { merge } from 'lodash';

export const searchMutationTypes = {
  UPDATE_FILTERS: 'updateFilters',
  SET_SEARCH_RESULT: 'setSearchResult'
};

export const mutations: MutationTree<SearchState> = {
  updateFilters(state: SearchState, filters: Partial<SearchFilters>) {
    state.filters = merge(state.filters, filters);
  },
  setSearchResult(state: SearchState, result: SearchResult) {
    state.result = result;
  }
};
