import { ProcessReport } from './processInterfaces';
import { ErrorState } from './error';

export interface ErrorSection {
  section: string;
  errors: string[];
}
type ProcessLabels = { [X in keyof ProcessReport]?: string };

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

export const attachmentsLabels: ProcessLabels = {
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
  ...attachmentsLabels,
  ...implementationLabels,
  ...operationLabels,

  internalNotes: 'Interne Noter'
};

export interface ErrorLabels {
  generalInformation: Array<keyof ProcessReport>;
  challenges: Array<keyof ProcessReport>;
  assessment: Array<keyof ProcessReport>;
  timeAndProcess: Array<keyof ProcessReport>;
  attachments: Array<keyof ProcessReport>;
  implementation: Array<keyof ProcessReport>;
  operation: Array<keyof ProcessReport>;
}

export const errorLimitations: { [key: string]: string } = {
  klId: 'maks 64 tegn',
  title: 'mellem 1 og 50 tegn',
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
  generalInformation: Object.keys(generalInformationLabels) as Array<keyof ProcessReport>,
  challenges: Object.keys(challengesLabels) as Array<keyof ProcessReport>,
  assessment: Object.keys(assessmentLabels) as Array<keyof ProcessReport>,
  timeAndProcess: Object.keys(timeAndProcessLabels) as Array<keyof ProcessReport>,
  attachments: Object.keys(attachmentsLabels) as Array<keyof ProcessReport>,
  implementation: Object.keys(implementationLabels) as Array<keyof ProcessReport>,
  operation: Object.keys(operationLabels) as Array<keyof ProcessReport>
};

export const defaultErrorState: ErrorState = {
  generalInformation: {
    section: 'Grundlæggende oplysninger',
    errors: []
  },
  challenges: {
    section: 'Problemstillinger',
    errors: []
  },
  assessment: {
    section: 'Faglig vurdering',
    errors: []
  },
  timeAndProcess: {
    section: 'Tid og proces',
    errors: []
  },
  attachments: {
    section: 'Bilag og links',
    errors: []
  },
  implementation: {
    section: 'Udvikling og implementering',
    errors: []
  },
  operation: {
    section: 'Drift',
    errors: []
  }
};
