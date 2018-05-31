import { CommonState } from "./state";
import { RootState } from "@/store/store";
import { ActionTree } from "vuex";
import { commonMutationTypes } from "@/store/modules/common/mutations";

export const commonActionTypes = {
  INCREMENT_NETWORK_CALLS: "common/IncrementNetworkCalls",
  SOME_ASYNC_ACTION: "common/SomeAsyncAction"
};

export const actions: ActionTree<CommonState, RootState> = {
  incrementNetworkCalls({ commit }): void {
    commit(commonMutationTypes.INCREMENT_NETWORK_CALLS);
  },
  async someAsyncAction({ commit }, payload: any) {
    const serverCall = await new Promise((reject, resolve) => resolve(2));

    commit(commonMutationTypes.INCREMENT_NETWORK_CALLS);
  }
};
