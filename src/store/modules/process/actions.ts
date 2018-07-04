import { RootState } from '@/store/store';
import {
  ProcessState,
  Attachment,
  Technology,
  Process
} from '@/store/modules/process/state';
import { ActionTree } from 'vuex';
import { processMutationTypes } from '@/store/modules/process/mutations';
import { HTTP } from '@/services/http-service';
import { User } from '@/store/modules/auth/state';

export const namespace = 'process';

export const processActionTypes = {
  UPDATE: `${namespace}/update`,
  ADD_ATTACHMENTS: `${namespace}/addAttachments`,
  REMOVE_ATTACHMENTS: `${namespace}/removeAttachments`,
  LOAD_ATTACHMENTS: `${namespace}/loadAttachments`,
  SAVE_COMMENT: `${namespace}/saveComment`,
  LOAD_COMMENTS: `${namespace}/loadComments`,
  SAVE: `${namespace}/save`,
  REPORT: `${namespace}/report`,
  ADD_ASSOCIATED_PERSON: `${namespace}/addAssociatedPerson`,
  REMOVE_ASSOCIATED_PERSON: `${namespace}/removeAssociatedPerson`,
  ADD_TECHNOLOGY: `${namespace}/addTechnology`,
  REMOVE_TECHNOLOGY: `${namespace}/removeTechnology`,

  LOAD_PROCESS_DETAILS: `${namespace}/loadProcessDetails`,
  CREATE_PROCESS: `${namespace}/createProcess`,
};

export const actions: ActionTree<ProcessState, RootState> = {
  update({ commit }, payload: Partial<ProcessState>) {
    commit(processMutationTypes.UPDATE, payload);
  },
  async loadAttachments({ commit }) {
    // TODO: Use correct process
    const process = { id: '1' };
    const attachments = (await HTTP.get<Attachment[]>(
      `/api/attachments/${process.id}`
    )).data;

    commit(processMutationTypes.ASSIGN, { attachments });
  },
  async addAttachments({ commit, state }, files: File[]) {

    const form = new FormData();
    files.forEach(file => form.append('files', file));

    // Placeholders are attachments which are shown while the real attachments are uploading.
    // When the attachments are done uploading, the placeholders are replaced with the real attachments.
    const placeholders: Attachment[] = files.map(file => ({
      fileName: file.name,
      uploading: true
    }));
    if (state.attachments) {
      commit(processMutationTypes.ASSIGN, {
        attachments: [...state.attachments, ...placeholders]
      });
    }

    try {
      const attachments = (await HTTP.post<Attachment[]>(
        `/api/attachments/${state.id}`,
        form
      )).data;
      if (!state.attachments) {
        return;
      }
      commit(processMutationTypes.ASSIGN, {
        attachments: [
          ...state.attachments.filter(a => !placeholders.includes(a)),
          ...attachments
        ]
      });
    } catch {
      if (!state.attachments) {
        return;
      }
      // Upload failed - remove placeholders
      commit(processMutationTypes.ASSIGN, {
        attachments: state.attachments.filter(a => !placeholders.includes(a))
      });
    }
  },
  async removeAttachment({ commit, state }, id: number) {
    await HTTP.delete(`/api/attachments/${state.id}/${id}`);
    if (!state.attachments) {
      return;
    }
    commit(processMutationTypes.ASSIGN, {
      attachments: state.attachments.filter(a => a.id !== id)
    });
  },
  async saveComment(
    { commit, state },
    { processId, message }: NewComment
  ): Promise<void> {
    const comment = (await HTTP.put<Comment>(`api/comments/${processId}`, {
      message
    })).data;

    commit(processMutationTypes.SAVE_COMMENTS, [...state.comments, comment]);
  },
  async loadComments({ commit }, processId: number) {
    const comments = (await HTTP.get<Comment[]>(`api/comments/${processId}`))
      .data;
    commit(processMutationTypes.SAVE_COMMENTS, comments);
  },
  addAssociatedPerson({ commit }, user: User): void {
    commit(processMutationTypes.ADD_ASSOCIATED_PERSON, user);
  },
  removeAssociatedPerson({ commit }, user: User): void {
    commit(processMutationTypes.REMOVE_ASSOCIATED_PERSON, user);
  },
  addTechnology({ commit }, technology: Technology) {
    commit(processMutationTypes.ADD_TECHNOLOGY, technology);
  },
  removeTechnology({ commit }, index: number) {
    commit(processMutationTypes.REMOVE_TECHNOLOGY, index);
  },
  async loadProcessDetails({ commit }, id: number) {
    const process = (await HTTP.get<Process>(`api/processes/${id}`)).data;

    commit(processMutationTypes.ADD_PROCESS_DETAILS, process);
  },
  async createProcess({ commit }, process: ProcessState) {
    const created = await HTTP.post(`api/processes`, process);

    commit(processMutationTypes.PROCESS_CREATED, created);
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
  }
};

export interface NewComment {
  message: string;
  processId: number;
}
