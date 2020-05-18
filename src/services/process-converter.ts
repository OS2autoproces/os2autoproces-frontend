import { Domain } from '@/models/domain';
import { LikertScale, LikertScaleKeys } from '@/models/likert-scale';
import { Phase, PhaseKeys } from '@/models/phase';
import { Status, StatusKeys } from '@/models/status';
import { RunPeriod, RunPeriodKeys } from '@/models/runperiod';
import { Type, TypeKeys } from '@/models/types';
import { Visibility, VisibilityKeys } from '@/models/visibility';
import { User } from '@/store/modules/auth/state';
import { state } from '@/store/modules/common';
import { ITSystem, Link, OrgUnit, Process, ProcessState, Technology } from '@/store/modules/process/state';

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

  timeSpendOccurancesPerEmployee: number;
  timeSpendPerOccurance: number;
  timeSpendEmployeesDoingProcess: number;
  timeSpendPercentageDigital: number;
  timeSpendComment: string;
  targetsCompanies: boolean;
  targetsCitizens: boolean;

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
  searchWords: string | null;

  users: string[] | null;
  owner: string | null;
  contact: string | null;
  itSystems: string[] | null;
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

  timeSpendOccurancesPerEmployee: number;
  timeSpendPerOccurance: number;
  timeSpendEmployeesDoingProcess: number;
  timeSpendPercentageDigital: number;
  timeSpendComputedTotal: number;
  timeSpendComment: string;
  targetsCompanies: boolean;
  targetsCitizens: boolean;

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
  searchWords: string | null;

  users: User[] | null;
  owner: User;
  contact: User;
  reporter: User;
  itSystems: ITSystem[] | null;
  orgUnits: OrgUnit[] | null;
  technologies: Technology[] | null;
  children: Process[];
  parents: Process[];
}

function relation(name: string, entity: { id: number | string }): string {
  return `${window.autoProcessConfiguration.apiUrl}/api/${name}/${entity.id}`;
}

function relationArray<T extends { id: number | string }>(name: string, array: T[]): string[] {
  return array.map(entity => relation(name, entity));
}

function defaultNull(prop: any): any {
  return prop || null;
}

function defaultZero(prop: any) {
  return prop ? Number(prop) : 0;
}

function stateToRequestFields(processState: ProcessState): ProcessRequest {
  return {
    klId: defaultNull(processState.klId),
    esdhReference: defaultNull(processState.esdhReference),
    phase: processState.phase || PhaseKeys.IDEA,
    status: processState.status || StatusKeys.PENDING,
    statusText: defaultNull(processState.statusText),
    runPeriod: processState.runPeriod || RunPeriodKeys.ONDEMAND,
    created: defaultNull(processState.created),
    lastChanged: defaultNull(processState.lastChanged),
    decommissioned: defaultNull(processState.decommissioned),
    title: processState.title,
    shortDescription: processState.shortDescription,
    longDescription: defaultNull(processState.longDescription),
    domains: processState.domains || [],
    visibility: processState.visibility || VisibilityKeys.MUNICIPALITY,
    legalClause: defaultNull(processState.legalClause),
    legalClauseLastVerified: defaultNull(processState.legalClauseLastVerified),
    kle: processState.kle ? processState.kle.code : null,
    form: processState.form ? processState.form.code : null,
    kla: defaultNull(processState.kla),
    codeRepositoryUrl: processState.codeRepositoryUrl,
    links: defaultNull(processState.links),
    vendor: defaultNull(processState.vendor),
    internalNotes: defaultNull(processState.internalNotes),
    processChallenges: defaultNull(processState.processChallenges),
    solutionRequests: defaultNull(processState.solutionRequests),
    timeSpendEmployeesDoingProcess: defaultZero(processState.timeSpendEmployeesDoingProcess),
    timeSpendOccurancesPerEmployee: defaultZero(processState.timeSpendOccurancesPerEmployee),
    timeSpendPercentageDigital: defaultZero(processState.timeSpendPercentageDigital),
    timeSpendPerOccurance: defaultZero(processState.timeSpendPerOccurance),
    timeSpendComment: processState.timeSpendComment,
    targetsCompanies: processState.targetsCompanies,
    targetsCitizens: processState.targetsCitizens,
    levelOfProfessionalAssessment: processState.levelOfProfessionalAssessment || LikertScaleKeys.UNKNOWN,
    levelOfChange: processState.levelOfChange || LikertScaleKeys.UNKNOWN,
    levelOfDigitalInformation: processState.levelOfDigitalInformation || LikertScaleKeys.UNKNOWN,
    levelOfStructuredInformation: processState.levelOfStructuredInformation || LikertScaleKeys.UNKNOWN,
    levelOfUniformity: processState.levelOfUniformity || LikertScaleKeys.UNKNOWN,
    evaluatedLevelOfRoi: processState.evaluatedLevelOfRoi || LikertScaleKeys.UNKNOWN,
    levelOfQuality: processState.levelOfQuality || LikertScaleKeys.UNKNOWN,
    levelOfSpeed: processState.levelOfSpeed || LikertScaleKeys.UNKNOWN,
    levelOfRoutineWorkReduction: processState.levelOfRoutineWorkReduction || LikertScaleKeys.UNKNOWN,
    technicalImplementationNotes: defaultNull(processState.technicalImplementationNotes),
    organizationalImplementationNotes: defaultNull(processState.organizationalImplementationNotes),
    rating: defaultNull(processState.rating),
    ratingComment: defaultNull(processState.ratingComment),
    searchWords: '',
    type: processState.type || TypeKeys.CHILD,
    itSystemsDescription: defaultNull(processState.itSystemsDescription),
    sepMep: processState.sepMep,
    contact: processState.contact && relation('users', processState.contact),
    owner: processState.owner && relation('users', processState.owner),
    orgUnits: relationArray('orgUnits', processState.orgUnits),
    users: relationArray('users', processState.users),
    technologies: relationArray('technologies', processState.technologies),
    itSystems: relationArray('itSystems', processState.itSystems),
    children: relationArray('processes', processState.children)
  };
}

