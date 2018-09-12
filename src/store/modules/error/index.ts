import { ErrorState } from '@/store/modules/error/state';
import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from '@/store/modules/error/actions';
import { mutations } from '@/store/modules/error/mutations';

const namespaced = true;

export const state: ErrorState = {
  processErrors: [],
  saveStatus: null
};

export const error: Module<ErrorState, RootState> = {
  namespaced,
  actions,
  mutations,
  state
};
