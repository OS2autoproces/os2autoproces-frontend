import { DetailsState } from '@/store/modules/details/state';
import { MutationTree } from '../../../../node_modules/vuex';
import { merge } from 'lodash';

export const detailsMutationTypes = {
  UPDATE: `update`
};

export const mutations: MutationTree<DetailsState> = {
  update(state: DetailsState, payload: Partial<DetailsState>) {
    merge(state, payload);
  }
};
