import { getters } from '@/store/modules/auth/getters';
import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { AuthState } from './state';

const namespaced = true;

export const state: AuthState = {
  user: null
};

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters
};
