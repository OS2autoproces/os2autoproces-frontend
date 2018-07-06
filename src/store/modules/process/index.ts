import { LikertScaleKeys } from '@/models/likert-scale';
import { PhaseKeys } from '@/models/phase';
import { StatusKeys } from '@/models/status';
import { VisibilityKeys } from '@/models/visibility';
import { actions } from '@/store/modules/process/actions';
import { getters } from '@/store/modules/process/getters';
import { mutations } from '@/store/modules/process/mutations';
import { ProcessState } from '@/store/modules/process/state';
import { RootState } from '@/store/store';
import { Module } from 'vuex';
import { DomainKeys } from '@/models/domain';

const namespaced = true;

export const state: ProcessState = {
  /* General information */
  id: '',
  kle: null,
  localId: '',
  contact: null,
  klId: '',
  kla: null,
  legalClause: '',
  orgUnits: null,
  domain: DomainKeys.WORK,
  visibility: VisibilityKeys.PERSONAL,
  vendor: null,
  owner: null,
  users: [],
  shortDescription: '',
  phase: PhaseKeys.IDEA,
  status: StatusKeys.PENDING,
  statusText: null,
  klaProcess: false,
  municipalityName: '',
  
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
  solutionRequests: null,
  processChallenges: null,
  longDescription: null,
  itSystems: null,
  created: null,
  
  /* Time and process */
  timeSpendOccurancesPerEmployee: '0',
  timeSpendPerOccurance: '0',
  timeSpendComputedTotal: '0',
  timeSpendEmployeesDoingProcess: '0',
  timeSpendPercentageDigital: '0',
  targestsCitizens: false,
  targetsCompanies: false,
  timeSpendComment: '',
  
  /* Specification */
  esdhReference: null,
  
  /* Implementation */
  organizationalImplementationNotes: null,
  technicalImplementationNotes: null,
  technologies: [],
  
  /* Operation */
  lastChanged: null,
  decommissioned: null,
  legalClauseLastVerified: null,
  rating: null,
  ratingComment: null,
  
  /* Attachments */
  links: null,
  attachments: null,
  
  /* Details */
  title: '',
  searchWords: '',
  internalNotes: null,
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
  }
};

export const process: Module<ProcessState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
