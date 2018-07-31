import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from '@/store/modules/common/actions';
import { mutations } from '@/store/modules/common/mutations';
import { CommonState } from '@/store/modules/common/state';

const namespaced = true;

export const state: CommonState = {
  frontPage: '',
  itSystems: [],
  kles: [],
  orgUnits: [],
  users: []
};

export const common: Module<CommonState, RootState> = {
  namespaced,
  state,
  actions,
  mutations
};
