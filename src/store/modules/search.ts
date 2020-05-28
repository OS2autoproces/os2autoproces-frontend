import { Domain } from '@/models/domain';
import { Phase } from '@/models/phase';
import { RunPeriod } from '@/models/runperiod';
import { Status } from '@/models/status';
import { Type } from '@/models/types';
import { merge, debounce, isEqual } from 'lodash';
import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { ITSystem, Municipality, Technology } from '@/store/modules/common';
import { HTTP } from '@/services/http-service';
import { state } from './error';
import {
  search,
  saveFiltersToStorage,
  loadFiltersFromStorage,
  deleteFiltersFromStorage
} from '@/store/modules/service';

const getFiltersTouched = (previousFilters: SearchFilters | undefined, filterChanges: Partial<SearchFilters>) => {
    const initialFilters = getInitialState().filters;
    const currentFilters = Object.assign({}, previousFilters, filterChanges);
    const touched = !isEqual(initialFilters, currentFilters);
    return touched;
  };

export interface SearchResult {
  page: {
    totalPages: number;
    number: number;
  };
  processes: SearchResultProcess[];
}

export interface SavedSearchFilters {
  text: string;
  filters: SearchFilters;
}

export interface SearchResultProcess {
  id: number;
  title: string;
  shortDescription: string;
  rating: number;
  phase: Phase;
  status: Status;
  runPeriod: RunPeriod;
  municipalityName: string;
  domains: Domain[];
  kle: string;
  sepMep: boolean;
  legalClause: string;
  hasBookmarked: boolean;
  lastChanged: number;
  type: Type;
  childrenCount: number;
}

export interface SortingOptionParams extends SearchResultProcess {
  created: string;
}

export interface SortingOption {
  property: keyof SortingOptionParams;
  descending?: boolean;
}

export interface SearchFilters {
  reporterId: string | null;
  usersId: string | null;
  bookmarkedId: string | null;
  text: string;
  created: string;
  lastChanged: string;
  municipality: Municipality | null;
  visibility: {
    MUNICIPALITY: boolean;
    PUBLIC: boolean;
  };
  page: number;
  size: number;
  sorting: SortingOption;
  phase: { [x in Phase]: boolean | null };
  domain: { [x in Domain]: boolean | null };
  runPeriod: { [x in RunPeriod]: boolean | null };
  klaProcess: boolean;
  sepMep: boolean;
  umbrella: boolean;
  itSystems: ITSystem[];
  technologies: Technology[];
  status: { [x in Status]: boolean | null };
}

export interface SearchState {
  result?: SearchResult;
  filters: SearchFilters;
  filtersTouched: boolean;
  savedFilters?: SavedSearchFilters[];
  selectedSavedFiltersText?: string;
}

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
        saveFiltersToStorage({text: text, filters: this.filters});
        this.ADD_SAVED_FILTERS({text: text, filters: this.filters});
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
