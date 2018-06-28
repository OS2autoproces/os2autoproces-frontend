import { ActionTree } from 'vuex';
import { DetailsState, IAttachment } from '@/store/modules/details/state';
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
    // TODO: Use correct process
    const process = { id: '1' };
    const attachments = (await HTTP.get<IAttachment[]>(`/api/attachments/${process.id}`)).data;

    commit(detailsMutationTypes.ASSIGN, { attachments });
  },
  async addAttachments({ commit, state }, files: File[]) {
    // TODO: Use correct process
    const process = { id: '1' };

    const form = new FormData();
    files.forEach(file => form.append('files', file));

    // Placeholders are attachments which are shown while the real attachments are uploading.
    // When the attachments are done uploading, the placeholders are replaced with the real attachments.
    const placeholders: IAttachment[] = files.map(file => ({
      fileName: file.name,
      uploading: true
    }));

    commit(detailsMutationTypes.ASSIGN, {
      attachments: [...state.attachments, ...placeholders]
    });

    try {
      const attachments = (await HTTP.post<IAttachment[]>(`/api/attachments/${process.id}`, form)).data;

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
    // TODO: Use correct process
    const process = { id: '1' };

    await HTTP.delete(`/api/attachments/${process.id}/${id}`);

    commit(detailsMutationTypes.ASSIGN, { attachments: state.attachments.filter(a => a.id !== id) });
  }
};
