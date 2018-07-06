import { ProcessState } from '@/store/modules/process/state';
import { merge } from 'lodash';
import { MutationTree } from 'vuex';

export const processMutationTypes = {
  UPDATE: 'update',
  ASSIGN: 'assign',
  SAVE_COMMENTS: 'saveComments',
  ADD_ASSOCIATED_PERSON: 'addAssociatedPerson',
  REMOVE_ASSOCIATED_PERSON: 'removeAssociatedPerson',
  ADD_TECHNOLOGY: 'addTechnology',
  REMOVE_TECHNOLOGY: 'removeTechnology'
};

export const mutations: MutationTree<ProcessState> = {
  update(state: ProcessState, payload: Partial<ProcessState>) {
    merge(state, payload);
  },
  assign(state: ProcessState, payload: Partial<ProcessState>) {
    Object.assign(state, payload);
  }
};
