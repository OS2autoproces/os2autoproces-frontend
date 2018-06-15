import { MutationTree } from "vuex";
import { Challenges } from "@/store/modules/details/challenges/state";
import { merge } from "lodash";

export const ChallengesMutationTypes = {
    UPDATE_CHALLENGES: 'updateChallenges',
}

export const mutations: MutationTree<Challenges> = {
    updateChallenges(state: Challenges, payload: Partial<Challenges>) {
        state = merge(state, payload);
    }
}