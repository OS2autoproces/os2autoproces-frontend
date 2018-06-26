import { CommonState } from "./state";
import { RootState } from "@/store/store";
import { ActionTree } from "vuex";
import { commonMutationTypes } from "@/store/modules/common/mutations";

const namespace = 'common';

export const commonActionTypes = {
  INCREMENT_NETWORK_CALLS: `${namespace}/IncrementNetworkCalls`,
  UPDATE_FRONTPAGE_MARKDOWN: `${namespace}/updateFrontpageMarkdown`,
  SOME_ASYNC_ACTION: `${namespace}/someAsyncAction`
};

export const actions: ActionTree<CommonState, RootState> = {
  incrementNetworkCalls({ commit }): void {
    commit(commonMutationTypes.INCREMENT_NETWORK_CALLS);
  },
  updateFrontpageMarkdown({commit}, payload: Partial<CommonState>): void {
    commit(commonMutationTypes.UPDATE_COMMON, payload);
  },
  async someAsyncAction({ commit }, payload: any) {
    const serverCall = await new Promise((reject, resolve) => resolve(2));

    commit(commonMutationTypes.INCREMENT_NETWORK_CALLS);
  }
};
