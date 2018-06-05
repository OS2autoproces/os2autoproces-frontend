import { RootState } from "@/store/store";
import { ActionTree } from "vuex";
import { GeneralInformationState } from "@/store/modules/details/general-information/state";
import { generalInformationMutationTypes } from "@/store/modules/details/general-information/mutations";

export const generalInformationActionTypes = {
  SET_KLE_NUMBER: 'generalInformation/SET_KLE_NUMBER',
  SET_PARAGRAF: 'generalInformation/SET_PARAGRAF',
  SET_FIELD: 'generalInformation/SET_FIELD',
  SET_DEPARTMENT: 'generalInformation/SET_DEPARTMENT',
  SET_VISIBILITY: 'generalInformation/SET_VISIBILITY',
  SET_CONTACT_PERSON: 'generalInformation/SET_CONTACT_PERSON',
};

export const actions: ActionTree<GeneralInformationState, RootState> = {
  setKleNumber({ commit }, payload: string): void {
    commit(generalInformationMutationTypes.SET_KLE_NUMBER, payload);
  },
  setParagraf({ commit }, payload: string): void {
    commit(generalInformationMutationTypes.SET_PARAGRAF, payload);
  },
  setField({commit}, payload: string): void {
    commit(generalInformationMutationTypes.SET_FIELD, payload);
  },
  setDepartment({commit}, payload: string): void {
    commit(generalInformationMutationTypes.SET_DEPARTMENT, payload);
  },
  setVisibility({commit}, payload: string): void {
    commit(generalInformationMutationTypes.SET_VISIBILITY, payload);
  },
  setContactPerson({commit}, payload: string): void {
    commit(generalInformationMutationTypes.SET_CONTACTPERSON, payload);
  }
  // async someAsyncAction({ commit }, payload: any) {
  //   const serverCall = await new Promise((reject, resolve) => resolve(2));

  //   commit(commonMutationTypes.INCREMENT_NETWORK_CALLS);
  // }
};
