import { merge, debounce, isEqual } from 'lodash';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import {
  search,
  saveFiltersToStorage,
  loadFiltersFromStorage,
  deleteFiltersFromStorage
} from '@/store/modules/service';
import { SearchFilters, SearchResult, SavedSearchFilters } from './searchInterfaces';
import { getInitialState, getFiltersTouched } from './searchFunctions';

export interface SearchState {
  result: SearchResult | null;
  filters: SearchFilters;
  filtersTouched: boolean;
  savedFilters?: SavedSearchFilters[];
  selectedSavedFiltersText?: string;
}

const debouncedSearch = debounce(async (filters: SearchFilters) => {
  SearchModule.SET_SEARCH_RESULT(null);
  SearchModule.SET_SEARCH_RESULT(await search(filters));
}, 250);

@Module({ dynamic: true, store, name: 'search', namespaced: true })
export default class SearchStore extends VuexModule implements SearchState {
  result: SearchResult | null = null;
  filters: SearchFilters = getInitialState().filters;
  filtersTouched: boolean = false;
  savedFilters?: SavedSearchFilters[];
  selectedSavedFiltersText?: string;
  searchKey: number = 0;

  @Mutation
  DELETE_SAVED_FILTERS({ text }: Partial<SavedSearchFilters>) {
    this.savedFilters = this.savedFilters?.reduce(
      (filters: SavedSearchFilters[], f) => (f.text.toLowerCase() === text?.toLowerCase() ? filters : [...filters, f]),
      []
    );
  }

  @Mutation
  SET_SAVED_FILTERS(savedFilters: SavedSearchFilters[]) {
    this.savedFilters = savedFilters;
  }

  @Mutation
  SET_SELECTED_SAVED_FILTERS(filtersText: string) {
    this.selectedSavedFiltersText = filtersText;
  }

  @Mutation
  ADD_SAVED_FILTERS(filters: SavedSearchFilters) {
    if (this.savedFilters) {
      this.savedFilters = [...this.savedFilters, Object.assign({}, filters)];
    } else {
      this.savedFilters = [Object.assign({}, filters)];
    }
  }

  @Mutation
  UPDATE_FILTERS(filters: Partial<SearchFilters>) {
    this.filters = merge(this.filters, filters);
  }

  @Mutation
  ASSIGN_FILTERS(filters: Partial<SearchFilters>) {
    this.filters = Object.assign({}, this.filters, filters);
  }

  @Mutation
  SET_SEARCH_RESULT(result: SearchResult | null) {
    this.result = result;
  }

  @Mutation
  SET_FILTERS_TOUCHED(touched: boolean) {
    this.filtersTouched = touched;
  }

  @Action
  selectSavedFilters(savedFilters: SavedSearchFilters) {
    if (!savedFilters) {
      this.resetFilters();
      return;
    }
    this.assignFilters(savedFilters.filters);
    this.SET_SELECTED_SAVED_FILTERS(savedFilters.text);
  }

  @Action
  deleteSavedFilter(filter: SavedSearchFilters) {
    deleteFiltersFromStorage(filter);
    this.DELETE_SAVED_FILTERS(filter);
  }

  @Action
  loadSavedFilters() {
    const filters = loadFiltersFromStorage();
    this.SET_SAVED_FILTERS(filters);
  }

  @Action
  saveFilters(text: string) {
    if (this.filters) {
      saveFiltersToStorage({ text, filters: this.filters });
      this.ADD_SAVED_FILTERS({ text, filters: this.filters });
      this.SET_SELECTED_SAVED_FILTERS(text);
    }
  }

  @Action
  updateFilters(filters: Partial<SearchFilters>) {
    this.SET_FILTERS_TOUCHED(getFiltersTouched(this.filters, filters));
    this.UPDATE_FILTERS(filters);
    this.search();
  }

  @Action
  assignFilters(filters: Partial<SearchFilters>) {
    this.SET_FILTERS_TOUCHED(getFiltersTouched(this.filters, filters));
    this.ASSIGN_FILTERS(filters);
    this.search();
  }

  @Action
  resetFilters() {
    const initState = getInitialState();
    this.ASSIGN_FILTERS(initState.filters);
    this.SET_SELECTED_SAVED_FILTERS('');
    this.SET_FILTERS_TOUCHED(true);
  }

  @Action
  search() {
    debouncedSearch(this.filters);
  }

  get isSearchingForUmbrellaProcess(): boolean {
    return !!this.filters?.umbrella ? this.filters.umbrella : false;
  }
}
export const SearchModule = getModule(SearchStore);
