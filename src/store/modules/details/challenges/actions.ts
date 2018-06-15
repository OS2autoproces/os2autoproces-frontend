import { ActionTree } from "vuex";
import { Challenges } from "@/store/modules/details/challenges/state";
import { RootState } from "@/store/store";
import { ChallengesMutationTypes } from './mutations';

export const namespace = 'details/challenges';

export const ChallengesActionTypes = {
    UPDATE_CHALLENGES: `${namespace}/updateChallenges`,
}

export const actions: ActionTree<Challenges, RootState> = {
    updateChallenges({ commit }, payload: Partial<Challenges>) {
        commit(ChallengesMutationTypes.UPDATE_CHALLENGES, payload);
    }
}