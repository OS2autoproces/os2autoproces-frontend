import { MutationTree } from 'vuex';
import { SpecificationState } from '@/store/modules/details/specification/state';
import { merge } from 'lodash';

export const SpecificationMutationTypes = {
  UPDATE: 'update'
};

export const mutations: MutationTree<SpecificationState> = {
  update(state: SpecificationState, payload: Partial<SpecificationState>) {
    merge(state, payload);
  }
};
