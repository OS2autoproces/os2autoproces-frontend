import { ErrorState } from "@/store/modules/error/state";
import { MutationTree } from "vuex";

export const errorMutationTypes = {
    ASSIGN: `assign`
}

export const mutations: MutationTree<ErrorState> = {
    assign(state: ErrorState, payload: Partial<ErrorState>) {
        Object.assign(state, payload);
    }
}