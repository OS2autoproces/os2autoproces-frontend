import { AssessmentState } from '@/store/modules/details/assessment/state';
import { Module } from 'vuex';
import { RootState } from '@/store/store';
import { actions } from '@/store/modules/details/assessment/actions';
import { mutations } from '@/store/modules/details/assessment/mutations';

const namespaced = true;

export const state: AssessmentState = {
  disabled: true,
  degreeOfAssessment: null,
  degreeOfFrequentChanges: null,
  degreeOfStructuredInformation: null,
  degreeOfSolutionVariation: null,
  degreeOfAvailableInformation: null,
  degreeOfAutomationGain: null,
  degreeOfAutomationPotential: null
};

export const assessment: Module<AssessmentState, RootState> = {
  namespaced,
  actions,
  mutations,
  state
};
