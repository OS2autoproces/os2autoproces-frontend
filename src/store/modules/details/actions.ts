import { ActionTree } from 'vuex';
import { DetailsState } from '@/store/modules/details/state';
import { RootState } from '@/store/store';
import router from '@/router';

export const namespace = 'details';

export const detailsActionTypes = {
  SAVE: `${namespace}/save`,
  REPORT: `${namespace}/report`
};

export const actions: ActionTree<DetailsState, RootState> = {
  save() {
    // TODO: Save to backend
    // const process = await backend.put(store.proces);
  },
  async report() {
    // TODO: Save to backend
    // const process = await backend.post(store.proces);
    // updateGeneralInformation({ id: process.id });
    const process = { id: '1234' };
    router.push(`/details/${process.id}`);
  }
};
