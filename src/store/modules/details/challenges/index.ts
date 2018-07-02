import { ChallengesState } from '@/store/modules/details/challenges/state';
import { Module } from 'vuex';
import { RootState } from '@/store/store';
import { actions } from '@/store/modules/details/challenges/actions';
import { mutations } from '@/store/modules/details/challenges/mutations';

const namespaced = true;

export const state: ChallengesState = {
  disabled: true,
  decommissioned: null,
  created: '',
  lastChanged: '',
  itSystems: '',
  longDescription: '',
  processChallenges: '',
  solutionRequests: ''
};

export const challenges: Module<ChallengesState, RootState> = {
  namespaced,
  actions,
  mutations,
  state
};
