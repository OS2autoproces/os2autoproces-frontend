import { ProcessState } from './process';
import { ErrorState } from './error';

export interface ErrorSection {
  section: string;
  id: string;
  errors: ErrorWithDescription[];
}

export interface ErrorWithDescription {
  name: string;
  description: string;
}

type ProcessLabels = { [X in keyof ProcessState]?: string };

export const umbrellaLabels: ProcessLabels = {
  contact: 'Kontaktperson',
  title: 'Titel',
  shortDescription: 'Resume',
  longDescription: 'Beskrivelse',
  domains: 'Domæner',
  kle: 'KLE NR.',
  kla: 'KL’s Arbejdsgangsbank',
  klId: 'KL ID'
};

export const umbrellaKeys: Array<keyof ProcessLabels> = Object.keys(umbrellaLabels) as Array<keyof ProcessLabels>;

export const generalInformationLabels: ProcessLabels = {
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
  orgUnits: 'Afdelinger',
  sepMep: 'SEP/MEP'
};

export const generalInformationKeys: Array<keyof ProcessLabels> = Object.keys(generalInformationLabels) as Array<
  keyof ProcessLabels
>;

export const challengesLabels: ProcessLabels = {
  longDescription: 'Beskrivelse',
  processChallenges: 'Udfordringer i den nuværende proces',
  solutionRequests: 'Løsningsbeskrivelse',
  itSystems: 'Nuværende system'
};

export const challengeKeys: Array<keyof ProcessLabels> = Object.keys(challengesLabels) as Array<keyof ProcessLabels>;

export const timeAndProcessLabels: ProcessLabels = {
  timeSpendOccurancesPerEmployee: 'Antal gange processen foretages årligt',
  timeSpendPerOccurance: 'Tidsforbrug pr. proces i minutter',
  timeSpendEmployeesDoingProcess: 'Antal medarbejdere der foretager processen',
  timeSpendPercentageDigital: 'Tidsbesparelse i %',
  timeSpendComputedTotal: 'Total besparelse',
  timeSpendComment: 'Kommentar vedr. tidsforbrug'
};

export const timeAndProcessKeys: Array<keyof ProcessLabels> = Object.keys(timeAndProcessLabels) as Array<
  keyof ProcessLabels
>;

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

export const assessmentKeys: Array<keyof ProcessLabels> = Object.keys(assessmentLabels) as Array<keyof ProcessLabels>;

export const attachmentsLabels: ProcessLabels = {
  esdhReference: 'ESDH Reference'
};

export const attachmentKeys: Array<keyof ProcessLabels> = Object.keys(attachmentsLabels) as Array<keyof ProcessLabels>;

export const implementationLabels: ProcessLabels = {
  technologies: 'Anvendt teknologi',
  technicalImplementationNotes: 'Teknisk implementering',
  organizationalImplementationNotes: 'Organisatorisk implementering'
};

export const implementationKeys: Array<keyof ProcessLabels> = Object.keys(implementationLabels) as Array<
  keyof ProcessLabels
>;

export const operationLabels: ProcessLabels = {
  rating: 'I hvor høj grad indfriede løsningen de forventede gevinster?',
  ratingComment: 'Kommentar til realiseret gevinster',
  decommissioned: 'Løsning taget ud af drift',
  legalClauseLastVerified: 'Sidst kontrolleret i forhold til §'
};

export const operationKeys: Array<keyof ProcessLabels> = Object.keys(operationLabels) as Array<keyof ProcessLabels>;

export const processLabels: ProcessLabels = {
  ...generalInformationLabels,
  ...challengesLabels,
  ...timeAndProcessLabels,
  ...assessmentLabels,
  ...attachmentsLabels,
  ...implementationLabels,
  ...operationLabels,

  internalNotes: 'Interne Noter'
};

export const processKeys: Array<keyof ProcessLabels> = Object.keys(processLabels) as Array<keyof ProcessLabels>;

export interface ErrorLabels {
  generalInformation: Array<keyof ProcessState>;
  challenges: Array<keyof ProcessState>;
  assessment: Array<keyof ProcessState>;
  timeAndProcess: Array<keyof ProcessState>;
  attachments: Array<keyof ProcessState>;
  implementation: Array<keyof ProcessState>;
  operation: Array<keyof ProcessState>;
}

export const errorLimitations: { [key: string]: string } = {
  klId: 'maks 64 tegn',
  title: 'mellem 1 og 65 tegn',
  visibility: 'obligatorisk felt',
  status: 'obligatorisk felt',
  kla: '8, 11 eller 14 tegn',
  timeSpendOccurancesPerEmployee: 'kun tal',
  timeSpendPerOccurance: 'kun tal',
  timeSpendEmployeesDoingProcess: 'kun tal',
  timeSpendPercentageDigital: 'maks 100 tegn',
  owner: 'obligatorisk felt',
  technologies: 'obligatorisk fra specifikations-fasen',
  processChallenges: 'obligatorisk fra Idé-fasen'
};

export const errorLabels: ErrorLabels = {
  generalInformation: Object.keys(generalInformationLabels) as Array<keyof ProcessState>,
  challenges: Object.keys(challengesLabels) as Array<keyof ProcessState>,
  assessment: Object.keys(assessmentLabels) as Array<keyof ProcessState>,
  timeAndProcess: Object.keys(timeAndProcessLabels) as Array<keyof ProcessState>,
  attachments: Object.keys(attachmentsLabels) as Array<keyof ProcessState>,
  implementation: Object.keys(implementationLabels) as Array<keyof ProcessState>,
  operation: Object.keys(operationLabels) as Array<keyof ProcessState>
};

export const defaultLabelKeys: Array<keyof ErrorLabels> = Object.keys(errorLabels) as Array<keyof ErrorLabels>;

export const defaultErrorState: ErrorState = {
  generalInformation: {
    section: 'Grundlæggende oplysninger',
    id: 'general-information',
    errors: []
  },
  challenges: {
    section: 'Problemstillinger',
    id: 'challenges',
    errors: []
  },
  assessment: {
    section: 'Faglig vurdering',
    id: 'assessment',
    errors: []
  },
  timeAndProcess: {
    section: 'Tid og proces',
    id: 'time-and-process',
    errors: []
  },
  attachments: {
    section: 'Bilag og links',
    id: 'attachments',
    errors: []
  },
  implementation: {
    section: 'Udvikling og implementering',
    id: 'implementation',
    errors: []
  },
  operation: {
    section: 'Drift',
    id: 'operation',
    errors: []
  }
};

export const defaultSectionKeys: Array<keyof ErrorState> = Object.keys(defaultErrorState) as Array<keyof ErrorState>;
