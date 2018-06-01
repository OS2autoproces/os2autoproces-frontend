import { MutationTree } from "vuex";
import { CommonState } from "./state";

export const commonMutationTypes = {
  INCREMENT_NETWORK_CALLS: "common/IncrementNetworkCalls"
};

export const mutations: MutationTree<CommonState> = {
  incrementNetworkCalls(state: CommonState) {
    state.networkCalls = state.networkCalls + 1;
  }
};
