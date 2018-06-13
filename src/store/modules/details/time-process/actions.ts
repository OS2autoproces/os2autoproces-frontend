import { ActionTree } from 'vuex';
import { TimeAndProcess } from '@/store/modules/details/time-process/state';
import { RootState } from '@/store/store';
import { TimeAndProcessMutationsTypes } from '@/store/modules/details/time-process/mutations';

export const namespace = 'details/timeAndProcess';

export const TimeAndProcessActionTypes = {
  UPDATE_TIME_AND_PROCESS: `${namespace}/timeAndProcess`,
};

export const actions: ActionTree<TimeAndProcess, RootState> = {
  updateTimeAndProcess({ commit }, payload: Partial<TimeAndProcess>) {
    commit(TimeAndProcessMutationsTypes.UPDATE_TIME_AND_PROCESS, payload, {root: true});
  }
};
