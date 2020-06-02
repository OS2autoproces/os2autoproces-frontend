import { merge } from 'lodash';
import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { HTTP } from '@/services/http-service';
import { Disabled, Attachment, Comment, ProcessReport, AttachmentFile, Link } from './processInterfaces';
import { initialProcessState, setBackendManagedFields, getProcessKeys } from './processFunctions';
import { User } from '@/store/modules/auth';
import { Technology, ITSystem, Kle, Form, OrgUnit } from './commonInterfaces';
import { ProcessResponse, responseToState, stateToRequest } from '@/services/process-converter';
import { getInvalidProperties } from './validation';
import { isEmpty } from 'lodash';
import { PhaseOrder, Phase } from '@/models/phase';
import {
  assessmentLabels,
  challengesLabels,
  generalInformationLabels,
  implementationLabels,
  operationLabels,
  attachmentsLabels,
  timeAndProcessLabels,
  umbrellaLabels
} from '@/store/modules/errorInterfaces';
import { Status } from '@/models/status';
import { RunPeriod } from '@/models/runperiod';
import { Type } from '@/models/types';
import { Domain } from '@/models/domain';
import { Visibility } from '@/models/visibility';
import { LikertScale } from '@/models/likert-scale';
import { ErrorModule } from './error';

export interface ProcessState extends ProcessReport {
  disabled: Disabled | null;
  attachments: Attachment[] | null;
  comments: Comment[] | null;
}

@Module({ dynamic: true, store, name: 'process' })
export default class Process extends VuexModule implements ProcessState {
  id: string = '';
  klId: string | null = null;
  children: ProcessReport[] | null = null;
  parents: ProcessReport[] | null = null;
  hasChanged: boolean | null = null;
  sepMep: boolean | null = null;
  esdhReference: string | null = null;
  phase: Phase | null = null;
  status: Status | null = null;
  runPeriod: RunPeriod | null = null;
  statusText: string | null = null;
  created: string | null = null;
  lastChanged: string | null = null;
  decommissioned: string | null = null;
  title: string | null = null;
  type: Type | null = null;
  shortDescription: string | null = null;
  longDescription: string | null = null;
  domains: Domain[] | null = null;
  visibility: Visibility | null = null;
  legalClause: string | null = null;
  legalClauseLastVerified: string | null = null;
  kle: Kle | null = null;
  kla: string | null = null;
  klaProcess: boolean | null = null;
  codeRepositoryUrl: string | null = null;
  links: Link[] | null = null;
  vendor: string | null = null;
  cvr: string | null = null;
  internalNotes: string | null = null;
  processChallenges: string | null = null;
  itSystemsDescription: string | null = null;
  solutionRequests: string | null = null;
  timeSpendOccurancesPerEmployee: string | null = null;
  timeSpendPerOccurance: string | null = null;
  timeSpendEmployeesDoingProcess: string | null = null;
  timeSpendPercentageDigital: string | null = null;
  timeSpendComputedTotal: string | null = null;
  timeSpendComment: string | null = null;
  targetsCompanies: boolean | null = null;
  targetsCitizens: boolean | null = null;
  municipalityName: string | null = null;
  levelOfProfessionalAssessment: LikertScale | null = null;
  levelOfChange: LikertScale | null = null;
  levelOfStructuredInformation: LikertScale | null = null;
  levelOfUniformity: LikertScale | null = null;
  levelOfDigitalInformation: LikertScale | null = null;
  form: Form | null = null;
  levelOfQuality: LikertScale | null = null;
  levelOfSpeed: LikertScale | null = null;
  levelOfRoutineWorkReduction: LikertScale | null = null;
  evaluatedLevelOfRoi: LikertScale | null = null;
  technicalImplementationNotes: string | null = null;
  organizationalImplementationNotes: string | null = null;
  rating: number | null = null;
  ratingComment: string | null = null;
  searchWords: string | null = null;
  users: User[] | null = null;
  owner: User | null = null;
  contact: User | null = null;
  reporter: User | null = null;
  itSystems: ITSystem[] | null = null;
  orgUnits: OrgUnit[] | null = null;
  technologies: Technology[] | null = null;
  hasBookmarked: boolean | null = null;
  canEdit: boolean | null = null;
  emailNotification: boolean | null = null;
  disabled: Disabled | null = null;
  attachments: Attachment[] | null = null;
  comments: Comment[] | null = null;

