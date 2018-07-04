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
  id: null,
  kle: null,
  localId: null,
  contact: null,
  klId: null,
  kla: null,
  legalClause: '',
  orgUnits: null,
  domain: DomainKeys.WORK,
  visibility: VisibilityKeys.PERSONAL,
  vendor: null,
  owner: null,
  users: null,
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
  created: '',
  
  /* Time and process */
  timeSpendOccurancesPerEmployee: 0,
  timeSpendPerOccurance: 0,
  timeSpendComputedTotal: 0,
  timeSpendEmployeesDoingProcess: 0,
  timeSpendPercentageDigital: 0,
  targestsCitizens: false,
  targetsCompanies: false,
  timeSpendComment: '',
  
  /* Specification */
  esdhReference: null,
  
  /* Implementation */
  organizationalImplementationNotes: null,
  technicalImplementationNotes: null,
  technologies: null,
  
  /* Operation */
  lastChanged: '',
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
