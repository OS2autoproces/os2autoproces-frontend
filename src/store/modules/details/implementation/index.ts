import { ImplementationState } from '@/store/modules/details/implementation/state';
import { Module } from 'vuex';
import { RootState } from '@/store/store';
import { actions } from '@/store/modules/details/implementation/actions';
import { mutations } from '@/store/modules/details/implementation/mutations';

const namespaced = true;

export const state: ImplementationState = {
  disabled: true,
  technologies: [],
  solution: '',
  organizationalImplementation: '',
  technicalImplementation: ''
};

export const implementation: Module<ImplementationState, RootState> = {
  namespaced,
  actions,
  mutations,
  state
};
