import { MutationTree } from "vuex";
import { CommonState } from "./state";
import { merge } from 'lodash';

export const commonMutationTypes = {
  UPDATE_COMMON: "udpateCommon"
};

export const mutations: MutationTree<CommonState> = {
  udpateCommon(state: CommonState, payload : Partial<CommonState>) {
    merge(state, payload);
  }
};
