import { RootState } from '@/store/store';
import { GeneralInformationState } from '@/store/modules/details/general-information/state';
import { GetterTree } from 'vuex';
import * as validateJs from 'validate.js';

export const getters: GetterTree<GeneralInformationState, RootState> = {
  isKleNumberValid(state: GeneralInformationState): boolean {
    return isValid(state.kleNumber, {
      numericality: true
    });
  },
  isParagrafValid(state: GeneralInformationState): boolean {
    return isValid(state.paragraf, {
      length: {
        minimum: 1
      }
    });
  },
  isFieldValid(state: GeneralInformationState): boolean {
    return isValid(state.field, {
      length: {
        minimum: 1
      }
    });
  },
  isDepartmentValid(state: GeneralInformationState): boolean {
    return isValid(state.department, {
      length: {
        minimum: 1
      }
    });
  },
  isVisibilityValid(state: GeneralInformationState): boolean {
    return isValid(state.visibility, {
      length: {
        minimum: 1
      }
    });
  },
  isContactPersonValid(state: GeneralInformationState): boolean {
    return isValid(state.contactPerson, {
      length: {
        minimum: 1
      }
    });
  },
  isEmailValid(state: GeneralInformationState): boolean {
    return isValid(state.email, {
      email: true
    });
  },
  isProcesTimeValid(state: GeneralInformationState): boolean {
    return isValid(state.procesTime, {
      numericality: true
    });
  },
  isProjectManagerValid(state: GeneralInformationState): boolean {
    return isValid(state.projectManager, {
      length: {
        minimum: 1
      }
    });
  },
  isSupplierValid(state: GeneralInformationState): boolean {
    return isValid(state.supplier, {
      length: {
        minimum: 2
      },
    });
  },
  isResumeValid(state: GeneralInformationState): boolean {
    return isValid(state.resume, {
      presence: true,
      length: {
        minimum: 10,
        maximum: 140
      }
    });
  }
};

function isValid(value: any, constraints: any): boolean {
  return !validateJs({ value }, { value: constraints });
}
