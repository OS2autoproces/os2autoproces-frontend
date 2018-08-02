import { MutationTree } from 'vuex';
import { SearchState, SearchFilters, SearchResult } from '@/store/modules/search/state';
import { merge } from 'lodash';

export const searchMutationTypes = {
  UPDATE_FILTERS: 'updateFilters',
  ASSIGN_FILTERS: 'assignFilters',
  SET_SEARCH_RESULT: 'setSearchResult'
};

export const mutations: MutationTree<SearchState> = {
  updateFilters(state: SearchState, filters: Partial<SearchFilters>) {
    state.filters = merge(state.filters, filters);
  },
  assignFilters(state: SearchState, filters: Partial<SearchFilters>) {
    Object.assign(state.filters, filters);
  },
  setSearchResult(state: SearchState, result: SearchResult) {
    state.result = result;
  }
};
