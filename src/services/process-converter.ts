import { Domain } from '@/models/domain';
import { LikertScale, LikertScaleKeys } from '@/models/likert-scale';
import { Phase, PhaseKeys } from '@/models/phase';
import { Status, StatusKeys } from '@/models/status';
import { RunPeriod, RunPeriodKeys } from '@/models/runperiod';
import { Type, TypeKeys } from '@/models/types';
import { Visibility, VisibilityKeys } from '@/models/visibility';
import { User } from '@/store/modules/auth';
import { ProcessState } from '@/store/modules/process';
import { Link } from '@/store/modules/processInterfaces';
import { CommonModule } from '@/store/modules/common';
import { ITSystem, OrgUnit, Service, Technology } from '@/store/modules/commonInterfaces';
import { ProcessReport } from '@/store/modules/processInterfaces';

export interface ProcessRequest {
  klId: string | null;
  esdhReference: string | null;
  phase: Phase;
  status: Status;
  runPeriod: RunPeriod;
  statusText: string | null;
  type: Type;

  created: string | null;
  lastChanged: string | null;
  putIntoOperation: string | null;
  decommissioned: string | null;

  title: string;
  shortDescription: string;
  longDescription: string | null;
  domains: Domain[];
  visibility: Visibility;

  legalClause: string | null;
  legalClauseLastVerified: string | null;
  kle: string | null;
  kla: string | null;
  codeRepositoryUrl: string | null;
  links: Link[] | null;
  form: string | null;
  itSystemsDescription: string | null;

  vendor: string | null;
  internalNotes: string | null;

  processChallenges: string | null;
  solutionRequests: string | null;

  timeSpendOccurancesPerEmployee: number | null;
  timeSpendPerOccurance: number | null;
  timeSpendEmployeesDoingProcess: number | null;
  timeSpendPercentageDigital: number | null;
  expectedDevelopmentTime: number | null;
  timeSpendComment: string;
  targetsCompanies: boolean | null;
  targetsCitizens: boolean | null;

  levelOfProfessionalAssessment: LikertScale;
  levelOfChange: LikertScale;
  levelOfStructuredInformation: LikertScale;
  levelOfUniformity: LikertScale;
  levelOfDigitalInformation: LikertScale;
  evaluatedLevelOfRoi: LikertScale;
  levelOfQuality: LikertScale;
  levelOfRoutineWorkReduction: LikertScale;
  levelOfSpeed: LikertScale;

  technicalImplementationNotes: string | null;
  organizationalImplementationNotes: string | null;

  sepMep: boolean;

  rating: number | null;
  ratingComment: string | null;
  automationDescription: string | null;
  searchWords: string | null;

  users: string[] | null;
  owner: string | null;
  contact: string | null;
  otherContactEmail: string | null;
  itSystems: string[] | null;
  services: string[] | null;
  orgUnits: string[];
  technologies: string[] | null;
  children: string[];
}

export interface ProcessResponse {
  id: number;
  klaProcess: boolean;
  cvr: string;
  municipalityName: string;
  hasBookmarked: boolean;
  canEdit: boolean;
  emailNotification: boolean;
  form: string | null;
  itSystemsDescription: string | null;

  klId: string | null;
  esdhReference: string | null;
  phase: Phase;
  status: Status;
  runPeriod: RunPeriod;
  statusText: string | null;
  type: Type;

  created: string | null;
  lastChanged: string | null;
  putIntoOperation: string | null;
  decommissioned: string | null;

  title: string;
  shortDescription: string;
  longDescription: string | null;
  domains: Domain[];
  visibility: Visibility;

  legalClause: string | null;
  legalClauseLastVerified: string | null;
  kle: string | null;
  kla: string | null;
  codeRepositoryUrl: string | null;
  links: Link[] | null;

  vendor: string | null;
  internalNotes: string | null;

  processChallenges: string | null;
  solutionRequests: string | null;

  timeSpendOccurancesPerEmployee: number | null;
  timeSpendPerOccurance: number | null;
  timeSpendEmployeesDoingProcess: number | null;
  timeSpendPercentageDigital: number | null;
  timeSpendComputedTotal: number;
  expectedDevelopmentTime: number | null;
  timeSpendComment: string;
  targetsCompanies: boolean | null;
  targetsCitizens: boolean | null;

  levelOfProfessionalAssessment: LikertScale;
  levelOfChange: LikertScale;
  levelOfStructuredInformation: LikertScale;
  levelOfUniformity: LikertScale;
  levelOfDigitalInformation: LikertScale;
  evaluatedLevelOfRoi: LikertScale;
  levelOfQuality: LikertScale;
  levelOfRoutineWorkReduction: LikertScale;
  levelOfSpeed: LikertScale;

  technicalImplementationNotes: string | null;
  organizationalImplementationNotes: string | null;

