import { errorMutationTypes } from '@/store/modules/error/mutations';
import { ErrorState } from '@/store/modules/error/state';
import { Process, ProcessState } from '@/store/modules/process/state';
import { getInvalidProperties } from '@/store/modules/process/validation';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';

export const namespace = 'error';

export const errorActionTypes = {
  UPDATE_PROCESS_ERRORS: `${namespace}/updateProcessErrors`,
  CLEAR_ERRORS: `${namespace}/clearErrors`
};

// type ProcessLabels = { [X in keyof Process]?: { label: string; error: string } };
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
  owner: 'Fagligkontaktperson',
  contact: 'Kontaktperson',
  status: 'Status',
  statusText: 'Statustekst',
  title: 'Titel',
  shortDescription: 'Resume',
  domains: 'Domæner',
  visibility: 'Synlighed',
  legalClause: 'Lovparagraf',
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
  rating: 'I hvor høj grad indfriede løsningen de forventede gevinster?',
  ratingComment: 'Kommentar til realiseret gevinster',
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

interface ErrorLabels {
  [key: string]: Array<keyof Process>;
  generalInformation: Array<keyof Process>;
  challenges: Array<keyof Process>;
  assessment: Array<keyof Process>;
  timeAndProcess: Array<keyof Process>;
  specification: Array<keyof Process>;
  implementation: Array<keyof Process>;
  operation: Array<keyof Process>;
}

const errorLimitations: { [key: string]: string } = {
  localId: ' (maks 64 tegn)',
  klId: ' (maks 64 tegn)',
  title: ' (mellem 1 og 50 tegn)',
  visibility: ' (obligatorisk felt)',
  status: ' (obligatorisk felt)',
  kla: ' (8, 11 eller 14 tegn)',
  timeSpendOccurancesPerEmployee: ' (kun tal)',
  timeSpendPerOccurance: ' (kun tal)',
  timeSpendEmployeesDoingProcess: ' (kun tal)',
  timeSpendPercentageDigital: ' (maks 100 tegn)',
  owner: ' (obligatorisk felt)',
  technologies: ' (obligatorisk fra specifikations-fasen)',
  processChallenges: ' (obligatorisk fra Idé-fasen)'
};

const errorLabels: ErrorLabels = {
  generalInformation: Object.keys(generalInformationLabels) as Array<keyof Process>,
  challenges: Object.keys(challengesLabels) as Array<keyof Process>,
  assessment: Object.keys(assessmentLabels) as Array<keyof Process>,
  timeAndProcess: Object.keys(timeAndProcessLabels) as Array<keyof Process>,
  specification: Object.keys(specificationLabels) as Array<keyof Process>,
  implementation: Object.keys(implementationLabels) as Array<keyof Process>,
  operation: Object.keys(operationLabels) as Array<keyof Process>
};

export const actions: ActionTree<ErrorState, RootState> = {
  updateProcessErrors({ commit, state }, processState: ProcessState) {
    const sections = Object.keys(errorLabels);

    sections.forEach(section => {
      const sectionErrors = getInvalidProperties(processState, errorLabels[section]);
      const errors = sectionErrors.map(error => {
        if (processLabels[error]) {
          const tempError =
            // @ts-ignore
            processLabels[error].length < 35 ? processLabels[error] : processLabels[error].slice(0, 25) + '...';
          return tempError + (errorLimitations[error] ? errorLimitations[error] : '');
        }
        return '';
      });
      commit(errorMutationTypes.ASSIGN, { [section]: { errors, section: state[section].section } });
    });
  },
  clearErrors({ commit, state }) {
    const sections = Object.keys(errorLabels) as Array<keyof ErrorLabels>;

    sections.forEach(section => {
      commit(errorMutationTypes.ASSIGN, { [section]: { errors: [], section: state[section].section } });
    });
  }
};
