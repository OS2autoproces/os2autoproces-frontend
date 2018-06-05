import { RootState } from '@/store/store';
import { GeneralInformationState } from '@/store/modules/details/general-information/state';
import { GetterTree } from 'vuex';
import * as validate from 'validate.js';

export const getters: GetterTree<GeneralInformationState, RootState> = {
  isKleNumberValid(state: GeneralInformationState): boolean {
    const constraints = {
      inputValue: {
        numericality: true
      }
    };
    return !validate({ inputValue: state.kleNumber }, constraints);
  }
};
