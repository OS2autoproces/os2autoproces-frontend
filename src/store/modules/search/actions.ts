import { SearchState, SearchFilters } from '@/store/modules/search/state';
import { RootState } from '@/store/store';
import { ActionTree, Commit } from 'vuex';
import { searchMutationTypes } from '@/store/modules/search/mutations';
import { debounce, isEqual } from 'lodash';
import { search } from '@/store/modules/search/service';
import { getInitialState } from '@/store/modules/search';

const namespace = 'search';

export const searchActionTypes = {
  RESET_FILTERS: `${namespace}/resetFilters`,
  UPDATE_FILTERS: `${namespace}/updateFilters`,
  ASSIGN_FILTERS: `${namespace}/assignFilters`,
  CLEAR_FILTERS: `${namespace}/clearFilters`,
  SEARCH: `${namespace}/search`
};

const debouncedSearch = debounce(async (filters: SearchFilters, commit: Commit) => {
  commit(searchMutationTypes.SET_SEARCH_RESULT, undefined);
  commit(searchMutationTypes.SET_SEARCH_RESULT, await search(filters));
}, 250);

const getAllowClearFilters = (filters: Partial<SearchFilters>) => {
  const copy = Object.assign({}, filters);

  // are we only setting page or size?
  if (copy.page !== undefined) {
    delete copy.page;
  }
  if (copy.size !== undefined) {
    delete copy.size;
  }
  const keys = Object.keys(copy);
  if (keys.length === 0) {
    return false;
  }

  const initial = getInitialState().filters;
  return keys.reduce((_, key) => {
    const keyVal: any = copy[key as (keyof SearchFilters)];
    const initialKeyVal: any = initial[key as (keyof SearchFilters)];

    return !isEqual(keyVal, initialKeyVal);
  }, false);
};

export const actions: ActionTree<SearchState, RootState> = {
  clearFilters({ commit, dispatch }) {
    commit(searchMutationTypes.ASSIGN_FILTERS, getInitialState().filters);
    commit(searchMutationTypes.SET_ALLOW_CLEAR, false);
  },
  updateFilters({ commit, dispatch }, filters: Partial<SearchFilters>) {
    commit(searchMutationTypes.SET_ALLOW_CLEAR, getAllowClearFilters(filters));
    commit(searchMutationTypes.UPDATE_FILTERS, filters);
    dispatch(searchActionTypes.SEARCH, {}, { root: true });
  },
  assignFilters({ commit, dispatch }, filters: Partial<SearchFilters>) {
    commit(searchMutationTypes.SET_ALLOW_CLEAR, getAllowClearFilters(filters));
    commit(searchMutationTypes.ASSIGN_FILTERS, filters);
    dispatch(searchActionTypes.SEARCH, {}, { root: true });
  },
  resetFilters({ commit, dispatch }) {
    const { filters } = getInitialState();
    commit(searchMutationTypes.ASSIGN_FILTERS, filters);
    dispatch(searchActionTypes.SEARCH, {}, { root: true });
  },
  search({ commit, state }) {
    debouncedSearch(state.filters, commit);
  }
};
