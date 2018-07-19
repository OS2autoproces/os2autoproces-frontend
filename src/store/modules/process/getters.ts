import { PhaseKeys } from "@/models/phase";
import { ProcessState } from "@/store/modules/process/state";
import { RootState } from "@/store/store";
import { isEmpty } from "lodash";
import * as validateJs from "validate.js";
import { GetterTree } from "vuex";
import { DateTime } from "luxon";
import {
  generalInformationLabels,
  challengesLabels,
  timeAndProcessLabels,
  assesmentLabels,
  specificationLabels,
  implementationLabels,
  operationLabels
} from "@/store/modules/error/actions";

const namespace = 'process' // import doens't work

export const processGetterTypes = {
  IS_GERNERAL_INFORMATION_VALID: `${namespace}/isGeneralInformationValid`,
  IS_CHALLENGES_VALID: `${namespace}/isChallengesValid`,
  IS_TIME_AND_PROCESS_VALID: `${namespace}/isTimeAndProcessValid`,
  IS_ASSESMENT_VALID: `${namespace}/isAssesmentValid`,
  IS_SPECIFICATION_VALID: `${namespace}/isSpecificationValid`,
  IS_IMPLEMENTATION_VALID: `${namespace}/isImplementationValid`,
  IS_OPERATION_VALID: `${namespace}/isOperationValid`,
};

const isNonempty = {
  length: {
    minimum: 1
  }
};

const isBetween = (from: number, to: number) => ({
  numericality: {
    onlyInteger: true,
    greaterThan: from,
    lessThanOrEqualTo: to
  }
});

const isMinMax = (minimum: number, maximum: number) => ({
  length: {
    minimum,
    maximum
  }
});

function isValid(value: any, constraints: any): boolean {
  return !validateJs({ value }, { value: constraints });
}

function constructFunctionName(prop: string) {
  return (
    "is" + prop.replace(prop.charAt(0), prop.charAt(0).toUpperCase()) + "Valid"
  );
}

function getPropName(getter: string): string {
  const prop = getter.replace("is", "").replace("Valid", "");
  return prop.replace(prop.charAt(0), prop.charAt(0).toLowerCase());
}

