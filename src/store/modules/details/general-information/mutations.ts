import { MutationTree } from "vuex";
import { GeneralInformationState } from "@/store/modules/details/general-information/state";

export const generalInformationMutationTypes = {
  SET_KLE_NUMBER: "generalInformation/setKleNumber",
};

export const mutations: MutationTree<GeneralInformationState> = {
  setKleNumber(state: GeneralInformationState, payload: string) {
    state.kleNumber = payload;
  },
};
