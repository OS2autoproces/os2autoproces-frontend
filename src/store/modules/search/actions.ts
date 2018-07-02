import { SearchState, SearchFilters } from './state';
import { RootState } from '@/store/store';
import { ActionTree, Commit } from 'vuex';
import { searchMutationTypes } from '@/store/modules/search/mutations';
import { debounce } from 'lodash';
import { search } from '@/store/modules/search/service';

const namespace = 'search';

export const searchActionTypes = {
  UPDATE_FILTERS: `${namespace}/updateFilters`,
  SEARCH: `${namespace}/search`
};

const debouncedSearch = debounce(async (filters: SearchFilters, commit: Commit) => {
  commit(searchMutationTypes.SET_SEARCH_RESULT, await search(filters));
}, 250);

export const actions: ActionTree<SearchState, RootState> = {
  updateFilters({ commit, dispatch }, filters: Partial<SearchFilters>) {
    commit(searchMutationTypes.UPDATE_FILTERS, filters);
    dispatch(searchActionTypes.SEARCH, {}, { root: true });
  },
  search({ commit, state }) {
    debouncedSearch(state.filters, commit);
  }
};
