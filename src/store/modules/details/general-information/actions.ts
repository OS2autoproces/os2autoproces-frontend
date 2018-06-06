import { RootState } from "@/store/store";
import { ActionTree } from "vuex";
import { GeneralInformationState } from "@/store/modules/details/general-information/state";
import { generalInformationMutationTypes } from "@/store/modules/details/general-information/mutations";

export const namespace = 'generalInformation';

export const generalInformationActionTypes = {
  SET_KLE_NUMBER: `${namespace}/SET_KLE_NUMBER`,
  SET_PARAGRAF: `${namespace}/SET_PARAGRAF`,
  SET_FIELD: `${namespace}/SET_FIELD`,
  SET_DEPARTMENT: `${namespace}/SET_DEPARTMENT`,
  SET_VISIBILITY: `${namespace}/SET_VISIBILITY`,
  SET_CONTACT_PERSON: `${namespace}/SET_CONTACT_PERSON`,
  SET_EMAIL: `${namespace}/SET_EMAIL`,
  SET_PROCES_TIME: `${namespace}/SET_PROCES_TIME`,
  SET_PROJECT_MANAGER: `${namespace}/SET_PROJECT_MANAGER`,
  SET_SUPPLIER: `${namespace}/SET_SUPPLIER`,
  SET_RESUME: `${namespace}/SET_RESUME`,
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
  },
  setEmail({commit}, payload: string): void {
    commit(generalInformationMutationTypes.SET_EMAIL, payload);
  },
  setProcesTime({commit}, payload: string): void {
    commit(generalInformationMutationTypes.SET_PROCES_TIME, payload);
  },
  setProjectManager({commit}, payload: string): void {
    commit(generalInformationMutationTypes.SET_PROJECT_MANAGER, payload);
  },
  setSupplier({commit}, payload: string): void {
    commit(generalInformationMutationTypes.SET_SUPPLIER, payload);
  },
  setResume({commit}, payload: string): void {
    commit(generalInformationMutationTypes.SET_RESUME, payload);
  }
};
