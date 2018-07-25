import { DomainKeys } from '@/models/domain';
import { LikertScaleKeys } from '@/models/likert-scale';
import { PhaseKeys } from '@/models/phase';
import { StatusKeys } from '@/models/status';
import { TypeKeys } from '@/models/types';
import { VisibilityKeys } from '@/models/visibility';
import { HTTP } from '@/services/http-service';
import { ProcessRequest, ProcessResponse, responseToState, stateToRequest } from '@/services/process-converter';
import { User } from '@/store/modules/auth/state';
import { errorActionTypes } from '@/store/modules/error/actions';
import { sectionValidation } from '@/store/modules/process/getters';
import { processMutationTypes } from '@/store/modules/process/mutations';
import { Attachment, ITSystem, Process, ProcessState, Technology } from '@/store/modules/process/state';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';

export const namespace = 'process';

export const processActionTypes = {
  UPDATE: `${namespace}/update`,
  ASSIGN: `${namespace}/assign`,
  CLEAR_PROCESS: `${namespace}/clear`,
  ADD_ATTACHMENTS: `${namespace}/addAttachments`,
  REMOVE_ATTACHMENTS: `${namespace}/removeAttachments`,
  LOAD_ATTACHMENTS: `${namespace}/loadAttachments`,
  SAVE_COMMENT: `${namespace}/saveComment`,
  LOAD_COMMENTS: `${namespace}/loadComments`,
  SAVE: `${namespace}/save`,
  REPORT: `${namespace}/report`,

  ADD_USER: `${namespace}/addUser`,
  REMOVE_USER: `${namespace}/removeUser`,

  ADD_TECHNOLOGY: `${namespace}/addTechnology`,
  REMOVE_TECHNOLOGY: `${namespace}/removeTechnology`,

  SAVE_IT_SYSTEM: `${namespace}/saveItSystem`,

  LOAD_PROCESS_DETAILS: `${namespace}/loadProcessDetails`,
  CREATE_PROCESS: `${namespace}/createProcess`,
  COPY_PROCESS: `${namespace}/copyProcess`,
  REMOVE_PROCESS: `${namespace}/removeProcess`,

  SET_EMAIL_NOTIFICATION: `${namespace}/setEmailNotification`
};

export interface NewComment {
  message: string;
  processId: string;
}

interface BackendManagedFields {
  id: string;
  created: string | null;
  lastChanged: string | null;
  timeSpendComputedTotal: string;
  klaProcess: boolean;
  cvr: string;
  municipalityName: string;
}

function setBackendManagedFields(process: Process): BackendManagedFields {
  return {
    id: process.id,
    created: process.created,
    timeSpendComputedTotal: process.timeSpendComputedTotal,
    lastChanged: process.lastChanged,
    klaProcess: process.klaProcess,
    cvr: process.cvr,
    municipalityName: process.municipalityName
  };
}

