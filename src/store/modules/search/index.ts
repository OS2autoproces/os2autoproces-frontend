import { defaultStatusSelects } from '@/models/status';
import { actions } from '@/store/modules/search/actions';
import { getters } from '@/store/modules/search/getters';
import { mutations } from '@/store/modules/search/mutations';
import { SearchState } from '@/store/modules/search/state';
import { RootState } from '@/store/store';
import { Module } from 'vuex';

const namespaced = true;

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
        descending: false
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

export const state = getInitialState();

export const search: Module<SearchState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