  @Mutation
  UPDATE(state: Partial<ProcessState>) {
    if (state.hasChanged === undefined) {
      state.hasChanged = true;
    }

    merge(this, state);
  }

  @Mutation
  ASSIGN(state: Partial<ProcessState>) {
    if (state.hasChanged === undefined) {
      state.hasChanged = true;
    }
    Object.assign(this, state);
  }

  @Mutation
  UPDATE_WITH_NO_CHANGE(state: Partial<ProcessState>) {
    merge(this, state);
  }

  @Mutation
  ASSIGN_WITH_NO_CHANGE(state: Partial<ProcessState>) {
    Object.assign(this, state);
  }

  @Action
  update(payload: Partial<ProcessState>) {
    this.UPDATE(payload);
  }

  @Action
  assign(payload: Partial<ProcessState>) {
    this.ASSIGN(payload);
  }

  @Action
  clear() {
    this.ASSIGN(initialProcessState());
  }

  @Action
  async loadAttachments(id: string) {
    if (!id) {
      return;
    }
    const attachments = (await HTTP.get<Attachment[]>(`/api/attachments/${id}`)).data;
    this.ASSIGN_WITH_NO_CHANGE({ attachments });
  }

  @Action
  async uploadAttachments(files: AttachmentFile[]) {
    const privateAttachments = new FormData();
    const publicAttachments = new FormData();

    files.forEach(file => {
      const form = file.visibleToOtherMunicipalities ? publicAttachments : privateAttachments;
      form.append('files', file.file);
    });
    const [privateResult, publicResult] = await Promise.all([
      HTTP.post<Attachment[]>(`/api/attachments/${this.id}`, privateAttachments),
      HTTP.post<Attachment[]>(`/api/attachments/${this.id}/public`, publicAttachments)
    ]);

    const existingAttachments = this.attachments || [];
    const attachments: Attachment[] = [...existingAttachments, ...privateResult.data, ...publicResult.data];

    this.ASSIGN({ attachments });
  }

  @Action
  async removeAttachment(id: number) {
    await HTTP.delete(`/api/attachments/${this.id}/${id}`);
    if (!this.attachments) {
      return;
    }
    this.ASSIGN({
      attachments: this.attachments.filter(a => a.id !== id)
    });
  }

  @Action
  async saveComment(message: string): Promise<void> {
    if (this.comments) {
      const comment = (await HTTP.put<Comment>(`api/comments/${this.id}`, message)).data;

      this.ASSIGN_WITH_NO_CHANGE({
        comments: [...this.comments, comment]
      });
    }
  }

  @Action
  async loadComments() {
    const comments = (await HTTP.get<Comment[]>(`api/comments/${this.id}`)).data;
    this.ASSIGN_WITH_NO_CHANGE({ comments });
  }

  @Action
  addUser(user: User): void {
    if (this.users) {
      this.ASSIGN({ users: [...this.users, user] });
    } else {
      this.ASSIGN({ users: [user] });
    }
  }

  @Action
  removeUser(user: User): void {
    if (this.users) {
      this.ASSIGN({ users: this.users.filter(u => u.uuid !== user.uuid) });
    }
  }

  @Action
  addTechnology(technology: Technology) {
    if (this.technologies) {
      if (!this.technologies?.some(t => t.name === technology.name)) {
        this.ASSIGN({ technologies: [...this.technologies, technology] });
      }
    } else {
      this.ASSIGN({ technologies: [technology] });
    }
  }

  @Action
  removeTechnology(index: number) {
    if (this.technologies) {
      this.ASSIGN({ technologies: this.technologies.filter((_, i) => i !== index) });
    }
  }

  @Action
  async loadProcessDetails(id: number) {
    if (!id) {
      return;
    }

    const response = await HTTP.get<ProcessResponse>(`api/processes/${id}?projection=extended`);

    const process = responseToState(response.data);

    this.ASSIGN(process);

    return process;
  }

  @Action
  async copyProcess(): Promise<string> {
    const response = await HTTP.post<ProcessResponse>(`api/processes/${this.id}/copy`);

    // Process has already been copied
    if (response.status === 400) {
      return this.id;
    }

    const process = responseToState(response.data);

    this.UPDATE(setBackendManagedFields(process));
    return !!process.id ? process.id : '';
  }

