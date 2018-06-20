import { MutationTree } from 'vuex';
import { ImplementationState } from '@/store/modules/details/implementation/state';
import { merge } from 'lodash';

export const ImplementationMutationTypes = {
  UPDATE: 'update',
  ADD_TECHNOLOGY: 'addTechnology',
  REMOVE_TECHNOLOGY: 'removeTechnology'
};

export const mutations: MutationTree<ImplementationState> = {
  update(state: ImplementationState, payload: Partial<ImplementationState>) {
    merge(state, payload);
  },
  addTechnology(state: ImplementationState, technology: string) {
    state.technologies = [...state.technologies, technology];
  },
  removeTechnology(state: ImplementationState, index: number) {
    state.technologies = state.technologies.filter((_, i) => i !== index);
  }
};
