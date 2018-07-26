import { Phase, PhaseKeys, PhaseOrder } from '@/models/phase';
import {
  assessmentLabels,
  challengesLabels,
  generalInformationLabels,
  implementationLabels,
  operationLabels,
  specificationLabels,
  timeAndProcessLabels,
  umbrellaLabels
} from '@/store/modules/error/actions';
import { Process, ProcessState } from '@/store/modules/process/state';
import { isEmpty } from 'lodash';
import { DateTime } from 'luxon';
import * as validateJs from 'validate.js';

const namespace = 'process';

export const processGetterTypes = {
  IS_GERNERAL_INFORMATION_VALID: `${namespace}/isGeneralInformationValid`,
  IS_CHALLENGES_VALID: `${namespace}/isChallengesValid`,
  IS_TIME_AND_PROCESS_VALID: `${namespace}/isTimeAndProcessValid`,
  IS_ASSESSMENT_VALID: `${namespace}/isAssessmentValid`,
  IS_SPECIFICATION_VALID: `${namespace}/isSpecificationValid`,
  IS_IMPLEMENTATION_VALID: `${namespace}/isImplementationValid`,
  IS_OPERATION_VALID: `${namespace}/isOperationValid`,
  IS_UMBRELLA_VALID: `${namespace}/isUmbrellaValid`,
  MIN_PHASE: `${namespace}/minPhase`
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

export const processFieldsValidators: { [P in keyof Process]?: (state: ProcessState) => boolean } = {
  localId(state: ProcessState) {
    return isValid(state.localId, isMinMax(1, 64));
  },
  klId(state: ProcessState) {
    return isValid(state.klId, isMinMax(1, 64));
  },
  phase(state: ProcessState) {
    return state.phase !== null;
  },
  status(state: ProcessState) {
    return state.status !== null;
  },
  statusText(state: ProcessState) {
    return isValid(state.statusText, isMinMax(0, 1200));
  },
  title(state: ProcessState) {
    return isValid(state.title, isMinMax(1, 50));
  },
  shortDescription(state: ProcessState) {
    return isValid(state.shortDescription, isMinMax(1, 140));
  },
  longDescription(state: ProcessState) {
    return isValid(state.longDescription, isMinMax(0, 1200));
  },
  visibility(state: ProcessState) {
    return !isEmpty(state.visibility);
  },
  contact(state: ProcessState) {
    return !isEmpty(state.contact);
  },
  legalClause(state: ProcessState) {
    return isValid(state.legalClause, isMinMax(0, 140));
  },
  kle(state: ProcessState) {
    return !isEmpty(state.kle);
  },
  kla(state: ProcessState) {
    return !state.kla || state.kla.length === 8 || state.kla.length === 11 || state.kla.length === 14;
  },
  processChallenges(state: ProcessState) {
    return isValid(state.processChallenges, isMinMax(1, 1200));
  },
  solutionRequests(state: ProcessState) {
    return isValid(state.solutionRequests, isMinMax(1, 2400));
  },
  timeSpendOccurancesPerEmployee(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA || isValid(state.timeSpendOccurancesPerEmployee, isNonempty);
  },
  timeSpendPerOccurance(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA || isValid(state.timeSpendPerOccurance, isNonempty);
  },
  timeSpendEmployeesDoingProcess(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA || isValid(state.timeSpendEmployeesDoingProcess, isNonempty);
  },
  timeSpendPercentageDigital(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA || isValid(Number(state.timeSpendPercentageDigital), isBetween(0, 100));
  },
  timeSpendComment(state: ProcessState) {
    return isValid(state.timeSpendComment, isMinMax(0, 300));
  },
  levelOfProfessionalAssessment(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA || !isEmpty(state.levelOfProfessionalAssessment);
  },
  levelOfChange(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA || !isEmpty(state.levelOfChange);
  },
  levelOfStructuredInformation(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA || !isEmpty(state.levelOfStructuredInformation);
  },
  levelOfUniformity(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA || !isEmpty(state.levelOfUniformity);
  },
  levelOfDigitalInformation(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA || !isEmpty(state.levelOfDigitalInformation);
  },
  levelOfQuality({ phase, levelOfQuality }: ProcessState) {
    return phase === PhaseKeys.IDEA || !isEmpty(levelOfQuality);
  },
  levelOfRoutineWorkReduction(state: ProcessState) {
    return state.phase === PhaseKeys.IDEA || !isEmpty(state.levelOfRoutineWorkReduction);
  },
  levelOfSpeed({ phase, levelOfSpeed }: ProcessState) {
    return phase === PhaseKeys.IDEA || !isEmpty(levelOfSpeed);
  },
  evaluatedLevelOfRoi({ phase, evaluatedLevelOfRoi }: ProcessState) {
    return phase === PhaseKeys.IDEA || !isEmpty(evaluatedLevelOfRoi);
  },
  esdhReference({ phase, esdhReference }: ProcessState) {
    return phase === PhaseKeys.IDEA || phase === PhaseKeys.PREANALYSIS || isValid(esdhReference, isMinMax(1, 300));
  },
  owner({ phase, owner }: ProcessState) {
    return phase === PhaseKeys.IDEA || phase === PhaseKeys.PREANALYSIS || !isEmpty(owner);
  },
  vendor({ phase, vendor }: ProcessState) {
    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      !isEmpty(vendor)
    );
  },
  technologies({ phase, technologies }: ProcessState) {
    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      technologies.length > 0
    );
  },
  technicalImplementationNotes({ phase, technicalImplementationNotes }: ProcessState) {
    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      phase === PhaseKeys.DEVELOPMENT ||
      isValid(technicalImplementationNotes, isMinMax(1, 3000))
    );
  },
  organizationalImplementationNotes({ phase, organizationalImplementationNotes }: ProcessState) {
    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      phase === PhaseKeys.DEVELOPMENT ||
      isValid(organizationalImplementationNotes, isMinMax(1, 3000))
    );
  },
  rating({ phase, rating }: ProcessState) {
    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      phase === PhaseKeys.DEVELOPMENT ||
      phase === PhaseKeys.IMPLEMENTATION ||
      isValid(rating, isBetween(1, 3))
    );
  },
  ratingComment({ phase, ratingComment }: ProcessState) {
    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      phase === PhaseKeys.DEVELOPMENT ||
      phase === PhaseKeys.IMPLEMENTATION ||
      isValid(ratingComment, isMinMax(1, 1200))
    );
  },
  legalClauseLastVerified({ phase, legalClauseLastVerified }: ProcessState) {
    if (!legalClauseLastVerified) {
      return true;
    }

    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      phase === PhaseKeys.DEVELOPMENT ||
      phase === PhaseKeys.IMPLEMENTATION ||
      DateTime.fromISO(legalClauseLastVerified).isValid
    );
  },
  internalNotes({ internalNotes }: ProcessState) {
    return !!internalNotes;
  },
  timeSpendComputedTotal(state: ProcessState) {
    return !isEmpty(state.timeSpendComputedTotal);
  }
};

