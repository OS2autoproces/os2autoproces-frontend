import { isEmpty } from 'lodash';
import { DateTime } from 'luxon';
import * as validateJs from 'validate.js';
import { ProcessState, Process } from '@/store/modules/process/state';
import { PhaseKeys } from '@/models/phase';

export function getInvalidProperties(state: ProcessState, properties: Array<keyof Process>): string[] | true {
  return properties.filter(property => {
    const validator = processFieldsValidators[property];
    return validator && !validator(state);
  });
}

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
