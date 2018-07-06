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

export function initialProcessState(): ProcessState {
  return {
    id: '',
    kle: '',
    localId: '',
    contact: null,
    klId: '',
    kla: '',
    legalClause: '',
    orgUnits: [],
    domain: DomainKeys.WORK,
    visibility: VisibilityKeys.PERSONAL,
    vendor: null,
    owner: null,
    users: [],
    shortDescription: '',
    phase: PhaseKeys.IDEA,
    status: StatusKeys.PENDING,
    statusText: '',
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
    solutionRequests: '',
    processChallenges: '',
    longDescription: '',
    itSystems: [],
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
    esdhReference: '',
    
    /* Implementation */
    organizationalImplementationNotes: '',
    technicalImplementationNotes: '',
    technologies: [],
    
    /* Operation */
    lastChanged: null,
    decommissioned: null,
    legalClauseLastVerified: null,
    rating: 1,
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
    canEdit: true,
    
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
  }
};

export const state: ProcessState = initialProcessState();

export const process: Module<ProcessState, RootState> = {
  actions,
  mutations,
  getters,
  namespaced,
  state,
};
