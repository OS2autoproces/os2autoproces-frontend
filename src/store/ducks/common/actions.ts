import { CommonState, INCREMENT_NETWORKCALLS } from '@/store/ducks/common/types';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';

export const actions: ActionTree<CommonState, RootState> = {
  incrementNetworkCalls({ commit }): void {
    commit(INCREMENT_NETWORKCALLS);
  },
};
