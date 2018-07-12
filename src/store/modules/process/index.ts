import { actions, initialProcessState } from '@/store/modules/process/actions';
import { getters } from '@/store/modules/process/getters';
import { mutations } from '@/store/modules/process/mutations';
import { ProcessState } from '@/store/modules/process/state';
import { RootState } from '@/store/store';
import { Module } from 'vuex';

const namespaced = true;

export const state: ProcessState = initialProcessState();

export const process: Module<ProcessState, RootState> = {
  actions,
  mutations,
  getters,
  namespaced,
  state
};
