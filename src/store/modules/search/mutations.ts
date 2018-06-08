import { MutationTree } from 'vuex';
import { SearchState, SearchFilters } from './state';
import { namespace } from '@/store/modules/search/actions';

export const searchMutationTypes = {
  SET_REPORTED: 'setReported',
  SET_RELATED: 'setRelated',
  SET_FAVORITES: 'setFavorites',
  SET_TEXT: 'setText',
  SET_MUNICIPAL: 'setMunicipal',
  SET_INTERMUNICIPAL: 'setIntermunicipal'
};

export const mutations: MutationTree<SearchState> = {
  setReported(state: SearchState, reported: boolean) {
    state.filters = { ...state.filters, ...{ reported } };
  },
  setRelated(state: SearchState, related: boolean) {
    state.filters = { ...state.filters, ...{ related } };
  },
  setFavorites(state: SearchState, favorites: boolean) {
    state.filters = { ...state.filters, ...{ favorites } };
  },
  setText(state: SearchState, text: string) {
    state.filters = { ...state.filters, ...{ text } };
  },
  setMunicipal(state: SearchState, municipal: boolean) {
    state.filters = { ...state.filters, ...{ municipal } };
  },
  setIntermunicipal(state: SearchState, intermunicipal: boolean) {
    state.filters = { ...state.filters, ...{ intermunicipal } };
  }
};
