import { errorMutationTypes } from '@/store/modules/error/mutations';
import { ErrorState } from '@/store/modules/error/state';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { Process, ProcessState } from '@/store/modules/process/state';
import { getInvalidProperties } from '@/store/modules/process/validation';
import { getProcessKeys } from '@/store/modules/process/getters';

export const namespace = 'error';

export const errorActionTypes = {
  UPDATE_PROCESS_ERRORS: `${namespace}/updateProcessErrors`,
  CLEAR_ERRORS: `${namespace}/clearErrors`
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
  kla: 'KL’s Arbejdsgangsbank',
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
  kla: 'KL’s Arbejdsgangsbank',
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
  timeSpendOccurancesPerEmployee: 'Antal gange processen foretages årligt',
  timeSpendPerOccurance: 'Tidsforbrug pr. proces i minutter',
  timeSpendEmployeesDoingProcess: 'Antal medarbejdere der foretager processen',
  timeSpendPercentageDigital: 'Tidsbesparelse i %',
  timeSpendComputedTotal: 'Total besparelse',
  timeSpendComment: 'Kommentar vedr. tidsforbrug'
};

export const assessmentLabels: ProcessLabels = {
  levelOfProfessionalAssessment: 'I hvor høj grad indgår der faglig vurdering i processen?',
  levelOfChange: 'I hvor høj grad er processen præget af hyppige ændringer?',
  levelOfStructuredInformation: 'I hvor høj grad er processen baseret på struktureret information?',
  levelOfUniformity: 'Er der variation i den måde processen løses?',
  levelOfDigitalInformation:
    'Er de data og informationer, der skal bruges i processen, tilgængelige digitalt i IT-systemer?',
  levelOfQuality:
    'Vil en automatiseret løsning bidrage til en højere kvalitet, som er mere ensrettet og med færre fejl?',
  levelOfSpeed: 'Vil en automatiseret løsning bidrage til en hurtigere og mere fyldestgørende service?',
  levelOfRoutineWorkReduction:
    'Vil automatisering frigive tid og nedbringe rutineopgaver, som skaber en bedre trivsel blandt medarbejderne?',
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

const errorLabels: { [key: string]: string[] } = {
  generalInformation: Object.keys(generalInformationLabels),
  challenges: Object.keys(challengesLabels),
  assessment: Object.keys(assessmentLabels),
  timeAndProcess: Object.keys(timeAndProcessLabels),
  specification: Object.keys(specificationLabels),
  implementation: Object.keys(implementationLabels),
  operation: Object.keys(operationLabels)
};

export const actions: ActionTree<ErrorState, RootState> = {
  updateProcessErrors({ commit, state }, processState: ProcessState) {
    Object.keys(errorLabels).forEach(section => {
      const sectionErrors = getInvalidProperties(processState, errorLabels[section] as Array<keyof Process>);
      // @ts-ignore
      const errors = sectionErrors.map(error => processLabels[error]);
      commit(errorMutationTypes.ASSIGN, { [section]: { errors, section: state[section].section } });
    });
  },
  clearErrors({ commit, state }) {
    Object.keys(errorLabels).forEach(section => {
      commit(errorMutationTypes.ASSIGN, { [section]: { errors: [], section: state[section].section } });
    });
  }
};
