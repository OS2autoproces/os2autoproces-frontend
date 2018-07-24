import { getters } from '@/store/modules/auth/getters';
import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from '@/store/modules/auth/actions';
import { mutations } from '@/store/modules/auth/mutations';
import { AuthState } from '@/store/modules/auth/state';

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
