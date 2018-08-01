import { isEmpty } from 'lodash';
import { DateTime } from 'luxon';
import * as validateJs from 'validate.js';
import { ProcessState, Process } from '@/store/modules/process/state';
import { PhaseKeys } from '@/models/phase';

export function getInvalidProperties(state: ProcessState, properties: Array<keyof Process>): string[] {
  return properties.filter(property => {
    const validator = processFieldsValidators[property];
    return validator && !validator(state);
  });
}

const isInteger = { numericality: { onlyInteger: true } };

const isBetween = (from: number, to: number) => ({
  numericality: {
    onlyInteger: true,
    greaterThanOrEqualTo: from,
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
  localId({ localId }: ProcessState) {
    return isValid(localId, isMinMax(0, 64));
  },
  klId({ klId }: ProcessState) {
    return isValid(klId, isMinMax(0, 64));
  },
  phase({ phase }: ProcessState) {
    return !!phase;
  },
  status({ status }: ProcessState) {
    return !!status;
  },
  statusText({ statusText }: ProcessState) {
    return isValid(statusText, isMinMax(0, 1200));
  },
  title({ title }: ProcessState) {
    return isValid(title, isMinMax(1, 50));
  },
  shortDescription({ shortDescription }: ProcessState) {
    return isValid(shortDescription, isMinMax(1, 140));
  },
  longDescription({ longDescription }: ProcessState) {
    return isValid(longDescription, isMinMax(0, 1200));
  },
  visibility({ visibility }: ProcessState) {
    return !!visibility;
  },
  legalClause({ legalClause }: ProcessState) {
    return isValid(legalClause, isMinMax(0, 140));
  },
  kla({ kla }: ProcessState) {
    return !kla || kla.length === 8 || kla.length === 11 || kla.length === 14;
  },
  solutionRequests({ solutionRequests }: ProcessState) {
    return isValid(solutionRequests, isMinMax(0, 2400));
  },
  timeSpendOccurancesPerEmployee({ phase, timeSpendOccurancesPerEmployee }: ProcessState) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendOccurancesPerEmployee, isInteger);
  },
  timeSpendPerOccurance({ phase, timeSpendPerOccurance }: ProcessState) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendPerOccurance, isInteger);
  },
  timeSpendEmployeesDoingProcess({ phase, timeSpendEmployeesDoingProcess }: ProcessState) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendEmployeesDoingProcess, isInteger);
  },
  timeSpendPercentageDigital({ phase, timeSpendPercentageDigital }: ProcessState) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendPercentageDigital, isBetween(0, 100));
  },
  timeSpendComment({ timeSpendComment }: ProcessState) {
    return isValid(timeSpendComment, isMinMax(0, 300));
  },
  levelOfProfessionalAssessment({ levelOfProfessionalAssessment }: ProcessState) {
    return !!levelOfProfessionalAssessment;
  },
  levelOfChange({ levelOfChange }: ProcessState) {
    return !!levelOfChange;
  },
  levelOfStructuredInformation({ levelOfStructuredInformation }: ProcessState) {
    return !!levelOfStructuredInformation;
  },
  levelOfUniformity({ levelOfUniformity }: ProcessState) {
    return !!levelOfUniformity;
  },
  levelOfDigitalInformation({ levelOfDigitalInformation }: ProcessState) {
    return !!levelOfDigitalInformation;
  },
  levelOfQuality({ levelOfQuality }: ProcessState) {
    return !!levelOfQuality;
  },
  levelOfRoutineWorkReduction({ levelOfRoutineWorkReduction }: ProcessState) {
    return !!levelOfRoutineWorkReduction;
  },
  levelOfSpeed({ levelOfSpeed }: ProcessState) {
    return !!levelOfSpeed;
  },
  evaluatedLevelOfRoi({ evaluatedLevelOfRoi }: ProcessState) {
    return !!evaluatedLevelOfRoi;
  },
  esdhReference({ phase, esdhReference }: ProcessState) {
    const minLength = phase === PhaseKeys.IDEA || phase === PhaseKeys.PREANALYSIS ? 0 : 1;
    return isValid(esdhReference, isMinMax(minLength, 300));
  },
  owner({ phase, owner }: ProcessState) {
    return phase === PhaseKeys.IDEA || phase === PhaseKeys.PREANALYSIS || !!owner;
  },
  orgUnits({ orgUnits }: ProcessState) {
    return !isEmpty(orgUnits);
  },
  vendor({ phase, vendor }: ProcessState) {
    const minLength =
      phase === PhaseKeys.IDEA || phase === PhaseKeys.PREANALYSIS || phase === PhaseKeys.SPECIFICATION ? 0 : 1;
    return isValid(vendor, isMinMax(minLength, 255));
  },
  technologies({ phase, technologies }: ProcessState) {
    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      technologies.length > 0
    );
  },
  technicalImplementationNotes({ technicalImplementationNotes }: ProcessState) {
    return isValid(technicalImplementationNotes, isMinMax(0, 3000));
  },
  organizationalImplementationNotes({ phase, organizationalImplementationNotes }: ProcessState) {
    return isValid(organizationalImplementationNotes, isMinMax(0, 3000));
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
  ratingComment({ ratingComment }: ProcessState) {
    return isValid(ratingComment, isMinMax(0, 1200));
  },
  legalClauseLastVerified({ legalClauseLastVerified }: ProcessState) {
    return !legalClauseLastVerified || DateTime.fromISO(legalClauseLastVerified).isValid;
  },
  internalNotes({ internalNotes }: ProcessState) {
    return isValid(internalNotes, isMinMax(0, 2400));
  }
};
