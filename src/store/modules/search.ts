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

export interface SearchState {
  result?: SearchResult;
  filters: SearchFilters;
  filtersTouched: boolean;
  savedFilters?: SavedSearchFilters[];
  selectedSavedFiltersText?: string;
}

const getFiltersTouched = (previousFilters: SearchFilters | undefined, filterChanges: Partial<SearchFilters>) => {
    const initialFilters = getInitialState().filters;
    const currentFilters = Object.assign({}, previousFilters, filterChanges);
    const touched = !isEqual(initialFilters, currentFilters);
    return touched;
  };

export function getInitialState(): SearchState {
    return {
      result: undefined,
      filtersTouched: false,
      savedFilters: [],
      selectedSavedFiltersText: '',
      filters: {
        page: 0,
        size: 5,
        reporterId: null,
        usersId: null,
        bookmarkedId: null,
        text: '',
        created: '',
        lastChanged: '',
        municipality: null,
        visibility: {
          MUNICIPALITY: false,
          PUBLIC: false
        },
        klaProcess: false,
        umbrella: false,
        sepMep: false,
        itSystems: [],
        technologies: [],
        sorting: {
          property: 'created',
          descending: true
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
        },
        runPeriod: {
          ONDEMAND: false,
          ONCE: false,
          DAILY: false,
          WEEKLY: false,
          MONTHLY: false,
          QUATERLY: false,
          YEARLY: false
        },
        status: {
          FAILED: false,
          INPROGRESS: false,
          NOT_RATED: false,
          PENDING: false,
          REJECTED: false
        }
      }
    };
  }

@Module({ dynamic: true, store, name: 'search' })
export default class Search extends VuexModule implements SearchState {
  result?: SearchResult;
  filters: SearchFilters = getInitialState().filters;
  filtersTouched: boolean = false;
  savedFilters?: SavedSearchFilters[];
  selectedSavedFiltersText?: string;

  @Mutation
  DELETE_SAVED_FILTERS({text}: Partial<SavedSearchFilters>)
  {
      this.savedFilters = this.savedFilters?.reduce(
          (filters: SavedSearchFilters[], f) => 
            (f.text.toLowerCase() === text?.toLowerCase() ? filters : [...filters, f]
            ), []
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
      if(this.savedFilters) {
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
  SET_SEARCH_RESULT(result: SearchResult | undefined) {
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
      if(this.filters)
      {
        saveFiltersToStorage({text, filters: this.filters});
        this.ADD_SAVED_FILTERS({text, filters: this.filters});
        this.SET_SELECTED_SAVED_FILTERS(text);
      }
  }

    @Action
    updateFilters(filters: Partial<SearchFilters>) {
      this.SET_FILTERS_TOUCHED(getFiltersTouched(this.filters, filters))
    this.UPDATE_FILTERS(filters);
    this.search();
    }

    @Action
    assignFilters( filters: Partial<SearchFilters>) {
        this.SET_FILTERS_TOUCHED(getFiltersTouched(this.filters, filters));
        this.ASSIGN_FILTERS(filters);
        this.search();
    }

    @Action
    resetFilters() {
        const filters = getInitialState();
        this.ASSIGN_FILTERS(Object.assign(this.filters, filters));
        this.SET_SELECTED_SAVED_FILTERS('');
    }

    @Action
    search() {
        debounce(async (filters: SearchFilters) => {
            this.SET_SEARCH_RESULT(undefined);
            this.SET_SEARCH_RESULT(await search(filters));
        }, 250);
    }

    get isSearchingForUmbrellaProcess() : boolean  {
        return !!this.filters?.umbrella ? this.filters.umbrella : false;
      }

}

export const SearchModule = getModule(Search);
