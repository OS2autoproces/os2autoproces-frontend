import { actions, initialProcessState } from '@/store/modules/process/actions';
import { getters } from '@/store/modules/process/getters';
import { mutations } from '@/store/modules/process/mutations';
import { ProcessState } from '@/store/modules/process/state';
import { RootState } from '@/store/store';
import { Module, GetterTree } from 'vuex';

const namespaced = true;

export const state = initialProcessState();

export const process: Module<ProcessState, RootState> = {
  actions,
  mutations,
  getters: getters as GetterTree<ProcessState, RootState>,
  namespaced,
  state
};
