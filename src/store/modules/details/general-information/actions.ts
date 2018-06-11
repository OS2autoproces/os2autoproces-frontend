import { RootState } from "@/store/store";
import { ActionTree } from "vuex";
import { GeneralInformationState } from "@/store/modules/details/general-information/state";
import { generalInformationMutationTypes } from "@/store/modules/details/general-information/mutations";

export const namespace = 'details/generalInformation';

export const generalInformationActionTypes = {
  SET_GENERAL_INFORMATION_PROP: 'setGeneralInformationProp',
  ADD_ASSOCIATED_PERSON: 'addAssociatedPerson',
  REMOVE_ASSOCIATED_PERSON: 'removeAssociatedPerson',
};


export const actions: ActionTree<GeneralInformationState, RootState> = {
  setGeneralInformationProp({ commit }, payload: Partial<GeneralInformationState>): void {
    commit(generalInformationMutationTypes.SET_GENERAL_INFORMATION_PROP, payload);
  },
  addAssociatedPerson({commit}, payload: string): void {
    commit(generalInformationMutationTypes.ADD_ASSOCIATED_PERSON, payload);
  },
  removeAssociatedPerson({commit}, payload: string): void {
    commit(generalInformationMutationTypes.REMOVE_ASSOCIATED_PERSON, payload);
  }
};