const sectionValidators = {
  isGeneralInformationValid(state: ProcessState) {
    return state.canEdit && !isEmpty(sectionValidation(state, Object.keys(generalInformationLabels)));
  },
  isChallengesValid(state: ProcessState) {
    return state.canEdit && !isEmpty(sectionValidation(state, Object.keys(challengesLabels)));
  },
  isTimeAndProcessValid(state: ProcessState) {
    return state.canEdit && !isEmpty(sectionValidation(state, Object.keys(timeAndProcessLabels)));
  },
  isAssessmentValid(state: ProcessState) {
    return state.canEdit && !isEmpty(sectionValidation(state, Object.keys(assessmentLabels)));
  },
  isSpecificationValid(state: ProcessState) {
    return state.canEdit && !isEmpty(sectionValidation(state, Object.keys(specificationLabels)));
  },
  isImplementationValid(state: ProcessState) {
    return state.canEdit && !isEmpty(sectionValidation(state, Object.keys(implementationLabels)));
  },
  isOperationValid(state: ProcessState) {
    return state.canEdit && !isEmpty(sectionValidation(state, Object.keys(operationLabels)));
  }
};

export const getters: { [key: string]: ((state: ProcessState) => any) | undefined } = {
  minPhase(state: ProcessState) {
    return (phase: Phase) => PhaseOrder.indexOf(phase) <= PhaseOrder.indexOf(state.phase);
  },
  isUmbrellaValid(state: ProcessState) {
    return state.canEdit && !isEmpty(sectionValidation(state, Object.keys(umbrellaLabels)));
  },
  ...processFieldsValidators,
  ...sectionValidators
};

export function sectionValidation(state: ProcessState, properties: string[]): string[] {
  return properties.filter(property => {
    const validator = getters[property];
    return validator && !validator(state);
  });
}
