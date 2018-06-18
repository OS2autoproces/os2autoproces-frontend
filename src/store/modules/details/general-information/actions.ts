import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { GeneralInformationState } from '@/store/modules/details/general-information/state';
import { generalInformationMutationTypes } from '@/store/modules/details/general-information/mutations';

const namespace = 'details/generalInformation';

export const generalInformationActionTypes = {
  UPDATE_GENERAL_INFORMATION: `${namespace}/updateGeneralInformation`,
  ADD_ASSOCIATED_PERSON: `${namespace}/addAssociatedPerson`,
  REMOVE_ASSOCIATED_PERSON: `${namespace}/removeAssociatedPerson`
};

export const actions: ActionTree<GeneralInformationState, RootState> = {
  updateGeneralInformation({ commit }, payload: Partial<GeneralInformationState>): void {
    commit(generalInformationMutationTypes.UPDATE_GENERAL_INFORMATION, payload);
  },
  addAssociatedPerson({ commit }, payload: string): void {
    commit(generalInformationMutationTypes.ADD_ASSOCIATED_PERSON, payload);
  },
  removeAssociatedPerson({ commit }, payload: string): void {
    commit(generalInformationMutationTypes.REMOVE_ASSOCIATED_PERSON, payload);
  }
};
