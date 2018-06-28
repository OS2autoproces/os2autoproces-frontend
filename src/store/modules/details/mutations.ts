import { DetailsState } from '@/store/modules/details/state';
import { MutationTree } from '../../../../node_modules/vuex';
import { merge } from 'lodash';

export const detailsMutationTypes = {
  UPDATE: 'update',
  ASSIGN: 'assign'
};

export const mutations: MutationTree<DetailsState> = {
  update(state: DetailsState, payload: Partial<DetailsState>) {
    merge(state, payload);
  },
  assign(state: DetailsState, payload: Partial<DetailsState>) {
    Object.assign(state, payload);
  }
};
