import { ActionTree } from 'vuex';
import { OperationState } from '@/store/modules/details/operation/state';
import { RootState } from '@/store/store';
import { OperationMutationTypes } from './mutations';

const namespace = 'details/operation';

export const OperationActionTypes = {
  UPDATE: `${namespace}/update`
};

export const actions: ActionTree<OperationState, RootState> = {
  update({ commit }, payload: Partial<OperationState>) {
    commit(OperationMutationTypes.UPDATE, payload);
  }
};
