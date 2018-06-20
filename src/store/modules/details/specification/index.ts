import { SpecificationState } from '@/store/modules/details/specification/state';
import { Module } from 'vuex';
import { RootState } from '@/store/store';
import { actions } from '@/store/modules/details/specification/actions';
import { mutations } from '@/store/modules/details/specification/mutations';

const namespaced = true;

export const state: SpecificationState = {
  disabled: true,
  challenges: '',
  solution: '',
  esdhCaseReference: ''
};

export const specification: Module<SpecificationState, RootState> = {
  namespaced,
  actions,
  mutations,
  state
};
