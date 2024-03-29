import { DateTime } from 'luxon';
import * as validateJs from 'validate.js';
import { PhaseKeys } from '@/models/phase';
import { ProcessState } from './process';

export function getInvalidProperties(
  state: ProcessState,
  properties: Array<keyof ProcessState>
): Array<keyof ProcessState> {
  return properties.filter(property => {
    const validator = processFieldsValidators[property];
    return validator && !validator(state);
  });
}

const isFloat = { numericality: true };

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

export const processFieldsValidators: { [P in keyof ProcessState]?: (state: ProcessState) => boolean } = {
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
    return isValid(statusText, isMinMax(0, 10000));
  },
  title({ title }: ProcessState) {
    return isValid(title, isMinMax(1, 65));
  },
  shortDescription({ shortDescription }: ProcessState) {
    return isValid(shortDescription, isMinMax(1, 140));
  },
  longDescription({ longDescription }: ProcessState) {
    return isValid(longDescription, isMinMax(0, 10000));
  },
  visibility({ visibility }: ProcessState) {
    return !!visibility;
  },
  legalClause({ legalClause }: ProcessState) {
    return isValid(legalClause, isMinMax(0, 140));
  },
  codeRepositoryUrl({ codeRepositoryUrl }: ProcessState) {
    return isValid(codeRepositoryUrl, isMinMax(0, 300));
  },
  kla({ kla }: ProcessState) {
    return !kla || kla.length === 8 || kla.length === 11 || kla.length === 14;
  },
  solutionRequests({ solutionRequests }: ProcessState) {
    return isValid(solutionRequests, isMinMax(0, 10000));
  },
  timeSpendOccurancesPerEmployee({ phase, timeSpendOccurancesPerEmployee }: ProcessState) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendOccurancesPerEmployee, isFloat);
  },
  timeSpendPerOccurance({ phase, timeSpendPerOccurance }: ProcessState) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendPerOccurance, isFloat);
  },
  timeSpendEmployeesDoingProcess({ phase, timeSpendEmployeesDoingProcess }: ProcessState) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendEmployeesDoingProcess, isFloat);
  },
  timeSpendPercentageDigital({ phase, timeSpendPercentageDigital }: ProcessState) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendPercentageDigital, isBetween(0, 100));
  },
  timeSpendComment({ timeSpendComment }: ProcessState) {
    return isValid(timeSpendComment, isMinMax(0, 10000));
  },
  levelOfProfessionalAssessment() {
    return true; // allow any phase to not have an assessment
  },
  levelOfChange() {
    return true; // allow any phase to not have an assessment
  },
  levelOfStructuredInformation() {
    return true; // allow any phase to not have an assessment
  },
  levelOfUniformity() {
    return true; // allow any phase to not have an assessment
  },
  levelOfDigitalInformation() {
    return true; // allow any phase to not have an assessment
  },
  levelOfQuality() {
    return true; // allow any phase to not have an assessment
  },
  levelOfRoutineWorkReduction() {
    return true; // allow any phase to not have an assessment
  },
  levelOfSpeed() {
    return true; // allow any phase to not have an assessment
  },
  evaluatedLevelOfRoi() {
    return true; // allow any phase to not have an assessment
  },
  esdhReference({ esdhReference }: ProcessState) {
    return isValid(esdhReference, isMinMax(0, 300));
  },
  owner({ phase, owner }: ProcessState) {
    return phase === PhaseKeys.IDEA || phase === PhaseKeys.PREANALYSIS || !!owner;
  },
  vendor({ vendor }: ProcessState) {
    return isValid(vendor || '', isMinMax(0, 255));
  },
  technologies({ phase, technologies }: ProcessState) {
    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      (technologies || []).length > 0
    );
  },
  runPeriod: ({ runPeriod }: ProcessState) => !!runPeriod,
  technicalImplementationNotes({ technicalImplementationNotes }: ProcessState) {
    return isValid(technicalImplementationNotes, isMinMax(0, 10000));
  },
  organizationalImplementationNotes({ organizationalImplementationNotes }: ProcessState) {
    return isValid(organizationalImplementationNotes, isMinMax(0, 10000));
  },
  processChallenges({ phase, processChallenges }: ProcessState) {
    const minLength = phase === PhaseKeys.IDEA ? 0 : 1;
    return isValid(processChallenges, isMinMax(minLength, 10000));
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
    return isValid(ratingComment, isMinMax(0, 10000));
  },
  legalClauseLastVerified({ legalClauseLastVerified }: ProcessState) {
    return !legalClauseLastVerified || DateTime.fromISO(legalClauseLastVerified).isValid;
  },
  internalNotes({ internalNotes }: ProcessState) {
    return isValid(internalNotes, isMinMax(0, 10000));
  },
  itSystemsDescription({ itSystemsDescription }: ProcessState) {
    return isValid(itSystemsDescription, isMinMax(0, 10000));
  },
  otherContactEmail({ otherContactEmail }: ProcessState) {
    return isValid(otherContactEmail, isMinMax(0, 255));
  }
};
