import { RootState } from '@/store';
import { Module } from 'vuex';
import { actions } from '@/store/modules/common/actions';
import { mutations } from '@/store/modules/common/mutations';
import { CommonState } from '@/store/modules/common/state';

const namespaced = true;

export const state: CommonState = {
  frontPage: '',
  itSystems: [],
  technologies: [],
  kles: [],
  forms: [],
  orgUnits: [],
  municipalities: [],
  users: []
};

export const common: Module<CommonState, RootState> = {
  namespaced,
  state,
  actions,
  mutations
};
