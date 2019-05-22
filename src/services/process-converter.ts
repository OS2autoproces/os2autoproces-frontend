import { Domain } from '@/models/domain';
import { LikertScale, LikertScaleKeys } from '@/models/likert-scale';
import { Phase, PhaseKeys } from '@/models/phase';
import { Status, StatusKeys } from '@/models/status';
import { RunPeriod, RunPeriodKeys } from '@/models/runperiod';
import { Type, TypeKeys } from '@/models/types';
import { Visibility, VisibilityKeys } from '@/models/visibility';
import { User } from '@/store/modules/auth/state';
import { ITSystem, Link, OrgUnit, Process, ProcessState, Technology } from '@/store/modules/process/state';
import { state } from '@/store/modules/search';

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

function stateToRequestFields(state: ProcessState): ProcessRequest {
  return {
    klId: defaultNull(state.klId),
    esdhReference: defaultNull(state.esdhReference),
    phase: state.phase || PhaseKeys.IDEA,
    status: state.status || StatusKeys.PENDING,
    statusText: defaultNull(state.statusText),
    runPeriod: state.runPeriod || RunPeriodKeys.ONDEMAND,
    created: defaultNull(state.created),
    lastChanged: defaultNull(state.lastChanged),
    decommissioned: defaultNull(state.decommissioned),
    title: state.title,
    shortDescription: state.shortDescription,
    longDescription: defaultNull(state.longDescription),
    domains: state.domains || [],
    visibility: state.visibility || VisibilityKeys.MUNICIPALITY,
    legalClause: defaultNull(state.legalClause),
    legalClauseLastVerified: defaultNull(state.legalClauseLastVerified),
    kle: state.kle ? state.kle.code : null,
    form: state.form ? state.form.code : null,
    kla: defaultNull(state.kla),
    links: defaultNull(state.links),
    vendor: defaultNull(state.vendor),
    internalNotes: defaultNull(state.internalNotes),
    processChallenges: defaultNull(state.processChallenges),
    solutionRequests: defaultNull(state.solutionRequests),
    timeSpendEmployeesDoingProcess: defaultZero(state.timeSpendEmployeesDoingProcess),
    timeSpendOccurancesPerEmployee: defaultZero(state.timeSpendOccurancesPerEmployee),
    timeSpendPercentageDigital: defaultZero(state.timeSpendPercentageDigital),
    timeSpendPerOccurance: defaultZero(state.timeSpendPerOccurance),
    timeSpendComment: state.timeSpendComment,
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
    searchWords: '',
    type: state.type || TypeKeys.CHILD,
    itSystemsDescription: defaultNull(state.itSystemsDescription),
    sepMep: state.sepMep,
    contact: state.contact && relation('users', state.contact),
    owner: state.owner && relation('users', state.owner),
    orgUnits: relationArray('orgUnits', state.orgUnits),
    users: relationArray('users', state.users),
    technologies: relationArray('technologies', state.technologies),
    itSystems: relationArray('itSystems', state.itSystems),
    children: relationArray('processes', state.children)
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
    'runPeriod',
  ]);
}

export function stateToRequest(state: ProcessState): Partial<ProcessRequest> {
  const request = stateToRequestFields(state);

  if (state.type === TypeKeys.GLOBAL_PARENT || state.type === TypeKeys.PARENT) {
    return buildUmbrellaRequest(request);
  }

  return stateToRequestFields(state);
}

export function responseToState(process: ProcessResponse): Process {
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
    form: process.form ? { code: process.form } : null,
    legalClause: process.legalClause || '',
    kle: process.kle ? { code: process.kle } : null,
    kla: process.kla || '',
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