function pickFields(request: ProcessRequest, fields: Array<keyof ProcessRequest>): Partial<ProcessRequest> {
  return fields.reduce<Partial<ProcessRequest>>((partialRequest, field) => {
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
    'children',
    'domains',
    'title',
    'type',
    'longDescription',
    'shortDescription',
    'runPeriod'
  ]);
}

export function stateToRequest(processState: ProcessState): Partial<ProcessRequest> {
  const request = stateToRequestFields(processState);

  if (processState.type === TypeKeys.GLOBAL_PARENT || processState.type === TypeKeys.PARENT) {
    return buildUmbrellaRequest(request);
  }

  return stateToRequestFields(processState);
}

export function responseToState(process: ProcessResponse): Process {
  const kle = state.kles.find(k => k.code === process.kle);
  const kleName = !!kle ? kle.name : null;
  const form = state.forms.find(f => f.code === process.form);
  const formDesc = !!form ? form.description : null;
  return {
    ...process,
    id: process.id.toString(),
    sepMep: process.sepMep,
    hasChanged: false,
    timeSpendComputedTotal: process.timeSpendComputedTotal.toString(),
    timeSpendEmployeesDoingProcess: process.timeSpendEmployeesDoingProcess.toString(),
    timeSpendOccurancesPerEmployee: process.timeSpendOccurancesPerEmployee.toString(),
    timeSpendPercentageDigital: process.timeSpendPercentageDigital.toString(),
    timeSpendPerOccurance: process.timeSpendPerOccurance.toString(),
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
    timeSpendComment: process.timeSpendComment || '',
    technologies: process.technologies || [],
    users: process.users || [],
    klId: process.klId || '',
    form: process.form ? { code: process.form, description: !!formDesc ? formDesc : '' } : null,
    legalClause: process.legalClause || '',
    kle: process.kle ? { code: process.kle, name: !!kleName ? kleName : '' } : null,
    kla: process.kla || '',
    codeRepositoryUrl: process.codeRepositoryUrl || '',
    links: process.links || [],
    internalNotes: process.internalNotes || '',
    processChallenges: process.processChallenges || '',
    solutionRequests: process.solutionRequests || '',
    technicalImplementationNotes: process.technicalImplementationNotes || '',
    searchWords: process.searchWords || '',
    itSystems: process.itSystems || [],
    orgUnits: process.orgUnits || [],
    created: process.created || '',
    decommissioned: process.decommissioned || '',
    lastChanged: process.lastChanged || '',
    children: process.children || [],
    type: process.type || TypeKeys.CHILD,
    owner: process.owner,
    emailNotification: process.emailNotification || false
  };
}
