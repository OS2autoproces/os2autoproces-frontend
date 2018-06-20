import { ActionTree } from 'vuex';
import { SpecificationState } from '@/store/modules/details/specification/state';
import { RootState } from '@/store/store';
import { SpecificationMutationTypes } from './mutations';

const namespace = 'details/specification';

export const SpecificationActionTypes = {
  UPDATE: `${namespace}/update`
};

export const actions: ActionTree<SpecificationState, RootState> = {
  update({ commit }, payload: Partial<SpecificationState>) {
    commit(SpecificationMutationTypes.UPDATE, payload);
  }
};