  sepMep: boolean;

  rating: number | null;
  ratingComment: string | null;
  automationDescription: string | null;
  searchWords: string | null;

  users: User[] | null;
  owner: User | null;
  contact: User;
  otherContactEmail: string | null;
  reporter: User;
  itSystems: ITSystem[] | null;
  services: Service[] | null;
  orgUnits: OrgUnit[] | null;
  technologies: Technology[] | null;
  children: ProcessReport[];
  parents: ProcessReport[];
  seenByCount: number;
  base64Logo: string | null;
  employees: string | null;
  inhabitants: string | null;
  canEditOtherContact: boolean | null;
}

function relation(name: string, entity: { id: number | string } | null | undefined): string {
  return !!entity ? `${window.autoProcessConfiguration.apiUrl}/api/${name}/${entity.id}` : '';
}

function relationArray<T extends { id: number | string } | null | undefined>(
  name: string,
  array: T[] | null | undefined
): string[] {
  return array?.map(entity => relation(name, entity)) ?? [];
}

function defaultNull(prop: any): any {
  return prop || null;
}

function defaultZero(prop: any) {
  return prop ? Number(prop) : 0;
}

function stateToRequestFields(state: ProcessReport): ProcessRequest {
  return {
    klId: defaultNull(state.klId),
    esdhReference: defaultNull(state.esdhReference),
    phase: state.phase || PhaseKeys.IDEA,
    status: state.status || StatusKeys.PENDING,
    statusText: defaultNull(state.statusText),
    runPeriod: state.runPeriod || RunPeriodKeys.NOT_CHOSEN_YET,
    created: defaultNull(state.created),
    lastChanged: defaultNull(state.lastChanged),
    putIntoOperation: defaultNull(state.putIntoOperation),
    decommissioned: defaultNull(state.decommissioned),
    title: state.title ?? '',
    shortDescription: state.shortDescription ?? '',
    longDescription: defaultNull(state.longDescription),
    domains: state.domains || [],
    visibility: state.visibility || VisibilityKeys.MUNICIPALITY,
    legalClause: defaultNull(state.legalClause),
    legalClauseLastVerified: defaultNull(state.legalClauseLastVerified),
    kle: state.kle ? state.kle.code : null,
    form: state.form ? state.form.code : null,
    kla: defaultNull(state.kla),
    codeRepositoryUrl: state.codeRepositoryUrl ?? '',
    links: defaultNull(state.links),
    services: defaultNull(state.services),
    vendor: defaultNull(state.vendor),
    internalNotes: defaultNull(state.internalNotes),
    processChallenges: defaultNull(state.processChallenges),
    solutionRequests: defaultNull(state.solutionRequests),
    timeSpendEmployeesDoingProcess: defaultNull(state.timeSpendEmployeesDoingProcess),
    timeSpendOccurancesPerEmployee: defaultNull(state.timeSpendOccurancesPerEmployee),
    timeSpendPercentageDigital: defaultNull(state.timeSpendPercentageDigital),
    timeSpendPerOccurance: defaultNull(state.timeSpendPerOccurance),
    expectedDevelopmentTime: defaultNull(state.expectedDevelopmentTime),
    timeSpendComment: state.timeSpendComment ?? '',
    targetsCompanies: state.targetsCompanies,
    targetsCitizens: state.targetsCitizens,
    levelOfProfessionalAssessment: state.levelOfProfessionalAssessment || LikertScaleKeys.UNKNOWN,
    levelOfChange: state.levelOfChange || LikertScaleKeys.UNKNOWN,
    levelOfDigitalInformation: state.levelOfDigitalInformation || LikertScaleKeys.UNKNOWN,
    levelOfStructuredInformation: state.levelOfStructuredInformation || LikertScaleKeys.UNKNOWN,
    levelOfUniformity: state.levelOfUniformity || LikertScaleKeys.UNKNOWN,
    evaluatedLevelOfRoi: state.evaluatedLevelOfRoi || LikertScaleKeys.UNKNOWN,
    levelOfQuality: state.levelOfQuality || LikertScaleKeys.UNKNOWN,
    levelOfSpeed: state.levelOfSpeed || LikertScaleKeys.UNKNOWN,
    levelOfRoutineWorkReduction: state.levelOfRoutineWorkReduction || LikertScaleKeys.UNKNOWN,
    technicalImplementationNotes: defaultNull(state.technicalImplementationNotes),
    organizationalImplementationNotes: defaultNull(state.organizationalImplementationNotes),
    rating: defaultNull(state.rating),
    ratingComment: defaultNull(state.ratingComment),
    automationDescription: defaultNull(state.automationDescription),
    searchWords: '',
    type: state.type || TypeKeys.CHILD,
    itSystemsDescription: defaultNull(state.itSystemsDescription),
    sepMep: !!state.sepMep,
    contact: relation('users', state.contact),
    owner: relation('users', state.owner),
    otherContactEmail: defaultNull(state.otherContactEmail),
    orgUnits: relationArray('orgUnits', state.orgUnits),
    users: relationArray('users', state.users),
    technologies: relationArray('technologies', state.technologies),
    itSystems: relationArray('itSystems', state.itSystems),
    children: relationArray('processes', state.children)
  };
}

