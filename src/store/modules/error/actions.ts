import { errorMutationTypes } from '@/store/modules/error/mutations';
import { ErrorState } from '@/store/modules/error/state';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';

export const namespace = 'error';

export const errorActionTypes = {
  UPDATE_PROCESS_ERRORS: `${namespace}/updateProcessErrors`
};

export const generalInformationLabels: { [key: string]: string } = {
  localId: 'Lokalt ID',
  phase: 'Fase',
  owner: 'Ejer',
  contact: 'Kontaktperson',
  status: 'Status',
  statusText: 'Statustekst',
  title: 'Title/Name',
  shortDescription: 'Resumé',
  domains: 'Domæner',
  visibility: 'Synlighed',
  legalClause: 'Lov og paragraf',
  kle: 'KLE NR.',
  kla: 'KLA NR',
  vendor: 'Leverandør',
  klId: 'KL ID'
};

export const challengesLabels: { [key: string]: string } = {
  longDescription: 'Beskrivelse',
  processChallenges: 'Process udfordringer',
  solutionRequests: 'Løsningsbeskrivelse',
  itSystems: 'Nuværende system'
};

export const timeAndProcessLabels: { [key: string]: string } = {
  timeSpendOccurancesPerEmployee: 'Antal gange processen gentages om året pr. medarbejder',
  timeSpendPerOccurance: 'Tidsforbrug pr. proces i minutter',
  timeSpendEmployeesDoingProcess: 'Antal medarbejdere der foretager processen',
  timeSpendPercentageDigital: 'Tidsbesparelse i %',
  timeSpendComputedTotal: 'Total besparelse',
  timeSpendComment: 'Kommentar vedr. tidsforbrug'
};

export const assessmentLabels: { [key: string]: string } = {
  levelOfProfessionalAssessment: 'I hvor høj grad er der faglig vurdering?',
  levelOfChange: 'I hvor høj grad er processen præget af hyppige ændringer?',
  levelOfStructuredInformation: 'I hvor høj grad er processen baseret på struktureret information?',
  levelOfUniformity: 'I hvor høj grad er processen uniform?',
  levelOfDigitalInformation: 'sadasd',
  levelOfQuality: 'Bidrager løsningen til en højere kvalitet, som er mere ensrettet og med færre fejl?',
  levelOfSpeed: 'Bidrager løsningen til en hurtigere og mere fyldesgørende service',
  levelOfRoutineWorkReduction: 'Frigiver løsningen tid og nedbringer rutineopgaver',
  evaluatedLevelOfRoi: 'I hvor høj grad vurderes det at processen kan automatiseres?'
};

export const specificationLabels: { [key: string]: string } = {
  esdhReference: 'ESDH Reference'
};

export const implementationLabels: { [key: string]: string } = {
  technologies: 'Anvendt teknologi',
  technicalImplementationNotes: 'Teknisk implementering',
  organizationalImplementationNotes: 'Organisatorisk implementering'
};

export const operationLabels: { [key: string]: string } = {
  rating: 'I hvor højgrad realiserer processen sit potentiale',
  ratingComment: 'Kommentar til realiseret løsningspotentiale',
  decommissioned: 'Løsning taget ud af drift',
  legalClauseLastVerified: 'Sidst kontrolleret i forhold til §'
};

export const processLabels: { [key: string]: string } = {
  ...generalInformationLabels,
  ...challengesLabels,
  ...timeAndProcessLabels,
  ...assessmentLabels,
  ...specificationLabels,
  ...implementationLabels,
  ...operationLabels,

  internalNotes: 'Interne Noter'
};

export const actions: ActionTree<ErrorState, RootState> = {
  updateProcessErrors({ commit }, errors: Partial<ErrorState>) {
    if (errors.processErrors) {
      const processErrors = errors.processErrors.map(error => processLabels[error]);
      commit(errorMutationTypes.ASSIGN, { processErrors });
    }
  }
};