export const processFieldsValidationFunction = {
  isLocalIdValid(state: ProcessState): boolean {
    return isValid(state.localId, isMinMax(1, 64));
  },
  isKlIdValid(state: ProcessState): boolean {
    return isValid(state.klId, isMinMax(1, 64));
  },
  isPhaseValid(state: ProcessState): boolean {
    return state.phase !== null;
  },
  isStatusValid(state: ProcessState): boolean {
    return state.status !== null;
  },
  isStatusTextValid(state: ProcessState): boolean {
    return isValid(state.statusText, isMinMax(0, 1200));
  },
  isTitleValid(state: ProcessState): boolean {
    return isValid(state.title ? state.title : false, isMinMax(1, 50));
  },
  isShortDescriptionValid(state: ProcessState): boolean {
    return isValid(state.shortDescription, isMinMax(1, 140));
  },
  isLongDescriptionValid(state: ProcessState): boolean {
    return isValid(state.longDescription, isMinMax(0, 1200));
  },
  isVisibilityValid(state: ProcessState): boolean {
    return !isEmpty(state.visibility);
  },
  isContactValid(state: ProcessState): boolean {
    return !isEmpty(state.contact);
  },
  isLegalClauseValid(state: ProcessState): boolean {
    return isValid(state.legalClause, isMinMax(0, 140));
  },
  isKleValid(state: ProcessState): boolean {
    return !isEmpty(state.kle);
  },
  isKlaValid(state: ProcessState): boolean {
    return isValid(state.kla, isMinMax(1, 16));
  },
  isProcessChallengesValid(state: ProcessState): boolean {
    return isValid(state.processChallenges, isMinMax(1, 1200));
  },
  isSolutionRequestsValid(state: ProcessState): boolean {
    return isValid(state.solutionRequests, isMinMax(1, 2400));
  },
  isTimeSpendOccurancesPerEmployeeValid(state: ProcessState): boolean {
    return state.phase === PhaseKeys.IDEA
      ? true
      : isValid(state.timeSpendOccurancesPerEmployee, isNonempty);
  },
  isTimeSpendPerOccurranceValid(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA
      ? true
      : isValid(state.timeSpendPerOccurance, isNonempty);
  },
  isTimeSpendEmployeesDoingProcessValid(state: ProcessState): boolean {
    return state.phase === PhaseKeys.IDEA
      ? true
      : isValid(state.timeSpendEmployeesDoingProcess, isNonempty);
  },
  isTimeSpendPercentageDigital(state: ProcessState): boolean {
    return state.phase === PhaseKeys.IDEA
      ? true
      : isValid(Number(state.timeSpendPercentageDigital), isBetween(0, 100));
  },
  isTimeSpendCommentValid(state: ProcessState): boolean {
    return isValid(state.timeSpendComment, isMinMax(0, 300));
  },
  isLevelOfProfessionalAssessmentValid(state: ProcessState): boolean {
    return state.phase === PhaseKeys.IDEA
      ? true
      : !isEmpty(state.levelOfProfessionalAssessment);
  },
  isLevelOfChangeValid(state: ProcessState): boolean {
    return state.phase === PhaseKeys.IDEA
      ? true
      : !isEmpty(state.levelOfChange);
  },
  isLevelOfStructuredInformationValid(state: ProcessState): boolean {
    return state.phase === PhaseKeys.IDEA
      ? true
      : !isEmpty(state.levelOfStructuredInformation);
  },
  isLevelOfUniformityValid(state: ProcessState): boolean {
    return state.phase === PhaseKeys.IDEA
      ? true
      : !isEmpty(state.levelOfUniformity);
  },
  isLevelOfDigitalInformationValid(state: ProcessState): boolean {
    return state.phase === PhaseKeys.IDEA
      ? true
      : !isEmpty(state.levelOfDigitalInformation);
  },
  isLevelOfQualityValid({ phase, levelOfQuality }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA ? true : isEmpty(levelOfQuality);
  },
  isLevelOfRoutineWorkReductionValid(state: ProcessState): boolean {
    return state.phase === PhaseKeys.IDEA
      ? true
      : !isEmpty(state.levelOfRoutineWorkReduction);
  },
  isLevelOfSpeedValid({ phase, levelOfSpeed }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA ? true : !isEmpty(levelOfSpeed);
  },
  isEvaluatedLevelOfRoiValid({
    phase,
    evaluatedLevelOfRoi
  }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA ? true : !isEmpty(evaluatedLevelOfRoi);
  },
  isEsdhReferenceValid({ phase, esdhReference }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA || phase === PhaseKeys.PREANALYSIS
      ? true
      : isValid(esdhReference, isMinMax(1, 300));
  },
  isOwnerValid({ phase, owner }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA || phase === PhaseKeys.PREANALYSIS
      ? true
      : !isEmpty(owner);
  },
  isVendorValid({ phase, vendor }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION
      ? true
      : !isEmpty(vendor);
  },
  isTechnologiesValid({ phase, technologies }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION
      ? true
      : technologies.length > 0;
  },
  isTechnicalImplementationNotesValid({
    phase,
    technicalImplementationNotes
  }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      phase === PhaseKeys.DEVELOPMENT
      ? true
      : isValid(technicalImplementationNotes, isMinMax(1, 3000));
  },
  isOrganizationalImplementationNotesValid({
    phase,
    organizationalImplementationNotes
  }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      phase === PhaseKeys.DEVELOPMENT
      ? true
      : isValid(organizationalImplementationNotes, isMinMax(1, 3000));
  },
  isRatingValid({ phase, rating }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      phase === PhaseKeys.DEVELOPMENT ||
      phase === PhaseKeys.IMPLEMENTATION
      ? true
      : isValid(rating, isBetween(1, 3));
  },
  isRatingCommentValid({ phase, ratingComment }: ProcessState): boolean {
    return phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      phase === PhaseKeys.DEVELOPMENT ||
      phase === PhaseKeys.IMPLEMENTATION
      ? true
      : isValid(ratingComment, isMinMax(1, 1200));
  },
  isLegalClauseLastVerifiedValid({
    phase,
    legalClauseLastVerified
  }: ProcessState): boolean {
    if (legalClauseLastVerified) {
      const date = DateTime.fromISO(legalClauseLastVerified).isValid;
      return phase === PhaseKeys.IDEA ||
        phase === PhaseKeys.PREANALYSIS ||
        phase === PhaseKeys.SPECIFICATION ||
        phase === PhaseKeys.DEVELOPMENT ||
        phase === PhaseKeys.IMPLEMENTATION
        ? true
        : date;
    }
    return true;
  },
  isInternalNotesValid({ internalNotes }: ProcessState): boolean {
    return !!internalNotes;
  },
  isDomainsValid(state: ProcessState): boolean {
    return true;
  },
  isItSystemsValid(state: ProcessState): boolean {
    return true;
  },
  isTimeSpendPerOccuranceValid(state: ProcessState) {
    return !isEmpty(state.timeSpendOccurancesPerEmployee);
  },
  isTimeSpendPercentageDigitalValid(state: ProcessState) {
    return !isEmpty(state.timeSpendPercentageDigital);
  },
  isTimeSpendComputedTotalValid(state: ProcessState) {
    return !isEmpty(state.timeSpendComputedTotal);
  },
};

export const getters: GetterTree<ProcessState, RootState> = {
  ...processFieldsValidationFunction,
  isGeneralInformationValid(state: ProcessState) {
    return !isEmpty(
      sectionValidation(state, Object.keys(generalInformationLabels))
    );
  },
  isChallengesValid(state: ProcessState) {
    return !isEmpty(
      sectionValidation(state, Object.keys(challengesLabels))
    );
  },
  isTimeAndProcessValid(state: ProcessState) {
    return !isEmpty(sectionValidation(state, Object.keys(timeAndProcessLabels)));
  },
  isAssesmentValid(state: ProcessState) {
    return !isEmpty(sectionValidation(state, Object.keys(assesmentLabels)));
  },
  isSpecificationValid(state: ProcessState) {
    return !isEmpty(sectionValidation(state, Object.keys(specificationLabels)));
  },
  isImplementationValid(state: ProcessState) {
    return !isEmpty(sectionValidation(state, Object.keys(implementationLabels)));
  },
  isOperationValid(state: ProcessState) {
    return !isEmpty(sectionValidation(state, Object.keys(operationLabels)));
  }
};

export function sectionValidation(
  state: ProcessState,
  propertyKeys: string[]
): string[] {
  const invalidProps: string[] = [];

  propertyKeys.forEach((key: string) => {
    const func = constructFunctionName(key);
    if(typeof getters[func] === 'function') {
      const valid = getters[func](state, {}, { version: "1" } as RootState, {});
      if (!valid) {
        invalidProps.push(key);
      }
    }
  });
  return invalidProps;
}
