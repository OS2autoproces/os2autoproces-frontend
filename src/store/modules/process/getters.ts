import { Phase, PhaseOrder } from '@/models/phase';
import {
  assessmentLabels,
  challengesLabels,
  generalInformationLabels,
  implementationLabels,
  operationLabels,
  attachmentsLabels,
  timeAndProcessLabels,
  umbrellaLabels
} from '@/store/modules/error/actions';
import { Process, ProcessState } from '@/store/modules/process/state';
import { getInvalidProperties } from '@/store/modules/process/validation';
import { RootState } from '@/store/store';
import { isEmpty } from 'lodash';
import { GetterTree } from '../../../../node_modules/vuex';

const namespace = 'process';

export function getProcessKeys(object: { [x in keyof Process]?: any }): Array<keyof Process> {
  return Object.keys(object) as Array<keyof Process>;
}

export const processGetterTypes = {
  IS_UMBRELLA_VALID: `${namespace}/isUmbrellaValid`,
  IS_GERNERAL_INFORMATION_VALID: `${namespace}/isGeneralInformationValid`,
  IS_CHALLENGES_VALID: `${namespace}/isChallengesValid`,
  IS_TIME_AND_PROCESS_VALID: `${namespace}/isTimeAndProcessValid`,
  IS_ASSESSMENT_VALID: `${namespace}/isAssessmentValid`,
  IS_ATTACHMENTS_VALID: `${namespace}/isAttachmentsValid`,
  IS_IMPLEMENTATION_VALID: `${namespace}/isImplementationValid`,
  IS_OPERATION_VALID: `${namespace}/isOperationValid`,
  MIN_PHASE: `${namespace}/minPhase`
};

export const getters: GetterTree<ProcessState, RootState> = {
  isUmbrellaValid(state: ProcessState) {
    return !state.canEdit || isEmpty(getInvalidProperties(state, getProcessKeys(umbrellaLabels)));
  },
  isGeneralInformationValid(state: ProcessState) {
    return !state.canEdit || isEmpty(getInvalidProperties(state, getProcessKeys(generalInformationLabels)));
  },
  isChallengesValid(state: ProcessState) {
    return !state.canEdit || isEmpty(getInvalidProperties(state, getProcessKeys(challengesLabels)));
  },
  isTimeAndProcessValid(state: ProcessState) {
    return !state.canEdit || isEmpty(getInvalidProperties(state, getProcessKeys(timeAndProcessLabels)));
  },
  isAssessmentValid(state: ProcessState) {
    return !state.canEdit || isEmpty(getInvalidProperties(state, getProcessKeys(assessmentLabels)));
  },
  isAttachmentsValid(state: ProcessState) {
    return !state.canEdit || isEmpty(getInvalidProperties(state, getProcessKeys(attachmentsLabels)));
  },
  isImplementationValid(state: ProcessState) {
    return !state.canEdit || isEmpty(getInvalidProperties(state, getProcessKeys(implementationLabels)));
  },
  isOperationValid(state: ProcessState) {
    return !state.canEdit || isEmpty(getInvalidProperties(state, getProcessKeys(operationLabels)));
  },
  minPhase(state: ProcessState) {
    return (phase: Phase) => PhaseOrder.indexOf(phase) <= PhaseOrder.indexOf(state.phase);
  }
};
