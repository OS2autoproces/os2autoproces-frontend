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

const namespaced = true;

export const state: ProcessState = {
  /* General information */
  contact: null,
  created: '',
  cvr: '',
  decommissioned: null,
  domain: '',
  vendor: null,
  visibility: VisibilityKeys.PERSONAL,
  phase: PhaseKeys.IDEA,
  localId: null,
  longDescription: null,
  owner: null,
  reporter: null,
  shortDescription: '',
  status: StatusKeys.PENDING,
  statusText: null,
  users: null,
  legalClause: '',
  kla: null,
  klaProcess: false,
  kle: null,
  klId: null,
  orgUnits: null,

  /* Assessment */
  evaluatedLevelOfRoi: LikertScaleKeys.UNKNOWN,
  levelOfChange: LikertScaleKeys.UNKNOWN,
  levelOfDigitalInformation: LikertScaleKeys.UNKNOWN,
  levelOfProfessionalAssessment: LikertScaleKeys.UNKNOWN,
  levelOfRoiFromAutomization: LikertScaleKeys.UNKNOWN,
  levelOfStructuredInformation: LikertScaleKeys.UNKNOWN,
  levelOfUniformity: LikertScaleKeys.UNKNOWN,

  /* Challenges */
  solutionRequests: null,
  processChallenges: null,
  itSystems: null,
  
  /* Time and process */
  targestsCitizens: false,
  targetsCompanies: false,
  timeSpendComment: '',
  timeSpendComputedTotal: 0,
  timeSpendEmployeesDoingProcess: 0,
  timeSpendOccurancesPerEmployee: 0,
  timeSpendPercentageDigital: 0,
  timeSpendPerOccurance: 0,

  /* Specification */
  esdhReference: null,
  
  /* Implementation */
  organizationalImplementationNotes: null,
  technicalImplementationNotes: null,
  technologies: null,
  
  /* Operation */
  lastChanged: '',
  legalClauseLastVerified: null,
  rating: null,
  ratingComment: null,
  
  /* Attachments */
  links: null,
  attachments: null,
  
  /* Details */
  id: 1,
  title: '',
  searchWords: '',
  internalNotes: null,
  comments: [],

  disabled: {
    titleEdit: false,
    generalInformationEdit: false,
    challengesEdit: false,
    timeAndProcessEdit: false,
    assessmentEdit: false,
    operationEdit: false,
    specificationEdit: false,
    implementationEdit: false,
    attachmentsEdit: false,
    municipalityUsingEdit: false
  }
};

export const process: Module<ProcessState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
