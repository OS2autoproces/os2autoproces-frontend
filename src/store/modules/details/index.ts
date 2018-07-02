import { DetailsState } from '@/store/modules/details/state';
import { Module } from 'vuex';
import { RootState } from '@/store/store';
import { generalInformation } from '@/store/modules/details/general-information';
import { actions } from '@/store/modules/details/actions';
import { getters } from '@/store/modules/details/getters';
import { challenges } from '@/store/modules/details/challenges';
import { assessment } from '@/store/modules/details/assessment';
import { timeAndProcess } from '@/store/modules/details/time-process';
import { specification } from '@/store/modules/details/specification';
import { implementation } from '@/store/modules/details/implementation';
import { operation } from '@/store/modules/details/operation';
import { mutations } from '@/store/modules/details/mutations';

const namespaced = true;

export const state: DetailsState = {
  interval: null,
  intervalDisabled: true,
  attachmentsDisabled: true
};

export const details: Module<DetailsState, RootState> = {
  namespaced,
  getters,
  actions,
  mutations,
  state,
  modules: {
    generalInformation,
    challenges,
    assessment,
    timeAndProcess,
    specification,
    implementation,
    operation
  }
};
