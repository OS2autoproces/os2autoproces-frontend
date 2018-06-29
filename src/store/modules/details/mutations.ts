import { DetailsState } from '@/store/modules/details/state';
import { merge } from 'lodash';
import Vue from 'vue';
import { MutationTree } from '../../../../node_modules/vuex';

export const detailsMutationTypes = {
  UPDATE: 'update',
  ASSIGN: 'assign',
  SAVE_COMMENTS: 'saveComments'
};

export const mutations: MutationTree<DetailsState> = {
  update(state: DetailsState, payload: Partial<DetailsState>) {
    merge(state, payload);
  },
  assign(state: DetailsState, payload: Partial<DetailsState>) {
    Object.assign(state, payload);
  },
  saveComments(state: DetailsState, comments: Partial<DetailsState>) {
    Vue.set(state, 'comments', comments);
  }
};
