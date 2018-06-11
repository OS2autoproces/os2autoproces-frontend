import { MutationTree } from "vuex";
import { GeneralInformationState } from "@/store/modules/details/general-information/state";
import { merge } from 'lodash';

export const generalInformationMutationTypes = {
  ADD_ASSOCIATED_PERSON: 'addAssociatedPerson',
  REMOVE_ASSOCIATED_PERSON: 'removeAssociatedPerson',
  UPDATE_GENERAL_INFORMATION: 'updateGeneralInformation',
};

export const mutations: MutationTree<GeneralInformationState> = {
  updateGeneralInformation(state: GeneralInformationState, payload: Partial<GeneralInformationState>) {
    state = merge(state, payload);
  },
  addAssociatedPerson(state: GeneralInformationState, payload: string) {
    state.associatedPersons = [...state.associatedPersons, payload];
  },
  removeAssociatedPerson(state: GeneralInformationState, payload: string) {
    state.associatedPersons = state.associatedPersons.filter(person => person !== payload);
  },
};
