import { MutationTree } from "vuex";
import { GeneralInformationState } from "@/store/modules/details/general-information/state";

export const generalInformationMutationTypes = {
  SET_KLE_NUMBER: "setKleNumber",
  SET_PARAGRAF: "setParagraf",
};

export const mutations: MutationTree<GeneralInformationState> = {
  setKleNumber(state: GeneralInformationState, payload: string) {
    state.kleNumber = payload;
  },
  setParagraf(state: GeneralInformationState, payload: string) {
    state.paragraf = payload;
  }
};
