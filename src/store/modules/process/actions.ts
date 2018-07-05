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
import { ProcessRequest, stateToRequest, responseToState, ProcessResponse } from '@/services/process-converter';

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
  COPY_PROCESS: `${namespace}/copyProcess`,
  DELETE: `${namespace}/delete`,
};

export const actions: ActionTree<ProcessState, RootState> = {
  update({ commit }, payload: Partial<ProcessState>) {
    commit(processMutationTypes.UPDATE, payload);
  },
  async loadAttachments({ commit, state }) {
    if (!state.id) {
      return;
    }

    const attachments = (await HTTP.get<Attachment[]>(
      `/api/attachments/${state.id}`
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
  async removeAttachment({ commit, state }, id: string) {
    await HTTP.delete(`/api/attachments/${state.id}/${id}`);
    if (!state.attachments) {
      return;
    }
    commit(processMutationTypes.ASSIGN, {
      attachments: state.attachments.filter(a => a.id !== id)
    });
  },
  async saveComment(
    { commit, state }, message: string
  ): Promise<void> {
    const comment = (await HTTP.put<Comment>(`api/comments/${state.id}`, 
       message 
    )).data;

    commit(processMutationTypes.SAVE_COMMENTS, [...state.comments, comment]);
  },
  async loadComments({ commit, state }) {
    const comments = (await HTTP.get<Comment[]>(`api/comments/${state.id}`))
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
  async loadProcessDetails({ commit }, id: string) {
    if (!id) {
      return;
    }

    const process = (await HTTP.get<ProcessResponse>(`api/processes/${id}?projection=extended`)).data;

    const converted = responseToState(process);

    commit(processMutationTypes.UPDATE, converted);
  },
  async createProcess({ commit }, process: ProcessState) {
    const created = await HTTP.post(`api/processes`, process);
  },

  async report({commit, state}): Promise<string | null> {
    const converted: ProcessRequest = await stateToRequest(state);
    const process = (await HTTP.post<Process>(`api/processes`, converted)).data;
    
    await commit(processMutationTypes.UPDATE, process);
    return state.id;
  },
  async copyProcess({commit, state}): Promise<string | null> {
    const copy = (await HTTP.post<Process>(`api/processes/${state.id}/copy`)).data;
    // TODO: notify copy complete
    commit(processMutationTypes.UPDATE, copy);
    return copy.id;
  },
  async save({commit, state}) {
    const converted = await stateToRequest(state);
    const updated = (await HTTP.put(`api/processes/${state.id}`, converted)).data;
    // TODO: notify update
    commit(processMutationTypes.UPDATE, updated);
  },
  async delete({commit, state}) {
    const deleted = (await HTTP.delete(`api/processes/${state.id}`)).status;
    // notify user, process is deleted
  }
};

export interface NewComment {
  message: string;
  processId: string;
}