function pickFields(request: ProcessRequest, fields: Array<keyof ProcessRequest>): Partial<ProcessRequest> {
  return fields.reduce<Partial<ProcessRequest>>((partialRequest, field) => {
    // @ts-ignore
    partialRequest[field] = request[field];
    return partialRequest;
  }, {});
}

function buildUmbrellaRequest(request: ProcessRequest): Partial<ProcessRequest> {
  return pickFields(request, [
    'kle',
    'klId',
    'kla',
    'form',
    'contact',
    'otherContactEmail',
    'children',
    'domains',
    'title',
    'type',
    'longDescription',
    'shortDescription',
    'runPeriod'
  ]);
}

export function stateToRequest(state: ProcessState): Partial<ProcessRequest> {
  const request = stateToRequestFields(state);

  if (state.type === TypeKeys.GLOBAL_PARENT || state.type === TypeKeys.PARENT) {
    return buildUmbrellaRequest(request);
  }
  return request;
}

export function responseToState(process: ProcessResponse): ProcessState {
  const form = CommonModule.forms?.find(f => f.code === process.form);
  const kle = CommonModule.kles?.find(k => k.code === process.kle);
  return {
    attachments: [],
    comments: [],
    disabled: {
      generalInformationEdit: true,
      challengesEdit: true,
      timeAndProcessEdit: true,
      assessmentEdit: true,
      operationEdit: true,
      implementationEdit: true,
      attachmentsEdit: true,
      internalNotesEdit: true
    },
    ...process,
    id: process.id.toString(),
    sepMep: process.sepMep,
    hasChanged: false,
    timeSpendComputedTotal: process.timeSpendComputedTotal.toString(),
    timeSpendEmployeesDoingProcess: process.timeSpendEmployeesDoingProcess != null ? process.timeSpendEmployeesDoingProcess.toString() : '',
    timeSpendOccurancesPerEmployee: process.timeSpendOccurancesPerEmployee != null ? process.timeSpendOccurancesPerEmployee.toString() : '',
    timeSpendPercentageDigital: process.timeSpendPercentageDigital != null ? process.timeSpendPercentageDigital.toString() : '',
    timeSpendPerOccurance: process.timeSpendPerOccurance != null ? process.timeSpendPerOccurance.toString() : null,
    expectedDevelopmentTime: process.expectedDevelopmentTime != null ? process.expectedDevelopmentTime.toString() : null,
    rating: process.rating || 0,
    itSystemsDescription: process.itSystemsDescription || '',
    hasBookmarked: process.hasBookmarked,
    shortDescription: process.shortDescription || '',
    longDescription: process.longDescription || '',
    canEdit: process.canEdit,
    statusText: process.statusText || '',
    esdhReference: process.esdhReference || '',
    organizationalImplementationNotes: process.organizationalImplementationNotes || '',
    ratingComment: process.ratingComment || '',
    automationDescription: process.automationDescription || '',
    timeSpendComment: process.timeSpendComment || '',
    technologies: process.technologies || [],
    users: process.users || [],
    klId: process.klId || '',
    form: process.form ? { code: process.form, description: form?.description ?? '' } : null,
    legalClause: process.legalClause || '',
    kle: process.kle ? { code: process.kle, name: kle?.name ?? '' } : null,
    kla: process.kla || '',
    codeRepositoryUrl: process.codeRepositoryUrl || '',
    links: process.links || [],
    internalNotes: process.internalNotes || '',
    processChallenges: process.processChallenges || '',
    solutionRequests: process.solutionRequests || '',
    technicalImplementationNotes: process.technicalImplementationNotes || '',
    searchWords: process.searchWords || '',
    itSystems: process.itSystems || [],
    services: process.services || [],
    orgUnits: process.orgUnits || [],
    created: process.created || '',
    putIntoOperation: process.putIntoOperation || '',
    decommissioned: process.decommissioned || '',
    lastChanged: process.lastChanged || '',
    children: process.children || [],
    type: process.type || TypeKeys.CHILD,
    owner: process.owner,
    emailNotification: process.emailNotification || false,
    seenByCount: process.seenByCount,
    base64Logo: process.base64Logo || null,
    employees: process.employees || null,
    inhabitants: process.inhabitants || null,
    canEditOtherContact: process.canEditOtherContact || null
  };
}
