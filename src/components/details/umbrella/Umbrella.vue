<template>
  <div class="page">
    <div class="side-bar">
      <div class="side-bar-content">
        <router-link to="/search" class="search-page-link"> <ArrowLeftIcon />Tilbage til søgning </router-link>

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

    <SnackBar :value="showSaveError" @onSnackClose="showSaveError = false" :timeout="5000" color="error"
      >Processen er IKKE gemt - prøv igen!</SnackBar
    >
    <SnackBar showButton :timeout="0" color="error" :value="errors.hasErrors" @clicked="clearErrors" bottom>
      <div v-if="errors.hasErrors">
        <h3>Følgende felter er ugyldige:</h3>
        <ul class="section-errors">
          <li v-for="field in errors.generalInformation.errors" :key="field.name" @click="clickedHashLink">
            <a :href="hashLink(field.name)">{{ field.description }}</a>
          </li>
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
import { NewComment, ProcessReport } from '@/store/modules/processInterfaces';
import { Type, TypeKeys } from '@/models/types';

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
import { umbrellaLabels, umbrellaKeys } from '@/store/modules/errorInterfaces';
import { ErrorState, ErrorModule } from '@/store/modules/error';
import SnackBar from '@/components/common/SnackBar.vue';
import { isEmpty } from 'lodash';
import { VisibilityKeys } from '@/models/visibility';
import { SearchFilters } from '@/store/modules/searchInterfaces';
import { SearchModule } from '@/store/modules/search';
import { ProcessModule } from '@/store/modules/process';
import { AuthModule } from '../../../store/modules/auth';

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

  showSaveSuccess = false;
  showSaveError = false;

  clearErrors() {
    ErrorModule.clearErrors();
  }

  get errors() {
    return ErrorModule;
  }

  hashLink(target: string) {
    return `#${target}`;
  }

  clickedHashLink() {
    this.$emit('clickedHashLink');
  }

  beforeCreate() {
    ErrorModule.clearErrors();
  }

  mounted() {
    if (this.isReporting) {
      ProcessModule.update({
        type: this.type,
        canEdit: true,
        hasChanged: false,
        cvr: AuthModule.user?.cvr,
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

    SearchModule.resetFilters();

    const filters: Partial<SearchFilters> = {
      umbrella: false,
      visibility: {
        MUNICIPALITY: this.type === TypeKeys.PARENT,
        PUBLIC: false
      }
    };

    SearchModule.updateFilters(filters);
  }

  async save() {
    try {
      await ProcessModule.save(umbrellaKeys);
      this.showSaveSuccess = true;
    } catch (e) {
      this.showSaveError = true;
    }
  }

  async report() {
    try {
      const processId = await ProcessModule.createReport(umbrellaKeys);
      this.showSaveSuccess = true;
      this.$router.push(`/details/${processId}`);
    } catch (e) {
      this.showSaveError = true;
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
  color: $color-primary;
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