  @Action
  async createReport(validationKeys?: Array<keyof ProcessReport>): Promise<string | null> {
    const invalidFields = getInvalidProperties(this, validationKeys || getProcessKeys(initialProcessState()));

    if (invalidFields.length > 0) {
      ErrorModule.updateProcessErrors(this);
      throw new Error();
    } else {
      const converted = stateToRequest(this);
      const response = await HTTP.post<ProcessResponse>(`api/processes`, converted);

      if (response.status !== 201) {
        throw new Error();
      }

      const process = responseToState(response.data);

      const fields = setBackendManagedFields(process);
      fields.hasChanged = false;

      this.UPDATE(fields);

      return process.id;
    }
  }

  @Action
  async save(validationKeys?: Array<keyof ProcessReport>) {
    const invalidFields = getInvalidProperties(this, validationKeys || getProcessKeys(this));
    if (invalidFields.length > 0) {
      ErrorModule.updateProcessErrors(this);
      throw new Error();
    } else {
      const converted = stateToRequest(this);
      const response = await HTTP.patch<ProcessResponse>(`api/processes/${this.id}`, converted);

      if (response.status !== 200) {
        throw new Error();
      }

      const fields = setBackendManagedFields(responseToState(response.data));
      fields.hasChanged = false;
      this.UPDATE(fields);
    }
  }

  @Action
  async removeProcess() {
    await HTTP.delete(`api/processes/${this.id}`);
  }

  @Action
  saveItSystem(itSystem: ITSystem) {
    if (!this.itSystems || this.itSystems.some(s => itSystem === s)) {
      return;
    }
    this.ASSIGN({ itSystems: [...this.itSystems, itSystem] });
  }

  @Action
  async setEmailNotification(emailNotification: boolean) {
    const url = `api/notifications/${this.id}`;
    const method = emailNotification ? HTTP.put : HTTP.delete;

    await method(url);

    this.UPDATE_WITH_NO_CHANGE({
      emailNotification
    });
  }

  @Action
  async setBookmark(hasBookmarked: boolean) {
    const url = `api/bookmarks/${this.id}`;
    const method = hasBookmarked ? HTTP.put : HTTP.delete;

    await method(url);

    this.UPDATE_WITH_NO_CHANGE({
      hasBookmarked
    });
  }

  @Action
  async setBookmarkFromSearch(bookmarkProcess: { id: number; hasBookmarked: boolean }): Promise<boolean> {
    const { id, hasBookmarked } = bookmarkProcess;
    const url = `api/bookmarks/${id}`;
    const method = hasBookmarked ? HTTP.put : HTTP.delete;

    const res = await method(url);

    // TODO change to update process state instead
    // this is not the way to do flow
    // action results should not be use for mutations directly in view.
    // Actions should affect changes in state

    return res.status === 200;
  }

  get isUmbrellaValid() {
    return !this.canEdit || isEmpty(getInvalidProperties(this, getProcessKeys(umbrellaLabels)));
  }
  get isGeneralInformationValid() {
    return !this?.canEdit || isEmpty(getInvalidProperties(this, getProcessKeys(generalInformationLabels)));
  }

  get isChallengesValid() {
    return !this?.canEdit || isEmpty(getInvalidProperties(this, getProcessKeys(challengesLabels)));
  }

  get isTimeAndProcessValid() {
    return !this?.canEdit || isEmpty(getInvalidProperties(this, getProcessKeys(timeAndProcessLabels)));
  }

  get isAssessmentValid() {
    return !this?.canEdit || isEmpty(getInvalidProperties(this, getProcessKeys(assessmentLabels)));
  }

  get isAttachmentsValid() {
    return !this?.canEdit || isEmpty(getInvalidProperties(this, getProcessKeys(attachmentsLabels)));
  }

  get isImplementationValid() {
    return !this?.canEdit || isEmpty(getInvalidProperties(this, getProcessKeys(implementationLabels)));
  }
  get isOperationValid() {
    return !this?.canEdit || isEmpty(getInvalidProperties(this, getProcessKeys(operationLabels)));
  }

  get minPhase() {
    return (phase: Phase) => (!!this.phase ? PhaseOrder.indexOf(phase) <= PhaseOrder.indexOf(this.phase) : false);
  }
}

export const ProcessModule = getModule(Process);
