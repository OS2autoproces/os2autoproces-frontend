import { SearchState, SearchFilters, SearchResult } from './state';
import { RootState } from '@/store/store';
import { ActionTree, Commit } from 'vuex';
import { searchMutationTypes } from '@/store/modules/search/mutations';
import { debounce } from 'lodash';

export const namespace = 'search';

export const searchActionTypes = {
  UPDATE_FILTERS: 'updateFilters',
  SEARCH: 'search'
};

const debouncedSearch = debounce((filters: SearchFilters, commit: Commit) => {
  commit(searchMutationTypes.SET_SEARCH_RESULT, dummyResult);
}, 250);

export const actions: ActionTree<SearchState, RootState> = {
  updateFilters({ commit, dispatch, state }, filters: Partial<SearchFilters>) {
    commit(searchMutationTypes.UPDATE_FILTERS, filters);
    dispatch(searchActionTypes.SEARCH);
  },
  search({ commit, state }) {
    debouncedSearch(state.filters, commit);
  }
};


const dummyResult: SearchResult = {
    numberOfPages: 10,
    page: 3,
    processes: [
      {
        name: 'Rekruttering',
        resume:
          'Resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume',
        potential: 2,
        municipality: 'Syddjurs Kommune',
        id: '56472927382',
        field: 'Teknik',
        kleNumber: '4348',
        law: 'Lov om aktiv social politik §128',
        phase: 1,
        status: 'Afventer',
        favorite: false
      },
      {
        name: 'Rekruttering',
        resume:
          'Resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume',
          potential: 3,
        municipality: 'Syddjurs Kommune',
        id: '56472927383',
        field: 'Teknik',
        kleNumber: '4348',
        law: 'Lov om aktiv social politik §128',
        phase: 2,
        status: 'Mislykket',
        favorite: true
      }
    ]
  };