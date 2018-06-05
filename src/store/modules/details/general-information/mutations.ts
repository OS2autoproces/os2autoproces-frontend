import { MutationTree } from "vuex";
import { GeneralInformationState } from "@/store/modules/details/general-information/state";

export const generalInformationMutationTypes = {
  SET_KLE_NUMBER: "setKleNumber",
  SET_PARAGRAF: "setParagraf",
  SET_FIELD: 'setField',
  SET_DEPARTMENT: 'setDepartment',
};

export const mutations: MutationTree<GeneralInformationState> = {
  setKleNumber(state: GeneralInformationState, payload: string) {
    state.kleNumber = payload;
  },
  setParagraf(state: GeneralInformationState, payload: string) {
    state.paragraf = payload;
  },
  setField(state: GeneralInformationState, payload: string) {
    state.field = payload;
  },
  setDepartment(state: GeneralInformationState, payload: string) {
    state.department = payload;
  }
};
