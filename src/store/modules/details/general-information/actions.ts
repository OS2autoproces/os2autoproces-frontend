import { RootState } from "@/store/store";
import { ActionTree } from "vuex";
import { GeneralInformationState } from "@/store/modules/details/general-information/state";
import { generalInformationMutationTypes } from "@/store/modules/details/general-information/mutations";

export const generalInformationActionTypes = {
  SET_KLE_NUMBER: 'generalInformation/SET_KLE_NUMBER',
};

export const actions: ActionTree<GeneralInformationState, RootState> = {
  setKleNumber({ commit }, payload: string): void {
    commit(generalInformationMutationTypes.SET_KLE_NUMBER, payload, {root: true});
  },
  // async someAsyncAction({ commit }, payload: any) {
  //   const serverCall = await new Promise((reject, resolve) => resolve(2));

  //   commit(commonMutationTypes.INCREMENT_NETWORK_CALLS);
  // }
};
