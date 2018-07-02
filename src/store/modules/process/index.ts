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
    contact: null,
    created: '',
    cvr: '',
    decommissioned: null,
    disabled: false,
    domain: '',
    esdhReference: null,
    evaluatedLevelOfRoi: LikertScaleKeys.UNKNOWN,
    levelOfChange: LikertScaleKeys.UNKNOWN,
    levelOfDigitalInformation: LikertScaleKeys.UNKNOWN,
    levelOfProfessionalAssessment: LikertScaleKeys.UNKNOWN,
    levelOfRoiFromAutomization: LikertScaleKeys.UNKNOWN,
    levelOfStructuredInformation: LikertScaleKeys.UNKNOWN,
    levelOfUniformity: LikertScaleKeys.UNKNOWN,
    links: null,
    localId: null,
    longDescription: null,
    organizationalImplementationNotes: null,
    orgUnits: null,
    visibility: VisibilityKeys.PERSONAL,
    owner: null,
    phase: PhaseKeys.IDEA,
    processChallenges: null,
    rating: null,
    ratingComment: null,
    reporter: null,
    searchWords: '',
    shortDescription: '',
    solutionRequests: null,
    status: StatusKeys.PENDING,
    statusText: null,
    targestsCitizens: false,
    targetsCompanies: false,
    technicalImplementationNotes: null,
    technologies: null,
    timeSpendComment: '',
    timeSpendComputedTotal: 0,
    timeSpendEmployeesDoingProcess: 0,
    timeSpendOccurancesPerEmployee: 0,
    timeSpendPercentageDigital: 0,
    timeSpendPerOccurance: 0,
    title: '',
    users: null,
    vendor: null,
    id: 1,
    internalNotes: null,
    itSystems: null,
    kla: null,
    klaProcess: false,
    kle: null,
    klId: null,
    lastChanged: '',
    legalClause: '',
    legalClauseLastVerified: null,
};

export const process: Module<ProcessState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
