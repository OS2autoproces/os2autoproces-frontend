import { errorMutationTypes } from "@/store/modules/error/mutations";
import { ErrorState } from "@/store/modules/error/state";
import { RootState } from "@/store/store";
import { ActionTree } from "vuex";

export const namespace = "error";

export const errorActionTypes = {
  UPDATE_PROCESS_ERRORS: `${namespace}/updateProcessErrors`
};

export const processPropLabels: { [key: string]: string } = {
  localId: "Lokalt ID",
  klId: "KL ID",
  esdhReference: "ESDH Reference",
  phase: "Fase",
  status: "Status",
  statusText: "Statustekst",
  decommissioned: "Løsning taget ud af drift",
  title: "Title/Name",
  shortDescription: "Resumé",
  longDescription: "Beskrivelse",
  domains: "Domæner",
  visibility: "Synlighed",
  legalClause: "Lov og paragraf",
  legalClauseLastVerified: "Sidst kontrolleret i forhold til §",
  kle: "KLE NR.",
  kla: "KLA NR",
  vendor: "Leverandør",
  internalNotes: "Interne Noter",
  processChallenges: "Process udfordringer",
  solutionRequests: "Løsningsbeskrivelse",
  timeSpendOccurancesPerEmployee:
    "Antal gange processen gentages om året pr. medarbejder",
  timeSpendPerOccurance: "Tidsforbrug pr. proces i minutter",
  timeSpendEmployeesDoingProcess: "Antal medarbejdere der foretager processen",
  timeSpendPercentageDigital: "Tidsbesparelse i %",
  timeSpendComputedTotal: "Total besparelse",
  timeSpendComment: "Kommentar vedr. tidsforbrug",
  levelOfProfessionalAssessment: "I hvor høj grad er der faglig vurdering?",
  levelOfChange: "I hvor høj grad er processen præget af hyppige ændringer?",
  levelOfStructuredInformation:
    "I hvor høj grad er processen baseret på struktureret information?",
  levelOfUniformity: "I hvor høj grad er processen uniform?",
  levelOfDigitalInformation: "sadasd",
  levelOfQuality:
    "Bidrager løsningen til en højere kvalitet, som er mere ensrettet og med færre fejl?",
  levelOfSpeed:
    "Bidrager løsningen til en hurtigere og mere fyldesgørende service",
  levelOfRoutineWorkReduction:
    "Frigiver løsningen tid og nedbringer rutineopgaver",
  evaluatedLevelOfRoi:
    "I hvor høj grad vurderes det at processen kan automatiseres?",
  technicalImplementationNotes: "Teknisk implementering",
  organizationalImplementationNotes: "Organisatorisk implementering",
  rating: "I hvor højgrad realiserer processen sit potentiale",
  ratingComment: "Kommentar til realiseret løsningspotentiale",
  owner: "Ejer",
  contact: "Kontaktperson",
  itSystems: "Nuværende system",
  technologies: "Anvendt teknologi"
};

export const actions: ActionTree<ErrorState, RootState> = {
  updateProcessErrors({ commit }, errors: Partial<ErrorState>) {
    if (errors.processErrors) {
      const processErrors: string[] = errors.processErrors.map(
        e => processPropLabels[e]
      );
      commit(errorMutationTypes.ASSIGN, { processErrors });
    }
  }
};
