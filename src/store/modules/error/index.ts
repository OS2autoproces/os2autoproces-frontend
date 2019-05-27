import { ErrorState } from '@/store/modules/error/state';
import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from '@/store/modules/error/actions';
import { mutations } from '@/store/modules/error/mutations';

const namespaced = true;

export const state: ErrorState = {
  generalInformation: {
    section: 'Grundlæggende oplysninger',
    errors: []
  },
  challenges: {
    section: 'Problemstillinger',
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
  attachments: {
    section: 'Bilag og links',
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
