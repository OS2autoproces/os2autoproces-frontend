import { MutationTree } from "vuex";
import { CommonState } from "./state";
import { merge } from 'lodash';

export const commonMutationTypes = {
  INCREMENT_NETWORK_CALLS: "IncrementNetworkCalls",
  UPDATE_COMMON: "udpateCommon"
};

export const mutations: MutationTree<CommonState> = {
  incrementNetworkCalls(state: CommonState) {
    state.networkCalls = state.networkCalls + 1;
  },
  udpateCommon(state: CommonState, payload : Partial<CommonState>) {
    merge(state, payload);
  }
};
