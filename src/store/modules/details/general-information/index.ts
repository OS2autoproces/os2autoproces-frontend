import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { GeneralInformationState, Status } from '@/store/modules/details/general-information/state';

const namespaced = true;

export const state: GeneralInformationState = {
  id: null,
  localId: null,
  klId: null,
  phase: 1,
  status: 'Afventer',
  statusText: '',
  kle: null,
  contact: null,
  department: null,
  disabled: true,
  domain: '',
  kla: null,
  klaProcess: false,
  legalClause: null,
  orgUnits: null,
  owner: null,
  processTime: '',
  reporter: null,
  shortDescription: '',
  users: null,
  visibility: '',
  created: '',
  lastUpdated: '',
};

export const generalInformation: Module<GeneralInformationState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
