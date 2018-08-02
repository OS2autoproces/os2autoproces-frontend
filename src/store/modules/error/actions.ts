import { errorMutationTypes } from '@/store/modules/error/mutations';
import { ErrorState } from '@/store/modules/error/state';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { Process } from '@/store/modules/process/state';

export const namespace = 'error';

export const errorActionTypes = {
  UPDATE_PROCESS_ERRORS: `${namespace}/updateProcessErrors`
};

type ProcessLabels = { [X in keyof Process]?: string };

export const umbrellaLabels: ProcessLabels = {
  localId: 'Lokalt ID',
  contact: 'Kontaktperson',
  title: 'Titel',
  shortDescription: 'Resume',
  longDescription: 'Beskrivelse',
  domains: 'Domæner',
  kle: 'KLE NR.',
  kla: 'KLA NR',
  klId: 'KL ID'
};

export const generalInformationLabels: ProcessLabels = {
  localId: 'Lokalt ID',
  phase: 'Fase',
  owner: 'Ejer',
  contact: 'Kontaktperson',
  status: 'Status',
  statusText: 'Statustekst',
  title: 'Titel',
  shortDescription: 'Resume',
  domains: 'Domæner',
  visibility: 'Synlighed',
  legalClause: 'Lov og paragraf',
  kle: 'KLE-NR.',
  kla: 'KLA',
  vendor: 'Leverandør',
  klId: 'KL ID',
  orgUnits: 'Afdelinger'
};

export const challengesLabels: ProcessLabels = {
  longDescription: 'Beskrivelse',
  processChallenges: 'Udfordringer i den nuværende proces',
  solutionRequests: 'Løsningsbeskrivelse',
  itSystems: 'Nuværende system'
};

export const timeAndProcessLabels: ProcessLabels = {
  timeSpendOccurancesPerEmployee: 'Antal gange processen gentages om året pr. medarbejder',
  timeSpendPerOccurance: 'Tidsforbrug pr. proces i minutter',
  timeSpendEmployeesDoingProcess: 'Antal medarbejdere der foretager processen',
  timeSpendPercentageDigital: 'Tidsbesparelse i %',
  timeSpendComputedTotal: 'Total besparelse',
  timeSpendComment: 'Kommentar vedr. tidsforbrug'
};

export const assessmentLabels: ProcessLabels = {
  levelOfProfessionalAssessment: 'I hvor høj grad er der faglig vurdering?',
  levelOfChange: 'I hvor høj grad er processen præget af hyppige ændringer?',
  levelOfStructuredInformation: 'I hvor høj grad er processen baseret på struktureret information?',
  levelOfUniformity: 'I hvor høj grad er processen uniform?',
  levelOfDigitalInformation: 'Er data og informationer, der skal bruges i processen tilgængelige?',
  levelOfQuality: 'Bidrager løsningen til en højere kvalitet, som er mere ensrettet og med færre fejl?',
  levelOfSpeed: 'Bidrager løsningen til en hurtigere og mere fyldestgørende service?',
  levelOfRoutineWorkReduction: 'Frigiver løsningen tid og nedbringer rutineopgaver?',
  evaluatedLevelOfRoi: 'I hvor høj grad vurderes det at processen kan automatiseres?'
};

export const specificationLabels: ProcessLabels = {
  esdhReference: 'ESDH Reference'
};

export const implementationLabels: ProcessLabels = {
  technologies: 'Anvendt teknologi',
  technicalImplementationNotes: 'Teknisk implementering',
  organizationalImplementationNotes: 'Organisatorisk implementering'
};

export const operationLabels: ProcessLabels = {
  rating: 'I hvor højgrad realiserer processen sit potentiale',
  ratingComment: 'Kommentar til realiseret løsningspotentiale',
  decommissioned: 'Løsning taget ud af drift',
  legalClauseLastVerified: 'Sidst kontrolleret i forhold til §'
};

export const processLabels: ProcessLabels = {
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
