import { RootState } from '@/store/store';
import { GeneralInformationState } from '@/store/modules/details/general-information/state';
import { GetterTree } from 'vuex';
import * as validateJs from 'validate.js';

const isNonempty = {
  length: {
    minimum: 1
  }
};

const isNumeric = {
  numericality: true,
}

const isEmail = {
  email: true,
}

const isMinMax = (minimum: number, maximum: number) => ({
  length: {
    minimum,
    maximum,
  }
});

function isValid(value: any, constraints: any): boolean {
  return !validateJs({ value }, { value: constraints });
}


export const getters: GetterTree<GeneralInformationState, RootState> = {
  isKleNumberValid(state: GeneralInformationState): boolean {
    return isValid(state.kleNumber, isNumeric);
  },
  isParagrafValid(state: GeneralInformationState): boolean {
    return isValid(state.paragraf, isNonempty);
  },
  isFieldValid(state: GeneralInformationState): boolean {
    return isValid(state.field, isNonempty);
  },
  isDepartmentValid(state: GeneralInformationState): boolean {
    return isValid(state.department, isNonempty);
  },
  isVisibilityValid(state: GeneralInformationState): boolean {
    return isValid(state.visibility, isNonempty);
  },
  isContactPersonValid(state: GeneralInformationState): boolean {
    return isValid(state.contactPerson, isNonempty);
  },
  isEmailValid(state: GeneralInformationState): boolean {
    return isValid(state.email, isEmail);
  },
  isProcesTimeValid(state: GeneralInformationState): boolean {
    return isValid(state.procesTime, isNumeric);
  },
  isProjectManagerValid(state: GeneralInformationState): boolean {
    return isValid(state.projectManager, isNonempty);
  },
  isSupplierValid(state: GeneralInformationState): boolean {
    return isValid(state.supplier, isNonempty);
  },
  isResumeValid(state: GeneralInformationState): boolean {
    return isValid(state.resume, isMinMax(1, 140));
  },
};
