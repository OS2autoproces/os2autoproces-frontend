import { MutationTree } from 'vuex';
import { SearchState, SearchFilters, SearchResult, SavedSearchFilters } from '@/store/modules/search/state';
import { merge, isEqual } from 'lodash';

export const searchMutationTypes = {
  DELETE_SAVED_FILTERS: 'deleteSavedFilters',
  SET_SAVED_FILTERS: 'setSavedFilters',
  SET_SELECTED_SAVED_FILTERS: 'setSelectedSavedFilters',
  ADD_SAVED_FILTERS: 'addSavedFilters',
  UPDATE_FILTERS: 'updateFilters',
  ASSIGN_FILTERS: 'assignFilters',
  SET_SEARCH_RESULT: 'setSearchResult',
  SET_FILTERS_TOUCHED: 'setFiltersTouched'
};

export const mutations: MutationTree<SearchState> = {
  deleteSavedFilters(state: SearchState, { text }: SavedSearchFilters) {
    state.savedFilters = state.savedFilters.reduce(
      (filters: SavedSearchFilters[], f) => (f.text.toLowerCase() === text.toLowerCase() ? filters : [...filters, f]),
      []
    );
  },
  setSavedFilters(state: SearchState, savedFilters: SavedSearchFilters[]) {
    state.savedFilters = savedFilters;
  },
  setSelectedSavedFilters(state: SearchState, filtersText: string) {
    state.selectedSavedFiltersText = filtersText;
  },
  addSavedFilters(state: SearchState, filters: SavedSearchFilters) {
    state.savedFilters = [...state.savedFilters, filters];
  },
  updateFilters(state: SearchState, filters: Partial<SearchFilters>) {
    state.filters = merge(state.filters, filters);
  },
  assignFilters(state: SearchState, filters: Partial<SearchFilters>) {
    Object.assign(state.filters, filters);
  },
  setSearchResult(state: SearchState, result: SearchResult) {
    state.result = result;
  },
  setFiltersTouched(state: SearchState, touched: boolean) {
    state.filtersTouched = touched;
  }
};
