import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { ProcessReport } from './processInterfaces';
import {
  errorLabels,
  ErrorLabels,
  processLabels,
  errorLimitations,
  ErrorSection,
  ErrorWithDescription,
  defaultErrorState,
  defaultSectionKeys,
  defaultLabelKeys
} from './errorInterfaces';
import { getInvalidProperties } from './validation';
import { ProcessState } from './process';

export interface ErrorState {
  generalInformation: ErrorSection;
  challenges: ErrorSection;
  assessment: ErrorSection;
  timeAndProcess: ErrorSection;
  attachments: ErrorSection;
  implementation: ErrorSection;
  operation: ErrorSection;
}

@Module({ dynamic: true, store, name: 'error' })
export default class Error extends VuexModule implements ErrorState {
  generalInformation: ErrorSection = {
    section: 'Grundlæggende oplysninger',
    errors: []
  };
  challenges: ErrorSection = {
    section: 'Problemstillinger',
    errors: []
  };
  assessment: ErrorSection = {
    section: 'Faglig vurdering',
    errors: []
  };
  timeAndProcess: ErrorSection = {
    section: 'Tid og proces',
    errors: []
  };
  attachments: ErrorSection = {
    section: 'Bilag og links',
    errors: []
  };
  implementation: ErrorSection = {
    section: 'Udvikling og implementering',
    errors: []
  };
  operation: ErrorSection = {
    section: 'Drift',
    errors: []
  };

  @Mutation
  ASSIGN(payload: Partial<ErrorState>) {
    Object.assign(this, payload);
  }

  @Action
  updateProcessErrors(processState: ProcessState) {
    defaultLabelKeys.forEach(section => {
      const sectionErrors = getInvalidProperties(processState, errorLabels[section]);

      const errors = sectionErrors.map(error => {
        const errorLabel = processLabels[error];
        const limitationLabel = errorLimitations[error];

        if (errorLabel) {
          const tempError = errorLabel.length < 35 ? errorLabel : errorLabel.slice(0, 25) + '...';
          return { name: error, description: tempError + (limitationLabel ? ` (${limitationLabel})` : '') };
        }

        return '';
      });

      this.ASSIGN({ [section]: { errors, section: this[section].section } });
    });
  }

  @Action
  clearErrors() {
    defaultLabelKeys.forEach(section => {
      this.ASSIGN({ [section]: { errors: [], section: this[section].section } });
    });
  }

  get hasErrors() {
    return defaultSectionKeys.some(
      section => this[section as keyof ErrorState].errors && this[section as keyof ErrorState].errors.length > 0
    );
  }

  get errorSections() {
    return [
      this.generalInformation,
      this.challenges,
      this.assessment,
      this.timeAndProcess,
      this.attachments,
      this.implementation,
      this.operation
    ];
  }

  get errorInField() {
    return (section: ErrorSection, fieldName: string) => section.errors.some(e => e.name === fieldName);
  }
}

export const ErrorModule = getModule(Error);
