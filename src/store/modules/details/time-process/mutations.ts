import { TimeAndProcess } from '@/store/modules/details/time-process/state';
import { merge } from 'lodash';
import { MutationTree } from 'vuex';

export const TimeAndProcessMutationsTypes = {
  UPDATE_TIME_AND_PROCESS: 'updateTimeAndProcess'
};

export const mutations: MutationTree<TimeAndProcess> = {
  updateTimeAndProcess(state: TimeAndProcess, payload: Partial<TimeAndProcess>) {
    state = merge(state, payload);
  }
};
