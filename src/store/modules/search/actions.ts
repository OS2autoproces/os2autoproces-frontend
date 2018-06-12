import { SearchState, SearchFilters, SearchResult } from './state';
import { RootState } from '@/store/store';
import { ActionTree, Commit } from 'vuex';
import { searchMutationTypes } from '@/store/modules/search/mutations';
import { debounce } from 'lodash';

const namespace = 'search';

export const searchActionTypes = {
  UPDATE_FILTERS: `${namespace}/updateFilters`,
  SEARCH: `${namespace}/search`
};

const debouncedSearch = debounce((filters: SearchFilters, commit: Commit) => {
  commit(searchMutationTypes.SET_SEARCH_RESULT, getMockedSearchResult(filters));
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

function getMockedSearchResult(filters: SearchFilters) {
  return {
    numberOfPages: 10,
    page: filters.page,
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
}
