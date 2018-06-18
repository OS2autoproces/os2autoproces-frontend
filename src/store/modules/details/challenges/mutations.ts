import { MutationTree } from 'vuex';
import { ChallengesState } from '@/store/modules/details/challenges/state';
import { merge } from 'lodash';

export const ChallengesMutationTypes = {
  UPDATE_CHALLENGES: 'updateChallenges'
};

export const mutations: MutationTree<ChallengesState> = {
  updateChallenges(state: ChallengesState, payload: Partial<ChallengesState>) {
    state = merge(state, payload);
  }
};
