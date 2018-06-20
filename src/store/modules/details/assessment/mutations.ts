import { MutationTree } from 'vuex';
import { AssessmentState } from '@/store/modules/details/assessment/state';
import { merge } from 'lodash';

export const AssessmentMutationTypes = {
  UPDATE: 'update'
};

export const mutations: MutationTree<AssessmentState> = {
  update(state: AssessmentState, payload: Partial<AssessmentState>) {
    state = merge(state, payload);
  }
};
