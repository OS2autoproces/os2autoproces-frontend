import { ProcessState } from '@/store/modules/process/state';
import { merge } from 'lodash';
import { MutationTree } from 'vuex';

export const processMutationTypes = {
  UPDATE: 'update',
  ASSIGN: 'assign'
};

export const mutations: MutationTree<ProcessState> = {
  update(state: ProcessState, payload: Partial<ProcessState>) {
    merge(state, payload);
  },
  assign(state: ProcessState, payload: Partial<ProcessState>) {
    Object.assign(state, payload);
  }
};
