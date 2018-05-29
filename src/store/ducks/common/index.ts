import { CommonState } from '@/store/ducks/common/types';
import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

export const state: CommonState = {
  networkCalls: 0,
};

export const common: Module<CommonState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations,
};
