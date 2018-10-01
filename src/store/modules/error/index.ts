import { ErrorState } from '@/store/modules/error/state';
import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from '@/store/modules/error/actions';
import { mutations } from '@/store/modules/error/mutations';

const namespaced = true;

export const state: ErrorState = {
  generalInformation: {
    section: 'General Information',
    errors: []
  },
  challenges: {
    section: 'Problemtstillinger',
    errors: []
  },
  assessment: {
    section: 'Faglig vurdering',
    errors: []
  },
  timeAndProcess: {
    section: 'Tid og proces',
    errors: []
  },
  specification: {
    section: 'Specifikation',
    errors: []
  },
  implementation: {
    section: 'Udvikling og implementering',
    errors: []
  },
  operation: {
    section: 'Drift',
    errors: []
  }
};

export const error: Module<ErrorState, RootState> = {
  namespaced,
  actions,
  mutations,
  state
};
