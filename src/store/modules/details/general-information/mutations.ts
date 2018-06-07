import { MutationTree } from "vuex";
import { GeneralInformationState } from "@/store/modules/details/general-information/state";

export const generalInformationMutationTypes = {
  SET_KLE_NUMBER: "setKleNumber",
  SET_PARAGRAF: "setParagraf",
  SET_FIELD: 'setField',
  SET_DEPARTMENT: 'setDepartment',
  SET_VISIBILITY: 'setVisiblity',
  SET_CONTACTPERSON: 'setContactPerson',
  SET_EMAIL: 'setEmail',
  SET_PROCES_TIME: 'setProcesTime',
  SET_PROJECT_MANAGER: 'setProjectManager',
  SET_SUPPLIER: 'setSupplier',
  SET_RESUME: 'setResume',
  ADD_ASSOCIATED_PERSON: 'addAssociatedPerson'
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
  },
  setVisiblity(state: GeneralInformationState, payload: string) {
    state.visibility = payload;
  },
  setContactPerson(state: GeneralInformationState, payload: string) {
    state.contactPerson = payload;
  },
  setEmail(state: GeneralInformationState, payload: string) {
    state.email = payload;
  },
  setProcesTime(state: GeneralInformationState, payload: string) {
    state.procesTime = payload;
  },
  setProjectManager(state: GeneralInformationState, payload: string) {
    state.projectManager = payload;
  },
  setSupplier(state: GeneralInformationState, payload: string) {
    state.projectManager = payload;
  },
  setResume(state: GeneralInformationState, payload: string) {
    state.resume = payload;
  },
  addAssociatedPerson(state: GeneralInformationState, payload: string) {
    state.associatedPersons = [...state.associatedPersons, payload];
  }
};
