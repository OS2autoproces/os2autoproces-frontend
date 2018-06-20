import { MutationTree } from 'vuex';
import { OperationState } from '@/store/modules/details/operation/state';
import { merge } from 'lodash';

export const OperationMutationTypes = {
  UPDATE: 'update'
};

export const mutations: MutationTree<OperationState> = {
  update(state: OperationState, payload: Partial<OperationState>) {
    merge(state, payload);
  }
};
