import { ProcessState } from '@/store/modules/process/state';
import { merge } from 'lodash';
import { MutationTree } from 'vuex';

export const processMutationTypes = {
  UPDATE: 'update',
  ASSIGN: 'assign',
  UPDATE_WITH_NO_CHANGE: 'updateWithNoChange',
  ASSIGN_WITH_NO_CHANGE: 'assignWithNoChange'
};

export const mutations: MutationTree<ProcessState> = {
  update(state: ProcessState, payload: Partial<ProcessState>) {
    if (payload.hasChanged === undefined) {
      payload.hasChanged = true;
    }

    merge(state, payload);
  },
  assign(state: ProcessState, payload: Partial<ProcessState>) {
    if (payload.hasChanged === undefined) {
      payload.hasChanged = true;
    }

    Object.assign(state, payload);
  },
  updateWithNoChange(state: ProcessState, payload: Partial<ProcessState>) {
    merge(state, payload);
  },
  assignWithNoChange(state: ProcessState, payload: Partial<ProcessState>) {
    Object.assign(state, payload);
  }
};
