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
import { processMutationTypes } from '@/store/modules/process/mutations';
import { Attachment, ITSystem, Process, ProcessState, Technology, AttachmentFile } from '@/store/modules/process/state';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { getInvalidProperties } from '@/store/modules/process/validation';
import { getProcessKeys } from '@/store/modules/process/getters';

export const namespace = 'process';

export const processActionTypes = {
  UPDATE: `${namespace}/update`,
  ASSIGN: `${namespace}/assign`,
  CLEAR_PROCESS: `${namespace}/clear`,
  UPLOAD_ATTACHMENTS: `${namespace}/uploadAttachments`,
  REMOVE_ATTACHMENTS: `${namespace}/removeAttachment`,
  LOAD_ATTACHMENTS: `${namespace}/loadAttachments`,
  SAVE_COMMENT: `${namespace}/saveComment`,
  LOAD_COMMENTS: `${namespace}/loadComments`,
  SAVE: `${namespace}/save`,
  REPORT: `${namespace}/report`,

  ADD_USER: `${namespace}/addUser`,
  REMOVE_USER: `${namespace}/removeUser`,

  ADD_ORGUNIT: `${namespace}/addOrgUnit`,
  REMOVE_ORGUNIT: `${namespace}/removeOrgUnit`,

  ADD_TECHNOLOGY: `${namespace}/addTechnology`,
  REMOVE_TECHNOLOGY: `${namespace}/removeTechnology`,

  SAVE_IT_SYSTEM: `${namespace}/saveItSystem`,

  LOAD_PROCESS_DETAILS: `${namespace}/loadProcessDetails`,
  CREATE_PROCESS: `${namespace}/createProcess`,
  COPY_PROCESS: `${namespace}/copyProcess`,
  REMOVE_PROCESS: `${namespace}/removeProcess`,

  SET_EMAIL_NOTIFICATION: `${namespace}/setEmailNotification`,
  SET_BOOKMARK: `${namespace}/setBookmark`
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
  async loadAttachments({ commit, state }, id: string) {
    if (!id) {
      return;
    }
    const attachments = (await HTTP.get<Attachment[]>(`/api/attachments/${id}`)).data;
    commit(processMutationTypes.ASSIGN, { attachments });
  },
  async uploadAttachments({ commit, state }, files: AttachmentFile[]) {
    const privateAttachments = new FormData();
    const publicAttachments = new FormData();

    files.forEach(file => {
      const form = file.visibleToOtherMunicipalities ? publicAttachments : privateAttachments;
      form.append('files', file.file);
    });

    const [privateResult, publicResult] = await Promise.all([
      HTTP.post<Attachment[]>(`/api/attachments/${state.id}`, privateAttachments),
      HTTP.post<Attachment[]>(`/api/attachments/${state.id}/public`, publicAttachments)
    ]);

    const existingAttachments = state.attachments || [];
    const attachments: Attachment[] = [...existingAttachments, ...privateResult.data, ...publicResult.data];

    commit(processMutationTypes.ASSIGN, { attachments });
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
  async loadProcessDetails({ commit }, id: number) {
    if (!id) {
      return;
    }

    const response = await HTTP.get<ProcessResponse>(`api/processes/${id}?projection=extended`);

    const process = responseToState(response.data);

    commit(processMutationTypes.ASSIGN, process);

    return process;
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
  async report({ commit, state, dispatch }, validationKeys?: Array<keyof Process>): Promise<string | null> {
    const invalidFields = getInvalidProperties(state, validationKeys || getProcessKeys(state));

    if (invalidFields.length > 0) {
      dispatch(errorActionTypes.UPDATE_PROCESS_ERRORS, { processErrors: invalidFields }, { root: true });
      return null;
    } else {
      const converted = await stateToRequest(state);
      const response = (await HTTP.post<ProcessResponse>(`api/processes`, converted)).data;
      const process = responseToState(response);
      await commit(processMutationTypes.UPDATE, setBackendManagedFields(process));
      return process.id;
    }
  },
  async save({ commit, state, dispatch }, validationKeys?: Array<keyof Process>) {
    const invalidFields = getInvalidProperties(state, validationKeys || getProcessKeys(state));

    if (invalidFields.length > 0) {
      dispatch(errorActionTypes.UPDATE_PROCESS_ERRORS, { processErrors: invalidFields }, { root: true });
    } else {
      const converted = await stateToRequest(state);
      const response = await HTTP.patch<ProcessResponse>(`api/processes/${state.id}`, converted);

      const process = responseToState(response.data);
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
  },
  async setBookmark({ commit, state }, hasBookmarked: boolean) {
    const url = `api/bookmarks/${state.id}`;
    const method = hasBookmarked ? HTTP.put : HTTP.delete;

    await method(url);

    commit(processMutationTypes.UPDATE, { hasBookmarked });
  }
};

export function initialProcessState(): ProcessState {
  return {
    id: '',
    localId: '',
    kle: null,
    form: null,
    contact: null,
    klId: '',
    kla: null,
    legalClause: '',
    orgUnits: [],
    domains: [],
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
    parents: [],

    /* Assessment */
    levelOfProfessionalAssessment: LikertScaleKeys.NOT_SET,
    levelOfChange: LikertScaleKeys.NOT_SET,
    levelOfStructuredInformation: LikertScaleKeys.NOT_SET,
    levelOfUniformity: LikertScaleKeys.NOT_SET,
    levelOfDigitalInformation: LikertScaleKeys.NOT_SET,
    evaluatedLevelOfRoi: LikertScaleKeys.NOT_SET,
    levelOfQuality: LikertScaleKeys.NOT_SET,
    levelOfRoutineWorkReduction: LikertScaleKeys.NOT_SET,
    levelOfSpeed: LikertScaleKeys.NOT_SET,

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
      internalNotesEdit: true
    },

    emailNotification: false
  };
}
