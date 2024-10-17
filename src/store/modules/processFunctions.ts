import { ProcessReport, BackendManagedFields, Attachment } from './processInterfaces';
import { VisibilityKeys } from '@/models/visibility';
import { PhaseKeys } from '@/models/phase';
import { StatusKeys } from '@/models/status';
import { RunPeriodKeys } from '@/models/runperiod';
import { TypeKeys } from '@/models/types';
import { LikertScaleKeys } from '@/models/likert-scale';
import { ProcessState, ProcessModule } from './process';

export function setBackendManagedFields(process: ProcessState): Partial<ProcessState> {
  const fields: BackendManagedFields = {
    id: !!process.id ? process.id : '',
    created: !!process.created ? process.created : '',
    lastChanged: !!process.lastChanged ? process.lastChanged : '',
    klaProcess: !!process.klaProcess,
    cvr: !!process.cvr ? process.cvr : '',
    municipalityName: !!process.municipalityName ? process.municipalityName : ''
  };

  return fields;
}

export const initialProcessState: ProcessState = {
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
  hasChanged: false,
  id: '',
  kle: null,
  form: null,
  contact: null,
  otherContactEmail: null,
  klId: '',
  kla: null,
  legalClause: '',
  orgUnits: [],
  domains: [],
  visibility: VisibilityKeys.MUNICIPALITY,
  vendor: null,
  owner: null,
  reporter: null,
  users: [],
  shortDescription: '',
  phase: PhaseKeys.IDEA,
  status: StatusKeys.NOT_RATED,
  statusText: '',
  runPeriod: RunPeriodKeys.NOT_CHOSEN_YET,
  klaProcess: false,
  municipalityName: '',
  type: TypeKeys.CHILD,
  children: [],
  parents: [],
  sepMep: false,

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
  itSystemsDescription: '',

  /* Time and process */
  timeSpendOccurancesPerEmployee: null,
  timeSpendPerOccurance: null,
  timeSpendComputedTotal: '0',
  timeSpendEmployeesDoingProcess: null,
  timeSpendPercentageDigital: null,
  expectedDevelopmentTime: null,
  targetsCitizens: null,
  targetsCompanies: null,
  timeSpendComment: '',
  inhabitants: null,
  employees: null,

  /* Implementation */
  organizationalImplementationNotes: '',
  technicalImplementationNotes: '',
  technologies: [],
  services: [],

  /* Operation */
  lastChanged: '',
  putIntoOperation: '',
  decommissioned: '',
  legalClauseLastVerified: null,
  rating: 0,
  ratingComment: '',
  automationDescription: '',

  /* Attachments */
  links: [],
  esdhReference: '',
  codeRepositoryUrl: '',

  /* Details */
  title: '',
  searchWords: '',
  internalNotes: '',
  cvr: '',
  hasBookmarked: false,
  canEdit: false,
  seenByCount: 0,
  base64Logo: null,
  canEditOtherContact: null,

  emailNotification: false
};

export const initialProcessKeys: Array<keyof ProcessState> = Object.keys(initialProcessState) as Array<
  keyof ProcessState
>;
