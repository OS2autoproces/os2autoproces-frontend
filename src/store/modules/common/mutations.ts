import { merge } from 'lodash';
import { MutationTree } from 'vuex';
import { CommonState } from '@/store/modules/common/state';

export const commonMutationTypes = {
  UPDATE: 'update',
  ASSIGN: 'assign',
};

export const mutations: MutationTree<CommonState> = {
  update(state: CommonState, payload: Partial<CommonState>) {
    merge(state, payload);
  },
  assign(state: CommonState, payload: Partial<CommonState>) {
    Object.assign(state, payload);
  }
};
