import { ActionTree } from 'vuex';
import { ChallengesState } from '@/store/modules/details/challenges/state';
import { RootState } from '@/store/store';
import { ChallengesMutationTypes } from './mutations';

const namespace = 'details/challenges';

export const ChallengesActionTypes = {
  UPDATE_CHALLENGES: `${namespace}/updateChallenges`
};

export const actions: ActionTree<ChallengesState, RootState> = {
  updateChallenges({ commit }, payload: Partial<ChallengesState>) {
    commit(ChallengesMutationTypes.UPDATE_CHALLENGES, payload);
  }
};
