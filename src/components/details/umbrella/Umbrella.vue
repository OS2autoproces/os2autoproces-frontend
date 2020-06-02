<template>
  <div class="page">
    <div class="side-bar">
      <div class="side-bar-content">
        <a @click="goBack" class="search-page-link"> <ArrowLeftIcon />Tilbage til søgning </a>

        <Button primary v-if="isReporting" class="report-button" @click="report">Gem</Button>
        <Button primary v-if="!isReporting" class="save-button" @click="save">Gem</Button>
      </div>
    </div>

    <div class="details-wrapper">
      <div class="details-content">
        <ProcessHeader :isReporting="isReporting" isUmbrella />

        <div class="form-sections">
          <UmbrellaForm :isReporting="isReporting" />
        </div>
      </div>
    </div>

    <SnackBar showButton :timeout="0" color="error" :value="snack" @clicked="clearErrors">
      <div>
        <h3>Følgende felter er ugyldige:</h3>
        <ul class="section-errors">
          <li v-for="field in errors['generalInformation'].errors" :key="field">{{ field }}</li>
        </ul>
      </div>
    </SnackBar>

    <SnackBar :timeout="3000" color="success" @onSnackClose="showSaveSuccess = false" :value="showSaveSuccess"
      >Processen er gemt!</SnackBar
    >

    <SnackBar :value="showSaveError" @onSnackClose="showSaveError = false" :timeout="5000" color="error"
      >Processen er IKKE gemt - prøv igen!</SnackBar
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import InternalNotes from '@/components/common/inputs/InternalNotes.vue';
import { processActionTypes, NewComment } from '@/store/modules/process/actions';
import { Type, TypeKeys } from '@/models/types';
import { commonActionTypes } from '@/store/modules/common/actions';

import Comments from '@/components/details/Comments.vue';
import IntervalSelector from '@/components/common/inputs/IntervalSelector.vue';
import FormSection from '@/components/details/FormSection.vue';
import ProcessHeader from '@/components/details/process/ProcessHeader.vue';
import UmbrellaForm from '@/components/details/umbrella/UmbrellaForm.vue';
import GeneralInformationForm from '@/components/details/general-information/GeneralInformationForm.vue';
import Button from '@/components/common/inputs/Button.vue';
import ChallengesForm from '@/components/details/challenges/ChallengesForm.vue';
import AssessmentForm from '@/components/details/assessment/AssessmentForm.vue';
import ImplementationForm from '@/components/details/implementation/ImplementationForm.vue';
import TimeAndProcessForm from '@/components/details/time-process/TimeAndProcessForm.vue';
import AttachmentsForm from '@/components/details/attachments/AttachmentsForm.vue';
import OperationForm from '@/components/details/operation/OperationForm.vue';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import { errorActionTypes, umbrellaLabels } from '@/store/modules/error/actions';
import { ErrorState } from '@/store/modules/error/state';
import SnackBar from '@/components/common/SnackBar.vue';
import { isEmpty } from 'lodash';
import { searchActionTypes } from '@/store/modules/search/actions';
import { VisibilityKeys } from '@/models/visibility';
import { SearchFilters } from '@/store/modules/search/state';
import { isIE } from '@/services/url-service';

@Component({
  components: {
    FormSection,
    ProcessHeader,
    UmbrellaForm,
    GeneralInformationForm,
    Comments,
    IntervalSelector,
    ChallengesForm,
    AssessmentForm,
    TimeAndProcessForm,
    AttachmentsForm,
    ImplementationForm,
    OperationForm,
    Button,
    ArrowLeftIcon,
    EditIcon,
    SnackBar,
    InternalNotes
  }
})
export default class Umbrella extends Vue {
  @Prop(Boolean)
  isReporting!: boolean;
  @Prop(Number)
  id!: number;
  @Prop(String)
  type!: Type;

  @Action(processActionTypes.UPDATE)
  update: any;
  @Action(commonActionTypes.LOAD_KLES)
  loadKles!: () => Promise<void>;
  @Action(errorActionTypes.UPDATE_PROCESS_ERRORS)
  updateProcessErrors!: (processErrors: Partial<ErrorState>) => void;
  @Action(errorActionTypes.CLEAR_ERRORS)
  clearErrors!: () => void;

  showSaveSuccess = false;
  showSaveError = false;

  get errors() {
    return this.$store.state.error;
  }

  get snack() {
    const errorState = this.$store.state.error;
    return !!Object.keys(errorState).find(section => !isEmpty(errorState[section].errors));
  }

  goBack() {
    if (isIE()) {
      this.$emit('goBack');
    }
    this.$router.push('/search');
  }

  beforeCreate() {
    this.$store.dispatch(errorActionTypes.CLEAR_ERRORS);
  }

  mounted() {
    if (this.isReporting) {
      this.update({
        type: this.type,
        canEdit: true,
        hasChanged: false,
        cvr: this.$store.state.auth.user.cvr,
        visibility: this.type === TypeKeys.PARENT ? VisibilityKeys.MUNICIPALITY : VisibilityKeys.PUBLIC,
        disabled: {
          generalInformationEdit: false,
          challengesEdit: false,
          timeAndProcessEdit: false,
          assessmentEdit: false,
          operationEdit: false,
          implementationEdit: false,
          attachmentsEdit: false,
          internalNotesEdit: false
        }
      });
    }

    this.$store.dispatch(searchActionTypes.RESET_FILTERS);

    const filters: Partial<SearchFilters> = {
      umbrella: false,
      visibility: {
        MUNICIPALITY: this.type === TypeKeys.PARENT,
        PUBLIC: false
      }
    };

    this.$store.dispatch(searchActionTypes.UPDATE_FILTERS, filters);
  }

  async save() {
    try {
      await this.$store.dispatch(processActionTypes.SAVE, Object.keys(umbrellaLabels));
      this.showSaveSuccess = true;
    } catch (e) {
      if (this.errors.length === 0) {
        this.showSaveError = true;
      }
    }
  }

  async report() {
    try {
      const processId = await this.$store.dispatch(processActionTypes.REPORT, Object.keys(umbrellaLabels));
      this.showSaveSuccess = true;
      this.$router.push(`/details/${processId}`);
    } catch (e) {
      if (this.errors.length === 0) {
        this.showSaveError = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  display: flex;
}

.search-page-link {
  @include heading;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  text-decoration: none;

  svg {
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
  }
}

.details-wrapper {
  flex-grow: 1;
  margin-bottom: 5rem;
}

.details-content {
  margin-top: 1rem;
  margin: 0 auto;
  max-width: 1200px;
}

.form-sections {
  border: 1px solid $color-secondary;
  border-radius: 1rem;
  margin-top: 2rem;
  border-bottom: 1px solid $color-secondary;
}

.side-bar {
  flex: 0 0 200px;
  margin-left: 1rem;

  .side-bar-content {
    position: fixed;
    top: calc(80px + 2rem);
  }

  .save-button,
  .report-button {
    margin-top: 2rem;
  }
}
</style>
