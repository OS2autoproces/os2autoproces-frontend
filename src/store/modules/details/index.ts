import { DetailsState } from '@/store/modules/details/state';
import { Module } from 'vuex';
import { RootState } from '@/store/store';
import { generalInformation } from '@/store/modules/details/general-information';
import { actions } from '@/store/modules/details/actions';
import { getters } from '@/store/modules/details/getters';
import { challenges } from '@/store/modules/details/challenges';
import { timeAndProcess } from '@/store/modules/details/time-process';

const namespaced = true;

export const state: DetailsState = {
  // empty for now
};

export const details: Module<DetailsState, RootState> = {
  namespaced,
  getters,
  actions,
  modules: {
    generalInformation,
    challenges,
    timeAndProcess
  }
};
