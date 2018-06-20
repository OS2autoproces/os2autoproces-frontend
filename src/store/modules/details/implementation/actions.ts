import { ActionTree } from 'vuex';
import { ImplementationState } from '@/store/modules/details/implementation/state';
import { RootState } from '@/store/store';
import { ImplementationMutationTypes } from './mutations';

const namespace = 'details/implementation';

export const ImplementationActionTypes = {
  UPDATE: `${namespace}/update`,
  ADD_TECHNOLOGY: `${namespace}/addTechnology`,
  REMOVE_TECHNOLOGY: `${namespace}/removeTechnology`
};

export const actions: ActionTree<ImplementationState, RootState> = {
  update({ commit }, payload: Partial<ImplementationState>) {
    commit(ImplementationMutationTypes.UPDATE, payload);
  },
  addTechnology({ commit }, technology: string) {
    commit(ImplementationMutationTypes.ADD_TECHNOLOGY, technology);
  },
  removeTechnology({ commit }, index: number) {
    commit(ImplementationMutationTypes.REMOVE_TECHNOLOGY, index);
  }
};
