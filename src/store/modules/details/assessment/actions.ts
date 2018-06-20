import { ActionTree } from 'vuex';
import { AssessmentState } from '@/store/modules/details/assessment/state';
import { RootState } from '@/store/store';
import { AssessmentMutationTypes } from './mutations';

const namespace = 'details/assessment';

export const AssessmentActionTypes = {
  UPDATE: `${namespace}/update`
};

export const actions: ActionTree<AssessmentState, RootState> = {
  update({ commit }, payload: Partial<AssessmentState>) {
    commit(AssessmentMutationTypes.UPDATE, payload);
  }
};