export const actions: ActionTree<ProcessState, RootState> = {
  update({ commit }, payload: Partial<ProcessState>) {
    commit(processMutationTypes.UPDATE, payload);
  },
  assign({ commit }, payload: Partial<ProcessState>) {
    commit(processMutationTypes.ASSIGN, payload);
  },
  clear({ commit }) {
    commit(processMutationTypes.ASSIGN, initialProcessState());
  },
  async loadAttachments({ commit, state }) {
    if (!state.id) {
      return;
    }

    const attachments = (await HTTP.get<Attachment[]>(`/api/attachments/${state.id}`)).data;

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
      const attachments = (await HTTP.post<Attachment[]>(`/api/attachments/${state.id}`, form)).data;
      if (!state.attachments) {
        return;
      }
      commit(processMutationTypes.ASSIGN, {
        attachments: [...state.attachments.filter(a => !placeholders.includes(a)), ...attachments]
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
  async saveComment({ commit, state }, message: string): Promise<void> {
    const comment = (await HTTP.put<Comment>(`api/comments/${state.id}`, message)).data;

    commit(processMutationTypes.ASSIGN, {
      comments: [...state.comments, comment]
    });
  },
  async loadComments({ commit, state }) {
    const comments = (await HTTP.get<Comment[]>(`api/comments/${state.id}`)).data;
    commit(processMutationTypes.ASSIGN, { comments });
  },

  addUser({ commit, state }, user: User): void {
    commit(processMutationTypes.ASSIGN, {
      users: [...state.users, user]
    });
  },
  removeUser({ commit, state }, user: User): void {
    commit(processMutationTypes.ASSIGN, {
      users: state.users.filter(u => u.uuid !== user.uuid)
    });
  },

  addTechnology({ commit, state }, technology: Technology) {
    if (state.technologies.some(t => t.name === technology.name)) {
      return;
    }
    commit(processMutationTypes.ASSIGN, {
      technologies: [...state.technologies, technology]
    });
  },
  removeTechnology({ commit, state }, index: number) {
    commit(processMutationTypes.ASSIGN, {
      technologies: state.technologies.filter((_, i) => i !== index)
    });
  },
  async loadProcessDetails({ commit }, id: string) {
    if (!id) {
      return;
    }

    const process = (await HTTP.get<ProcessResponse>(`api/processes/${id}?projection=extended`)).data;

    commit(processMutationTypes.ASSIGN, responseToState(process));
  },
  async report({ commit, state, dispatch }): Promise<string | null> {
    const invalidFields = sectionValidation(state, Object.keys(state));

    if (invalidFields) {
      dispatch(errorActionTypes.UPDATE_PROCESS_ERRORS, { processErrors: invalidFields }, { root: true });
      return null;
    } else {
      const converted: ProcessRequest = await stateToRequest(state);
      const response = (await HTTP.post<ProcessResponse>(`api/processes`, converted)).data;
      const process = responseToState(response);
      await commit(processMutationTypes.UPDATE, setBackendManagedFields(process));
      return process.id;
    }
  },
  async copyProcess({ commit, state }): Promise<string> {
    const response = await HTTP.post<ProcessResponse>(`api/processes/${state.id}/copy`);

    // Process has already been copied
    if (response.status === 400) {
      return state.id;
    }

    const process = responseToState(response.data);

    commit(processMutationTypes.UPDATE, setBackendManagedFields(process));
    return process.id;
  },
  async save({ commit, state, dispatch }) {
    const invalidFields = sectionValidation(state, Object.keys(state));

    if (invalidFields) {
      dispatch(errorActionTypes.UPDATE_PROCESS_ERRORS, { processErrors: invalidFields }, { root: true });
    } else {
      const converted = await stateToRequest(state);
      const response = await HTTP.put<ProcessResponse>(`api/processes/${state.id}`, converted);

      const process = responseToState(response.data);
      // TODO: notify update
      commit(processMutationTypes.UPDATE, setBackendManagedFields(process));
    }
  },
  async removeProcess({ state }) {
    await HTTP.delete(`api/processes/${state.id}`);
  },
  saveItSystem({ commit, state }, itSystem: ITSystem) {
    if (!state.itSystems || state.itSystems.some(s => itSystem === s)) {
      return;
    }
    commit(processMutationTypes.ASSIGN, {
      itSystems: [...state.itSystems, itSystem]
    });
  },
  async setEmailNotification({ commit, state }, emailNotification: boolean) {
    const url = `api/notifications/${state.id}`;
    const method = emailNotification ? HTTP.put : HTTP.delete;

    await method(url);

    commit(processMutationTypes.UPDATE, {
      emailNotification
    });
  }
};

export function initialProcessState() {
  return {
    id: '',
    localId: '',
    kle: '',
    contact: null,
    klId: '',
    kla: null,
    legalClause: '',
    orgUnits: [],
    domains: [DomainKeys.WORK],
    visibility: VisibilityKeys.PERSONAL,
    vendor: null,
    owner: null,
    users: [],
    shortDescription: '',
    phase: PhaseKeys.IDEA,
    status: StatusKeys.INPROGRESS,
    statusText: '',
    klaProcess: false,
    municipalityName: '',
    type: TypeKeys.CHILD,
    children: [],

    /* Assessment */
    levelOfProfessionalAssessment: LikertScaleKeys.UNKNOWN,
    levelOfChange: LikertScaleKeys.UNKNOWN,
    levelOfStructuredInformation: LikertScaleKeys.UNKNOWN,
    levelOfUniformity: LikertScaleKeys.UNKNOWN,
    levelOfDigitalInformation: LikertScaleKeys.UNKNOWN,
    evaluatedLevelOfRoi: LikertScaleKeys.UNKNOWN,
    levelOfQuality: LikertScaleKeys.UNKNOWN,
    levelOfRoutineWorkReduction: LikertScaleKeys.UNKNOWN,
    levelOfSpeed: LikertScaleKeys.UNKNOWN,

    /* Challenges */
    solutionRequests: '',
    processChallenges: '',
    longDescription: '',
    itSystems: [],
    created: '',

    /* Time and process */
    timeSpendOccurancesPerEmployee: '0',
    timeSpendPerOccurance: '0',
    timeSpendComputedTotal: '0',
    timeSpendEmployeesDoingProcess: '0',
    timeSpendPercentageDigital: '0',
    targetsCitizens: false,
    targetsCompanies: false,
    timeSpendComment: '',

    /* Specification */
    esdhReference: '',

    /* Implementation */
    organizationalImplementationNotes: '',
    technicalImplementationNotes: '',
    technologies: [],

    /* Operation */
    lastChanged: '',
    decommissioned: '',
    legalClauseLastVerified: null,
    rating: 0,
    ratingComment: '',

    /* Attachments */
    links: [],
    attachments: [],

    /* Details */
    title: '',
    searchWords: '',
    internalNotes: '',
    comments: [],
    cvr: '',
    hasBookmarked: false,
    canEdit: false,

    disabled: {
      titleEdit: true,
      generalInformationEdit: true,
      challengesEdit: true,
      timeAndProcessEdit: true,
      assessmentEdit: true,
      operationEdit: true,
      specificationEdit: true,
      implementationEdit: true,
      attachmentsEdit: true,
      municipalityUsingEdit: true
    },

    emailNotification: false
  };
}
