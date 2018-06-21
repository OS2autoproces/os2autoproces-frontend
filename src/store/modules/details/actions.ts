import { ActionTree } from 'vuex';
import { DetailsState } from '@/store/modules/details/state';
import { RootState } from '@/store/store';
import router from '@/router';
import { detailsMutationTypes } from '@/store/modules/details/mutations';

export const namespace = 'details';

export const detailsActionTypes = {
  SAVE: `${namespace}/save`,
  REPORT: `${namespace}/report`,
  UPDATE: `${namespace}/update`
};

export const actions: ActionTree<DetailsState, RootState> = {
  update({commit}, payload: Partial<DetailsState>) {
    commit(detailsMutationTypes.UPDATE, payload);
  },
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
