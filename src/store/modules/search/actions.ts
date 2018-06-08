import { SearchState, SearchFilters } from './state';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { searchMutationTypes } from '@/store/modules/search/mutations';

export const namespace = 'search';

export const searchActionTypes = {
  SET_REPORTED: `${namespace}/setReported`,
  SET_RELATED: `${namespace}/setRelated`,
  SET_FAVORITES: `${namespace}/setFavorites`,
  SET_TEXT: `${namespace}/setText`,
  SET_MUNICIPAL: `${namespace}/setMunicipal`,
  SET_INTERMUNICIPAL: `${namespace}/setIntermunicipal`
};

export const actions: ActionTree<SearchState, RootState> = {
  setReported({ commit }, value: boolean): void {
    commit(searchMutationTypes.SET_REPORTED, value);
  },
  setRelated({ commit }, value: boolean): void {
    commit(searchMutationTypes.SET_RELATED, value);
  },
  setFavorites({ commit }, value: boolean): void {
    commit(searchMutationTypes.SET_FAVORITES, value);
  },
  setText({ commit }, value: string): void {
    commit(searchMutationTypes.SET_TEXT, value);
  },
  setMunicipal({ commit }, value: boolean): void {
    commit(searchMutationTypes.SET_MUNICIPAL, value);
  },
  setIntermunicipal({ commit }, value: boolean): void {
    commit(searchMutationTypes.SET_INTERMUNICIPAL, value);
  }
};
