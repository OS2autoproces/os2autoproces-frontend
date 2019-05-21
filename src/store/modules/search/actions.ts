import { SavedSearchFilters } from './state';
import { SearchState, SearchFilters } from '@/store/modules/search/state';
import { RootState } from '@/store/store';
import { ActionTree, Commit } from 'vuex';
import { searchMutationTypes } from '@/store/modules/search/mutations';
import { debounce, isEqual } from 'lodash';
import { search, saveFiltersToStorage, loadFiltersFromStorage } from '@/store/modules/search/service';
import { getInitialState } from '@/store/modules/search';

const namespace = 'search';

export const searchActionTypes = {
  DELETE_SAVED_FILTER: `${namespace}/deleteSavedFilter`,
  LOAD_SAVED_FILTERS: `${namespace}/loadSavedFilters`,
  RESET_FILTERS: `${namespace}/resetFilters`,
  UPDATE_FILTERS: `${namespace}/updateFilters`,
  ASSIGN_FILTERS: `${namespace}/assignFilters`,
  CLEAR_FILTERS: `${namespace}/clearFilters`,
  SAVE_FILTERS: `${namespace}/saveFilters`,
  SEARCH: `${namespace}/search`
};

const getFiltersTouched = (previousFilters: SearchFilters, filterChanges: Partial<SearchFilters>) => {
  const initialFilters = getInitialState().filters;
  const currentFilters = Object.assign({}, previousFilters, filterChanges);
  const touched = !isEqual(initialFilters, currentFilters);
  return touched;
};

const debouncedSearch = debounce(async (filters: SearchFilters, commit: Commit) => {
  commit(searchMutationTypes.SET_SEARCH_RESULT, undefined);
  commit(searchMutationTypes.SET_SEARCH_RESULT, await search(filters));
}, 250);

export const actions: ActionTree<SearchState, RootState> = {
  deleteSavedFilter({ commit }, filter: SavedSearchFilters) {
    commit(searchMutationTypes.DELETE_SAVED_FILTERS, filter);
  },
  loadSavedFilters({ commit }) {
    const filters = loadFiltersFromStorage();
    commit(searchMutationTypes.SET_SAVED_FILTERS, filters);
  },
  clearFilters({ commit, dispatch }) {
    dispatch(searchActionTypes.ASSIGN_FILTERS, getInitialState().filters, { root: true });
  },
  saveFilters({ state: { filters }, commit }, text: string) {
    saveFiltersToStorage({ text, filters });
    commit(searchMutationTypes.ADD_SAVED_FILTERS, { text, filters });
  },
  updateFilters({ commit, dispatch, state }, filters: Partial<SearchFilters>) {
    commit(searchMutationTypes.SET_FILTERS_TOUCHED, getFiltersTouched(state.filters, filters));
    commit(searchMutationTypes.UPDATE_FILTERS, filters);
    dispatch(searchActionTypes.SEARCH, {}, { root: true });
  },
  assignFilters({ commit, dispatch, state }, filters: Partial<SearchFilters>) {
    commit(searchMutationTypes.SET_FILTERS_TOUCHED, getFiltersTouched(state.filters, filters));
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
