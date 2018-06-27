import { ActionTree } from 'vuex';
import { DetailsState, Attachment } from '@/store/modules/details/state';
import { RootState } from '@/store/store';
import router from '@/router';
import { detailsMutationTypes } from '@/store/modules/details/mutations';
import { HTTP } from '@/services/http-service';

export const namespace = 'details';

export const detailsActionTypes = {
  SAVE: `${namespace}/save`,
  REPORT: `${namespace}/report`,
  UPDATE: `${namespace}/update`,
  ASSIGN: `${namespace}/assign`,
  LOAD_ATTACHMENTS: `${namespace}/loadAttachments`
};

export const actions: ActionTree<DetailsState, RootState> = {
  update({ commit }, payload: Partial<DetailsState>) {
    commit(detailsMutationTypes.UPDATE, payload);
  },
  assign({ commit }, payload: Partial<DetailsState>) {
    commit(detailsMutationTypes.ASSIGN, payload);
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
  },
  async loadAttachments({ commit }) {
    const process = { id: '1' };
    const attachments = (await HTTP.get<Attachment[]>(`/api/attachments/${process.id}`)).data;

    commit(detailsMutationTypes.ASSIGN, { attachments });
  }
};
