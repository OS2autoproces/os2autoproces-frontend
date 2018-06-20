import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { GeneralInformationState } from '@/store/modules/details/general-information/state';

const namespaced = true;

export const state: GeneralInformationState = {
  disabled: true,
  kleNumber: '',
  paragraf: '',
  field: '',
  department: '',
  visibility: '',
  contactPerson: '',
  email: '',
  processTime: '',
  projectManager: '',
  supplier: '',
  resume: '',
  associatedPersons: [],
  status: '',
  phase: 1
};

export const generalInformation: Module<GeneralInformationState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
