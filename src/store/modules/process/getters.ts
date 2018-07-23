import { ProcessState } from '@/store/modules/process/state';
import { RootState } from '@/store/store';
import { GetterTree } from 'vuex';
import * as validateJs from 'validate.js';
import { PhaseKeys, Phase, PhaseOrder } from '@/models/phase';
import { namespace } from '@/store/modules/process/actions';

export const processGetterTypes = {
  MIN_PHASE: `${namespace}/minPhase`
};

const isNonempty = {
  length: {
    minimum: 1
  }
};

const isNumeric = {
  numericality: true
};

const isEmail = {
  email: true
};

const isMinMax = (minimum: number, maximum: number) => ({
  length: {
    minimum,
    maximum
  }
});

function isValid(value: any, constraints: any): boolean {
  return !validateJs({ value }, { value: constraints });
}

export const getters: GetterTree<ProcessState, RootState> = {
  minPhase(state: ProcessState) {
    return (phase: Phase) => PhaseOrder.indexOf(phase) >= PhaseOrder.indexOf(state.phase);
  },
  isKleNumberValid(state: ProcessState): boolean {
    return isValid(state.kle, isNumeric);
  },
  isParagrafValid(state: ProcessState): boolean {
    return isValid(state.legalClause, isNonempty);
  },
  isVisibilityValid(state: ProcessState): boolean {
    return isValid(state.visibility, isNonempty);
  },
  isContactPersonValid(state: ProcessState): boolean {
    return isValid(state.contact, isNonempty);
  },
  isEmailValid(state: ProcessState): boolean {
    return isValid(state.contact ? state.contact.email : '', isEmail);
  },
  isProcesTimeValid(state: ProcessState): boolean {
    return isValid(state.timeSpendComputedTotal, isNumeric);
  },
  isProjectManagerValid(state: ProcessState): boolean {
    return isValid(state.owner, isNonempty);
  },
  isSupplierValid(state: ProcessState): boolean {
    return isValid(state.vendor, isNonempty);
  },
  isResumeValid(state: ProcessState): boolean {
    return isValid(state.shortDescription, isMinMax(1, 140));
  }
};
