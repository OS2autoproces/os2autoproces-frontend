import { DateTime } from 'luxon';
import * as validateJs from 'validate.js';
import { PhaseKeys } from '@/models/phase';
import { ProcessState } from './process';
import { ProcessReport } from './processInterfaces';

export function getInvalidProperties(
  state: ProcessReport,
  properties: Array<keyof ProcessReport>
): Array<keyof ProcessReport> {
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

export const processFieldsValidators: { [P in keyof ProcessReport]?: (state: ProcessReport) => boolean } = {
  klId({ klId }: ProcessReport) {
    return isValid(klId, isMinMax(0, 64));
  },
  phase({ phase }: ProcessReport) {
    return !!phase;
  },
  status({ status }: ProcessReport) {
    return !!status;
  },
  statusText({ statusText }: ProcessReport) {
    return isValid(statusText, isMinMax(0, 10000));
  },
  title({ title }: ProcessReport) {
    return isValid(title, isMinMax(1, 50));
  },
  shortDescription({ shortDescription }: ProcessReport) {
    return isValid(shortDescription, isMinMax(1, 140));
  },
  longDescription({ longDescription }: ProcessReport) {
    return isValid(longDescription, isMinMax(0, 10000));
  },
  visibility({ visibility }: ProcessReport) {
    return !!visibility;
  },
  legalClause({ legalClause }: ProcessReport) {
    return isValid(legalClause, isMinMax(0, 140));
  },
  codeRepositoryUrl({ codeRepositoryUrl }: ProcessReport) {
    return isValid(codeRepositoryUrl, isMinMax(0, 300));
  },
  kla({ kla }: ProcessReport) {
    return !kla || kla.length === 8 || kla.length === 11 || kla.length === 14;
  },
  solutionRequests({ solutionRequests }: ProcessReport) {
    return isValid(solutionRequests, isMinMax(0, 10000));
  },
  timeSpendOccurancesPerEmployee({ phase, timeSpendOccurancesPerEmployee }: ProcessReport) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendOccurancesPerEmployee, isFloat);
  },
  timeSpendPerOccurance({ phase, timeSpendPerOccurance }: ProcessReport) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendPerOccurance, isFloat);
  },
  timeSpendEmployeesDoingProcess({ phase, timeSpendEmployeesDoingProcess }: ProcessReport) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendEmployeesDoingProcess, isFloat);
  },
  timeSpendPercentageDigital({ phase, timeSpendPercentageDigital }: ProcessReport) {
    return phase === PhaseKeys.IDEA || isValid(timeSpendPercentageDigital, isBetween(0, 100));
  },
  timeSpendComment({ timeSpendComment }: ProcessReport) {
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
  esdhReference({ esdhReference }: ProcessReport) {
    return isValid(esdhReference, isMinMax(0, 300));
  },
  owner({ phase, owner }: ProcessReport) {
    return phase === PhaseKeys.IDEA || phase === PhaseKeys.PREANALYSIS || !!owner;
  },
  vendor({ vendor }: ProcessReport) {
    return isValid(vendor || '', isMinMax(0, 255));
  },
  technologies({ phase, technologies }: ProcessReport) {
    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      (technologies || []).length > 0
    );
  },
  runPeriod: ({ runPeriod }: ProcessReport) => !!runPeriod,
  technicalImplementationNotes({ technicalImplementationNotes }: ProcessReport) {
    return isValid(technicalImplementationNotes, isMinMax(0, 10000));
  },
  organizationalImplementationNotes({ organizationalImplementationNotes }: ProcessReport) {
    return isValid(organizationalImplementationNotes, isMinMax(0, 10000));
  },
  processChallenges({ phase, processChallenges }: ProcessReport) {
    const minLength = phase === PhaseKeys.IDEA ? 0 : 1;
    return isValid(processChallenges, isMinMax(minLength, 10000));
  },
  rating({ phase, rating }: ProcessReport) {
    return (
      phase === PhaseKeys.IDEA ||
      phase === PhaseKeys.PREANALYSIS ||
      phase === PhaseKeys.SPECIFICATION ||
      phase === PhaseKeys.DEVELOPMENT ||
      phase === PhaseKeys.IMPLEMENTATION ||
      isValid(rating, isBetween(1, 3))
    );
  },
  ratingComment({ ratingComment }: ProcessReport) {
    return isValid(ratingComment, isMinMax(0, 10000));
  },
  legalClauseLastVerified({ legalClauseLastVerified }: ProcessReport) {
    return !legalClauseLastVerified || DateTime.fromISO(legalClauseLastVerified).isValid;
  },
  internalNotes({ internalNotes }: ProcessReport) {
    return isValid(internalNotes, isMinMax(0, 10000));
  },
  itSystemsDescription({ itSystemsDescription }: ProcessReport) {
    return isValid(itSystemsDescription, isMinMax(0, 10000));
  }
};
