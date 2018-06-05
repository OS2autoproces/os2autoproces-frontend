import { RootState } from '@/store/store';
import { GeneralInformationState } from '@/store/modules/details/general-information/state';
import { GetterTree } from 'vuex';
import * as validate from 'validate.js';

export const getters: GetterTree<GeneralInformationState, RootState> = {
  isKleNumberValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        numericality: true
      }
    };
    return !validate({ inputValue: state.kleNumber }, constraints);
  },
  isParagrafValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        length: {
          minimum: 1,
        }
      }
    }
    return !validate({inputValue: state.paragraf}, constraints);
  },
  isFieldValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        format: {
          pattern: /[a-zA-Z]+/,
        }
      }
    }
    return !validate({inputValue: state.field}, constraints);
  },
  isDepartmentValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        format: {
          pattern: /[a-zA-Z]+/,
        },
        length: {
          minimum: 1
        }
      }
    }
    return !validate({inputValue: state.department}, constraints);
  },
  isVisibilityValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        length: {
          minimum: 1
        }
      }
    }
    return !validate({inputValue: state.visibility}, constraints);
  },
  isContactPersonValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        length: {
          minimum: 2
        },
        format: {
          pattern: /[a-zA-Z]+/,
        },
      }
    }
    return !validate({inputValue: state.contactPerson}, constraints);
  },
  isEmailValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        email: true,
      }
    }
    return !validate({inputValue: state.email}, constraints);
  },
  isProcesTimeValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        numericality: true
      }
    }
    return !validate({inputValue: state.procesTime}, constraints);
  },
  isProjectManagerValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        length: {
          minimum: 2
        },
        format: {
          pattern: /[a-zA-Z]+/,
        },
      }
    }
    return !validate({inputValue: state.projectManager}, constraints);
  },
  isSupplierValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        length: {
          minimum: 2
        },
        format: {
          pattern: /[a-zA-Z]+/,
        },
      }
    }
    return !validate({inputValue: state.supplier}, constraints);
  },
  isResumeValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        presence: true,
        length: {
          minimum: 10,
          maximum: 140
        },
      }
    }
    return !validate({inputValue: state.resume}, constraints);
  },

};
