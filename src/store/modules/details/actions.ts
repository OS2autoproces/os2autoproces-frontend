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
  async addAttachments({ commit, state }, files: FileList) {
    // TODO: Add to correct proces
    const process = { id: '1' };

    const form = new FormData();

    // Placeholders are attachments which are shown while the real attachments are uploading.
    // When the attachments are done uploading, the placeholders are replaced with the real attachments.
    const placeholders: Attachment[] = [];

    for (let i = 0; i < files.length; i++) {
      form.append('files', files[i]);

      placeholders.push({
        fileName: files[i].name,
        uploading: true
      });
    }

    commit(detailsMutationTypes.ASSIGN, {
      attachments: [...state.attachments, ...placeholders]
    });

    try {
      const attachments = (await HTTP.post<Attachment[]>(`/api/attachments/${process.id}`, form)).data;

      commit(detailsMutationTypes.ASSIGN, {
        attachments: [...state.attachments.filter(a => !placeholders.includes(a)), ...attachments]
      });
    } catch {
      // Upload failed - remove placeholders
      commit(detailsMutationTypes.ASSIGN, {
        attachments: state.attachments.filter(a => !placeholders.includes(a))
      });
    }
  },
  async removeAttachment({ commit, state }, id: number) {
    // TODO: Add to correct proces
    const process = { id: '1' };

    await HTTP.delete(`/api/attachments/${process.id}/${id}`);

    commit(detailsMutationTypes.ASSIGN, { attachments: state.attachments.filter(a => a.id !== id) });
  }
};
