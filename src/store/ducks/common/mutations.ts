import { MutationTree } from 'vuex';
import { CommonState } from '@/store/ducks/common/types';

export const mutations: MutationTree<CommonState> = {
  incrementNetworkCalls(state: CommonState) {
    state.networkCalls = state.networkCalls + 1;
  },
};
