import { OperationState } from '@/store/modules/details/operation/state';
import { Module } from 'vuex';
import { RootState } from '@/store/store';
import { actions } from '@/store/modules/details/operation/actions';
import { mutations } from '@/store/modules/details/operation/mutations';

const namespaced = true;

export const state: OperationState = {
  disabled: true,
  decommissioned: '',
  lastChecked: '',
  lastUpdated: '',
  potential: null,
  realizedPotential: ''
};

export const operation: Module<OperationState, RootState> = {
  namespaced,
  actions,
  mutations,
  state
};
