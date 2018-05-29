import { CommonState } from '@/store/ducks/common/types';
import { RootState } from '@/store/store';
import { GetterTree } from 'vuex';

export const getters: GetterTree<CommonState, RootState> = {
  networkCallsCount(state: CommonState) {
    return state.networkCalls;
  },
};
