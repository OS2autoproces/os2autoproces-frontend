import { merge } from 'lodash';
import { MutationTree } from 'vuex';
import { CommonState } from './state';

export const commonMutationTypes = {
  UPDATE: 'update'
};

export const mutations: MutationTree<CommonState> = {
  update(state: CommonState, payload: Partial<CommonState>) {
    merge(state, payload);
  }
};
