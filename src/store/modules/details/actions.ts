import { ActionTree } from 'vuex';
import { DetailsState, Attachment } from '@/store/modules/details/state';
import { RootState } from '@/store/store';
import { detailsMutationTypes } from '@/store/modules/details/mutations';
import { HTTP } from '@/services/http-service';

export const namespace = 'details';

export const detailsActionTypes = {
  SAVE: `${namespace}/save`,
  REPORT: `${namespace}/report`,
  UPDATE: `${namespace}/update`,
  ASSIGN: `${namespace}/assign`,
  LOAD_ATTACHMENTS: `${namespace}/loadAttachments`,
  ADD_ATTACHMENTS: `${namespace}/addAttachments`,
  REMOVE_ATTACHMENT: `${namespace}/removeAttachment`
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
    return { id: '1234' };
  },
  async loadAttachments({ commit }) {
    const process = { id: '1' };
    const attachments = (await HTTP.get<Attachment[]>(`/api/attachments/${process.id}`)).data;

    commit(detailsMutationTypes.ASSIGN, { attachments });
  },
  async addAttachments({ commit }, files: FileList) {
    const process = { id: '1' };

    const form = new FormData();

    for (let i = 0; i < files.length; i++) {
      form.append('files', files[i]);
    }

    const response = await HTTP.put<Attachment>(`/api/attachments/${process.id}`, form, {
      onUploadProgress: progress => console.log(progress)
    });

    const attachment = response.data;

    // TODO: Add attachment in store
    // TODO: Save upload progress in store
    // commit(detailsMutationTypes.ASSIGN, { attachments });
  },
  async removeAttachment({ commit }, attachment: Attachment) {
    const process = { id: '1' };

    // const attachments = await HTTP.delete(`/api/attachments/${process.id}/${attachment}`);

    // TODO: Remove attachment in store
    // commit(detailsMutationTypes.ASSIGN, { attachments });
  }
};
